import { useEffect, useState, useMemo } from "react";
import { useGetSubmitMonth } from "../hooks/GetSubmitMonth";
import { getDaysInMonth, week } from "../data/Date";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Modal from "../hooks/Modal";

const SubmitCalender = () => {
  const [data, setData] = useState(null);
  const days = getDaysInMonth(data?.year, data?.month);
  const getSubmitMonth = useMemo(useGetSubmitMonth, []);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [shiftDates, setShiftDates] = useState([]);
  const navigate = useNavigate();
  const { storeNumber } = useParams();

  //shiftDatesにデータがあれば、その日のシフト時間を描画する。
  const renderShiftData = (date) => {
    const shift = shiftDates.find((shift) => {
      const shiftDate = new Date(shift.shift_date.work_day);
      return (
        shiftDate.getDate() === date.getDate() &&
        shiftDate.getMonth() + 1 === data?.month &&
        shiftDate.getFullYear() === data?.year
      );
    });
    if (shift) {
      return (
        <div className="text-xs">
          <p>{shift.shift_time.start_time}</p>
          <p>|</p>
          <p>{shift.shift_time.end_time}</p>
        </div>
      );
    }
    return null;
  };

  const setTime = (day, month, year, startTime, endTime) => {
    const work_day = `${year}-${month.toString().padStart(2, "0")}-${day
      .toString()
      .padStart(2, "0")}`;
    const newShift = {
      shift_date: {
        work_day,
      },
      shift_time: {
        start_time: startTime,
        end_time: endTime,
      },
    };
    // shiftDatesに新しいシフトを追加
    setShiftDates([...shiftDates, newShift]);
  };

  useEffect(() => {
    console.log(shiftDates);
  }, [shiftDates]);

  const handleClickDay = (date) => {
    console.log(date);
    setSelectedDate({ day: date, month: data?.month, year: data?.year });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const renderCalender = () => {
    let calender = [];
    let weekRows = [];
    let weekNum = 0;

    // 1週目の空白を追加。days[0]はその月の1日の情報が入っていて、その日の曜日をdayとして取得している。
    // 例えば、日曜日なら0、月曜日なら1、火曜日なら2、水曜日なら3、木曜日なら4、金曜日なら5、土曜日なら6が入る。
    // for文で曜日の数字以下の数だけ空白を追加している。
    for (let i = 0; i < days[0].day; i++) {
      weekRows.push(
        <th key={i} className="border border-slate-300">
          &nbsp;
        </th>
      );
    }
    // daysの配列の中身をfor文で回している。
    for (let i = 0; i < days.length; i++) {
      weekRows.push(
        <th
          key={"day" + weekNum + i}
          className="border border-slate-300 hover:text-blue-300 w-auto cursor-pointer text-xs font-bold"
          onClick={() => handleClickDay(days[i].date.getDate())}
        >
          <div className="pb-[5px]">{days[i].date.getDate()}</div>
          <div className="flex flex-col items-center h-[50px] m-auto w-9 justify-center text-xs overflow-hidden">
            {renderShiftData(days[i].date)}
          </div>
        </th>
      );
      // weekRowsの配列の中身が7つになったら、それをひとつとして描画する。その後calenderの配列に追加して、weekRowsを空にする。
      if (weekRows.length === 7) {
        calender.push(<tr key={"week" + weekNum}>{weekRows}</tr>);
        weekRows = [];
        weekNum++;
      }
    }
    //weekRowsの配列の中身が7個になるまで空白を追加する。
    while (weekRows.length < 7) {
      weekRows.push(
        <th
          key={"blank" + weekNum + weekRows.length}
          className="border border-slate-300"
        >
          &nbsp;
        </th>
      );
    }
    //weekRowsの配列の中身が7個揃わず処理がここまできたが0以上の場合はここで最終週として最後に描画する
    if (weekRows.length > 0) {
      calender.push(<tr key={"last" + days.length}>{weekRows}</tr>);
    }
    return calender;
  };

  //シフト提出可能な月のデータを取得する
  useEffect(() => {
    const submitMonthData = async () => {
      const result = await getSubmitMonth();
      setData(result.data[0]);
    };
    submitMonthData();
  }, [getSubmitMonth]);

  //シフト提出可能な月のデータがない場合は、提出できない旨を表示する
  if (!data) {
    return (
      <div className="pt-36 top-1/2 left-1/2 text-center">
        今は提出できる月のシフトがありません
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-row justify-center sm:block m-auto w-5/6 sm:h-24 h-10 text-center bg-blue-300 text-white border-2">
        <h1 className="sm:pt-5 pr-3 sm:pr-0">Submit Shifts</h1>
        {data && <p>{`${data.year}. ${data.month}`}</p>}
      </div>
      <div className="flex justify-center pt-0.5">
        <table className="w-5/6 h-96 p-4">
          <thead>
            <tr>
              {week.map((day, index) => (
                <th
                  key={day}
                  className={`border border-slate-300 ${
                    index === 0 ? "text-red-500" : ""
                  } ${index === 6 ? "text-blue-500" : ""}`}
                >
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>{data && renderCalender()}</tbody>
        </table>
      </div>
      {modalOpen && (
        <Modal
          setTime={setTime}
          closeModal={closeModal}
          day={selectedDate.day}
          month={selectedDate.month}
          year={selectedDate.year}
        />
      )}
      <div>
        <div className="hidden pt-10 sm:flex flex-col justify-center  cursor-pointer">
          <button
            className="text-blue-300 hover:text-blue-500 hover:-translate-y-1 hover:scale-110 pb-4 transition duration-500 ease-in-out"
            onClick={() => navigate(`/staff/${storeNumber}`)}
          >
            Move to Staff Page
          </button>
          <button
            className="text-blue-300 hover:text-blue-500 hover:-translate-y-1 hover:scale-110 transition duration-500 ease-in-out"
            onClick={() => navigate("/")}
          >
            Back to Top
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubmitCalender;

import { useEffect, useState, useMemo } from "react";
import { useGetSubmitMonth } from "../hooks/GetSubmitMonth";
import { getDaysInMonth, week } from "../data/Date";
import Modal from "../hooks/Modal";

const SubmitCalender = () => {
  const [data, setData] = useState(null);
  const days = getDaysInMonth(data?.year, data?.month);
  const getSubmitMonth = useMemo(useGetSubmitMonth, []);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [shiftDates, setShiftDates] = useState([]);

  useEffect(() => {
    console.log(shiftDates);
  }, [shiftDates]);

  const setTime = (day, month, year, startTime, endTime) => {
    setShiftDates([
      ...shiftDates,
      {
        day: day,
        month: month,
        year: year,
        startTime: startTime,
        endTime: endTime,
      },
    ]);
  };

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
          className="border border-slate-300 hover:text-blue-300"
          onClick={() => handleClickDay(days[i].date.getDate())}
        >
          {days[i].date.getDate()}
        </th>
      );
      // weekRowsの配列の中身が7つになったら、それをひとつとして描画する。その後calenderの配列に追加して、weekRowsを空にする。
      if (weekRows.length === 7) {
        calender.push(<tr key={"week" + weekNum}>{weekRows}</tr>);
        weekRows = [];
        weekNum++;
      }
    }
    //weekRowsの配列の中身が7個揃わず処理がここまできたが0以上の場合はここで最終週として最後に描画する
    if (weekRows.length > 0) {
      calender.push(<tr key={"last" + days.length}>{weekRows}</tr>);
    }
    return calender;
  };

  useEffect(() => {
    const submitMonthData = async () => {
      const result = await getSubmitMonth();
      setData(result.data[0]);
    };

    submitMonthData();
  }, [getSubmitMonth]);

  if (!data) {
    return (
      <div className="pt-36 top-1/2 left-1/2 text-center">
        今は提出できる月のシフトがありません
      </div>
    );
  }

  return (
    <div>
      <div className="m-auto w-4/5 h-24 text-center bg-blue-300 text-white border-2">
        <h1 className="pt-5">Submit Shifts</h1>
        {data && <p>{`${data.year}. ${data.month}`}</p>}
      </div>
      <div className="flex justify-center pt-0.5">
        <table className="w-4/5 h-96 p-4">
          <thead>
            <tr>
              {week.map((day) => (
                <th key={day} className="border border-slate-300">
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
    </div>
  );
};

export default SubmitCalender;

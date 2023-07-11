import { useEffect, useState, useMemo } from "react";
import { useGetSubmitMonth } from "../hooks/GetSubmitMonth";
import { getDaysInMonth, week } from "../data/Date";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import CalenderRender from "../hooks/CalenderRender";
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

  //出勤可能日をworkdayとshift_timeに分けて、shiftDatesに追加する。
  const setTime = (day, month, year, startTime, endTime) => {
    //padStartで2桁の指定を行い、1桁場合数字の前に0を追加する
    const work_day = `${year}-${month.toString().padStart(2, "0")}-${day
      .toString()
      .padStart(2, "0")}`;
    //新しいシフトをworkdayとshift_timeに分けて作成
    const newShift = {
      shift_date: {
        work_day,
      },
      shift_time: {
        start_time: startTime,
        end_time: endTime,
      },
    };
    //findIndexメソッドでshiftDatesに同じ日付のデータがあるか確認する。あれば1を返し、なければ-1を返す。
    const alreadyShiftDate = shiftDates.findIndex((shift) => {
      const shiftDate = new Date(shift.shift_date.work_day);
      return (
        shiftDate.getDate() === day &&
        shiftDate.getMonth() + 1 === month &&
        shiftDate.getFullYear() === year
      );
    });
    //shiftDatesに同じ日付のデータつまり1が返ってきていれば、そのデータを新しいシフトデータに更新する。
    if (alreadyShiftDate !== -1) {
      const updateShiftDates = [...shiftDates];
      updateShiftDates[alreadyShiftDate] = newShift;
      setShiftDates(updateShiftDates);
    } else {
      setShiftDates([...shiftDates, newShift]);
    }
  };

  //データの確認用後ほど削除
  useEffect(() => {
    console.log(shiftDates);
  }, [shiftDates]);

  //日付をクリックするとその日のシフト時間を入力するモーダルを表示する
  const handleClickDay = (date) => {
    console.log(date);
    setSelectedDate({ day: date, month: data?.month, year: data?.year });
    setModalOpen(true);
  };

  //モーダルを閉じる
  const closeModal = () => {
    setModalOpen(false);
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
          <tbody>
            {data && (
              <CalenderRender
                days={days}
                handleClickDay={handleClickDay}
                renderShiftData={renderShiftData}
              />
            )}
          </tbody>
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

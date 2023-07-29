import { useEffect, useState, useMemo } from "react";
import { useGetSubmitMonth } from "../hooks/GetSubmitMonth";
import { getDaysInMonth, week } from "../data/Date";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import {
  saveToLocalStorage,
  loadFromLocalStorage,
  removeFromLocalStorage,
} from "../hooks/ToLocalStorageHooks";
import CalenderRender from "../hooks/CalenderRender";
import Modal from "../hooks/Modal";
import { SubmitShift } from "../hooks/SubmitShift";
import { SubmitFlexButton } from "../hooks/SubmitFlexButton";
import Loading from "../hooks/Loading";
import { HomeMoveButton } from "../hooks/HomeMoveButton";

const SubmitCalender = () => {
  const [data, setData] = useState(null);
  const days = getDaysInMonth(data?.year, data?.month);
  const getSubmitMonth = useMemo(useGetSubmitMonth, []);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [shiftDates, setShiftDates] = useState([]);
  const navigate = useNavigate();
  const { storeNumber } = useParams();
  const [loading, setLoading] = useState(true);

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

  //localStorageのデータを画面描画時に取得し、shiftDatesにセットする。
  useEffect(() => {
    const storedShiftDates = loadFromLocalStorage("shiftDates");
    if (storedShiftDates) setShiftDates(storedShiftDates);
  }, []);

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

  //モーダルで入力したシフト時間を削除する
  const handleDelete = () => {
    removeFromLocalStorage("shiftDates");
    setShiftDates([]);
  };

  //シフト提出可能な月のデータを取得する
  useEffect(() => {
    const submitMonthData = async () => {
      setLoading(true); // データ取得開始時に loading を true に設定
      try {
        const result = await getSubmitMonth();
        setData(result.data[0]);
        setTimeout(() => {
          setLoading(false); // データ取得成功時に loading を false に設定
        }, 500);
      } catch (error) {
        setLoading(false); // データ取得失敗時にも loading を false に設定
      }
    };
    submitMonthData();
  }, [getSubmitMonth]);

  // データが取得中の場合、ローディングメッセージを表示
  if (loading) {
    return <Loading />;
  }

  //シフト提出可能な月のデータがない場合は、提出できない旨を表示する
  if (!data) {
    return (
      <div className="h-auto pb-96  bg-sky-100 dark:bg-black">
        <div className="pt-64 text-center dark:text-white">
          今は提出できる月のシフトがありません🙇
        </div>
        <div className="flex justify-center pt-20 pb-60">
          <HomeMoveButton onClick={() => navigate(`/staff/${storeNumber}`)}>
            戻る
          </HomeMoveButton>
        </div>
      </div>
    );
  }

  return (
    <div className="h-auto sm:pt-8 sm:pb-6 bg-sky-100 dark:bg-black">
      <div className="m-auto w-5/6 pt-5">
        <div className="flex flex-row justify-center sm:block sm:h-24 h-10 text-center dark:bg-sky-800 bg-sky-300 text-white border-2">
          <h1 className="sm:pt-5 pr-3 sm:pr-0 font-mono font-extrabold">
            Submit Shifts
          </h1>
          {data && <p>{`${data.year}. ${data.month}`}</p>}
        </div>
        <div className="flex justify-center pt-0.5">
          <table className="w-full h-96 p-4 dark:text-white dark:bg-sky-800">
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
        <div className="flex justify-between sm:py-8 py-3">
          <SubmitFlexButton
            type={"back"}
            onClick={() => navigate(`/staff/${storeNumber}`)}
          >
            戻る
          </SubmitFlexButton>
          <div className="flex flex-row">
            <SubmitFlexButton
              type={"save"}
              onClick={() => saveToLocalStorage("shiftDates", shiftDates)}
            >
              一時保存
            </SubmitFlexButton>
            <SubmitFlexButton
              type={"send"}
              onClick={() => SubmitShift(shiftDates)}
            >
              送信
            </SubmitFlexButton>
            <SubmitFlexButton type={"trash"} onClick={handleDelete}>
              リセット
            </SubmitFlexButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmitCalender;

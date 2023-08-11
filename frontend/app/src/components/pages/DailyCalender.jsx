import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import getDailyShift from "../hooks/GetDailyShift";
import Loading from "../hooks/Loading";
import { TimeRow, ShiftRow } from "../data/time";
import { SubmitFlexButton } from "../hooks/SubmitFlexButton";

const DailyCalender = () => {
  const { year, month, day } = useParams();
  const { storeNumber } = useParams();
  const [loading, setLoading] = useState(true);
  const [shifts, setShifts] = useState([]);
  //受け取った日付をYYYY-MM-DD形式に変換
  const formattedDate = `${year}-${String(month).padStart(2, "0")}-${String(
    day
  ).padStart(2, "0")}`;

  //ローディング画面を表示するための処理
  useEffect(() => {
    const fetchDailyShift = async () => {
      const result = await getDailyShift(storeNumber, formattedDate);
      setShifts(result);
    };
    fetchDailyShift();
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [formattedDate, storeNumber]);
  //loadingがtrueの場合はローディング画面を表示
  if (loading) {
    return <Loading />;
  }

  return (
    <div className="h-auto min-h-[430px] sm:min-h-[650px] dark:bg-black bg-sky-100 pt-5 font-mono">
      <div className="w-5/6 m-auto flex">
        <table className="w-auto text-center">
          <thead>
            <tr>
              <th className="border border-slate-300 w-72 dark:text-white bg-sky-200 dark:bg-sky-800">
                {year}年{month}月{day}日
              </th>
            </tr>
          </thead>
          <tbody>
            {shifts.map((shift) => (
              <tr key={shift.id}>
                <td className="border border-slate-300 w-72 dark:text-white sm:text-base text-sm ">
                  {shift.employee_name}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="w-full overflow-x-auto">
          <table className="w-full text-center">
            <thead>
              <TimeRow />
            </thead>
            <tbody>
              {shifts.map((shift) => (
                <ShiftRow
                  key={shift.id}
                  startTime={shift.start}
                  endTime={shift.end}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex w-5/6 m-auto justify-between py-3">
        <SubmitFlexButton type={"back"} onClick={() => window.history.back()}>
          戻る
        </SubmitFlexButton>
      </div>
    </div>
  );
};

export default DailyCalender;

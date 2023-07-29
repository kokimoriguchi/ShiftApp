import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGetEmployeeShifts } from "../hooks/GetShiftDataHook";
import { getDaysInMonth, week } from "../data/Date";
import { SubmitFlexButton } from "../hooks/SubmitFlexButton";
import { HomeMoveButton } from "../hooks/HomeMoveButton";

const ConfirmShiftCalender = () => {
  const navigate = useNavigate();
  const { storeNumber, year, month } = useParams();
  const { employees, getEmployees } = useGetEmployeeShifts();
  const [days, setDays] = useState([]);

  useEffect(() => {
    if (year && month) {
      getEmployees(storeNumber, year, month);
      console.log(employees);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [year, month]);

  //シフト提出可能な年月が変更されたら、その月の日付を取得しstateに保存
  useEffect(() => {
    if (year && month) {
      getDaysInMonth(year, month);
    }
    setDays(getDaysInMonth(year, month));
  }, [year, month]);

  function formatTime(timeString) {
    const date = new Date(timeString);
    const hours = date.getUTCHours().toString().padStart(2, "0");
    const minutes = date.getUTCMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  }

  if (!year || !month) {
    return (
      <div className="py-32">
        <div>確定しているシフトはありません🙇</div>
        <HomeMoveButton onClick={() => navigate("/")} />
      </div>
    );
  }

  return (
    <div className="h-auto min-h-[500px] sm:min-h-[650px] dark:bg-black bg-sky-100 pt-5 font-mono">
      <div className="w-5/6 m-auto flex">
        {/* 従業員名等の固定テーブル */}
        <table className="w-auto text-center h-10">
          <thead>
            <tr>
              <th className="border border-slate-300 dark:text-white">
                {year}年
              </th>
            </tr>
            <tr>
              <th className="border border-slate-300 dark:text-white">
                {month}月
              </th>
            </tr>
            <tr>
              <th className="border border-slate-300 dark:text-white">
                スキルチェック
              </th>
            </tr>
          </thead>
          <tbody>
            {employees &&
              Object.keys(employees).map((employeeName) => (
                <tr key={employeeName}>
                  <td className="border border-slate-300 w-72 dark:text-white">
                    {employeeName}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {/* スクロール可能なカレンダー部分 */}
        <div className="w-full overflow-x-auto">
          <table className="w-full m-auto text-center h-10">
            <thead>
              <tr>
                {days.map((dayObj, index) => {
                  const day = dayObj.date;
                  const formattedDate = day.getUTCDate(); // 'yyyy/mm/dd' の形式
                  return (
                    <th
                      key={index}
                      className="border border-slate-300 dark:text-white"
                    >
                      {formattedDate}
                    </th>
                  );
                })}
              </tr>
              <tr>
                {days.map((dayObj) => {
                  const day = dayObj.date;
                  const dayOfWeek = week[day.getDay()]; // 曜日を取得
                  return (
                    <th
                      key={dayObj.date.toISOString()}
                      className="border border-slate-300 dark:text-white"
                    >
                      {dayOfWeek}
                    </th>
                  );
                })}
              </tr>
              <tr>
                {days.map((day) => {
                  return (
                    <th
                      key={day.date.toISOString()}
                      className="border border-slate-300 dark:text-white"
                    >
                      -
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {employees &&
                Object.values(employees).map((shifts, index) => (
                  <tr key={index}>
                    {days.map((day) => {
                      // シフトが存在するかチェック
                      const shift = shifts.find(
                        (shift) =>
                          shift.work_day ===
                          day.date.toISOString().split("T")[0] // 日付が一致するかチェック
                      );
                      // シフトが存在すれば、シフトの種類を描画
                      return (
                        <td
                          key={day.date.toISOString()}
                          className="border border-slate-300 dark:text-white"
                          style={{ minWidth: "150px" }}
                        >
                          {shift
                            ? shift.is_attendance
                              ? `${formatTime(
                                  shift.shift_time.start_time
                                )} - ${formatTime(shift.shift_time.end_time)}` // シフトの開始時間と終了時間を表示
                              : "-"
                            : "-"}
                        </td>
                      );
                    })}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex w-5/6 m-auto justify-between py-3">
        <SubmitFlexButton
          type={"back"}
          onClick={() => navigate(`/manager/${storeNumber}`)}
        >
          戻る
        </SubmitFlexButton>
      </div>
    </div>
  );
};

export default ConfirmShiftCalender;

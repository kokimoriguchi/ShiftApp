import { useGetEmployeeShifts } from "../hooks/GetShiftDataHook";
import { useEffect, useMemo, useState } from "react";
import { useGetSubmitMonth } from "../hooks/GetSubmitMonth";
import { getDaysInMonth, week } from "../data/Date";

const Calender = ({ storeNumber }) => {
  const { employees, getEmployees } = useGetEmployeeShifts();
  const [shiftYearData, setShiftYearData] = useState(null);
  const [shiftMonthData, setShiftMonthData] = useState(null);
  const [days, setDays] = useState([]);
  const getSubmitMonth = useMemo(useGetSubmitMonth, []);

  //シフト提出可能な年月を取得しstateに保存
  useEffect(() => {
    const submitMonthData = async () => {
      const result = await getSubmitMonth();
      setShiftMonthData(result.data[0].month);
      setShiftYearData(result.data[0].year);
    };
    submitMonthData();
  }, [getSubmitMonth]);

  // shiftYearDataとshiftMonthDataが設定されてから、getEmployeesを実行し、store所属の従業員名とそのシフトを取得しstateに保存
  useEffect(() => {
    if (shiftYearData && shiftMonthData) {
      getEmployees(storeNumber, shiftYearData, shiftMonthData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shiftYearData, shiftMonthData]);

  //シフト提出可能な年月が変更されたら、その月の日付を取得しstateに保存
  useEffect(() => {
    if (shiftYearData && shiftMonthData) {
      getDaysInMonth(shiftYearData, shiftMonthData);
    }
    setDays(getDaysInMonth(shiftYearData, shiftMonthData));
  }, [shiftYearData, shiftMonthData]);

  useEffect(() => {
    console.log(employees);
    console.log(days);
  }, [employees, days]);

  return (
    <table className="w-4/5 m-auto overflow-x-auto text-center">
      <thead>
        {/* 日付のヘッダーを描画 */}
        <tr>
          <th colSpan={days.length + 1}>
            {`${shiftYearData}年${shiftMonthData}月`}
          </th>
        </tr>
        <tr>
          <th className="border border-slate-300">LOGO</th>
          {/* 従業員名のための空のセル */}
          {days.map((dayObj, index) => {
            const day = dayObj.date;
            const formattedDate = day.getUTCDate(); // 'yyyy/mm/dd' の形式
            return (
              <th key={index} className="border border-slate-300">
                {formattedDate}
              </th>
            );
          })}
        </tr>
        <tr>
          <th className="border border-slate-300">スキルチェック</th>
          {/* スキルチェックのための空のセル */}
          {days.map((dayObj, index) => {
            const day = dayObj.date;
            const dayOfWeek = week[day.getDay()]; // 曜日を取得
            return (
              <th key={index} className="border border-slate-300">
                {dayOfWeek}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {/* 従業員とそのシフトを描画 */}
        {employees &&
          Object.entries(employees).map(([employeeName, shifts]) => (
            <tr key={employeeName}>
              <td className="border border-slate-300">{employeeName}</td>{" "}
              {/* 従業員名 */}
              {/* その月の全ての日に対するセルを作成 */}
              {days.map((day, index) => {
                // シフトが存在するかチェック
                const shift = shifts.find(
                  (shift) =>
                    shift.work_day ===
                    day.date.toISOString("fr-CA").split("T")[0] // 日付が一致するかチェック
                );
                return (
                  <td key={index} className="border border-slate-300">
                    {shift ? "⚪︎" : "✖️"}
                    {/* シフト情報を表示（ここでは出勤可能かどうかを表示） */}
                  </td>
                );
              })}
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default Calender;

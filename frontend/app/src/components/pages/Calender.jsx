import { useGetEmployeeShifts } from "../hooks/GetShiftDataHook";
import { useEffect, useMemo, useState } from "react";
import { useGetSubmitMonth } from "../hooks/GetSubmitMonth";
import { getDaysInMonth, week } from "../data/Date";
import { useParams } from "react-router-dom";
import { HiSave } from "react-icons/hi";
import { TbSend, TbTrash } from "react-icons/tb";
import { RiArrowGoBackFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { SubmitFlexButton } from "../hooks/SubmitFlexButton";

const Calender = () => {
  const { employees, getEmployees } = useGetEmployeeShifts();
  const [shiftYearData, setShiftYearData] = useState(null);
  const [shiftMonthData, setShiftMonthData] = useState(null);
  const [days, setDays] = useState([]);
  const getSubmitMonth = useMemo(useGetSubmitMonth, []);
  const { storeNumber } = useParams();
  const store_number = Number(storeNumber);
  const navigate = useNavigate();

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
      getEmployees(store_number, shiftYearData, shiftMonthData);
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
    <div>
      <div className="w-5/6 m-auto flex">
        {/* 従業員名等の固定テーブル */}
        <table className="w-auto text-center h-10">
          <thead>
            <tr>
              <th className="border border-slate-300" colSpan={2}>
                {shiftYearData}年
              </th>
            </tr>
            <tr>
              <th className="border border-slate-300" colSpan={2}>
                {shiftMonthData}月
              </th>
            </tr>
            <tr>
              <th className="border border-slate-300">スキルチェック</th>
            </tr>
          </thead>
          <tbody>
            {employees &&
              Object.keys(employees).map((employeeName) => (
                <tr key={employeeName}>
                  <td className="border border-slate-300 w-72">
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
                    <th key={index} className="border border-slate-300">
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
                      className="border border-slate-300"
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
                      className="border border-slate-300"
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
                          className="border border-slate-300 min-w-72"
                        >
                          {shift ? "⚪︎" : "✖️"}
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
          back
        </SubmitFlexButton>
        <div className="flex flex-row">
          <SubmitFlexButton type={"save"} onClick={() => console.log("save")}>
            save
          </SubmitFlexButton>
          <SubmitFlexButton type={"send"} onClick={() => console.log("submit")}>
            submit
          </SubmitFlexButton>
          <SubmitFlexButton type={"trash"} onClick={() => console.log("trash")}>
            reset
          </SubmitFlexButton>
        </div>
      </div>
    </div>
  );
};

export default Calender;

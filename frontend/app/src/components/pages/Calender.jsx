import { useGetEmployeeShifts } from "../hooks/GetShiftDataHook";
import { useEffect, useMemo, useState } from "react";
import { useGetSubmitMonth } from "../hooks/GetSubmitMonth";
import { getDaysInMonth, week } from "../data/Date";
import { useParams } from "react-router-dom";
import { HiSave } from "react-icons/hi";
import { TbSend, TbTrash } from "react-icons/tb";
import { RiArrowGoBackFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

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
    <div className="w-5/6 m-auto">
      <table className="w-full m-auto overflow-x-auto text-center">
        {/* カレンダーのヘッダー部分 */}

        <thead>
          {/* 日付のヘッダーを描画 */}
          <tr>
            <th colSpan={days.length + 1}>
              {`${shiftYearData}年${shiftMonthData}月`}
            </th>
          </tr>

          <tr>
            <th className="border border-slate-300" rowspan="2">
              LOGO
            </th>
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
        {/* カレンダーのヘッダー部分終了 */}

        <tbody>
          {employees && // 従業員のシフトを描画
            Object.entries(employees).map(([employeeName, shifts]) => (
              <tr key={employeeName}>
                <td className="border border-slate-300">{employeeName}</td>{" "}
                {days.map((day) => {
                  // シフトが存在するかチェック
                  const shift = shifts.find(
                    (shift) =>
                      shift.work_day === day.date.toISOString().split("T")[0] // 日付が一致するかチェック
                  );
                  // シフトが存在すれば、シフトの種類を描画
                  return (
                    <td
                      key={day.date.toISOString()}
                      className="border border-slate-300"
                    >
                      {shift ? "⚪︎" : "✖️"}
                    </td>
                  );
                })}
              </tr>
            ))}
        </tbody>
      </table>
      <div className="flex justify-between py-3">
        <div className="inline-flex items-center rounded-full p-1 bg-zinc-400 text-white group transition-all duration-100 hover:ring-1 hover:ring-blue-300 hover:bg-blue-300 hover:ring-offset-1 hover:outline-none">
          <RiArrowGoBackFill />
          <button
            className="whitespace-nowrap inline-block text-sm max-w-0 overflow-hidden transition-all duration-300 sm:max-w-screen-2xl group-hover:max-w-screen-2xl group-hover:scale-100 group-hover:px-2"
            onClick={() => navigate(`/manager/${storeNumber}`)}
          >
            Back
          </button>
        </div>
        <div className="flex flex-row">
          <div className="inline-flex items-center rounded-full p-1 bg-zinc-400 text-white group transition-all duration-100 hover:ring-1 hover:ring-blue-300 hover:bg-blue-300 hover:ring-offset-1 hover:outline-none">
            <HiSave />
            <button
              className="whitespace-nowrap inline-block text-sm max-w-0 overflow-hidden transition-all duration-300 sm:max-w-screen-2xl group-hover:max-w-screen-2xl group-hover:scale-100 group-hover:px-2"
              // onClick={() => saveToLocalStorage("shiftDates", shiftDates)}
            >
              save
            </button>
          </div>
          <div className="inline-flex items-center rounded-full p-1 bg-zinc-400 text-white group transition-all duration-100 hover:ring-1 hover:ring-blue-300 hover:bg-blue-300 hover:ring-offset-1 hover:outline-none">
            <TbSend />
            <button
              className="whitespace-nowrap inline-block text-sm max-w-0 overflow-hidden transition-all duration-300 sm:max-w-screen-2xl group-hover:max-w-screen-2xl group-hover:scale-100 group-hover:px-2"
              // onClick={() => SubmitShift(shiftDates)}
            >
              submit
            </button>
          </div>
          <div className="inline-flex items-center rounded-full p-1 bg-zinc-400 text-white group transition-all duration-100 hover:ring-1 hover:ring-blue-300 hover:bg-blue-300 hover:ring-offset-1 hover:outline-none">
            <TbTrash />
            <button
              className="whitespace-nowrap inline-block text-sm max-w-0 overflow-hidden transition-all duration-300 sm:max-w-screen-2xl group-hover:max-w-screen-2xl group-hover:scale-100 group-hover:px-2"
              // onClick={handleDelete}
            >
              reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calender;

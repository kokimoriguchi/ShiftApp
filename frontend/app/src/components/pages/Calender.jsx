import { useGetEmployeeShifts } from "../hooks/GetShiftDataHook";
import { useEffect, useMemo, useState } from "react";
import { useGetSubmitMonth } from "../hooks/GetSubmitMonth";
import { getDaysInMonth, week } from "../data/Date";

const Calender = ({ storeNumber }) => {
  const { employees, getEmployees } = useGetEmployeeShifts();
  const [employeeShifts, setEmployeeShifts] = useState({});
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
    <div className="flex justify-center px-20">
      <div className="flex flex-row">
        <div className="flex flex-col">
          <table className="">
            <thead>
              <tr>
                <th className="border border-slate-300 w-30" rowSpan={2}>
                  {shiftYearData && `${shiftYearData}年`}
                </th>
                <th className="border border-slate-300 w-30" rowSpan={2}>
                  {shiftMonthData && `${shiftMonthData}月`}
                </th>
              </tr>
            </thead>
          </table>
          {/* <table className="table-fixed w-64">
            <thead>
              <tr>
                <th className="border border-slate-300 w-30" colSpan={2}>
                  スキルチェック
                </th>
              </tr>
            </thead>
          </table>
          <table className="table-fixed w-64">
            <tbody>
              {employees &&
                employees.map((employee) => (
                  <tr key={employee.id}>
                    <td className="border border-slate-300 w-30">
                      {employee.name}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="overflow-x-auto md:max-w-[60rem]">
          <table className="table-fixed whitespace-nowrap">
            <tbody className="pw-10">
              <tr>
                {days.map((day, index) => (
                  <th key={index} className="border border-slate-300">
                    {day.date.getDate()}
                  </th>
                ))}
              </tr>
              <tr>
                {days.map((day, index) => (
                  <th key={index} className="border border-slate-300">
                    {week[day.date.getDay()]}
                  </th>
                ))}
              </tr>
            </tbody>
          </table> */}
        </div>
      </div>
    </div>
  );
};

export default Calender;

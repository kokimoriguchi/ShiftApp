import { data, getDaysInMonth, week } from "../data/Date";
import { useGetEmployees } from "../hooks/GetShiftDataHook";
import { useEffect } from "react";

const Calender = ({ storeNumber }) => {
  const { y, m } = data();
  const days = getDaysInMonth(y, m);
  const { employees, getEmployees } = useGetEmployees();

  useEffect(() => {
    getEmployees(storeNumber);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log(employees);
  }, [employees]);

  return (
    <div className="flex justify-center px-20">
      <div className="flex flex-row">
        <div className="flex flex-col">
          <table className="">
            <thead>
              <tr>
                <th className="border border-slate-300 w-30" rowSpan={2}>
                  {y}年
                </th>
                <th className="border border-slate-300 w-30" rowSpan={2}>
                  {m}月
                </th>
              </tr>
            </thead>
          </table>
          <table className="table-fixed w-64">
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
          </table>
        </div>
      </div>
    </div>
  );
};

export default Calender;

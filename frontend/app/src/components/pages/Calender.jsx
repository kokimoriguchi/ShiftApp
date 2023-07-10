import { data, getDaysInMonth, week } from "../data/Date";

const Calender = () => {
  const { y, m } = data();
  const days = getDaysInMonth(y, m);

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
        </div>
        <div className="overflow-x-auto md:max-w-[60rem]">
          <table className="table-fixed whitespace-nowrap">
            <thead className="pw-10">
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
              {/* <tr>
                {days.map((day) => (
                  <th key={day} className="border border-slate-300">
                    ⚪︎
                  </th>
                ))}
              </tr>
              <tr>
                {days.map((day) => (
                  <th key={day} className="border border-slate-300">
                    9:00 - 19:10
                  </th>
                ))}
              </tr>
              <tr>
                {days.map((day) => (
                  <th key={day} className="border border-slate-300">
                    9:00
                  </th>
                ))}
              </tr> */}
            </thead>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Calender;

import { useGetEmployeeShifts } from "../hooks/GetShiftDataHook";
import { useEffect, useMemo, useState } from "react";
import { useGetSubmitMonth } from "../hooks/GetSubmitMonth";
import { getDaysInMonth, week } from "../data/Date";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { SubmitFlexButton } from "../hooks/SubmitFlexButton";
import { getShiftData } from "../hooks/useGetShiftDataHook";
import ModalManager from "../hooks/ModalManager";

const Calender = () => {
  const { employees, getEmployees } = useGetEmployeeShifts();
  const [shiftYearData, setShiftYearData] = useState(null);
  const [shiftMonthData, setShiftMonthData] = useState(null);
  const [days, setDays] = useState([]);
  const getSubmitMonth = useMemo(useGetSubmitMonth, []);
  const { storeNumber } = useParams();
  const store_number = Number(storeNumber);
  const navigate = useNavigate();
  const [selectedShiftId, setSelectedShiftId] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [date, setDate] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  //シフト提出可能な年月を取得しstateに保存
  useEffect(() => {
    const submitMonthData = async () => {
      const result = await getSubmitMonth();
      setShiftMonthData(result.data[0].month);
      setShiftYearData(result.data[0].year);
    };
    submitMonthData();
  }, [getSubmitMonth]);

  //クリックされた日付の出勤可能時間の取得
  useEffect(() => {
    const fetchData = async () => {
      if (selectedShiftId !== null) {
        const data = await getShiftData(selectedShiftId);
        console.log(data);
        setStartTime(data.start_time);
        setEndTime(data.end_time);
        setDate(data.date);
      }
    };
    fetchData();
  }, [selectedShiftId]);

  //モーダルを閉じる
  const closeModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    console.log(employees);
  }, [employees]);

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

  return (
    <div className="h-screen dark:bg-black pt-5">
      <div className="w-5/6 m-auto flex">
        {/* 従業員名等の固定テーブル */}
        <table className="w-auto text-center h-10">
          <thead>
            <tr>
              <th className="border border-slate-300 dark:text-white">
                {shiftYearData}年
              </th>
            </tr>
            <tr>
              <th className="border border-slate-300 dark:text-white">
                {shiftMonthData}月
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
                          className="border border-slate-300 dark:text-white cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
                          style={{ minWidth: "110px" }}
                          onClick={() => {
                            if (shift) setSelectedShiftId(shift.id);
                            setModalOpen(true);
                          }}
                        >
                          {shift ? "⚪︎" : "-"}
                        </td>
                      );
                    })}
                  </tr>
                ))}
            </tbody>
          </table>
          {selectedShiftId && modalOpen && (
            <ModalManager
              closeModal={closeModal}
              day={date}
              month={shiftMonthData}
              year={shiftYearData}
              startTime={startTime}
              endTime={endTime}
            />
          )}
        </div>
      </div>
      <div className="flex w-5/6 m-auto justify-between py-3">
        <SubmitFlexButton
          type={"back"}
          onClick={() => navigate(`/manager/${storeNumber}`)}
        >
          戻る
        </SubmitFlexButton>
        <div className="flex flex-row">
          <SubmitFlexButton type={"save"} onClick={() => console.log("save")}>
            一時保存
          </SubmitFlexButton>
          <SubmitFlexButton type={"send"} onClick={() => console.log("submit")}>
            確定
          </SubmitFlexButton>
          <SubmitFlexButton type={"trash"} onClick={() => console.log("trash")}>
            リセット
          </SubmitFlexButton>
        </div>
      </div>
    </div>
  );
};

export default Calender;

import { useGetEmployeeShifts } from "../hooks/GetShiftDataHook";
import { useEffect, useMemo, useState } from "react";
import { useGetSubmitMonth } from "../hooks/GetSubmitMonth";
import { getDaysInMonth, week } from "../data/Date";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { SubmitFlexButton } from "../hooks/SubmitFlexButton";
import { getShiftData } from "../hooks/useGetShiftDataHook";
import ModalManager from "../hooks/ModalManager";
import ConfirmationModal from "../hooks/ConfirmationModal";
import ConfirmShift from "../hooks/ConfirmShift";
import Loading from "../hooks/Loading";
import { HomeMoveButton } from "../hooks/HomeMoveButton";

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
  const [workId, setWorkId] = useState(null);
  const [modalConfirmationOpen, setModalConfirmationOpen] = useState(false);
  const [noAvailableShifts, setNoAvailableShifts] = useState(false);
  const [loading, setLoading] = useState(true);

  //シフト提出可能な年月を取得しstateに保存
  useEffect(() => {
    const submitMonthData = async () => {
      const result = await getSubmitMonth();
      // 結果が存在するか確認します
      if (result && result.data && result.data[0]) {
        setTimeout(() => {
          setLoading(false); // データ取得成功時に loading を false に設定
        }, 500);
        setShiftMonthData(result.data[0].month);
        setShiftYearData(result.data[0].year);
      } else {
        // 提出可能なシフトが存在しないとマークします
        setLoading(false);
        setNoAvailableShifts(true);
      }
    };
    submitMonthData();
  }, [getSubmitMonth]);

  //クリックされた日付の出勤可能時間の取得
  useEffect(() => {
    const fetchData = async () => {
      if (selectedShiftId !== null) {
        const data = await getShiftData(selectedShiftId);
        console.log(data.date.id);
        setStartTime(data.start_time);
        setEndTime(data.end_time);
        setDate(data.date.work_day);
        setWorkId(data.date.id);
      }
    };
    fetchData();
  }, [selectedShiftId]);

  //モーダルを閉じる
  const closeModal = () => {
    setModalOpen(false);
  };

  //確認用のモーダルを閉じる
  const closeConfirmationModal = () => {
    setModalConfirmationOpen(false);
  };

  useEffect(() => {
    console.log(employees);
  }, [employees]);

  //時間を表示用に整形する関数
  function formatTime(timeString) {
    const date = new Date(timeString);
    const hours = date.getUTCHours().toString().padStart(2, "0");
    const minutes = date.getUTCMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  }

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

  //モーダル内で確定された際に呼び出す関数
  const handleConfirm = async () => {
    // APIを呼び出す
    const response = await ConfirmShift(
      store_number,
      shiftYearData,
      shiftMonthData
    );
    // API呼び出しが成功した場合にリダイレクト
    if (response.status === "success") {
      navigate(`/manager/${storeNumber}`);
    } else {
      // API呼び出しが失敗した場合はエラーメッセージを表示
      alert("シフト確定に失敗しました。");
    }
  };

  if (loading) {
    return <Loading />;
  }

  //シフト提出可能な月のデータがない場合は、提出できない旨を表示する

  return (
    <div className="h-auto dark:bg-black bg-sky-100 pt-5 font-mono">
      {/* もし提出可能なシフトが存在しない場合はメッセージを表示します */}
      {noAvailableShifts ? (
        <div className="h-auto bg-sky-100 dark:bg-black">
          <div className="pt-64 text-center dark:text-white">
            <p>編集可能なシフトが存在しません。</p>
            <p>次のシフト作成を許可してください。</p>
          </div>
          <div className="flex justify-center pt-20 pb-60">
            <HomeMoveButton onClick={() => navigate(`/manager/${storeNumber}`)}>
              戻る
            </HomeMoveButton>
          </div>
        </div>
      ) : (
        <>
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
                              style={{ minWidth: "150px" }}
                              onClick={() => {
                                if (shift) {
                                  setSelectedShiftId(shift.id);
                                  setModalOpen(true);
                                }
                              }}
                            >
                              {shift
                                ? shift.is_attendance
                                  ? `${formatTime(
                                      shift.shift_time.start_time
                                    )} - ${formatTime(
                                      shift.shift_time.end_time
                                    )}` // シフトの開始時間と終了時間を表示
                                  : "⚪︎"
                                : "-"}
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
                  startTime={startTime}
                  endTime={endTime}
                  workId={workId}
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
              <SubmitFlexButton
                type={"send"}
                onClick={() => setModalConfirmationOpen(true)}
              >
                確定
              </SubmitFlexButton>
            </div>
            {modalConfirmationOpen && (
              <ConfirmationModal
                year={shiftYearData}
                month={shiftMonthData}
                closeModal={closeConfirmationModal}
                text={"シフトを確定しますか？"}
                button={"確定する"}
                number={storeNumber}
                handle={handleConfirm}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Calender;

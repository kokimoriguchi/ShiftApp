import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGetEmployeeShifts } from "../hooks/GetShiftDataHook";
import { getDaysInMonth, week } from "../data/Date";
import { SubmitFlexButton } from "../hooks/SubmitFlexButton";
import { HomeMoveButton } from "../hooks/HomeMoveButton";
import ModalGeneral from "../hooks/ModalGeneral";
import { RxCross2, RxCheck } from "react-icons/rx";
import GetSkillList from "../hooks/GetSkillList";
import Loading from "../hooks/Loading";

const ConfirmShiftCalender = () => {
  const navigate = useNavigate();
  const { storeNumber, year, month } = useParams();
  const store_number = Number(storeNumber);

  const { employees, getEmployees } = useGetEmployeeShifts();
  //店舗のスキル一覧を保存するstate
  const [skillList, setSkillList] = useState([]);
  //スキルチェック用のstate
  const [skillsAvailability, setSkillsAvailability] = useState({});
  //クリックされた不足スキルを保存するstate
  const [lackSkills, setLackSkills] = useState([]);
  //シフト提出可能な年月を取得中かどうかを判断するstate
  const [loading, setLoading] = useState(true);

  const [modalSkillCheckOpen, setModalSkillCheckOpen] = useState(false);

  const [days, setDays] = useState([]);

  useEffect(() => {
    if (year && month) {
      getEmployees(storeNumber, year, month);
      setTimeout(() => {
        setLoading(false); // データ取得成功時に loading を false に設定
      }, 500);
    }
    const fetchSkills = async () => {
      const skills = await GetSkillList(store_number);
      setSkillList(skills);
    };

    fetchSkills();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [year, month]);

  //シフト提出可能な年月が変更されたら、その月の日付を取得しstateに保存
  useEffect(() => {
    if (year && month) {
      getDaysInMonth(year, month);
    }
    setDays(getDaysInMonth(year, month));
  }, [year, month]);

  //各日付にスキルチェックを行い、その結果をstateに保存
  //-----------------------------------------------------------------------------
  useEffect(() => {
    if (year && month && employees) {
      const skillsCoverage = {};
      // 日付ごとに従業員のスキルを確認します。各日付についてループを回している
      for (let dayObj of days) {
        // 日付をYYYY-MM-DDの形式に変換し格納している
        const day = dayObj.date.toISOString().slice(0, 10);
        const skillsForDay = new Set();
        const missingSkills = [];
        Object.values(employees).forEach((employeeData) => {
          // someメソッドで従業員がその日に出勤しているかどうかを確認します
          const isWorkingOnDay = employeeData.shifts.some(
            (shift) => shift.work_day === day && shift.is_attendance
          );
          if (isWorkingOnDay) {
            // 従業員のスキルを集合に追加します
            employeeData.skills.forEach((skill) => skillsForDay.add(skill.id));
          }
        });
        // hasメソッドでskillsForDayの中にskillListのIDをと一致するものがあるか検証しスキルが不足しているかどうかを確認します
        skillList.forEach((skill) => {
          if (!skillsForDay.has(skill.id)) {
            missingSkills.push(skill.name); // スキルが不足している場合、名前を追加
          }
        });
        // 日付ごとのスキルの検証を記録。
        skillsCoverage[day] = {
          allCovered: missingSkills.length === 0,
          missingSkills,
        };
      }
      // 状態を更新します
      setSkillsAvailability(skillsCoverage);
    }
  }, [year, month, days, employees, skillList]);
  //-----------------------------------------------------------------------------

  //不足スキルチェック確認用のモーダルを閉じる
  const closeSkillCheckModal = () => {
    setModalSkillCheckOpen(false);
  };

  function formatTime(timeString) {
    const date = new Date(timeString);
    const hours = date.getUTCHours().toString().padStart(2, "0");
    const minutes = date.getUTCMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  }

  //loadingがtrueの場合はローディング画面を表示
  if (loading) {
    return <Loading />;
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
                      className="border border-slate-300 dark:text-white hover:bg-sky-300 hover:text-gray-500 bg-sky-200 dark:bg-sky-800 cursor-pointer"
                      onClick={() =>
                        navigate(
                          `/${storeNumber}/${year}/${month}/${formattedDate}/calender`
                        )
                      }
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
                  // 曜日に応じたクラス名を割り当てる
                  let textColorClass;
                  if (dayOfWeek === "土") {
                    textColorClass = "text-sky-500 dark:text-sky-500"; // 土曜日
                  } else if (dayOfWeek === "日") {
                    textColorClass = "text-red-500 dark:text-red-500"; // 日曜日
                  }
                  return (
                    <th
                      key={dayObj.date.toISOString()}
                      className={`border border-slate-300 dark:text-white bg-sky-200 dark:bg-sky-800 ${textColorClass}`}
                    >
                      {dayOfWeek}
                    </th>
                  );
                })}
              </tr>
              <tr>
                {days.map((day) => {
                  const dayKey = day.date.toISOString().slice(0, 10);
                  const skillCoverage = skillsAvailability[dayKey];

                  // この日付のスキルカバレッジが存在しないか、もしくはallCoveredがtrueの場合
                  const isAllCovered =
                    !skillCoverage || skillCoverage.allCovered;
                  const missingSkills = skillCoverage
                    ? skillCoverage.missingSkills
                    : [];

                  return (
                    <th
                      key={day.date.toISOString()}
                      className={`border border-slate-300 dark:text-white ${
                        isAllCovered
                          ? "bg-green-200 dark:bg-green-700"
                          : "bg-red-200 dark:bg-red-700 hover:bg-red-300 hover:text-red-900 dark:hover:bg-red-600 cursor-pointer"
                      }`}
                      onClick={
                        !isAllCovered
                          ? () => {
                              setLackSkills(missingSkills);
                              setModalSkillCheckOpen(true);
                            }
                          : undefined
                      }
                    >
                      {isAllCovered ? (
                        <RxCheck className="inline-block text-green-500" />
                      ) : (
                        <RxCross2 className="inline-block text-red-500" />
                      )}
                    </th>
                  );
                })}
                {modalSkillCheckOpen && (
                  <ModalGeneral
                    closeModal={closeSkillCheckModal}
                    storeName={"不足スキル"}
                  >
                    <div className="text-center">
                      <div className="w-3/4 m-auto h-0.5 dark:bg-white bg-gray-500 z-[-1] mb-3" />
                      <div className="h-36 overflow-auto">
                        {lackSkills.map((skill, index) => (
                          <p key={index}>{skill}</p>
                        ))}
                      </div>
                      <div className="w-3/4 m-auto h-0.5 dark:bg-white bg-gray-500 z-[-1] mt-3" />
                    </div>
                  </ModalGeneral>
                )}
              </tr>
            </thead>
            <tbody>
              {employees &&
                Object.values(employees).map((employeeData, index) => (
                  <tr key={index}>
                    {days.map((day) => {
                      // シフトが存在するかチェック
                      const shift = employeeData.shifts.find(
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

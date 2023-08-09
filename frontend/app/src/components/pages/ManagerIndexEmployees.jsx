import getEmployeesBelongsToStore from "../hooks/GetEmployeesBelongsToStore";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loading from "../hooks/Loading";
import { SubmitFlexButton } from "../hooks/SubmitFlexButton";
import GetSkillList from "../hooks/GetSkillList";
import ModalGeneral from "../hooks/ModalGeneral";
import CreateSkillByEmployee from "../hooks/CreateSkillByEmployee";
import deleteEmployee from "../hooks/DeleteEmployee";

const ManagerIndexEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [skills, setSkills] = useState([]);
  const [checkEmployees, setCheckEmployees] = useState([]);
  const { storeNumber } = useParams();
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const navigate = useNavigate();
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);

  // employeeチェックボックスのクリックイベントハンドラ
  const handleCheckEmployees = (employee) => {
    if (checkEmployees.some((e) => e.id === employee.id)) {
      setCheckEmployees(checkEmployees.filter((e) => e.id !== employee.id));
    } else {
      setCheckEmployees([...checkEmployees, employee]);
    }
  };

  //modalの閉じる関数
  const handleClose = () => {
    setModalOpen(false);
    //下記でスキルの選択状態をリセット
    setSkills(skills.map((skill) => ({ ...skill, selected: false })));
  };

  //confirmモーダルの閉じる関数
  const handleCloseConfirmation = () => {
    setConfirmationModalOpen(false);
  };

  // skillチェックボックスのクリックイベントハンドラ
  const handleCheck = (id) => {
    setSkills(
      skills.map((skill) =>
        skill.id === id ? { ...skill, selected: !skill.selected } : skill
      )
    );
  };

  // 従業員の削除ボタンのクリックイベントハンドラ
  const handleDeleteEmployee = async () => {
    try {
      const result = await deleteEmployee(checkEmployees);
      console.log(result);
      const updatedEmployees = await getEmployeesBelongsToStore(storeNumber);
      setEmployees(updatedEmployees);
      setConfirmationModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  // 初回描画時に従業員一覧とスキル一覧を取得
  useEffect(() => {
    const getEmployees = async () => {
      const resultEmployees = await getEmployeesBelongsToStore(storeNumber);
      const resultSkills = await GetSkillList(storeNumber);
      // 下記でそれぞれのスキルに選択状態を追加
      const skillsWithSelected = resultSkills.map((skill) => ({
        ...skill,
        selected: false,
      }));
      setSkills(skillsWithSelected);
      setEmployees(resultEmployees);
      if (resultEmployees && resultSkills) {
        setTimeout(() => {
          setLoading(false); // データ取得成功時に loading を false に設定
        }, 500);
      }
    };
    getEmployees();
  }, [storeNumber]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="overflow-x-auto h-auto min-h-[500px] sm:min-h-[650px] bg-sky-100 dark:bg-black">
      <div className="flex justify-center pt-16">
        <div className="font-mono dark:text-white md:text-[60px] text-3xl animate-tracking-in-expand duration-1000 tracking-in-expand">
          StaffList
        </div>
      </div>
      <div className="sm:w-3/5 w-4/5 h-auto sm:max-h-[450px] max-h-[250px] mt-10 m-auto overflow-y-auto animate-slide-in-fwd-center">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-300 dark:text-white font-mono">
              <th>Select</th>
              <th>Name</th>
              <th className="hidden sm:block">Number</th>
              <th>skill</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {employees.map((employee, index) => (
              <tr
                key={index}
                className="border-b border-slate-300 dark:text-white"
              >
                <th>
                  <label>
                    <input
                      type="checkbox"
                      className="pr-2"
                      checked={checkEmployees.some((e) => e.id === employee.id)}
                      onChange={() => handleCheckEmployees(employee)}
                    />
                  </label>
                </th>
                <td className="font-bold">{employee.name}</td>
                <td className="hidden sm:block">{employee.number}</td>
                <th>
                  <button
                    className="hover:text-blue-300 dark:hover:text-blue-300 font-mono"
                    onClick={() => {
                      setSelectedEmployeeId(employee.id);
                      setModalOpen(true);
                      console.log(skills);
                    }}
                  >
                    add
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between sm:w-3/5 w-4/5 m-auto pt-5">
        <div>
          <SubmitFlexButton
            type="back"
            onClick={() => navigate(`/manager/${storeNumber}`)}
          >
            戻る
          </SubmitFlexButton>
        </div>
        <div>
          <SubmitFlexButton
            type="trash"
            onClick={() => setConfirmationModalOpen(true)}
          >
            削除
          </SubmitFlexButton>
        </div>
      </div>
      {modalOpen && (
        <ModalGeneral closeModal={handleClose}>
          <div className="w-3/4 m-auto h-0.5 dark:bg-white bg-gray-500 z-[-1]" />
          <div className="flex justify-center">
            <div className="flex flex-col justify-start items-start overflow-auto w-72 h-40">
              {skills.map((skill, index) => (
                <div key={index} className="m-2">
                  <label>
                    <input
                      type="checkbox"
                      className="checkbox"
                      onChange={() => handleCheck(skill.id)}
                    />
                    <span className="pl-20">{skill.name}</span>
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className="w-3/4 m-auto h-0.5 dark:bg-white bg-gray-500 z-[-1]" />
          <div className="flex justify-center mt-8">
            <SubmitFlexButton
              type="save"
              onClick={() =>
                CreateSkillByEmployee(skills, selectedEmployeeId, handleClose)
              }
            >
              追加
            </SubmitFlexButton>
          </div>
        </ModalGeneral>
      )}
      {confirmationModalOpen && (
        <ModalGeneral closeModal={handleCloseConfirmation}>
          <div className="flex justify-center">
            <div className="flex flex-col justify-center items-center w-72 h-36">
              <p className="font-mono sm:text-xl text-lg pt-8">
                選択したスタッフを削除しますか？
              </p>
              <p className="font-mono text-sm text-red-400">
                ※この操作は取り消せません。
              </p>
              <div className="flex justify-center mt-8">
                <SubmitFlexButton
                  type="trash"
                  onClick={() => handleDeleteEmployee()}
                >
                  削除
                </SubmitFlexButton>
              </div>
            </div>
          </div>
        </ModalGeneral>
      )}
    </div>
  );
};

export default ManagerIndexEmployees;

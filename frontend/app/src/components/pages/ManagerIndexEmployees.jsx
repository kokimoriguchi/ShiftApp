import getEmployeesBelongsToStore from "../hooks/GetEmployeesBelongsToStore";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loading from "../hooks/Loading";
import { SubmitFlexButton } from "../hooks/SubmitFlexButton";
import GetSkillList from "../hooks/GetSkillList";
import ModalGeneral from "../hooks/ModalGeneral";
import CreateSkillByEmployee from "../hooks/CreateSkillByEmployee";

const ManagerIndexEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [skills, setSkills] = useState([]);
  // const [checkEmployees, setCheckEmployees] = useState([]);
  const { storeNumber } = useParams();
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);

  // const handleSelect = (e, employee) => {
  //   if (e.target.checked) {
  //     setSelectedEmployees([...selectedEmployees, employee]);
  //   } else {
  //     setSelectedEmployees(
  //       selectedEmployees.filter((selected) => selected.id !== employee.id)
  //     );
  //   }
  // };

  //modalの閉じる関数
  const handleClose = () => {
    setModalOpen(false);
    //下記でスキルの選択状態をリセット
    setSkills(skills.map((skill) => ({ ...skill, selected: false })));
  };

  // チェックボックスのクリックイベントハンドラ
  const handleCheck = (id) => {
    setSkills(
      skills.map((skill) =>
        skill.id === id ? { ...skill, selected: !skill.selected } : skill
      )
    );
  };

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
        <div className="font-mono dark:text-white text-2xl animate-tracking-in-expand duration-1000 tracking-in-expand">
          スタッフ一覧
        </div>
      </div>
      <table className="w-3/5 h-auto max-h-[450] mt-10 m-auto">
        <thead className="">
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
                  <input type="checkbox" className="pr-2" />
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
      <div className="flex justify-between w-3/5 m-auto pt-5">
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
            onClick={() => navigate(`/manager/${storeNumber}`)}
          >
            削除
          </SubmitFlexButton>
        </div>
      </div>
      {modalOpen && (
        <ModalGeneral closeModal={handleClose}>
          <div className="flex justify-center">
            <div className="flex flex-col justify-start items-start overflow-auto w-72 h-36">
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
    </div>
  );
};

export default ManagerIndexEmployees;

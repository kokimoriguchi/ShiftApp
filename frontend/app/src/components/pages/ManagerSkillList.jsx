import GetSkillList from "../hooks/GetSkillList";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loading from "../hooks/Loading";
import { SubmitFlexButton } from "../hooks/SubmitFlexButton";

const ManagerSkillList = () => {
  const [skills, setSkills] = useState([]);
  // const [selectedEmployees, setSelectedEmployees] = useState([]);
  // const [allSelected, setAllSelected] = useState(false);
  const { storeNumber } = useParams();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // const handleSelectAll = (e) => {
  //   setAllSelected(e.target.checked);
  //   if (e.target.checked) {
  //     setSelectedEmployees(employees);
  //   } else {
  //     setSelectedEmployees([]);
  //   }
  // };

  // const handleSelect = (e, employee) => {
  //   if (e.target.checked) {
  //     setSelectedEmployees([...selectedEmployees, employee]);
  //   } else {
  //     setSelectedEmployees(
  //       selectedEmployees.filter((selected) => selected.id !== employee.id)
  //     );
  //   }
  // };

  useEffect(() => {
    const getSkills = async () => {
      const result = await GetSkillList(storeNumber);
      setSkills(result);
      if (result) {
        setTimeout(() => {
          setLoading(false); // データ取得成功時に loading を false に設定
        }, 500);
      }
    };
    getSkills();
  }, [storeNumber]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="overflow-x-auto h-auto min-h-[500px] sm:min-h-[650px] bg-sky-100 dark:bg-black">
      <table className="md:w-2/5 w-4/5 h-auto max-h-[450] mt-10 m-auto">
        <thead className="">
          <tr className="border-b border-slate-300 dark:text-white font-mono">
            <th>Select</th>
            <th>skill</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {skills.map((skill, index) => (
            <tr
              key={index}
              className="border-b border-slate-300 dark:text-white"
            >
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <td className="font-bold">{skill.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between md:w-2/5 w-4/5 m-auto pt-5">
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
    </div>
  );
};

export default ManagerSkillList;

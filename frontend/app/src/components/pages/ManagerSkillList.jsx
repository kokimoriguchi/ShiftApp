import GetSkillList from "../hooks/GetSkillList";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loading from "../hooks/Loading";
import { SubmitFlexButton } from "../hooks/SubmitFlexButton";
import ModalGeneral from "../hooks/ModalGeneral";
import deleteSkill from "../hooks/DeleteSkill";

const ManagerSkillList = () => {
  const [skills, setSkills] = useState([]);
  const [checkSkills, setCheckSkills] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const { storeNumber } = useParams();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // skillチェックボックスのクリックイベントハンドラ
  const handleCheckSkills = (skill) => {
    if (checkSkills.some((e) => e.id === skill.id)) {
      setCheckSkills(checkSkills.filter((e) => e.id !== skill.id));
    } else {
      setCheckSkills([...checkSkills, skill]);
    }
  };

  // スキルの削除ボタンのクリックイベントハンドラ
  const handleDeleteSkill = async () => {
    try {
      const result = await deleteSkill(checkSkills);
      console.log(result);
      const updatedSkills = await GetSkillList(storeNumber);
      setSkills(updatedSkills);
      setModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  //modalの閉じる関数
  const handleClose = () => {
    setModalOpen(false);
  };

  // 初回描画時にスキル一覧を取得
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
                  <input
                    type="checkbox"
                    className="checkbox"
                    checked={checkSkills.some((e) => e.id === skill.id)}
                    onChange={() => handleCheckSkills(skill)}
                  />
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
          <SubmitFlexButton type="trash" onClick={() => setModalOpen(true)}>
            削除
          </SubmitFlexButton>
        </div>
      </div>
      {modalOpen && (
        <ModalGeneral closeModal={handleClose}>
          <div className="flex justify-center">
            <div className="flex flex-col justify-center items-center w-72 h-36">
              <p className="font-mono sm:text-xl text-lg pt-8">
                選択したスキルを削除しますか？
              </p>
              <p className="font-mono text-sm text-red-400">
                ※この操作は取り消せません。
              </p>
              <div className="flex justify-center mt-8">
                <SubmitFlexButton
                  type="trash"
                  onClick={() => handleDeleteSkill()}
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

export default ManagerSkillList;

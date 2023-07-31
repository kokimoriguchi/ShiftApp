import { useNavigate, useParams } from "react-router-dom";
import { HomeMoveButton } from "../hooks/HomeMoveButton";
import { useEffect, useState, useContext } from "react";
import baseAxios from "../hooks/Axios";
import ConfirmationModal from "../hooks/ConfirmationModal";
import { AuthContext } from "../hooks/Auth";
import AccordionItem from "../hooks/AccordionItem";
import createApproveMonth from "../hooks/CreateApproveMonth";
import ModalGeneral from "../hooks/ModalGeneral";
import CreateSkill from "../hooks/CreateSkill";
import { validateSkillName } from "../hooks/Validators";

const ManagerTop = () => {
  const { storeName } = useContext(AuthContext);
  const { setContextStoreNumber } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [skillModalOpen, setSkillModalOpen] = useState(false);
  const [skillName, setSkillName] = useState("");
  const [skillErrorMessage, setSkillErrorMessage] = useState("");
  const { storeNumber } = useParams();

  const [approveMonths, setApproveMonths] = useState();
  const [selectedYear, setSelectedYear] = useState(""); // 選択した年
  const [selectedMonth, setSelectedMonth] = useState(""); // 選択した月
  const navigate = useNavigate();
  const handleYearChange = (e) => setSelectedYear(e.target.value);
  const handleMonthChange = (e) => setSelectedMonth(e.target.value);

  // 確定シフト一覧モーダルを開く
  const handleConfirmation = () => {
    // handleConfirmation関数の中で選択した年と月を使用
    if (selectedYear && selectedMonth) {
      navigate(`/${storeNumber}/calender/${selectedYear}/${selectedMonth}`);
      closeModal();
    } else {
      // 年と月が選択されていない場合にエラーメッセージを設定
      setErrorMessage("年と月を選択してください");
    }
  };

  //モーダルを閉じる
  const closeModal = () => {
    setModalOpen(false);
  };

  //skillモーダルを閉じる
  const closeSkillModal = () => {
    setSkillModalOpen(false);
  };

  //バリデート通ればスキルを作成する
  const handleSkillCreate = async () => {
    const error = validateSkillName(skillName);
    if (error) {
      setSkillErrorMessage(error);
      return;
    }
    const response = await CreateSkill(skillName, storeNumber);
    if (response) {
      setSkillModalOpen(false);
      setSkillName("");
      setSkillErrorMessage("");
    }
  };

  // ページが読み込まれたら実行
  // storeNumberをcontextにセットする
  useEffect(() => {
    setContextStoreNumber(storeNumber);
  }, [storeNumber, setContextStoreNumber]);

  useEffect(() => {
    //ここでrailsのAPIのget_approve_month/:store_numberを叩いて、月と年を取得する
    const getApproveMonths = async () => {
      try {
        const response = await baseAxios.get(
          `get_approve_month/${storeNumber}`
        );
        console.log(response.data);
        if (Array.isArray(response.data)) {
          setApproveMonths(response.data);
          // APIから取得した初期値をstateにセットします。
          setSelectedYear(response.data[0].year);
          setSelectedMonth(response.data[0].month);
        }
      } catch (message) {
        console.log("確定している月がありません");
      }
    };
    getApproveMonths();
  }, [storeNumber]);

  return (
    <div className="flex flex-col sm:pb-20 pb-10 sm:pt-16 items-center bg-sky-100 dark:bg-black dark:text-white h-auto min-h-[500px] sm:min-h-[650px]">
      {/* PCサイズ */}
      <div className="lg:flex flex-col w-3/5 hidden">
        <div className="flex justify-center pt-5 font-mono text-2xl animate-tracking-in-expand duration-1000 tracking-in-expand">
          ManagerTop
        </div>
        <div className="pt-10">
          <p className="font-mono">Shift Management</p>
          <div className="w-full h-0.5 dark:bg-white bg-gray-500 z-[-1]" />
          <div className="grid grid-cols-3 justify-center pt-8">
            <HomeMoveButton
              onClick={() => navigate(`/manager/${storeNumber}/edit`)}
            >
              シフト編集
            </HomeMoveButton>
            <HomeMoveButton onClick={() => setModalOpen(true)}>
              確定シフト一覧
            </HomeMoveButton>
            <HomeMoveButton onClick={() => createApproveMonth()}>
              シフト作成許可
            </HomeMoveButton>
          </div>
        </div>
        <div className="pt-10">
          <p className="font-mono">Staff Management</p>
          <div className="w-full h-0.5 dark:bg-white bg-gray-500 z-[-1]" />
          <div className="grid grid-cols-3 pt-8">
            <HomeMoveButton
              onClick={() =>
                navigate(`/manager/${storeNumber}/create/employee`)
              }
              className="col-span-2"
            >
              新規スタッフ登録
            </HomeMoveButton>
            <HomeMoveButton
              onClick={() =>
                navigate(`/manager/${storeNumber}/index/employees`)
              }
            >
              登録スタッフ一覧
            </HomeMoveButton>
          </div>
        </div>
        <div className="pt-10">
          <p className="font-mono">Store Management</p>
          <div className="w-full h-0.5 dark:bg-white bg-gray-500 z-[-1]" />
          <div className="grid grid-cols-3 pt-8">
            <HomeMoveButton onClick={() => setSkillModalOpen(true)}>
              スキル登録
            </HomeMoveButton>
            <HomeMoveButton
              onClick={() => navigate(`/manager/${storeNumber}/index/skills`)}
            >
              登録スキル一覧
            </HomeMoveButton>
          </div>
        </div>
      </div>

      {/* モバイルサイズ */}
      <div className="lg:hidden">
        <div className="flex justify-center pt-5 font-mono text-2xl">
          ManagerTop
        </div>
        <div className="pt-20">
          <AccordionItem title="シフト管理">
            <HomeMoveButton
              onClick={() => navigate(`/manager/${storeNumber}/edit`)}
            >
              シフト編集
            </HomeMoveButton>
            <HomeMoveButton onClick={() => setModalOpen(true)}>
              確定シフト一覧
            </HomeMoveButton>
            <HomeMoveButton onClick={() => createApproveMonth()}>
              シフト作成許可
            </HomeMoveButton>
          </AccordionItem>
        </div>

        <div className="pt-10">
          <AccordionItem title="スタッフ管理">
            <HomeMoveButton
              onClick={() =>
                navigate(`/manager/${storeNumber}/create/employee`)
              }
              className="col-span-2"
            >
              新規スタッフ登録
            </HomeMoveButton>
            <HomeMoveButton
              onClick={() =>
                navigate(`/manager/${storeNumber}/index/employees`)
              }
            >
              登録スタッフ一覧
            </HomeMoveButton>
          </AccordionItem>
        </div>
        <div className="pt-10">
          <AccordionItem title="店舗管理">
            <HomeMoveButton onClick={() => setSkillModalOpen(true)}>
              スキル登録
            </HomeMoveButton>
            <HomeMoveButton
              onClick={() => navigate(`/manager/${storeNumber}/index/skills`)}
            >
              登録スキル一覧
            </HomeMoveButton>
          </AccordionItem>
        </div>
      </div>

      {/* スキル登録モーダル */}
      {skillModalOpen && (
        <ModalGeneral
          closeModal={closeSkillModal}
          button={"登録"}
          storeName={storeName}
          handle={handleSkillCreate}
          errorMessage={skillErrorMessage}
        >
          <div className="flex flex-col items-center">
            <div className="flex flex-col items-center">
              <label className="font-mono">スキル登録</label>
              <input
                type="text"
                className="w-60 h-10 rounded-md border-2 border-gray-400 text-center dark:bg-black dark:text-white"
                value={skillName}
                onChange={(e) => setSkillName(e.target.value)}
              />
            </div>
          </div>
        </ModalGeneral>
      )}

      {/* 確定シフト一覧モーダル */}
      {modalOpen && (
        <ConfirmationModal
          closeModal={closeModal}
          button={"表示する"}
          storeName={storeName}
          handle={handleConfirmation}
          errorMessage={errorMessage}
        >
          <div>
            <label>
              Year:
              <select
                value={selectedYear}
                onChange={handleYearChange}
                className="dark:bg-black dark:text-white"
              >
                {approveMonths &&
                  approveMonths.map((data, index) => (
                    <option key={index} value={data.year}>
                      {data.year}
                    </option>
                  ))}
              </select>
            </label>
            <label>
              Month:
              <select
                value={selectedMonth}
                onChange={handleMonthChange}
                className="dark:bg-black dark:text-white"
              >
                {approveMonths &&
                  approveMonths.map((data, index) => (
                    <option key={index} value={data.month}>
                      {data.month}
                    </option>
                  ))}
              </select>
            </label>
          </div>
        </ConfirmationModal>
      )}
    </div>
  );
};

export default ManagerTop;

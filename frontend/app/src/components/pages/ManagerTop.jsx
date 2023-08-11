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
import { FadeIn } from "../hooks/FadeInHook";

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

  //skillモーダルを閉じる
  const closeSkillModal = () => {
    setSkillModalOpen(false);
  };

  //モーダルを閉じる
  const closeModal = () => {
    setModalOpen(false);
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

  return (
    <div className="flex flex-col py-10 items-center bg-sky-100 dark:bg-black dark:text-white h-auto min-h-[430px] sm:min-h-[650px]">
      {/* PCサイズ */}
      <div className="lg:flex flex-col w-3/5 hidden relative">
        <div className="flex justify-center pt-5 font-mono md:text-[60px] text-3xl animate-tracking-in-expand duration-1000 tracking-in-expand">
          ManagerTop
        </div>
        <div className="pt-10">
          <p className="font-bold  font-mono text-xl animate-tracking-in-expand">
            Shift Management
          </p>
          <div className="w-full h-0.5 dark:bg-white bg-gray-500 z-[-1] animate-text-focus-in" />
          <FadeIn delay={300}>
            <div className="flex flex-row justify-items-center pt-8">
              <div className="pr-8">
                <HomeMoveButton
                  onClick={() => navigate(`/manager/${storeNumber}/edit`)}
                >
                  シフト編集
                </HomeMoveButton>
              </div>
              <div className="pr-8">
                <HomeMoveButton onClick={() => setModalOpen(true)}>
                  確定シフト一覧
                </HomeMoveButton>
              </div>
              <div>
                <HomeMoveButton onClick={() => createApproveMonth()}>
                  シフト作成許可
                </HomeMoveButton>
              </div>
            </div>
          </FadeIn>
        </div>
        <div className="pt-10">
          <p className="font-bold font-mono text-xl animate-tracking-in-expand">
            Staff Management
          </p>
          <div className="w-full h-0.5 dark:bg-white bg-gray-500 z-[-1] animate-text-focus-in" />
          <FadeIn delay={400}>
            <div className="flex flex-row justify-items-center pt-8">
              <div className="pr-8">
                <HomeMoveButton
                  onClick={() =>
                    navigate(`/manager/${storeNumber}/create/employee`)
                  }
                  className="col-span-2"
                >
                  新規スタッフ登録
                </HomeMoveButton>
              </div>
              <div>
                <HomeMoveButton
                  onClick={() =>
                    navigate(`/manager/${storeNumber}/index/employees`)
                  }
                >
                  登録スタッフ一覧
                </HomeMoveButton>
              </div>
            </div>
          </FadeIn>
        </div>
        <div className="pt-10">
          <p className="font-bold  font-mono text-xl animate-tracking-in-expand">
            Store Management
          </p>
          <div className="w-full h-0.5 dark:bg-white bg-gray-500 z-[-1] animate-text-focus-in" />
          <FadeIn delay={500}>
            <div className="flex flex-row justify-items-center pt-8">
              <div className="pr-8">
                <HomeMoveButton onClick={() => setSkillModalOpen(true)}>
                  スキル登録
                </HomeMoveButton>
              </div>
              <div>
                <HomeMoveButton
                  onClick={() =>
                    navigate(`/manager/${storeNumber}/index/skills`)
                  }
                >
                  登録スキル一覧
                </HomeMoveButton>
              </div>
            </div>
          </FadeIn>
        </div>
        <img
          src="/images/23700241.jpg"
          alt="mgTopImg"
          className="absolute top-[270px] right-[-170px] w-[450px] h-[300px] rounded-[72px] hidden xl:block animate-text-focus-in opacity-25"
        />
      </div>

      {/* モバイルサイズ */}
      <div className="lg:hidden">
        <div className="flex justify-center pt-5 font-mono text-2xl">
          ManagerTop
        </div>
        <div className="pt-16">
          <AccordionItem title="シフト管理">
            <div className="pt-6">
              <HomeMoveButton
                onClick={() => navigate(`/manager/${storeNumber}/edit`)}
              >
                シフト編集
              </HomeMoveButton>
            </div>
            <div className="pt-6">
              <HomeMoveButton onClick={() => setModalOpen(true)}>
                確定シフト一覧
              </HomeMoveButton>
            </div>
            <div className="pt-6">
              <HomeMoveButton onClick={() => createApproveMonth()}>
                シフト作成許可
              </HomeMoveButton>
            </div>
          </AccordionItem>
        </div>

        <div className="pt-10">
          <AccordionItem title="スタッフ管理">
            <div className="pt-6">
              <HomeMoveButton
                onClick={() =>
                  navigate(`/manager/${storeNumber}/create/employee`)
                }
                className="col-span-2"
              >
                新規スタッフ登録
              </HomeMoveButton>
            </div>
            <div className="pt-6">
              <HomeMoveButton
                onClick={() =>
                  navigate(`/manager/${storeNumber}/index/employees`)
                }
              >
                登録スタッフ一覧
              </HomeMoveButton>
            </div>
          </AccordionItem>
        </div>
        <div className="pt-10">
          <AccordionItem title="店舗管理">
            <div className="pt-6">
              <HomeMoveButton onClick={() => setSkillModalOpen(true)}>
                スキル登録
              </HomeMoveButton>
            </div>
            <div className="pt-6">
              <HomeMoveButton
                onClick={() => navigate(`/manager/${storeNumber}/index/skills`)}
              >
                登録スキル一覧
              </HomeMoveButton>
            </div>
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

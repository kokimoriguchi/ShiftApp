import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { HomeMoveButton } from "../hooks/HomeMoveButton";
import { useEffect, useState, useContext } from "react";
import { useLogout } from "../hooks/LogoutHook";
import baseAxios from "../hooks/Axios";
import ConfirmationModal from "../hooks/ConfirmationModal";
import { AuthContext } from "../hooks/Auth";
import AccordionItem from "../hooks/AccordionItem";

const ManagerTop = () => {
  const { storeName } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const { storeNumber } = useParams();
  const logout = useLogout();

  const [approveMonths, setApproveMonths] = useState();
  const [selectedYear, setSelectedYear] = useState(""); // 選択した年
  const [selectedMonth, setSelectedMonth] = useState(""); // 選択した月

  const handleYearChange = (e) => setSelectedYear(e.target.value);
  const handleMonthChange = (e) => setSelectedMonth(e.target.value);

  const handleConfirmation = () => {
    // handleConfirmation関数の中で選択した年と月を使用
    if (selectedYear && selectedMonth) {
      navigate(`/${storeNumber}/calender/${selectedYear}/${selectedMonth}`);
      console.log(selectedYear, selectedMonth);
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

  const handleClickLogout = () => {
    logout();
    console.log("done");
  };

  const createApproveMonth = async () => {
    const nextMonth = new Date();
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    const year = nextMonth.getFullYear();
    const month = nextMonth.getMonth() + 1;

    const confirmResult = window.confirm(
      `次の月の${year}年${month}月としてシフトを作成しますか？`
    );

    if (confirmResult) {
      try {
        const response = await baseAxios.post("approve_months", {
          year,
          month,
        });

        if (response.data.status === "success") {
          alert("シフト作成許可が完了しました。");
        } else {
          alert(response.data.message);
        }
      } catch (error) {
        console.error(error);
        alert("シフト作成許可に失敗しました。");
      }
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
        } else {
          console.error(response.data.message);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getApproveMonths();
  }, [storeNumber]);

  return (
    <div className="flex flex-col sm:pb-20 pb-10 sm:pt-16 items-center bg-sky-100 dark:bg-black dark:text-white h-auto min-h-[500px] sm:min-h-[650px]">
      {/* PCサイズ */}
      <div className="lg:flex flex-col w-3/5 hidden">
        <div className="flex justify-center pt-5 font-mono text-2xl">
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
            <HomeMoveButton onClick={createApproveMonth}>
              シフト作成許可
            </HomeMoveButton>
          </div>
        </div>
        <div className="pt-20">
          <p className="font-mono">Staff Management</p>
          <div className="w-full h-0.5 dark:bg-white bg-gray-500 z-[-1]" />
          <div className="grid grid-cols-3 pt-8">
            <HomeMoveButton
              onClick={() =>
                navigate(`/manager/${storeNumber}/create/employee`)
              }
            >
              新規スタッフ登録
            </HomeMoveButton>
            <HomeMoveButton>スキル登録</HomeMoveButton>
            <HomeMoveButton>スタッフ一覧表示</HomeMoveButton>
          </div>
        </div>
      </div>

      {/* モバイルサイズ */}
      <div className="lg:hidden">
        <div className="flex justify-center pt-5 font-mono text-2xl">
          ManagerTop
        </div>
        <div className="pt-14">
          <AccordionItem title="シフト管理">
            <HomeMoveButton
              onClick={() => navigate(`/manager/${storeNumber}/edit`)}
            >
              シフト編集
            </HomeMoveButton>
            <HomeMoveButton onClick={() => setModalOpen(true)}>
              確定シフト一覧
            </HomeMoveButton>
            <HomeMoveButton onClick={createApproveMonth}>
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
            >
              新規スタッフ登録
            </HomeMoveButton>
            <HomeMoveButton>スキル登録</HomeMoveButton>
            <HomeMoveButton>スタッフ一覧表示</HomeMoveButton>
          </AccordionItem>
        </div>
        <div className="pt-10 m-auto">
          <HomeMoveButton onClick={handleClickLogout}>
            ログアウト
          </HomeMoveButton>
        </div>
      </div>

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

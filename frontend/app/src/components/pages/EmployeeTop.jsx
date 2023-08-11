import { useNavigate, useParams } from "react-router-dom";
import { HomeMoveButton } from "../hooks/HomeMoveButton";
import { useLogout } from "../hooks/LogoutHook";
import { AuthContext } from "../hooks/Auth";
import { useContext, useEffect, useState } from "react";
import ConfirmationModal from "../hooks/ConfirmationModal";
import { FadeIn } from "../hooks/FadeInHook";
import baseAxios from "../hooks/Axios";

const EmployeeTop = () => {
  const navigate = useNavigate();
  const { setContextStoreNumber } = useContext(AuthContext);
  const [selectedYear, setSelectedYear] = useState(""); // 選択した年
  const [selectedMonth, setSelectedMonth] = useState(""); // 選択した月
  const [errorMessage, setErrorMessage] = useState("");
  const handleYearChange = (e) => setSelectedYear(e.target.value);
  const handleMonthChange = (e) => setSelectedMonth(e.target.value);
  const [approveMonths, setApproveMonths] = useState();
  const { storeNumber } = useParams();
  const [modalOpen, setModalOpen] = useState(false);
  const logout = useLogout();
  const { storeName } = useContext(AuthContext);

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

  // 確定シフト一覧モーダルを開く
  const handleConfirmation = () => {
    // handleConfirmation関数の中で選択した年と月を使用
    if (selectedYear && selectedMonth) {
      navigate(`/${storeNumber}/calender/${selectedYear}/${selectedMonth}`);
      handleClickModalClose();
    } else {
      // 年と月が選択されていない場合にエラーメッセージを設定
      setErrorMessage("年と月を選択してください");
    }
  };

  const handleClickLogout = () => {
    logout();
    console.log("done");
  };

  const handleClickModalClose = () => {
    setModalOpen(false);
  };

  return (
    <div className="py-10 bg-sky-100 dark:bg-black dark:text-white h-auto min-h-[430px] sm:min-h-[650px]">
      <div className="m-auto w-3/5">
        <h1 className="text-center sm:pb-10 pb-5 sm:pt-5 pt-2 font-mono md:text-[60px] text-3xl animate-tracking-in-expand duration-1000 tracking-in-expand">
          StaffTop
        </h1>
        <div className="flex justify-center items-center md:flex-row flex-col">
          <div className="py-6 md:px-3">
            <FadeIn delay={100}>
              <HomeMoveButton
                onClick={() =>
                  navigate(`/staff/${storeNumber}/calender/submit`)
                }
              >
                シフト提出
              </HomeMoveButton>
            </FadeIn>
          </div>
          <div className="py-6 md:px-3">
            <FadeIn delay={200}>
              <HomeMoveButton onClick={() => setModalOpen(true)}>
                シフト確認
              </HomeMoveButton>
            </FadeIn>
          </div>
          <div className="py-6 md:px-3">
            <FadeIn delay={300}>
              <HomeMoveButton onClick={handleClickLogout}>
                ログアウト
              </HomeMoveButton>
            </FadeIn>
          </div>
        </div>
        <img
          src="/images/23690452.jpg"
          alt="mgTopImg"
          className="m-auto w-[750px] h-[400px] object-cover rounded-3xl hidden md:flex animate-text-focus-in opacity-20"
        />
        {/* 確定シフト一覧モーダル */}
        {modalOpen && (
          <ConfirmationModal
            closeModal={handleClickModalClose}
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
    </div>
  );
};

export default EmployeeTop;

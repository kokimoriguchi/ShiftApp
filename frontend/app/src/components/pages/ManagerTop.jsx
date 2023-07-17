import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { HomeMoveButton } from "../hooks/HomeMoveButton";
import baseAxios from "../hooks/Axios";

const ManagerTop = () => {
  const navigate = useNavigate();
  const { storeNumber } = useParams();

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

  return (
    <div className="flex flex-col items-center dark:bg-black dark:text-white h-screen">
      <div className="flex justify-center">ManagerTop</div>
      <div className="pb-5 pt-20">
        <HomeMoveButton onClick={createApproveMonth}>
          シフト作成許可
        </HomeMoveButton>
      </div>
      <div className="pb-5">
        <HomeMoveButton
          onClick={() => navigate(`/manager/${storeNumber}/edit`)}
        >
          シフト編集
        </HomeMoveButton>
      </div>
      <div>
        <HomeMoveButton onClick={() => navigate(`/`)}>
          シフト確定
        </HomeMoveButton>
      </div>
    </div>
  );
};

export default ManagerTop;

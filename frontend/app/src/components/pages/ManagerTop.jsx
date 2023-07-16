import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
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
      const response = await baseAxios.post("approve_months", {
        year,
        month,
      });

      if (response.data.status === "success") {
        alert("シフト作成許可が完了しました。");
      } else {
        alert("シフト作成許可に失敗しました。");
      }
    }
  };

  return (
    <div className="flex flex-col justify-center">
      <h1 className="py-10">ManagerTop</h1>
      <button className="py10  hover:text-red-500" onClick={createApproveMonth}>
        シフト作成許可
      </button>
      <button
        className="py-10 hover:text-red-500"
        onClick={() => navigate(`/manager/${storeNumber}/edit`)}
      >
        シフト編集
      </button>
      <button className="py-10 hover:text-red-500">シフト提出</button>
    </div>
  );
};

export default ManagerTop;

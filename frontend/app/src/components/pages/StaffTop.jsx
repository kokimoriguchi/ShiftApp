import baseAxios from "../hooks/Axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const StaffTop = () => {
  const navigate = useNavigate();
  const { storeNumber } = useParams();

  const handleCheckUser = async () => {
    try {
      const response = await baseAxios.get("employees/me");
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="text-center flex flex-col pt-40">
      <h1>StaffTop</h1>
      <button onClick={handleCheckUser}>ユーザー情報取得</button>
      <button onClick={() => navigate(`/staff/${storeNumber}/calender/submit`)}>
        submitShift
      </button>
    </div>
  );
};

export default StaffTop;

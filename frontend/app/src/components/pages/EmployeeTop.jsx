import baseAxios from "../hooks/Axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { HomeMoveButton } from "../hooks/HomeMoveButton";

const EmployeeTop = () => {
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
    <div className="flex flex-col items-center dark:bg-black dark:text-white h-screen">
      <h1 className="font-mono font-extrabold pt-20">StaffTop</h1>
      <div className="pb-5 pt-10">
        <HomeMoveButton onClick={handleCheckUser}>ユーザー確認</HomeMoveButton>
      </div>
      <div>
        <HomeMoveButton
          onClick={() => navigate(`/staff/${storeNumber}/calender/submit`)}
        >
          シフト提出
        </HomeMoveButton>
      </div>
    </div>
  );
};

export default EmployeeTop;

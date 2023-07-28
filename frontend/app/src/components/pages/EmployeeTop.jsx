import baseAxios from "../hooks/Axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { HomeMoveButton } from "../hooks/HomeMoveButton";
import { useLogout } from "../hooks/LogoutHook";

const EmployeeTop = () => {
  const navigate = useNavigate();
  const { storeNumber } = useParams();
  const logout = useLogout();

  const handleCheckUser = async () => {
    try {
      const response = await baseAxios.get("employees/me");
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickLogout = () => {
    logout();
    console.log("done");
  };

  return (
    <div className="flex flex-col items-center bg-sky-100 dark:bg-black dark:text-white h-auto">
      <h1 className="font-mono font-extrabold pt-20">StaffTop</h1>
      <div className="pb-5 pt-10">
        <HomeMoveButton onClick={handleCheckUser}>ユーザー確認</HomeMoveButton>
      </div>
      <div className="pb-5">
        <HomeMoveButton
          onClick={() => navigate(`/staff/${storeNumber}/calender/submit`)}
        >
          シフト提出
        </HomeMoveButton>
      </div>
      <div>
        <HomeMoveButton onClick={handleClickLogout}>ログアウト</HomeMoveButton>
      </div>
    </div>
  );
};

export default EmployeeTop;

import baseAxios from "../hooks/Axios";
import Calender from "./Calender";

const ManagerTop = () => {
  const handleCheckUser = async () => {
    try {
      const response = await baseAxios.get("employees/me");
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h1>ManagerTop</h1>
      <Calender />
      <div className="text-center pt-40">
        <button onClick={handleCheckUser}>ユーザー情報取得</button>
      </div>
    </div>
  );
};

export default ManagerTop;

import baseAxios from "../hooks/Axios";

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
    <div className="text-center pt-40">
      <h1>ManagerTop</h1>
      <button onClick={handleCheckUser}>ユーザー情報取得</button>
    </div>
  );
};

export default ManagerTop;

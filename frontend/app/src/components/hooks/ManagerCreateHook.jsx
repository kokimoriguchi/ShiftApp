import baseAxios from "./Axios";
import { useNavigate } from "react-router-dom";

// マネージャー登録用のカスタムフック
export function useManagerCreate() {
  const navigate = useNavigate();

  const managerCreate = async (employeeData) => {
    try {
      const response = await baseAxios.post("managers", {
        manager: employeeData,
      });
      console.log(response.data);
      if (response.data.status === "create") {
        navigate("/manager/login");
        console.log(response);
      } else {
        console.log("error");
        alert(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return managerCreate;
}

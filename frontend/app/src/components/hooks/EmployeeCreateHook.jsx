import baseAxios from "./Axios";
import { useNavigate } from "react-router-dom";

// 従業員登録用のカスタムフック
export function useEmployeeCreate() {
  const navigate = useNavigate();

  const employeeCreate = async (employeeData) => {
    try {
      const response = await baseAxios.post("employees", {
        employee: employeeData,
      });
      console.log(employeeData);
      console.log(response.data);
      if (response.data.status === "create") {
        navigate("/login");
        console.log(response);
      } else {
        console.log("error");
        alert(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return employeeCreate;
}

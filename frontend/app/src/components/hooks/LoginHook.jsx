import baseAxios from "./Axios";
import { useContext } from "react";
import { AuthContext } from "./Auth";
import { useNavigate } from "react-router-dom";

// ログイン用のカスタムフック
export function useLogin() {
  const { setAuth, setEmployeeName, setStoreName } = useContext(AuthContext);
  const navigate = useNavigate();

  const login = async (userData) => {
    try {
      const response = await baseAxios.post("sign_in", userData);
      console.log(userData);
      if (response.data.status === "create") {
        setAuth(true);
        navigate(`/staff/${response.data.store_number}`);
        console.log(response.data.store_number);
        setEmployeeName(response.data.employee_name);
        setStoreName(response.data.store_name);
      } else {
        console.log(response.data.message);
        alert(response.data.message);
      }
    } catch (error) {
      setAuth(false);
      console.log(error, "error");
      console.log(userData);
    }
  };

  return login;
}

// マネージャーログイン用のカスタムフック
export function useManagerLogin() {
  const { setAuth, setIsManager, setEmployeeName, setStoreName } =
    useContext(AuthContext);
  const navigate = useNavigate();

  const login = async (userData) => {
    try {
      const response = await baseAxios.post("manager_sign_in", userData);
      console.log(userData);
      if (response.data.status === "create") {
        setAuth(true);
        setIsManager(true);
        setEmployeeName(response.data.employee_name);
        setStoreName(response.data.store_name);
        navigate(`/manager/${response.data.store_number}`);
        console.log(response.data.store_number);
      } else {
        console.log(response.data.message);
        alert(response.data.message);
      }
    } catch (error) {
      setAuth(false);
      setIsManager(false);
      console.log(error, "error");
      console.log(userData);
    }
  };

  return login;
}

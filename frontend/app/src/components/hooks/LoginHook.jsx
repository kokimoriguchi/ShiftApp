import baseAxios from "./Axios";
import { useContext } from "react";
import { AuthContext } from "./Auth";
import { useNavigate } from "react-router-dom";

// ログイン用のカスタムフック
export function useLogin() {
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const login = async (userData) => {
    try {
      const response = await baseAxios.post("sign_in", userData);
      console.log(userData);
      if (response.data.status === "create") {
        setAuth(true);
        navigate("/StaffTop");
        console.log(response);
      } else {
        console.log("error");
      }
    } catch (error) {
      setAuth(false);
      console.log(error);
    }
  };

  return login;
}

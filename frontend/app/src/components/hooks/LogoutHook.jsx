import baseAxios from "./Axios";
import { useContext } from "react";
import { AuthContext } from "./Auth";
import { useNavigate } from "react-router-dom";

export function useLogout() {
  const { setAuth, setIsManager, setEmployeeName, setStoreName } =
    useContext(AuthContext);
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const response = await baseAxios.delete("sign_out");
      console.log("ログアウト");
      if (response.data.status === "logout") {
        console.log(response.data);
        setAuth(false);
        setIsManager(false);
        setEmployeeName("");
        setStoreName("");
        navigate("/");
      } else {
        console.log("error");
        alert(response.data.status);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return logout;
}

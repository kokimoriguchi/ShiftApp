import baseAxios from "./Axios";
import { useNavigate } from "react-router-dom";

export function useManagerCreate() {
  const navigate = useNavigate();

  const managerCreate = async (managerData, storeData) => {
    try {
      const response = await baseAxios.post("managers", {
        manager: managerData,
        store_number: storeData,
      });
      console.log(managerData);
      console.log(storeData);
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

  return managerCreate;
}

import baseAxios from "./Axios";
import { useNavigate } from "react-router-dom";

// 店舗登録用のカスタムフック
export function useStoreCreate() {
  const navigate = useNavigate();

  const storeCreate = async (storeData) => {
    try {
      const response = await baseAxios.post("stores", { store: storeData });
      console.log(storeData);
      console.log(response.data);
      if (response.data.status === "create") {
        navigate(`/manager/${response.data.data.number}/create`);
        console.log(response);
      } else {
        console.log("error");
        alert(response.data.message);
      }
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  };

  return storeCreate;
}

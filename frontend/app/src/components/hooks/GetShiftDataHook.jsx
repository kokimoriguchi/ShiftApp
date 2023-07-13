import baseAxios from "./Axios";
import { useState } from "react";

export function useGetEmployees() {
  const [employees, setEmployees] = useState(null);

  const getEmployees = async (store_number) => {
    try {
      const response = await baseAxios.get("get_employee", {
        params: { store_number },
      });
      // console.log(response.data.data);
      setEmployees(response.data.data);
      console.log(employees);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  return { employees, getEmployees };
}

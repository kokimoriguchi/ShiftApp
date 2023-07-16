import baseAxios from "./Axios";
import { useState } from "react";

export function useGetEmployeeShifts() {
  const [employees, setEmployees] = useState(null);

  const getEmployees = async (store_number, year, month) => {
    try {
      const response = await baseAxios.get("get_shifts_by_month", {
        params: { store_number, year, month },
      });
      const employeesData = response.data.data;
      setEmployees(employeesData);
      return employeesData;
    } catch (error) {
      console.error(error);
    }
  };
  return { employees, getEmployees };
}

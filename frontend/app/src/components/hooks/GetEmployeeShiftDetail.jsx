import baseAxios from "./Axios";

const getEmployeeShiftDetail = async (storeNumber, year, month, name) => {
  try {
    const response = await baseAxios.get(
      `employee_shift_detail/${storeNumber}/${name}/${year}/${month}`
    );
    if (response.data.status === "success") {
      return response.data.employees;
    } else {
      console.error(response.data.message);
    }
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export default getEmployeeShiftDetail;

import baseAxios from "./Axios";

const getEmployeesBelongsToStore = async (storeNumber) => {
  try {
    const response = await baseAxios.get(`get_employees/${storeNumber}`);
    if (response.data.status === "success") {
      console.log(response.data.employees);
      return response.data.employees;
    } else {
      console.error(response.data.message);
    }
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export default getEmployeesBelongsToStore;

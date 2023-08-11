import baseAxios from "./Axios";

const getEmployeeIndexSkills = async (employeeId) => {
  try {
    const response = await baseAxios.get(`employee_index_skills/${employeeId}`);
    if (response.data.status === "success") {
      return response.data.skills;
    } else {
      console.error(response.data.message);
    }
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export default getEmployeeIndexSkills;

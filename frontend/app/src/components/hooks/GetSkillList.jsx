import baseAxios from "./Axios";

const GetSkillList = async (storeNumber) => {
  try {
    const response = await baseAxios.get(`skills/${storeNumber}`);
    if (response.data.status === "success") {
      console.log(response.data.skills);
      return response.data.skills;
    } else {
      console.error(response.data.message);
    }
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export default GetSkillList;

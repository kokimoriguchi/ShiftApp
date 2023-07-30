import baseAxios from "./Axios";

const createSkill = async (skillName, storeNumber) => {
  try {
    const response = await baseAxios.post(`skill_create/${storeNumber}`, {
      name: skillName,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export default createSkill;

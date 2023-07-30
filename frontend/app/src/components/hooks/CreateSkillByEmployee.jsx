import baseAxios from "./Axios";

const CreateSkillByEmployee = async (skills, selectedEmployee, handleClose) => {
  // 呼び出し元で付与したselectedがtrueのidのみを抽出して配列にする
  const selectedSkillIds = skills
    .filter((skill) => skill.selected === true)
    .map((skill) => skill.id);

  // ここでAPIに送信する
  const response = await baseAxios.post(
    `employee_add_skills/${selectedEmployee}`,
    {
      skill_ids: selectedSkillIds,
    }
  );
  console.log(response.data);
  if (response.data.status === "success") {
    console.log(response.data.message);
    handleClose();
    return response.data.message;
  } else {
    console.error(response.data.message);
  }
  return response.data;
};

export default CreateSkillByEmployee;

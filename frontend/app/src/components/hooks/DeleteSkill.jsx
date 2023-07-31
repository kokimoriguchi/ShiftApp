import baseAxios from "./Axios";

const deleteSkill = async (checkSkills) => {
  const skillIds = checkSkills.map((skill) => skill.id);
  try {
    // スキル削除APIを叩く。（deleteメソッド使用する際はボディにデータを入れるべきではない。今回はデータ多くなるのでputで実行する）
    const response = await baseAxios.put("skills/destroy", {
      skill_ids: skillIds,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export default deleteSkill;

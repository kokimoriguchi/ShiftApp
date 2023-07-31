import baseAxios from "./Axios";

const deleteEmployee = async (checkEmployees) => {
  const employeeIds = checkEmployees.map((employee) => employee.id);
  try {
    // 従業員削除APIを叩く。（deleteメソッド使用する際はボディにデータを入れるべきではない。今回はデータ多くなるのでputで実行する）
    const response = await baseAxios.put("employees/destroy", {
      employee_ids: employeeIds,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export default deleteEmployee;

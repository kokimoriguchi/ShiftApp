import baseAxios from "./Axios";

// 従業員登録用のカスタムフック
export function useEmployeeCreate() {
  const employeeCreate = async (employeeData) => {
    try {
      const response = await baseAxios.post("employees", {
        employee: employeeData,
      });
      console.log(employeeData);
      console.log(response.data);
      if (response.data.status === "create") {
        console.log(response);
        alert("登録が完了しました。");
      } else {
        console.log("error");
        alert(response.data.message);
      }
    } catch (error) {
      console.log(error);
      alert("登録に失敗しました。");
    }
  };

  return employeeCreate;
}

import baseAxios from "./Axios";

export const SubmitShift = async (shiftDates) => {
  console.log(shiftDates);
  try {
    const response = await baseAxios.post("employee_shifts", {
      shiftDates: shiftDates,
    });
    if (response.data.status === "create") {
      console.log("シフト提出成功");
      alert("シフト提出成功");
    } else {
      console.log("シフト提出失敗");
      alert("シフト提出失敗");
    }
  } catch (error) {
    console.log(error);
  }
};

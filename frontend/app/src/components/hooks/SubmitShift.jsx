import baseAxios from "./Axios";

export function SubmitShift(shiftDates) {
  const handleClickSetTime = async (shiftDates) => {
    const response = await baseAxios.post("employee_shifts", {
      shift: shiftDates,
    });
    console.log(shiftDates);
    console.log(response.data);
    if (response.data.status === "create") {
      console.log(response);
    } else {
      console.log("error");
      alert(response.data.message);
    }
  };
  return handleClickSetTime;
}

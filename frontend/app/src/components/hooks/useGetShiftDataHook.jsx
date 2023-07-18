import baseAxios from "./Axios";

export async function getShiftData(selectedShiftId) {
  try {
    const response = await baseAxios.get(`get_shift_by_day/${selectedShiftId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

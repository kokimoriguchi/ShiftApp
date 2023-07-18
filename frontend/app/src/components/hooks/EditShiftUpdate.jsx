import baseAxios from "./Axios";

export const EditShiftUpdate = async (
  workId,
  updateStartTime,
  updateEndTime
) => {
  try {
    await baseAxios.put(`update_shift/${workId}`, {
      shift_time: {
        start_time: updateStartTime,
        end_time: updateEndTime,
      },
    });
  } catch (error) {
    console.error(error);
  }
};

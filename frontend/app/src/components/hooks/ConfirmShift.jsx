import baseAxios from "./Axios";

const ConfirmShift = async (storeNumber, year, month) => {
  try {
    const response = await baseAxios.patch(`confirm_shift/${storeNumber}`, {
      year,
      month,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return { status: "error", message: error.message };
  }
};

export default ConfirmShift;

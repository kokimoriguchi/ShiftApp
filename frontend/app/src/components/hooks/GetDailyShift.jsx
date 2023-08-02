import baseAxios from "./Axios";

const getDailyShift = async (storeNumber, date) => {
  try {
    const response = await baseAxios.get(
      `get_daily_calenders/${storeNumber}/${date}`
    );
    if (response.data.status === "success") {
      return response.data.shifts;
    } else {
      console.error(response.data.message);
    }
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export default getDailyShift;

import baseAxios from "./Axios";

export function useGetSubmitMonth(storeNumber) {
  const store_number = storeNumber;
  const getSubmitMonth = async () => {
    try {
      const response = await baseAxios.get("get_submit_month", store_number);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  return getSubmitMonth;
}

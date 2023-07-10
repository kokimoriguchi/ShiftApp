import baseAxios from "./Axios";

export function useGetSubmitMonth() {
  const getSubmitMonth = async () => {
    try {
      const response = await baseAxios.get("get_submit_month");
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  return getSubmitMonth;
}

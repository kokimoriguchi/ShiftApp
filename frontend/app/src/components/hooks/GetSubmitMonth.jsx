import baseAxios from "./Axios";

export function useGetSubmitMonth() {
  const getSubmitMonth = async () => {
    try {
      const response = await baseAxios.get("get_submit_month");
      return response.data;
    } catch (error) {
      console.error("Error occurred while fetching submit month: ", error);
      return { data: [] }; // Return a default object with an empty 'data' property to avoid undefined errors
    }
  };

  return getSubmitMonth;
}

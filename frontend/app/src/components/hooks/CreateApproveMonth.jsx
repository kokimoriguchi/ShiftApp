import baseAxios from "./Axios";

const createApproveMonth = async () => {
  const nextMonth = new Date();
  nextMonth.setMonth(nextMonth.getMonth() + 1);
  const year = nextMonth.getFullYear();
  const month = nextMonth.getMonth() + 1;

  const confirmResult = window.confirm(
    `次の月の${year}年${month}月としてシフトを作成しますか？`
  );

  if (confirmResult) {
    try {
      const response = await baseAxios.post("approve_months", {
        year,
        month,
      });

      if (response.data.status === "success") {
        alert("シフト作成許可が完了しました。");
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error(error);
      alert("シフト作成許可に失敗しました。");
    }
  }
};

export default createApproveMonth;

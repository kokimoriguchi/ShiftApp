export function data() {
  const today = new Date();
  const y = today.getFullYear();
  const m = ("0" + (today.getMonth() + 1)).slice(-2);
  const d = today.getDate();
  return { y, m, d };
}

export function getDaysInMonth(year, month) {
  const date = new Date(year, month - 1, 1);
  const days = [];
  while (date.getMonth() === month - 1) {
    days.push({
      date: new Date(date), // 日付
      day: date.getDay(), // 曜日（0（日曜）から6（土曜）までの数字）
    });
    date.setDate(date.getDate() + 1);
  }
  return days;
}

//1週間の曜日を入れたデータを作成
export const week = ["日", "月", "火", "水", "木", "金", "土"];

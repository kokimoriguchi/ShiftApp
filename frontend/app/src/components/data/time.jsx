export const TimeRow = () => {
  const times = [];
  for (let i = 6; i <= 24; i++) {
    // 06:00 から 24:00 までのループ
    const hour = String(i).padStart(2, "0");
    times.push(`${hour}:00`);
  }
  return (
    <tr className="">
      {times.map((time, index) => (
        <th
          key={index}
          className="border border-slate-300 dark:text-white h-[10px] px-2"
        >
          {time}
        </th>
      ))}
    </tr>
  );
};

export const ShiftRow = ({ startTime, endTime }) => {
  // 日付オブジェクトに変換
  const startHour = new Date(startTime).getUTCHours();
  const endHour = new Date(endTime).getUTCHours();

  const cells = [];
  for (let i = 6; i <= 24; i++) {
    // 1時間ごとのセルを生成
    // startHourとendHourと比較して、その時間帯に勤務しているかを判断
    const isWorking = startHour <= i && i < endHour;
    cells.push(
      <td
        key={i}
        className={`border-b border-dashed border-slate-400 dark:text-white h-[28px] px-2 ${
          isWorking ? "bg-green-300 dark:bg-green-700" : ""
        }`}
      />
    );
  }
  return <tr>{cells}</tr>;
};

import React from "react";

const CalenderRender = ({ days, handleClickDay, renderShiftData }) => {
  let calender = [];
  let weekRows = [];
  let weekNum = 0;

  // 1週目の空白を追加。days[0]はその月の1日の情報が入っていて、その日の曜日をdayとして取得している。
  // 例えば、日曜日なら0、月曜日なら1、火曜日なら2、水曜日なら3、木曜日なら4、金曜日なら5、土曜日なら6が入る。
  // for文で曜日の数字以下の数だけ空白を追加している。
  for (let i = 0; i < days[0].day; i++) {
    weekRows.push(
      <th key={i} className="border border-slate-300">
        &nbsp;
      </th>
    );
  }
  // daysの配列の中身をfor文で回している。
  for (let i = 0; i < days.length; i++) {
    weekRows.push(
      <th
        key={"day" + weekNum + i}
        className="border border-slate-300 hover:text-blue-300 w-auto cursor-pointer text-xs font-bold"
        onClick={() => handleClickDay(days[i].date.getDate())}
      >
        <div className="pb-[5px]">{days[i].date.getDate()}</div>
        <div className="flex flex-col items-center h-[50px] m-auto w-9 justify-center text-xs overflow-hidden">
          {renderShiftData(days[i].date)}
        </div>
      </th>
    );
    // weekRowsの配列の中身が7つになったら、それをひとつとして描画する。その後calenderの配列に追加して、weekRowsを空にする。
    if (weekRows.length === 7) {
      calender.push(<tr key={"week" + weekNum}>{weekRows}</tr>);
      weekRows = [];
      weekNum++;
    }
  }
  //weekRowsの配列の中身が7個になるまで空白を追加する。
  while (weekRows.length < 7) {
    weekRows.push(
      <th
        key={"blank" + weekNum + weekRows.length}
        className="border border-slate-300"
      >
        &nbsp;
      </th>
    );
  }
  //weekRowsの配列の中身が7個揃わず処理がここまできたが0以上の場合はここで最終週として最後に描画する
  if (weekRows.length > 0) {
    calender.push(<tr key={"last" + days.length}>{weekRows}</tr>);
  }
  return calender;
};

export default CalenderRender;

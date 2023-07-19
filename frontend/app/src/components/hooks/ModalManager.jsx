import { useState } from "react";
import { VscError } from "react-icons/vsc";
import { EditShiftUpdate } from "./EditShiftUpdate";

const ModalManager = ({ closeModal, day, startTime, endTime, workId }) => {
  const [updateStartTime, setUpdateStartTime] = useState(formatTime(startTime));
  const [updateEndTime, setUpdateEndTime] = useState(formatTime(endTime));

  //出勤時間の更新する関数の呼び出し
  const handleClickSetTime = () => {
    EditShiftUpdate(workId, updateStartTime, updateEndTime);
    console.log("workId:", workId);
    closeModal();
  };

  const handleStartTimeChange = (event) => {
    setUpdateStartTime(event.target.value);
  };

  const handleEndTimeChange = (event) => {
    setUpdateEndTime(event.target.value);
  };

  //time型で保存されて入るデータを表示用に変換する
  function formatTime(timeString) {
    const date = new Date(timeString);
    const hours = date.getUTCHours().toString().padStart(2, "0");
    const minutes = date.getUTCMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-md sm:w-96 w-4/5 h-80">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{day}</h2>
          <button className="hover:text-blue-300" onClick={closeModal}>
            <VscError />
          </button>
        </div>
        <div className="flex flex-col justify-center items-center">
          <p className="pt-4 pb-6">出勤時間を編集してください</p>
          <div>
            <label>start</label>
            <input
              type="time"
              id="startTime"
              value={updateStartTime}
              onChange={handleStartTimeChange}
            />
          </div>
          <div></div>
          <div className="pt-5">
            <label className="hover:to-blue-300">end</label>
            <input
              type="time"
              id="endTime"
              value={updateEndTime}
              onChange={handleEndTimeChange}
            />
          </div>
          <button
            className="bg-blue-300 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded mt-14"
            onClick={handleClickSetTime}
          >
            set time
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalManager;

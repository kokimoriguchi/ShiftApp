import { useState } from "react";

const Modal = ({ closeModal, day, month, year, setTime }) => {
  const [startTime, setStartTime] = useState("00:00");
  const [endTime, setEndTime] = useState("00:00");

  const handleClickSetTime = () => {
    setTime(day, month, year, startTime, endTime);
    closeModal();
  };

  const handleStartTimeChange = (event) => {
    setStartTime(event.target.value);
  };

  const handleEndTimeChange = (event) => {
    setEndTime(event.target.value);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-md sm:w-96 w-4/5 sm:h-80 h-2/5">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            {year}/{month}/{day}
          </h2>
          <button onClick={closeModal}>✖️</button>
        </div>
        <div className="flex flex-col justify-center items-center">
          <p className="pt-4 pb-6">出勤可能な時間帯を入力してください</p>
          <div>
            <label>start</label>
            <input
              type="time"
              id="time"
              name="予定の時刻"
              value={startTime}
              onChange={handleStartTimeChange}
            />
          </div>
          <div></div>
          <div className="pt-5">
            <label>end</label>
            <input
              type="time"
              id="time"
              name="予定の時刻"
              value={endTime}
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

export default Modal;

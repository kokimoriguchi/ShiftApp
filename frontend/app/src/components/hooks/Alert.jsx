import React, { useEffect, useState } from "react";

const Alert = ({ message, type }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 5000); // 5秒後にアラートを消す

    return () => clearTimeout(timer); // クリーンアップ
  }, []);

  if (!visible) return null;

  const alertTitleColor =
    type === "error"
      ? "bg-red-500 text-white font-bold rounded-t px-4 py-2"
      : "bg-green-500 text-white font-bold rounded-t px-4 py-2";
  const alertTextColor =
    type === "error"
      ? "border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700"
      : "border border-t-0 border-green400 rounded-b bg-green100 px-4 py-3 text-green700";

  return (
    <div role="alert">
      <div class={`${alertTitleColor}`}>{type}</div>
      <div class={`${alertTextColor}`}>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Alert;

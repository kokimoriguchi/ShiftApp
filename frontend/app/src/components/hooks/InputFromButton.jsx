//入力情報を送信する用のボタン
const InputFormButton = ({ type, ButtonName, isValid }) => {
  const buttonClass = isValid
    ? "transition duration-500 ease-in-out dark:border-2 dark:border-white border-2 bg-sky-600 hover:bg-sky-800 transform hover:-translate-y-1 hover:scale-110 text-white font-bold py-2 px-4 rounded-xl"
    : "transition duration-500 ease-in-out dark:border-2 dark:border-white border-2 bg-gray-300 text-white font-bold py-2 px-4 rounded-xl";
  return (
    <div className="sm:flex-none sm:justify-start flex justify-center">
      <button className={buttonClass} type={type}>
        {ButtonName}
      </button>
    </div>
  );
};

export default InputFormButton;

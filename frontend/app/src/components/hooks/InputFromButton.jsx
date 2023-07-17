//入力情報を送信する用のボタン
const InputFormButton = ({ type, ButtonName }) => {
  return (
    <div className="sm:flex-none sm:justify-start flex justify-center">
      <button
        className="transition duration-500 ease-in-out dark:border-2 dark:border-white border-2 bg-sky-600 hover:bg-sky-800 transform hover:-translate-y-1 hover:scale-110 text-white font-bold py-2 px-4 rounded-xl"
        type={type}
      >
        {ButtonName}
      </button>
    </div>
  );
};

export default InputFormButton;

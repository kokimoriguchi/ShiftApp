//フォームの入力部分のコンポーネント
const InputForm = ({ type, name, value, onChange, placeholder }) => {
  return (
    <div className="items-center mb-6">
      <label className="dark:text-white text-gray-500 font-bold text-right mb-1">
        {name}
      </label>
      <input
        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-300"
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default InputForm;

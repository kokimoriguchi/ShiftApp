import { useNavigate } from "react-router-dom";

const NavigateButton = ({ MoveTo, Path }) => {
  const navigate = useNavigate();
  return (
    <div className="hidden sm:flex flex-col justify-center">
      <button
        className="w-40 m-auto text-sky-800 font-extrabold dark:text-sky-300 dark:hover:text-sky-500 hover:-translate-y-1 hover:scale-110 pb-4 transition duration-500 ease-in-out"
        onClick={() => navigate(Path)}
      >
        {MoveTo}
      </button>
    </div>
  );
};

export default NavigateButton;

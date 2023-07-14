import { FadeIn } from "./FadeInHook";
import { useNavigate } from "react-router-dom";

const NavigateButton = ({ MoveTo, Path }) => {
  const navigate = useNavigate();
  return (
    <FadeIn delay={600}>
      <div className="hidden sm:flex flex-col justify-center">
        <button
          className="text-blue-300 hover:text-blue-500 hover:-translate-y-1 hover:scale-110 pb-4 transition duration-500 ease-in-out"
          onClick={() => navigate(Path)}
        >
          {MoveTo}
        </button>
      </div>
    </FadeIn>
  );
};

export default NavigateButton;
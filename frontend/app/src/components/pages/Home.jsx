import { FadeIn } from "../hooks/FadeInHook";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center pt-20 dark:bg-black dark:text-white">
      <FadeIn delay={0}>
        <h1 className="text-3xl font-extrabold">Home</h1>
      </FadeIn>
      <FadeIn delay={100}>
        <h2 className="text-2xl font-bold">
          Welcome to the Store Management System
        </h2>
        <p className="m-auto animate-bounce w-6 h-6 pt-5">⬇︎</p>
      </FadeIn>
      <div className="pt-8">
        <FadeIn delay={200}>
          <button
            className="text-xl font-bold hover:-translate-y-1 hover:scale-110 transition duration-500 ease-in-out pb-3"
            onClick={() => navigate("login")}
          >
            Please login to continue
          </button>
        </FadeIn>
        <FadeIn delay={900}>
          <button
            className="text-xl font-bold hover:-translate-y-1 hover:scale-110 transition duration-500 ease-in-out pb-3"
            onClick={() => navigate("/manager/login")}
          >
            Or login as a manager
          </button>
        </FadeIn>
        <FadeIn delay={1200}>
          <button
            className="text-xl font-bold hover:-translate-y-1 hover:scale-110 transition duration-500 ease-in-out pb-3"
            onClick={() => navigate("store/create")}
          >
            Or create a new store
          </button>
        </FadeIn>
        <FadeIn delay={1500}>
          <button
            className="text-xl font-bold hover:-translate-y-1 hover:scale-110 transition duration-500 ease-in-out pb-3"
            onClick={() => navigate("/employee/create")}
          >
            Or create a new staff
          </button>
        </FadeIn>
      </div>
    </div>
  );
};
export default Home;

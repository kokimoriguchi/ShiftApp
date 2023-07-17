import { FadeIn } from "../hooks/FadeInHook";
import { useNavigate } from "react-router-dom";
import { HomeMoveButton } from "../hooks/HomeMoveButton";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center pt-20 pb-20 dark:bg-black dark:text-white">
      <FadeIn delay={0}>
        <h1 className="text-3xl font-extrabold font-mono">Home</h1>
      </FadeIn>
      <FadeIn delay={100}>
        <h2 className="text-2xl font-bold font-mono">
          Welcome to the Store Management System
        </h2>
        <p className="m-auto animate-bounce w-6 h-6 pt-5">⬇︎</p>
      </FadeIn>
      <div className="pt-8">
        <FadeIn delay={300}>
          <div className="pb-5">
            <HomeMoveButton onClick={() => navigate("login")}>
              スタッフログイン
            </HomeMoveButton>
          </div>
        </FadeIn>
        <FadeIn delay={600}>
          <div className="pb-5">
            <HomeMoveButton onClick={() => navigate("/manager/login")}>
              マネージャーログイン
            </HomeMoveButton>
          </div>
        </FadeIn>
        <FadeIn delay={900}>
          <div className="pb-5">
            <HomeMoveButton onClick={() => navigate("store/create")}>
              新規店舗登録
            </HomeMoveButton>
          </div>
        </FadeIn>
        <FadeIn delay={1200}>
          <HomeMoveButton onClick={() => navigate("/employee/create")}>
            新規スタッフ登録
          </HomeMoveButton>
        </FadeIn>
      </div>
    </div>
  );
};
export default Home;

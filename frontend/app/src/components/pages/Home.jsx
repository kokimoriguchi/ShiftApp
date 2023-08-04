import { FadeIn } from "../hooks/FadeInHook";
import { useNavigate } from "react-router-dom";
import { HomeMoveButton } from "../hooks/HomeMoveButton";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center h-auto sm:pt-16 min-h-[500px] sm:min-h-[650px] bg-sky-100 bg-opacity-95 dark:bg-black dark:text-white">
      <div className="">
        <h1 className="animate-tracking-in-expand duration-1000 tracking-in-expand  md:text-[100px] md:pt-4 pt-8 text-4xl font-bold font-mono">
          ShiftHub
        </h1>
        <p className="animate-tracking-in-expand sm:pt-10 text-base sm:block hidden font-mono">
          ShiftHubは日々のシフト管理をWeb上で完結することのできるサービスです。
        </p>
        <p className="animate-tracking-in-expand text-base font-mono">
          あなたのお店のシフト管理をShiftHubで始めましょう。
        </p>
      </div>
      <div className="pt-5">
        <FadeIn delay={150}>
          <p className="py-3 font-mono text-sm">click login!!</p>
          <p className="m-auto animate-bounce w-6 h-6">⬇︎</p>
        </FadeIn>
        <div className="pt-3">
          <FadeIn delay={300}>
            <div className="pb-5">
              <HomeMoveButton onClick={() => navigate("login")}>
                スタッフログイン
              </HomeMoveButton>
            </div>
          </FadeIn>
          <FadeIn delay={500}>
            <div className="pb-5">
              <HomeMoveButton onClick={() => navigate("/manager/login")}>
                マネージャーログイン
              </HomeMoveButton>
            </div>
          </FadeIn>
          <FadeIn delay={600}>
            <p className="py-3 font-mono text-sm">start new!!</p>
            <p className="m-auto animate-bounce w-6 h-6">⬇︎</p>
            <div className="pb-5 pt-2">
              <HomeMoveButton
                onClick={() => navigate("store/create")}
                reverseColor={true}
              >
                新規店舗登録
              </HomeMoveButton>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
};
export default Home;

import { FadeIn } from "../hooks/FadeInHook";
import { useNavigate } from "react-router-dom";
import { HomeMoveButton } from "../hooks/HomeMoveButton";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center text-center h-auto sm:pt-16 min-h-[500px] sm:min-h-[650px] bg-sky-100 dark:bg-black dark:text-white">
      <div className="sm:pt-8">
        <div className="">
          <h1 className="animate-tracking-in-expand duration-1000 tracking-in-expand  md:text-[100px] md:pt-4 pt-8 text-4xl font-bold font-mono">
            ShiftHub
          </h1>
          <p className="animate-tracking-in-expand sm:pt-10 text-base sm:block hidden font-mono">
            ShiftHubは日々のシフト管理をWeb上で完結することのできるサービスです。
          </p>
          <p className="animate-tracking-in-expand sm:text-base text-sm font-mono">
            あなたのお店のシフト管理をShiftHubで始めましょう。
          </p>
        </div>
        <div className="flex pt-8 sm:pt-16 text-center sm:justify-between sm:flex-row flex-col">
          <div>
            <FadeIn delay={150}>
              <p className="font-mono text-base font-bold">click login!!</p>
              <p className="pt-3 m-auto animate-bounce w-6 h-6">⬇︎</p>
            </FadeIn>
            <FadeIn delay={300}>
              <div className="mt-7">
                <HomeMoveButton onClick={() => navigate("login")}>
                  スタッフログイン
                </HomeMoveButton>
              </div>
            </FadeIn>
            <FadeIn delay={500}>
              <div className="pt-8">
                <HomeMoveButton onClick={() => navigate("/manager/login")}>
                  マネージャーログイン
                </HomeMoveButton>
              </div>
            </FadeIn>
          </div>
          <div className="sm:py-0 py-6 ">
            <FadeIn delay={150}>
              <p className="font-mono text-base font-bold">start new!!</p>
              <p className="pt-3 m-auto animate-bounce w-6 h-6">⬇︎</p>
            </FadeIn>
            <FadeIn delay={300}>
              <div className="mt-7">
                <HomeMoveButton
                  onClick={() => navigate("store/create")}
                  reverseColor={true}
                >
                  新規店舗登録
                </HomeMoveButton>
              </div>
            </FadeIn>
            <FadeIn delay={500}>
              <div className="pt-8">
                <HomeMoveButton
                  onClick={() => navigate("/terms")}
                  reverseColor={true}
                >
                  利用規約
                </HomeMoveButton>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
      <div className="pb-24 lg:flex hidden dark:opacity-90">
        <div class="relative top-12 z-10 overflow-hidden md:left-16 md:top-16 lg:ml-0">
          <img
            src="/images/23987333.jpg"
            alt="topImage"
            className="h-[450px] w-[300px] object-cover object-center animate-text-focus-in"
          />
        </div>

        <div class="overflow-hidden">
          <img
            src="/images/24182857.jpg"
            alt="topImage"
            className="h-[450px] w-[300px] object-cover object-center animate-text-focus-in"
          />
        </div>
      </div>
    </div>
  );
};
export default Home;

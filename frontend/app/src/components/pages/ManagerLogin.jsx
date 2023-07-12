import { useRef } from "react";
import { useManagerLogin } from "../hooks/LoginHook";
import { useNavigate } from "react-router-dom";
import { FadeIn } from "../hooks/FadeInHook";

const ManagerLogin = () => {
  const staffNumberRef = useRef(null);
  const passwordRef = useRef(null);
  const login = useManagerLogin();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      number: staffNumberRef.current.value,
      password: passwordRef.current.value,
    };
    await login(userData);
    staffNumberRef.current.value = "";
    passwordRef.current.value = "";
  };

  return (
    <div className="pt-10">
      <FadeIn delay={50}>
        <div className="text-center text-gray-500 font-bold mb-5 text-3xl">
          <h1>Manager Login</h1>
        </div>
      </FadeIn>
      <div className="flex justify-center">
        <form className="w-full md:max-w-md sm:max-w-sm max-w-xs">
          <FadeIn delay={100}>
            <div className="items-center mb-6">
              <div className="">
                <label className="text-gray-500 font-bold text-right mb-1">
                  StaffNumber
                </label>
              </div>
              <div className="">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-300"
                  type="text"
                  placeholder="StaffNumber"
                  ref={staffNumberRef}
                />
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={200}>
            <div className="items-center mb-6">
              <div className="">
                <label className="text-gray-500 font-bold text-right mb-1">
                  Password
                </label>
              </div>
              <div className="">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-300"
                  type="password"
                  placeholder="******************"
                  ref={passwordRef}
                />
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={300}>
            <div className="">
              <div className="">
                <button
                  className="transition duration-500 ease-in-out bg-blue-500 hover:bg-blue-700 transform hover:-translate-y-1 hover:scale-110 ... text-white font-bold py-2 px-4 rounded-xl"
                  onClick={handleSubmit}
                >
                  Login
                </button>
              </div>
            </div>
          </FadeIn>
        </form>
      </div>
      <FadeIn delay={400}>
        <div>
          <div className="pt-20 hidden sm:flex flex-col justify-center">
            <button
              className="text-blue-300 hover:text-blue-500 hover:-translate-y-1 hover:scale-110 transition duration-500 ease-in-out pb-4"
              onClick={() => navigate("/login")}
            >
              Login as Staff
            </button>
            <button
              className="text-blue-300 hover:text-blue-500 hover:-translate-y-1 hover:scale-110 transition duration-500 ease-in-out"
              onClick={() => navigate("/")}
            >
              Back to Top
            </button>
          </div>
        </div>
      </FadeIn>
    </div>
  );
};
export default ManagerLogin;

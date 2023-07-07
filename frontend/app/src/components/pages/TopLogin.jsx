import { useRef } from "react";
import { useLogin } from "../hooks/LoginHook";

const TopLogin = () => {
  const staffNumberRef = useRef(null);
  const passwordRef = useRef(null);
  const login = useLogin();

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
    <div className="pt-40">
      <div className="text-center text-gray-500 font-bold mb-5 text-3xl">
        <h1>login</h1>
      </div>
      <div className="flex justify-center">
        <form className="w-full md:max-w-md sm:max-w-sm max-w-xs">
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
          <div className="">
            <div className="">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleSubmit}
              >
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default TopLogin;

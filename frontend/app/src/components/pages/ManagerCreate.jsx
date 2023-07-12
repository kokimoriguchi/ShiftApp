import { useRef } from "react";
import { useManagerCreate } from "../hooks/ManagerCreateHook";
import { useNavigate } from "react-router-dom";
import { FadeIn } from "../hooks/FadeInHook";

const ManagerCreate = () => {
  const managerNameRef = useRef(null);
  const managerNumberRef = useRef(null);
  const managerPasswordRef = useRef(null);
  const storeNumberRef = useRef(null);
  const managerCreate = useManagerCreate();
  const navigate = useNavigate();

  const handleCreateManager = async (e) => {
    e.preventDefault();
    const managerData = {
      name: managerNameRef.current.value,
      number: managerNumberRef.current.value,
      password: managerPasswordRef.current.value,
    };
    const store_number = storeNumberRef.current.value;
    console.log(managerData, store_number);
    await managerCreate(managerData, store_number);
    managerNameRef.current.value = "";
    managerNumberRef.current.value = "";
    managerPasswordRef.current.value = "";
    storeNumberRef.current.value = "";
  };

  return (
    <div className="pt-10">
      <FadeIn delay={50}>
        <div className="text-center text-gray-500 font-bold mb-5 text-3xl">
          <h1>New Manager</h1>
        </div>
      </FadeIn>
      <div className="flex justify-center">
        <form className="w-full md:max-w-md sm:max-w-sm max-w-xs">
          <FadeIn delay={100}>
            <div className="items-center mb-6">
              <div className="">
                <label className="text-gray-500 font-bold text-right mb-1">
                  ManagerName
                </label>
              </div>
              <div className="">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-300"
                  type="text"
                  placeholder="ManagerName"
                  ref={managerNameRef}
                />
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={200}>
            <div className="items-center mb-6">
              <div className="">
                <label className="text-gray-500 font-bold text-right mb-1">
                  ManagerNumber
                </label>
              </div>
              <div className="">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-300"
                  type="text"
                  placeholder="ManagerNumber"
                  ref={managerNumberRef}
                />
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={300}>
            <div className="items-center mb-6">
              <div className="">
                <label className="text-gray-500 font-bold text-right mb-1">
                  ManagerPassword
                </label>
              </div>
              <div className="">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-300"
                  type="password"
                  placeholder="******************"
                  ref={managerPasswordRef}
                />
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={400}>
            <div className="items-center mb-6">
              <div className="">
                <label className="text-gray-500 font-bold text-right mb-1">
                  Belongs to the store number
                </label>
              </div>
              <div className="">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-300"
                  type="storeNumber"
                  placeholder="StoreName"
                  ref={storeNumberRef}
                />
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={500}>
            <div className="">
              <div className="">
                <button
                  className="transition duration-500 ease-in-out bg-blue-500 hover:bg-blue-700 transform hover:-translate-y-1 hover:scale-110 text-white font-bold py-2 px-4 rounded-xl"
                  onClick={handleCreateManager}
                >
                  Create
                </button>
              </div>
            </div>
          </FadeIn>
        </form>
      </div>
      <FadeIn delay={600}>
        <div>
          <div className="pt-10 hidden sm:flex flex-col justify-center">
            <button
              className="text-blue-300 hover:text-blue-500 hover:-translate-y-1 hover:scale-110 pb-4 transition duration-500 ease-in-out"
              onClick={() => navigate("/login")}
            >
              Move to Login
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

export default ManagerCreate;

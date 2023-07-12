import { useRef } from "react";
import { useEmployeeCreate } from "../hooks/EmployeeCreateHook";
import { useNavigate } from "react-router-dom";
import { FadeIn } from "../hooks/FadeInHook";

const EmployeeCreate = () => {
  const employeeNameRef = useRef(null);
  const employeeNumberRef = useRef(null);
  const employeePasswordRef = useRef(null);
  const storeNumberRef = useRef(null);
  const employeeCreate = useEmployeeCreate();
  const navigate = useNavigate();

  const handleCreateEmployee = async (e) => {
    e.preventDefault();
    const employeeData = {
      name: employeeNameRef.current.value,
      number: employeeNumberRef.current.value,
      password: employeePasswordRef.current.value,
      store_number: storeNumberRef.current.value,
    };
    console.log(employeeData);
    await employeeCreate(employeeData);
    employeeNameRef.current.value = "";
    employeeNumberRef.current.value = "";
    employeePasswordRef.current.value = "";
  };

  return (
    <div className="pt-10">
      <FadeIn delay={50}>
        <div className="text-center text-gray-500 font-bold mb-5 text-3xl">
          <h1>New Staff</h1>
        </div>
      </FadeIn>
      <div className="flex justify-center">
        <form className="w-full md:max-w-md sm:max-w-sm max-w-xs">
          <FadeIn delay={100}>
            <div className="items-center mb-6">
              <div className="">
                <label className="text-gray-500 font-bold text-right mb-1">
                  StaffName
                </label>
              </div>
              <div className="">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-300"
                  type="text"
                  placeholder="StaffName"
                  ref={employeeNameRef}
                />
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={200}>
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
                  ref={employeeNumberRef}
                />
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={300}>
            <div className="items-center mb-6">
              <div className="">
                <label className="text-gray-500 font-bold text-right mb-1">
                  StaffPassword
                </label>
              </div>
              <div className="">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-300"
                  type="password"
                  placeholder="******************"
                  ref={employeePasswordRef}
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
                  placeholder="StoreNumber"
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
                  onClick={handleCreateEmployee}
                >
                  Create
                </button>
              </div>
            </div>
          </FadeIn>
        </form>
      </div>
      <FadeIn delay={600}>
        <div className="">
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

export default EmployeeCreate;

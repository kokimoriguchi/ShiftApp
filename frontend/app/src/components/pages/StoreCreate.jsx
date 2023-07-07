import { useRef } from "react";
import { useStoreCreate } from "../hooks/StoreCreateHook";

const StoreCreate = () => {
  const storeNameRef = useRef(null);
  const storeNumberRef = useRef(null);
  const storePasswordRef = useRef(null);
  const storeCreate = useStoreCreate();

  const handleCreateStore = async (e) => {
    e.preventDefault();
    const storeData = {
      name: storeNameRef.current.value,
      number: storeNumberRef.current.value,
      password: storePasswordRef.current.value,
    };
    await storeCreate(storeData);
    storeNameRef.current.value = "";
    storeNumberRef.current.value = "";
    storePasswordRef.current.value = "";
  };

  return (
    <div className="pt-40">
      <div className="text-center text-gray-500 font-bold mb-5 text-3xl">
        <h1>New Store</h1>
      </div>
      <div className="flex justify-center">
        <form className="w-full md:max-w-md sm:max-w-sm max-w-xs">
          <div className="items-center mb-6">
            <div className="">
              <label className="text-gray-500 font-bold text-right mb-1">
                StoreName
              </label>
            </div>
            <div className="">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-300"
                type="text"
                placeholder="StaffName"
                ref={storeNameRef}
              />
            </div>
          </div>
          <div className="items-center mb-6">
            <div className="">
              <label className="text-gray-500 font-bold text-right mb-1">
                StoreNumber
              </label>
            </div>
            <div className="">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-300"
                type="text"
                placeholder="StoreNumber"
                ref={storeNumberRef}
              />
            </div>
          </div>
          <div className="items-center mb-6">
            <div className="">
              <label className="text-gray-500 font-bold text-right mb-1">
                StorePassword
              </label>
            </div>
            <div className="">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-300"
                type="password"
                placeholder="StorePassword"
                ref={storePasswordRef}
              />
            </div>
          </div>
          <div className="">
            <div className="">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleCreateStore}
              >
                Create
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StoreCreate;

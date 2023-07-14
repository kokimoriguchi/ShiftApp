import { FadeIn } from "./FadeInHook";

const HandleCreateFormPage = ({ form, onChange, onSubmit, title }) => {
  return (
    <div>
      <FadeIn delay={50}>
        <div className="text-center text-gray-500 font-bold mb-5 text-3xl">
          <h1>{title}</h1>
        </div>
      </FadeIn>
      <div className="flex justify-center">
        <form
          className="w-full md:max-w-md sm:max-w-sm max-w-xs"
          onSubmit={onSubmit}
        >
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
                  name="employeeName"
                  value={form.employeeName}
                  onChange={onChange}
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
                  name="employeeNumber"
                  value={form.employeeNumber}
                  onChange={onChange}
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
                  name="employeePassword"
                  value={form.employeePassword}
                  onChange={onChange}
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
                  type="text"
                  placeholder="StoreNumber"
                  name="storeNumber"
                  value={form.storeNumber}
                  onChange={onChange}
                />
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={500}>
            <div className="">
              <div className="">
                <button
                  className="transition duration-500 ease-in-out bg-blue-500 hover:bg-blue-700 transform hover:-translate-y-1 hover:scale-110 text-white font-bold py-2 px-4 rounded-xl"
                  type="submit"
                >
                  Create
                </button>
              </div>
            </div>
          </FadeIn>
        </form>
      </div>
    </div>
  );
};

export default HandleCreateFormPage;

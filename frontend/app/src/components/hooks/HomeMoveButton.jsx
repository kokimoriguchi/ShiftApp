import { HiOutlineArrowRight } from "react-icons/hi";

export const HomeMoveButton = ({ onClick, children }) => {
  return (
    <div
      className=" relative inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium transition duration-300 ease-out border-2 border-sky-800 rounded-full shadow-md group cursor-pointer w-64"
      onClick={onClick}
    >
      <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-sky-800 group-hover:translate-x-0 ease">
        <HiOutlineArrowRight className="font-bold text-2xl" />
      </span>
      <span className="text-sm font-extrabold absolute flex items-center justify-center w-full h-full dark:text-white text-sky-800 transition-all duration-300 transform group-hover:translate-x-full ease">
        {children}
      </span>
      <span className="relative invisible">{children}</span>
    </div>
  );
};

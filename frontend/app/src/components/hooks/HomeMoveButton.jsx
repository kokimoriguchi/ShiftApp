import { HiOutlineArrowRight } from "react-icons/hi";

export const HomeMoveButton = ({ onClick, children, reverseColor }) => {
  return (
    <div
      className={`${
        reverseColor
          ? "border-sky-900 bg-sky-800 dark:border-sky-900"
          : "border-sky-800 "
      } relative inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium transition duration-300 ease-out border-2 rounded-full shadow-md group cursor-pointer w-64`}
      onClick={onClick}
    >
      <span
        className={`${
          reverseColor ? "bg-white dark:bg-sky-900" : "bg-sky-800 text-white "
        } absolute inset-0 duration-300 flex items-center justify-center w-full h-full  -translate-x-full group-hover:translate-x-0 ease`}
      >
        <HiOutlineArrowRight className="font-bold text-2xl" />
      </span>
      <span
        className={`${
          reverseColor
            ? "text-white dark:text-white"
            : "text-sky-800 dark:text-white"
        } text-sm font-extrabold absolute flex items-center justify-center w-full h-full transition-all duration-300 transform group-hover:translate-x-full ease`}
      >
        {children}
      </span>
      <span className="relative invisible">{children}</span>
    </div>
  );
};

import { AiOutlineHome, AiOutlineLogin } from "react-icons/ai";
import { BsPersonFillAdd } from "react-icons/bs";
import { IoCreateSharp } from "react-icons/io5";

const icons = {
  home: AiOutlineHome,
  login: AiOutlineLogin,
  createUser: BsPersonFillAdd,
  createStore: IoCreateSharp,
};

export const HeaderMoveButton = ({ type, onClick, children }) => {
  const Icon = icons[type];
  return (
    <li
      onClick={onClick}
      className="flex flex-row dark:text-white dark:hover:text-gray-500 cursor-pointer hover:text-white pb-3"
    >
      <Icon />
      {children}
    </li>
  );
};

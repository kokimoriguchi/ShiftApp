import { AiOutlineHome, AiOutlineLogin } from "react-icons/ai";
import { BsPersonFillAdd } from "react-icons/bs";
import { IoCreateSharp } from "react-icons/io5";
import { AiOutlineLogout } from "react-icons/ai";
import { RiCalendar2Fill, RiCalendarCheckFill } from "react-icons/ri";

const icons = {
  home: AiOutlineHome,
  login: AiOutlineLogin,
  logout: AiOutlineLogout,
  createUser: BsPersonFillAdd,
  createStore: IoCreateSharp,
  calender: RiCalendar2Fill,
  calenderCheck: RiCalendarCheckFill,
};

export const HeaderMoveButton = ({ type, onClick, children }) => {
  const Icon = icons[type];
  return (
    <div
      onClick={onClick}
      className="flex flex-row font-extrabold dark:text-white dark:hover:text-sky-500 cursor-pointer hover:text-white pb-3"
    >
      <Icon className="mt-1" />
      {children}
    </div>
  );
};

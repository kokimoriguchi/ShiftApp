import { AiOutlineHome, AiOutlineLogin } from "react-icons/ai";
import { IoCreateSharp } from "react-icons/io5";
import { AiOutlineLogout } from "react-icons/ai";
import { RiCalendar2Fill, RiCalendarCheckFill } from "react-icons/ri";
import { PiUsersThreeBold, PiUserPlusBold } from "react-icons/pi";

const icons = {
  home: AiOutlineHome,
  login: AiOutlineLogin,
  logout: AiOutlineLogout,
  createStore: IoCreateSharp,
  calender: RiCalendar2Fill,
  calenderCheck: RiCalendarCheckFill,
  employees: PiUsersThreeBold,
  createUser: PiUserPlusBold,
};

export const HeaderMoveButton = ({ type, onClick, children }) => {
  const Icon = icons[type];
  return (
    <div
      onClick={onClick}
      className="flex flex-row font-extrabold dark:text-white text-sky-100 dark:hover:text-sky-500 cursor-pointer hover:text-sky-400 pb-3"
    >
      <Icon className="mt-1" />
      {children}
    </div>
  );
};

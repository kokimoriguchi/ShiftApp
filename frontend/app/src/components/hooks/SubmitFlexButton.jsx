import { HiSave } from "react-icons/hi";
import { TbSend, TbTrash } from "react-icons/tb";
import { RiArrowGoBackFill } from "react-icons/ri";

const icons = {
  save: HiSave,
  send: TbSend,
  trash: TbTrash,
  back: RiArrowGoBackFill,
};

export const SubmitFlexButton = ({ type, onClick, children }) => {
  const Icon = icons[type];
  return (
    <div className="inline-flex items-center rounded-full p-1 bg-zinc-400 text-white group transition-all duration-100 hover:ring-1 dark:hover:ring-sky-800 hover:ring-sky-300 dark:hover:bg-sky-800 hover:bg-sky-300 hover:ring-offset-1 hover:outline-none">
      <Icon />
      <button
        className="whitespace-nowrap inline-block text-sm max-w-0 overflow-hidden transition-all duration-300 sm:max-w-screen-2xl group-hover:max-w-screen-2xl group-hover:scale-100 group-hover:px-2"
        onClick={onClick}
      >
        {children}
      </button>
    </div>
  );
};

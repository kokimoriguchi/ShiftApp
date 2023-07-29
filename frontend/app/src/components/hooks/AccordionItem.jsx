import React, { useState } from "react";
import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";

const AccordionItem = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-64">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer py-2 px-3 border-b border-black dark:border-white font-mono"
      >
        <div className="flex justify-between ">
          <span>{title}</span>
          {!isOpen ? <BiSolidDownArrow /> : <BiSolidUpArrow />}
        </div>
      </div>
      {isOpen && (
        <div className="py-2 px-3 flex flex-col justify-center items-center">
          {children}
        </div>
      )}
    </div>
  );
};

export default AccordionItem;

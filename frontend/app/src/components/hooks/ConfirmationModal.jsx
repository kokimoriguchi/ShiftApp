import { VscError } from "react-icons/vsc";
import { HomeMoveButton } from "./HomeMoveButton";

const ConfirmationModal = ({
  text,
  year,
  month,
  closeModal,
  button,
  number,
  handle,
  children,
}) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 dark:bg-black dark:text-white bg-white p-4 rounded-md sm:w-96 w-4/5 h-80">
        <div className="flex justify-end mb-4">
          <button
            className="hover:text-blue-300 dark:hover:text-sky-800"
            onClick={closeModal}
          >
            <VscError />
          </button>
        </div>
        <div>
          <h2 className="text-xl font-bold font-mono text-center">
            Store {number}
          </h2>
          <h2 className="text-xl font-bold font-mono text-center pt-4">
            {children ? children : `${year}/${month}`}
          </h2>
        </div>
        <div className="flex flex-col justify-center items-center">
          <p className="py-4 font-bold">{text}</p>
        </div>
        <div className="flex justify-center pt-5">
          <HomeMoveButton onClick={handle}>{button}</HomeMoveButton>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;

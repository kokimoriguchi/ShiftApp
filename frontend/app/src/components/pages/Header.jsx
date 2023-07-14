import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DarkModeButton from "../hooks/DarkModeButton";

const Header = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [sideOpen, setSideOpen] = useState(false);
  const navigate = useNavigate();

  const handleClickMenu = () => {
    setOpenMenu((prevOpenMenu) => {
      return !prevOpenMenu;
    });
  };

  const handleClickSide = () => {
    setSideOpen((prevSideOpen) => {
      return !prevSideOpen;
    });
  };

  const handleMenuItemClick = (path) => {
    navigate(path);
    handleClickMenu();
    handleClickSide();
  };

  return (
    <div className="top-0 z-50 mt-2">
      <div className="flex text-black sticky top-0 z-50 max-w-screen-2xl">
        <nav className="flex items-center justify-end container mx-auto py-4">
          <button
            onClick={() => {
              handleClickMenu();
              handleClickSide();
            }}
            className="flex-initial z-10 space-y-2 p-4 "
          >
            {openMenu ? (
              <div className="relative w-6 h-5 z-20">
                <div className="absolute w-6 h-px bg-black transform transition-all duration-500 rotate-45 top-1/2"></div>
                <div className="absolute w-6 h-px bg-black transform transition-all duration-500 -rotate-45 top-1/2"></div>
                <div className="absolute w-6 h-px bg-transparent top-1/2"></div>
              </div>
            ) : (
              <div className="h-5">
                <div className="w-6 h-0.5 bg-black transition-all duration-500 mb-2"></div>
                <div className="w-6 h-0.5 bg-black transition-all duration-500 mb-2"></div>
                <div className="w-6 h-0.5 bg-black transition-all duration-500"></div>
              </div>
            )}
          </button>

          <div>
            <div
              className={`fixed right-0 top-0 h-full w-64 transition-transform duration-500 ease-in-out transform ${
                sideOpen ? "translate-x-0" : "translate-x-full"
              }`}
            >
              <div className="z-50 mx-auto h-2/5 bg-gray-200 bg-opacity-80">
                <ul className="pt-20 text-center">
                  <li
                    className="font-semibold text-gray-800 hover:text-gray-300 mb-1 hover:cursor-pointer"
                    onClick={() => handleMenuItemClick("/")}
                  >
                    Home
                  </li>
                  <li
                    className="font-semibold text-gray-800 hover:text-gray-300 mb-1 hover:cursor-pointer"
                    onClick={() => handleMenuItemClick("/login")}
                  >
                    Login
                  </li>
                  <li
                    className="font-semibold text-gray-800 hover:text-gray-300 mb-1 hover:cursor-pointer"
                    onClick={() => handleMenuItemClick("manager/login")}
                  >
                    Login Manager
                  </li>
                  <li
                    className="font-semibold text-gray-800 hover:text-gray-300 mb-1 hover:cursor-pointer"
                    onClick={() => handleMenuItemClick("employee/create")}
                  >
                    Create Staff
                  </li>
                  <li
                    className="font-semibold text-gray-800 hover:text-gray-300 hover:cursor-pointer"
                    onClick={() => handleMenuItemClick("store/create")}
                  >
                    Create Store
                  </li>
                </ul>
                <div className="flex justify-center pt-5">
                  <DarkModeButton />
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
      <div className="w-full h-0.5 dark:bg-white bg-gray-500 mb-5 z-[-1]"></div>
    </div>
  );
};

export default Header;

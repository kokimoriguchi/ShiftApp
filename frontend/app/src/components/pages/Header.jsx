import { useState } from "react";
import { useNavigate } from "react-router-dom";

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

  return (
    <div className="sticky top-0 z-50 mt-8 mb-20">
      <div className="flex text-black sticky top-0 z-50 max-w-screen-2xl">
        <nav className="flex items-center justify-end container mx-auto py-4">
          <button
            onClick={() => {
              handleClickMenu();
              handleClickSide();
            }}
            className="flex-initial z-10 space-y-2 max-sm:p-4 "
          >
            {openMenu ? (
              <div className="relative w-6 h-px z-20">
                <div className="absolute w-6 h-px bg-black transform transition-all duration-500 rotate-45 top-1/2"></div>
                <div className="absolute w-6 h-px bg-black transform transition-all duration-500 -rotate-45 top-1/2"></div>
              </div>
            ) : (
              <div>
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
                <ul className="pt-20">
                  <li
                    className="font-semibold text-gray-800 hover:text-gray-300 mb-1"
                    onClick={() => navigate("/")}
                  >
                    Home
                  </li>
                  <li
                    className="font-semibold text-gray-800 hover:text-gray-300 mb-1"
                    onClick={() => navigate("/login")}
                  >
                    Login
                  </li>
                  <li
                    className="font-semibold text-gray-800 hover:text-gray-300 mb-1"
                    onClick={() => navigate("employee-create")}
                  >
                    Create Staff
                  </li>
                  <li
                    className="font-semibold text-gray-800 hover:text-gray-300"
                    onClick={() => navigate("store-create")}
                  >
                    Create Store
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Header;

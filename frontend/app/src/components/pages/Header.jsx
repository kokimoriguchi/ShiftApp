import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { HeaderMoveButton } from "../hooks/HeaderMoveButton";
import DarkModeButton from "../hooks/DarkModeButton";
import { AuthContext } from "../hooks/Auth";

const Header = () => {
  const { auth, employeeName, storeName } = useContext(AuthContext);
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
    <div className="dark:bg-black">
      <div className="flex justify-between pt-4 px-8">
        <div className="h-full text-center">
          <p className="font-mono text-2xl dark:text-white">
            {auth ? `${storeName}店:${employeeName}` : `Shift-App`}
          </p>
        </div>

        <div className="z-50 ">
          <div className="flex text-black sticky top-0 z-50 max-w-screen-2xl">
            <nav className="flex items-center justify-end container mx-auto ">
              <button
                onClick={() => {
                  handleClickMenu();
                  handleClickSide();
                }}
                className="flex-initial z-10 space-y-2 pb-6 "
              >
                {openMenu ? (
                  <div className="relative w-6 h-5 z-20">
                    <div className="absolute w-6 h-px bg-black dark:bg-white transform transition-all duration-500 rotate-45 top-1/2"></div>
                    <div className="absolute w-6 h-px bg-black dark:bg-white transform transition-all duration-500 -rotate-45 top-1/2"></div>
                    <div className="absolute w-6 h-px bg-transparent top-1/2"></div>
                  </div>
                ) : (
                  <div className="h-5">
                    <div className="w-6 h-0.5 bg-black dark:bg-white transition-all duration-500 mb-2"></div>
                    <div className="w-6 h-0.5 bg-black dark:bg-white transition-all duration-500 mb-2"></div>
                    <div className="w-6 h-0.5 bg-black dark:bg-white transition-all duration-500"></div>
                  </div>
                )}
              </button>

              <div>
                <div
                  className={`fixed right-0 top-0 h-full sm:w-64 w-full transition-transform duration-500 ease-in-out transform ${
                    sideOpen ? "translate-x-0" : "translate-x-full"
                  }`}
                >
                  <div className="z-50 mx-auto h-full bg-sky-500 dark:bg-black sm:dark:bg-opacity-80 sm:bg-opacity-80">
                    <ul className="pt-28 flex flex-col items-center justify-center">
                      <li className="pb-5 text-white font-mono font-extrabold">
                        MENU
                      </li>
                      <HeaderMoveButton
                        type="home"
                        onClick={() => handleMenuItemClick("/")}
                      >
                        ホーム
                      </HeaderMoveButton>
                      <HeaderMoveButton
                        type="login"
                        onClick={() => handleMenuItemClick("login")}
                      >
                        スタッフログイン
                      </HeaderMoveButton>
                      <HeaderMoveButton
                        type="login"
                        onClick={() => handleMenuItemClick("manager/login")}
                      >
                        マネージャーログイン
                      </HeaderMoveButton>
                      <HeaderMoveButton
                        type="createUser"
                        onClick={() => handleMenuItemClick("/employee/create")}
                      >
                        スタッフ新規作成
                      </HeaderMoveButton>
                      <HeaderMoveButton
                        type="createStore"
                        onClick={() => handleMenuItemClick("/store/create")}
                      >
                        店舗新規作成
                      </HeaderMoveButton>
                    </ul>
                    <div className="flex justify-center pt-5">
                      <DarkModeButton />
                    </div>
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
      <div className="w-full h-0.5 dark:bg-white bg-gray-500 z-[-1]"></div>
    </div>
  );
};

export default Header;

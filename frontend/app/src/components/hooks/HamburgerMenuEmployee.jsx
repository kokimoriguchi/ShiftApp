import { HeaderMoveButton } from "../hooks/HeaderMoveButton";
import DarkModeButton from "../hooks/DarkModeButton";
import { useLogout } from "../hooks/LogoutHook";
import { AuthContext } from "./Auth";
import { useContext } from "react";

const HamburgerMenuEmployee = ({ handleMenuItemClick }) => {
  const logout = useLogout();
  const { contextStoreNumber } = useContext(AuthContext);

  const handleClickLogout = () => {
    logout();
    console.log("done");
  };

  return (
    <ul className="pt-28 flex flex-col justify-left">
      <li className="pb-5 text-white font-mono font-extrabold">MENU</li>
      <li className="pt-1">
        <HeaderMoveButton
          type="home"
          onClick={() => handleMenuItemClick(`/staff/${contextStoreNumber}`)}
        >
          トップページ
        </HeaderMoveButton>
      </li>
      <li>
        <HeaderMoveButton
          type="calender"
          onClick={() =>
            handleMenuItemClick(`/staff/${contextStoreNumber}/calender/submit`)
          }
        >
          シフト提出
        </HeaderMoveButton>
      </li>
      <li className="pt-1">
        <HeaderMoveButton type="logout" onClick={handleClickLogout}>
          ログアウト
        </HeaderMoveButton>
      </li>
      <li className="pt-5">
        <DarkModeButton />
      </li>
    </ul>
  );
};

export default HamburgerMenuEmployee;

import { HeaderMoveButton } from "../hooks/HeaderMoveButton";
import DarkModeButton from "../hooks/DarkModeButton";
import { useLogout } from "../hooks/LogoutHook";
import { AuthContext } from "./Auth";
import { useContext } from "react";

const HamburgerMenuManager = ({ handleMenuItemClick }) => {
  const logout = useLogout();
  const { contextStoreNumber } = useContext(AuthContext);

  const handleClickLogout = () => {
    logout();
  };

  return (
    <ul className="pt-28 flex flex-col justify-left">
      <li className="pb-5 text-white font-mono font-extrabold">MENU</li>
      <li className="pb-1">
        <HeaderMoveButton
          type="home"
          onClick={() => handleMenuItemClick(`/manager/${contextStoreNumber}`)}
        >
          トップページ
        </HeaderMoveButton>
      </li>
      <li className="pb-1">
        <HeaderMoveButton
          type="calender"
          onClick={() =>
            handleMenuItemClick(`/manager/${contextStoreNumber}/edit`)
          }
        >
          シフト編集
        </HeaderMoveButton>
      </li>
      <li className="pb-1">
        <HeaderMoveButton
          type="employees"
          onClick={() =>
            handleMenuItemClick(`/manager/${contextStoreNumber}/index/employee`)
          }
        >
          スタッフ一覧
        </HeaderMoveButton>
      </li>
      <li className="pb-1">
        <HeaderMoveButton
          type="createUser"
          onClick={() =>
            handleMenuItemClick(
              `/manager/${contextStoreNumber}/create/employee`
            )
          }
        >
          スタッフ新規作成
        </HeaderMoveButton>
      </li>
      <li className="pb-1">
        <HeaderMoveButton type="logout" onClick={handleClickLogout}>
          ログアウト
        </HeaderMoveButton>
      </li>
      <li className="pb-1">
        <DarkModeButton />
      </li>
    </ul>
  );
};

export default HamburgerMenuManager;

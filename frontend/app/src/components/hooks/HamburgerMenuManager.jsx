import { HeaderMoveButton } from "../hooks/HeaderMoveButton";
import DarkModeButton from "../hooks/DarkModeButton";
import { useLogout } from "../hooks/LogoutHook";
import { useParams } from "react-router-dom";

const HamburgerMenuManager = ({ handleMenuItemClick }) => {
  const logout = useLogout();
  const { storeNumber } = useParams();

  const handleClickLogout = () => {
    logout();
    console.log("done");
  };

  return (
    <ul className="pt-28 flex flex-col items-center justify-center">
      <li className="pb-5 text-white font-mono font-extrabold">MENU</li>
      <li className="pb-1">
        <HeaderMoveButton
          type="login"
          onClick={() => handleMenuItemClick(`/manager/${storeNumber}/edit`)}
        >
          シフト編集
        </HeaderMoveButton>
      </li>
      <li className="pb-1">
        <HeaderMoveButton
          type="login"
          onClick={() => handleMenuItemClick("/calender")}
        >
          シフト確認
        </HeaderMoveButton>
      </li>
      <li className="pb-1">
        <HeaderMoveButton
          type="createUser"
          onClick={() => handleMenuItemClick("/employee/create")}
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

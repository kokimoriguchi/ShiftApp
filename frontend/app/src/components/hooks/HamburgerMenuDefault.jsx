import { HeaderMoveButton } from "../hooks/HeaderMoveButton";
import DarkModeButton from "../hooks/DarkModeButton";

const HamburgerMenuDefault = ({ handleMenuItemClick }) => {
  return (
    <ul className="pt-28 flex flex-col justify-left">
      <li className="pb-5 text-white font-mono font-extrabold">MENU</li>
      <li className="pb-1">
        <HeaderMoveButton type="home" onClick={() => handleMenuItemClick("/")}>
          ホーム
        </HeaderMoveButton>
      </li>
      <li className="pb-1">
        <HeaderMoveButton
          type="login"
          onClick={() => handleMenuItemClick("login")}
        >
          スタッフログイン
        </HeaderMoveButton>
      </li>
      <li className="pb-1">
        <HeaderMoveButton
          type="login"
          onClick={() => handleMenuItemClick("manager/login")}
        >
          マネージャーログイン
        </HeaderMoveButton>
      </li>
      <li className="pb-1">
        <HeaderMoveButton
          type="createStore"
          onClick={() => handleMenuItemClick("/store/create")}
        >
          店舗新規作成
        </HeaderMoveButton>
      </li>
      <li className="pb-1">
        <DarkModeButton />
      </li>
    </ul>
  );
};

export default HamburgerMenuDefault;

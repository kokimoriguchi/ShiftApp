import { HeaderMoveButton } from "../hooks/HeaderMoveButton";

const HamburgerMenuDefault = ({ handleMenuItemClick }) => {
  return (
    <ul className="pt-28 flex flex-col items-center justify-center">
      <li className="pb-5 text-white font-mono font-extrabold">MENU</li>
      <HeaderMoveButton type="home" onClick={() => handleMenuItemClick("/")}>
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
  );
};

export default HamburgerMenuDefault;

import { HeaderMoveButton } from "../hooks/HeaderMoveButton";
import DarkModeButton from "../hooks/DarkModeButton";
import { useLogout } from "../hooks/LogoutHook";
import { useParams } from "react-router-dom";

const HamburgerMenuEmployee = ({ handleMenuItemClick }) => {
  const logout = useLogout();
  const { storeNumber } = useParams();

  const handleClickLogout = () => {
    logout();
    console.log("done");
  };

  return (
    <ul className="pt-28 flex flex-col items-center justify-center">
      <li className="pb-5 text-white font-mono font-extrabold">MENU</li>
      <li>
        <HeaderMoveButton
          type="calenderCheck"
          onClick={() =>
            handleMenuItemClick(`/staff/${storeNumber}/calender/submit`)
          }
        >
          シフト提出
        </HeaderMoveButton>
      </li>
      <li className="pt-1">
        <HeaderMoveButton
          type="calender"
          onClick={() => handleMenuItemClick("/")}
        >
          シフト確認
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

import { useNavigate } from "react-router-dom";
import { HomeMoveButton } from "../hooks/HomeMoveButton";
import { useParams } from "react-router-dom";

const ConfirmShiftCalender = () => {
  const navigate = useNavigate();
  const { storeNumber } = useParams();
  return (
    <div className="flex h-screen dark:bg-black flex-col pt-40 items-center">
      <div className="dark:text-white pb-10">
        まだ確定したシフトはありません🙇
      </div>
      <div>
        <HomeMoveButton onClick={() => navigate(`/manager/${storeNumber}`)}>
          戻る
        </HomeMoveButton>
      </div>
    </div>
  );
};

export default ConfirmShiftCalender;

import Calender from "./Calender";
import { useParams } from "react-router-dom";

const ManagerTop = () => {
  const { storeNumber } = useParams();
  return (
    <div>
      <h1>ManagerTop</h1>
      <Calender storeNumber={storeNumber} />
    </div>
  );
};

export default ManagerTop;

import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { SubmitFlexButton } from "../hooks/SubmitFlexButton";
import baseAxios from "../hooks/Axios";

const ConfirmShiftCalender = () => {
  const navigate = useNavigate();
  const { storeNumber, year, month } = useParams();
  return (
    <div className="flex h-screen dark:bg-black flex-col pt-40 items-center">
      <div className="w-5/6 m-auto flex">
        <table className="w-auto text-center h-10">
          <thead>
            <tr>
              <th className="border border-slate-300 dark:text-white">
                {year}/{month}.{storeNumber}
              </th>
            </tr>
          </thead>
        </table>
        <div className="flex w-5/6 m-auto justify-start py-3">
          <SubmitFlexButton
            type={"back"}
            onClick={() => navigate(`/manager/${storeNumber}`)}
          >
            戻る
          </SubmitFlexButton>
        </div>
      </div>
    </div>
  );
};

export default ConfirmShiftCalender;

import { useState } from "react";
import Withdraw from "../../../components/ui/Master/Withdraw";
import useGetALLWithdraw from "../../../hooks/Master/Withdraw/useGetAllWithdraw";

const PendingWithdraw = () => {
  const [amountFrom, setAmountFrom] = useState(null);
  const [amountTo, setAmountTo] = useState(null);
  const payload = {
    type: "viewWithdraw",
    status: "PENDING",
    pagination: true,
    amountFrom,
    amountTo,
  };
  const { allWithdraw } = useGetALLWithdraw(payload, 30000);

  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <Withdraw
        setAmountFrom={setAmountFrom}
        setAmountTo={setAmountTo}
        data={allWithdraw?.result}
        title="Pending Withdraw"
      />
    </div>
  );
};

export default PendingWithdraw;

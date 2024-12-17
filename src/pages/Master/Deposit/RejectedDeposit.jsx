import { Settings } from "../../../api";
import Deposit from "../../../components/ui/Master/Deposit";
import useGetALLDeposit from "../../../hooks/Master/Deposit/useGetALLDeposit";

const RejectedDeposit = () => {
  const payload = {
    type: "viewUTR",
    status: "REJECTED",

    pagination: true,
  };
  const { allUTRs } = useGetALLDeposit(payload);
  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <Deposit time="Rejection Time" data={allUTRs} title="Rejected Deposit" />
    </div>
  );
};

export default RejectedDeposit;

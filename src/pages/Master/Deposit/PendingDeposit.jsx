import Deposit from "../../../components/ui/Master/Deposit";
import useGetALLDeposit from "../../../hooks/Master/Deposit/useGetALLDeposit";

const PendingDeposit = () => {
  const payload = {
    type: "viewUTR",
    status: "PENDING",
  };
  const { allUTRs } = useGetALLDeposit(payload);
  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <Deposit data={allUTRs} />
    </div>
  );
};

export default PendingDeposit;

import Withdraw from "../../../components/ui/Master/Withdraw";
import useGetALLWithdraw from "../../../hooks/Master/Withdraw/useGetAllWithdraw";
import useContextState from "../../../hooks/useContextState";

const PendingWithdraw = () => {
  const { site } = useContextState();
  const payload = {
    type: "viewWithdraw",
    status: "PENDING",
    site,
  };
  const { allWithdraw } = useGetALLWithdraw(payload, 30000);

  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <Withdraw data={allWithdraw} title="Pending Withdraw" />
    </div>
  );
};

export default PendingWithdraw;

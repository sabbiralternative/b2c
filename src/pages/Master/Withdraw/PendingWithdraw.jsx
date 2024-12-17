import Withdraw from "../../../components/ui/Master/Withdraw";
import useGetALLWithdraw from "../../../hooks/Master/Withdraw/useGetAllWithdraw";

const PendingWithdraw = () => {
  const payload = {
    type: "viewWithdraw",
    status: "PENDING",
    pagination: true,
  };
  const { allWithdraw } = useGetALLWithdraw(payload, 30000);

  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <Withdraw data={allWithdraw} title="Pending Withdraw" />
    </div>
  );
};

export default PendingWithdraw;

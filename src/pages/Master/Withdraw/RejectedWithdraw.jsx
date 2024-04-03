import Withdraw from "../../../components/ui/Master/Withdraw";
import useGetALLWithdraw from "../../../hooks/Master/Withdraw/useGetAllWithdraw";

const RejectedWithdraw = () => {
  const payload = {
    type: "viewWithdraw",
    status: "REJECTED",
  };
  const { allWithdraw } = useGetALLWithdraw(payload);
  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <Withdraw data={allWithdraw} title='Rejected Withdraw' />
    </div>
  );
};

export default RejectedWithdraw;

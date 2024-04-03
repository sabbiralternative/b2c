import Withdraw from "../../../components/ui/Master/Withdraw";
import useGetALLWithdraw from "../../../hooks/Master/Withdraw/useGetAllWithdraw";

const CompletedWithdraw = () => {
  const payload = {
    type: "viewWithdraw",
    status: "APPROVED",
  };
  const { allWithdraw } = useGetALLWithdraw(payload);
  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <Withdraw data={allWithdraw} title='Completed Withdraw' />
    </div>
  );
};

export default CompletedWithdraw;

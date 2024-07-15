import Withdraw from "../../../components/ui/Master/Withdraw";
import useGetALLWithdraw from "../../../hooks/Master/Withdraw/useGetAllWithdraw";
import useContextState from "../../../hooks/useContextState";

const CompletedWithdraw = () => {
  const {site} = useContextState()
  const payload = {
    type: "viewWithdraw",
    status: "APPROVED",
    site
  };
  const { allWithdraw } = useGetALLWithdraw(payload);
  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <Withdraw time="Approval Time" data={allWithdraw} title='Completed Withdraw' />
    </div>
  );
};

export default CompletedWithdraw;

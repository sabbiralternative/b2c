import { Settings } from "../../../api";
import Deposit from "../../../components/ui/Master/Deposit";
import useGetALLDeposit from "../../../hooks/Master/Deposit/useGetALLDeposit";

const CompletedDeposit = () => {
  const payload = {
    type: "viewUTR",
    status: "APPROVED",
    site: Settings.siteUrl,
    pagination: true,
  };
  const { allUTRs } = useGetALLDeposit(payload);
  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <Deposit time="Approval Time" data={allUTRs} title="Completed Deposit" />
    </div>
  );
};

export default CompletedDeposit;

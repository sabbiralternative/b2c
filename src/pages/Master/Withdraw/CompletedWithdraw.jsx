import { useState } from "react";
import Withdraw from "../../../components/ui/Master/Withdraw";
import useGetALLWithdraw from "../../../hooks/Master/Withdraw/useGetAllWithdraw";

const CompletedWithdraw = () => {
  const [activePage, setActivePage] = useState(1);
  const payload = {
    type: "viewWithdraw",
    status: "APPROVED",
    pagination: true,
    page: activePage,
  };
  const { allWithdraw } = useGetALLWithdraw(payload);
  const meta = allWithdraw?.pagination;
  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <Withdraw
        time="Approval Time"
        setActivePage={setActivePage}
        data={allWithdraw?.result}
        meta={meta}
        activePage={activePage}
        title="Completed Withdraw"
      />
    </div>
  );
};

export default CompletedWithdraw;

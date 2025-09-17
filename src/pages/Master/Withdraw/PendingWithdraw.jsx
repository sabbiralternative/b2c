import { useState } from "react";
import Withdraw from "../../../components/ui/Master/Withdraw";
import useGetALLWithdraw from "../../../hooks/Master/Withdraw/useGetAllWithdraw";
import { useGetIndex } from "../../../hooks";
import { AdminRole } from "../../../constant/constant";
import useContextState from "../../../hooks/useContextState";

const PendingWithdraw = () => {
  const { adminRole } = useContextState();
  const [branchId, setBranchId] = useState(0);
  const [activePage, setActivePage] = useState(1);
  const [amountFrom, setAmountFrom] = useState(null);
  const [amountTo, setAmountTo] = useState(null);
  const { data } = useGetIndex({
    type: "getBranches",
  });

  const payload = {
    type: "viewWithdraw",
    status: "PENDING",
    pagination: true,
    amountFrom,
    amountTo,
    page: activePage,
  };
  if (adminRole === AdminRole.admin_staff) {
    payload.branch_id = branchId;
  }

  const { allWithdraw, refetchAllWithdraw, isLoading, isSuccess } =
    useGetALLWithdraw(payload, 30000);
  const meta = allWithdraw?.pagination;

  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <Withdraw
        refetchAllWithdraw={refetchAllWithdraw}
        activePage={activePage}
        setActivePage={setActivePage}
        meta={meta}
        setAmountFrom={setAmountFrom}
        setAmountTo={setAmountTo}
        data={allWithdraw?.result}
        title="Pending Withdraw"
        isLoading={isLoading}
        isSuccess={isSuccess}
        branchId={branchId}
        setBranchId={setBranchId}
        branches={data}
      />
    </div>
  );
};

export default PendingWithdraw;

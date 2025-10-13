import { useState } from "react";
import Withdraw from "../../../components/ui/Master/Withdraw";
import useGetALLWithdraw from "../../../hooks/Master/Withdraw/useGetAllWithdraw";
import { defaultDate } from "../../../utils/defaultDate";
import moment from "moment";

const CompletedWithdraw = () => {
  const [startDate, setStartDate] = useState(defaultDate(1));
  const [endDate, setEndDate] = useState(new Date());
  const [activePage, setActivePage] = useState(1);
  const payload = {
    type: "viewWithdraw",
    status: "APPROVED",
    pagination: true,
    page: activePage,
    fromDate: moment(startDate).format("YYYY-MM-DD"),
    toDate: moment(endDate).format("YYYY-MM-DD"),
  };
  const { allWithdraw, isLoading, isSuccess, refetchAllWithdraw } =
    useGetALLWithdraw(payload);
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
        isLoading={isLoading}
        isSuccess={isSuccess}
        endDate={endDate}
        setEndDate={setEndDate}
        setStartDate={setStartDate}
        startDate={startDate}
        refetchAllWithdraw={refetchAllWithdraw}
      />
    </div>
  );
};

export default CompletedWithdraw;

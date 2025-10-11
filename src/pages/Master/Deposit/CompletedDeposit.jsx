import { useState } from "react";
import Deposit from "../../../components/ui/Master/Deposit";
import useGetALLDeposit from "../../../hooks/Master/Deposit/useGetALLDeposit";
import { defaultDate } from "../../../utils/defaultDate";
import moment from "moment";

const CompletedDeposit = () => {
  const [startDate, setStartDate] = useState(defaultDate(1));
  const [endDate, setEndDate] = useState(new Date());
  const [activePage, setActivePage] = useState(1);
  const payload = {
    type: "viewUTR",
    status: "APPROVED",
    pagination: true,
    page: activePage,
    fromDate: moment(startDate).format("YYYY-MM-DD"),
    toDate: moment(endDate).format("YYYY-MM-DD"),
  };
  const { allUTRs, isLoading, isSuccess } = useGetALLDeposit(payload);
  const meta = allUTRs?.pagination;
  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <Deposit
        setActivePage={setActivePage}
        time="Approval Time"
        data={allUTRs.result}
        meta={meta}
        activePage={activePage}
        title="Completed Deposit"
        isLoading={isLoading}
        isSuccess={isSuccess}
        endDate={endDate}
        setEndDate={setEndDate}
        setStartDate={setStartDate}
        startDate={startDate}
      />
    </div>
  );
};

export default CompletedDeposit;

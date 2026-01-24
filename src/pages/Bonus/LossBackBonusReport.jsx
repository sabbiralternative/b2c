import useContextState from "../../hooks/useContextState";
import { useState } from "react";
import { useGetIndex } from "../../hooks";
import { defaultDate } from "../../utils/defaultDate";
import moment from "moment";
import { AdminRole } from "../../constant/constant";
import { DatePicker, Pagination } from "rsuite";
import DefaultDateButton from "../Report/DefaultDateButton";
import Loader from "../../components/ui/Loader/Loader";
import { useLossBackQuery } from "../../hooks/lossback";
import { useExportCSVMutation } from "../../hooks/exportCSV";

const LossBackBonusReport = () => {
  const { mutate: exportMutation } = useExportCSVMutation();
  const { data: branches } = useGetIndex({
    type: "getBranches",
  });

  const { adminRole } = useContextState();
  const [branchId, setBranchId] = useState(0);
  const [startDate, setStartDate] = useState(defaultDate(1));
  const [endDate, setEndDate] = useState(new Date());
  const [activePage, setActivePage] = useState(1);
  const payload = {
    type: "view_lossback_report",
    pagination: true,
    page: activePage,
    fromDate: moment(startDate).format("YYYY-MM-DD"),
    toDate: moment(endDate).format("YYYY-MM-DD"),
  };

  if (
    adminRole === AdminRole.admin_staff ||
    adminRole === AdminRole.hyper_master
  ) {
    payload.branch_id = branchId;
  }

  const { data, isLoading, isSuccess } = useLossBackQuery(payload);
  const meta = data?.pagination;

  const handleExport = async () => {
    exportMutation(payload);
  };

  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <div className="card">
        <div
          className="card-header"
          style={{
            display: "flex",
            alignItems: "start",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          <div className="col-md-8 col-12 mb-4 ">
            <h5>Lossback Bonus Report</h5>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <div style={{ width: "100%", maxWidth: "250px" }}>
                <label htmlFor="flatpickr-range" className="form-label">
                  From Date
                </label>
                <DatePicker
                  style={{ width: "100%" }}
                  format="yyyy-MM-dd"
                  editable
                  onChange={(date) => setStartDate(date)}
                  value={startDate}
                  block
                />
              </div>
              <div style={{ width: "100%", maxWidth: "250px" }}>
                <label htmlFor="flatpickr-range" className="form-label">
                  To Date
                </label>
                <DatePicker
                  style={{ width: "100%" }}
                  format="yyyy-MM-dd"
                  editable
                  onChange={(date) => setEndDate(date)}
                  value={endDate}
                  block
                />
              </div>
              {(adminRole === AdminRole.admin_staff ||
                adminRole === AdminRole.hyper_master) && (
                <div
                  style={{
                    width: "100%",
                    maxWidth: "250px",
                  }}
                >
                  <label htmlFor="flatpickr-range" className="form-label">
                    Branch
                  </label>
                  <select
                    style={{ width: "200px" }}
                    defaultValue="0"
                    onChange={(e) => {
                      setBranchId(e.target.value);
                      setActivePage(1);
                    }}
                    className="form-control"
                  >
                    <option disabled value="">
                      Branch
                    </option>
                    <option value="0">All Branch</option>
                    {branches?.result?.map((site) => (
                      <option key={site?.branch_id} value={site?.branch_id}>
                        {site?.branch_name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
            <DefaultDateButton
              setEndDate={setEndDate}
              setStartDate={setStartDate}
              lastThreeMonth={true}
              lastSixMonth={true}
              lastOneYear={true}
            />
            <button
              onClick={handleExport}
              style={{ marginTop: "10px" }}
              type="button"
              className="btn btn-primary"
            >
              Export
            </button>
          </div>

          <Pagination
            prev
            next
            size="md"
            total={meta?.totalRecords}
            limit={meta?.recordsPerPage}
            activePage={activePage}
            onChangePage={setActivePage}
            maxButtons={5}
            ellipsis
            boundaryLinks
          />
        </div>

        <div className="table-responsive text-nowrap">
          <table className="table table-hover table-sm">
            <thead className="table-dark">
              <tr>
                <th>Punter Id</th>
                <th>Bonus Amount</th>
                <th>Bonus Percent</th>
                <th>Branch Name</th>
                <th>Date Added</th>
                <th>Loginname</th>
                <th>Minimum Loss Amount</th>
                <th>Total Loss Amount</th>
              </tr>
            </thead>
            <tbody className="table-border-bottom-0">
              {data?.result?.map((item, i) => {
                return (
                  <tr key={i}>
                    <td>{item?.punter_id}</td>
                    <td>{item?.bonus_amount}</td>
                    <td>{item?.bonus_percent} </td>
                    <td>{item?.branch_name}</td>
                    <td>{item?.date_added}</td>
                    <td>{item?.loginname}</td>
                    <td>{item?.minimum_loss_amount}</td>
                    <td>{item?.total_loss_amount}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {isLoading && !isSuccess && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                margin: "20px",
              }}
            >
              <Loader />
            </div>
          )}

          {isSuccess && data?.result?.length === 0 && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "5px",
                marginTop: "15px",
              }}
              className="card"
            >
              <h5
                style={{ fontSize: "18px", padding: "0px" }}
                className="card-header"
              >
                No Lossback report found.
              </h5>
            </div>
          )}
          {meta && (
            <div
              style={{
                marginTop: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "end",
              }}
            >
              <Pagination
                prev
                next
                size="md"
                total={meta?.totalRecords}
                limit={meta?.recordsPerPage}
                activePage={activePage}
                onChangePage={setActivePage}
                maxButtons={5}
                ellipsis
                boundaryLinks
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LossBackBonusReport;

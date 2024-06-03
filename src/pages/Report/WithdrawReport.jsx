import { DateRangePicker } from "rsuite";
import "rsuite/DateRangePicker/styles/index.css";
import useDatePicker from "../../hooks/useDatePicker";
import useGetReport from "../../hooks/HyperMaster/Report/useGetReport";
const WithdrawReport = () => {
  const { formattedEndDate: formattedCurrentDate, onChange } = useDatePicker();
  const payload = {
    type: "getWithdraw",
    fromDate: formattedCurrentDate,
    toDate: formattedCurrentDate,
  };
  const { reports, refetchReports } = useGetReport(payload);

  /* Handle user history */
  const handleUserHistory = async (e) => {
    e.preventDefault();
    refetchReports();
  };

  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <div className="col-12">
        <div className="card">
          <div className="card-body">
            <form
              id="formValidationExamples"
              className="row g-3 fv-plugins-bootstrap5 fv-plugins-framework"
              onSubmit={handleUserHistory}
            >
              <div className="col-md-6 col-12 mb-4">
                <label htmlFor="flatpickr-range" className="form-label">
                  Withdraw Date
                </label>
                <DateRangePicker
                  format="dd-MM-yyyy"
                  editable
                  onChange={onChange}
                  defaultValue={[new Date(), new Date()]}
                  block
                />
                {/* <input
                  type="text"
                  name="date"
                  className="form-control flatpickr-input active"
                  placeholder="YYYY-MM-DD to YYYY-MM-DD"
                  id="flatpickr-range"
                /> */}
              </div>

              <div className="col-12">
                <input
                  type="submit"
                  name="submit"
                  className="btn btn-primary"
                  value="Export"
                />
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* <hr className="my-3" /> */}
      {/* <div className="card">
        <h5 className="card-header">Clients</h5>
        <div className="table-responsive text-nowrap">
          <table className="table table-hover table-sm">
            <thead>
              <tr>
                <th style={{ textAlign: "right" }}>PL</th>
                <th style={{ textAlign: "right" }}>Balance</th>
                <th style={{ textAlign: "left" }}>Date</th>

                <th style={{ textAlign: "left" }}>Narration</th>
                <th style={{ textAlign: "left" }}>Type</th>
              </tr>
            </thead>
            <tbody className="table-border-bottom-0">
              {pnl?.map((item, i) => {
                return (
                  <tr key={i}>
                    <td
                      style={{ textAlign: "right" }}
                      className={`${
                        item?.pl > 0 ? "text-success" : "text-danger"
                      }`}
                    >
                      <strong>{item?.pl}</strong>
                    </td>
                    <td style={{ textAlign: "right" }}>{item?.balance}</td>
                    <td style={{ textAlign: "left" }}>{item?.date_added}</td>
                    <td style={{ textAlign: "left" }}>{item?.narration}</td>
                    <td style={{ textAlign: "left" }}>{item?.transfer_type}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div> */}
    </div>
  );
};

export default WithdrawReport;

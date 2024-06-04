import { DateRangePicker } from "rsuite";
import "rsuite/DateRangePicker/styles/index.css";
import useDatePicker from "../../hooks/useDatePicker";
import { writeFile, utils } from "xlsx";
import handleRandomToken from "../../utils/handleRandomToken";
import { API, Settings } from "../../api";
import axios from "axios";
import useContextState from "../../hooks/useContextState";

const ClientReport = () => {
  const { token } = useContextState();
  const { formattedEndDate: formattedCurrentDate, onChange } = useDatePicker();
  const [date, month, year] = formattedCurrentDate.split("-");
  const newFormattedCurrentDate = `${year}-${month}-${date}`;

  const exportToExcel = async (e) => {
    e.preventDefault();
    const generatedToken = handleRandomToken();
    const payload = {
      type: "getClients",
      fromDate: newFormattedCurrentDate,
      toDate: newFormattedCurrentDate,
      token: generatedToken,
      site: Settings.siteUrl,
    };
    const res = await axios.post(API.export, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = res.data;
    if (data?.success) {
      if (data?.result?.length > 0) {
        const ws = utils.json_to_sheet(data?.result);
        const wb = utils.book_new();
        utils.book_append_sheet(wb, ws, "Sheet1");
        writeFile(wb, "customers_data.xlsx");
      }
    }
  };

  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <div className="col-12">
        <div className="card">
          <div className="card-body">
            <form
              id="formValidationExamples"
              className="row g-3 fv-plugins-bootstrap5 fv-plugins-framework"
            >
              <div className="col-md-6 col-12 mb-4">
                <label htmlFor="flatpickr-range" className="form-label">
                  Client Registration Date
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
                  onClick={exportToExcel}
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

export default ClientReport;

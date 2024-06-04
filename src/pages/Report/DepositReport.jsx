import { DateRangePicker } from "rsuite";
import "rsuite/DateRangePicker/styles/index.css";
import useDatePicker from "../../hooks/useDatePicker";
import { writeFile, utils } from "xlsx";
import handleRandomToken from "../../utils/handleRandomToken";
import { API, Settings } from "../../api";
import axios from "axios";
import useContextState from "../../hooks/useContextState";
import { useState } from "react";

const DepositReport = () => {
  const { token } = useContextState();
  const [viewDepositData, setViewDepositData] = useState(false);
  const [depositData, setDepositData] = useState([]);
  const { formattedEndDate: formattedCurrentDate, onChange } = useDatePicker();
  const [date, month, year] = formattedCurrentDate.split("-");
  const newFormattedCurrentDate = `${year}-${month}-${date}`;

  const getDepositReport = async () => {
    const generatedToken = handleRandomToken();
    const payload = {
      type: "getDeposit",
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
    return res.data;
  };

  const exportToExcel = async (e) => {
    e.preventDefault();
    const data = await getDepositReport();
    if (data?.success) {
      if (data?.result?.length > 0) {
        const ws = utils.json_to_sheet(data?.result);
        const wb = utils.book_new();
        utils.book_append_sheet(wb, ws, "Sheet1");
        writeFile(wb, "deposit_data.xlsx");
      }
    }
  };

  const handleToggleViewDeposit = async (e) => {
    e.preventDefault();
    const data = await getDepositReport();
    if (data?.result?.length > 0) {
      setDepositData(data?.result);
      setViewDepositData(true);
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
                  Deposit Date
                </label>
                <DateRangePicker
                  format="dd-MM-yyyy"
                  editable
                  onChange={onChange}
                  defaultValue={[new Date(), new Date()]}
                  block
                />
              </div>

              <div className="col-12">
                <input
                  onClick={handleToggleViewDeposit}
                  type="submit"
                  name="submit"
                  className="btn btn-primary"
                  value="View"
                />
                <input
                  style={{ marginLeft: "10px" }}
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

      {viewDepositData && (
        <>
          <hr className="my-3" />

          {depositData?.length > 0 ? (
            <div className="card">
              <h5 className="card-header">Withdraw Report</h5>
              <div className="table-responsive text-nowrap">
                <table className="table table-hover table-sm">
                  <thead className="table-dark">
                    <tr>
                      <th>User Name</th>
                      <th>Mobile</th>
                      <th>Deposit Date</th>
                      <th>Image</th>
                      <th>Remark</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody className="table-border-bottom-0">
                    {depositData?.map((data, i) => {
                      return (
                        <tr key={i}>
                          <td>{data?.loginname}</td>
                          <td>{data?.mobile}</td>
                          <td>{data?.deposit_date}</td>
                          <td>
                            <img
                              style={{
                                height: "40px",
                                width: "40px",
                                objectFit: "contain",
                              }}
                              src={data?.image}
                              alt=""
                            />
                          </td>
                          <td>{data?.remark}</td>
                          <td>
                            <span
                              className={`badge ${
                                data?.status == "APPROVED"
                                  ? "bg-label-primary"
                                  : "bg-label-warning"
                              } me-1`}
                            >
                              {data?.status}
                            </span>
                          </td>
                          <td>
                            <a
                              style={{ color: "white" }}
                              className="btn btn-icon btn-sm btn-success"
                            >
                              <i className="bx bxs-edit"></i>
                            </a>
                            &nbsp;
                            <a
                              style={{ color: "white" }}
                              className="btn btn-icon btn-sm btn-danger"
                            >
                              <i className="bx bxs-checkbox-minus"></i>
                            </a>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="card">
              <h5 style={{ fontSize: "18px" }} className="card-header">
                No data found for given date range.
              </h5>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default DepositReport;

import { DateRangePicker } from "rsuite";
import "rsuite/DateRangePicker/styles/index.css";
import useDatePicker from "../../hooks/useDatePicker";
import { writeFile, utils } from "xlsx";
import handleRandomToken from "../../utils/handleRandomToken";
import { API, Settings } from "../../api";
import axios from "axios";
import useContextState from "../../hooks/useContextState";
import { useState } from "react";

const TransferStatement = () => {
  const { token } = useContextState();
  const [viewTransferStatementData, setViewTransferStatementData] =
    useState(false);
  const [transferStatement, setTransferStatement] = useState([]);
  const [type, setType] = useState("ALL");
  const { formattedEndDate, formattedStartDate, onChange } = useDatePicker();

  const onSubmit = async () => {
    const generatedToken = handleRandomToken();
    const payload = {
      type,
      fromDate: formattedStartDate,
      toDate: formattedEndDate,
      token: generatedToken,
      site: Settings.siteUrl,
    };

    const res = await axios.post(API.transferStatement, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  };

  const exportToExcel = async (e) => {
    e.preventDefault();
    const data = await onSubmit();
    if (data?.success) {
      if (data?.result?.length > 0) {
        const ws = utils.json_to_sheet(data?.result);
        const wb = utils.book_new();
        utils.book_append_sheet(wb, ws, "Sheet1");
        writeFile(wb, "deposit_data.xlsx");
      }
    }
  };

  const handleViewTransferStatement = async (e) => {
    e.preventDefault();
    const data = await onSubmit();
    setViewTransferStatementData(true);
    if (data?.result?.length > 0) {
      setTransferStatement(data?.result);
    }
  };

  return (
    <>
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
                    defaultValue={[
                      new Date(new Date().setDate(new Date().getDate() - 7)),
                      new Date(),
                    ]}
                    block
                  />
                </div>
                <div className="col-md-6 col-12 mb-4">
                  <label htmlFor="flatpickr-range" className="form-label">
                    Type
                  </label>
                  <select
                    onChange={(e) => setType(e.target.value)}
                    className="select2 form-select select2-hidden-accessible"
                  >
                    <option value="All">All</option>
                    <option value="Upline">Upline</option>
                    <option value="Downline">Downline</option>
                  </select>
                </div>

                <div className="col-12">
                  <input
                    onClick={handleViewTransferStatement}
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

        {viewTransferStatementData && (
          <>
            <hr className="my-3" />
            {transferStatement?.length > 0 && (
              <span>
                {" "}
                Total Transfer Statement : {transferStatement?.length}
              </span>
            )}
            {transferStatement?.length > 0 ? (
              <div className="card">
                <h5 className="card-header">Deposit Report</h5>
                <div className="table-responsive text-nowrap">
                  <table className="table table-hover table-sm">
                    <thead className="table-dark">
                      <tr>
                        <th>Date</th>
                        <th>Credit</th>
                        <th>Debit</th>
                        <th>Remark</th>
                        <th>FromTo</th>
                      </tr>
                    </thead>
                    <tbody className="table-border-bottom-0">
                      {transferStatement?.map((data, i) => {
                        return (
                          <tr key={i}>
                            <td>{data?.date}</td>
                            <td
                              style={{
                                color: `${data?.credit > 0 ? "green" : "red"}`,
                              }}
                            >
                              {data?.credit}
                            </td>
                            <td
                              style={{
                                color: `${data?.debit > 0 ? "green" : "red"}`,
                              }}
                            >
                              {data?.debit}
                            </td>
                            <td>{data?.remark}</td>
                            <td>{data?.fromto}</td>
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
    </>
  );
};

export default TransferStatement;

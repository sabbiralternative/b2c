import { DateRangePicker } from "rsuite";
import "rsuite/DateRangePicker/styles/index.css";
import useDatePicker from "../../hooks/useDatePicker";
import { writeFile, utils } from "xlsx";
import handleRandomToken from "../../utils/handleRandomToken";
import { API, Settings } from "../../api";
import axios from "axios";
import useContextState from "../../hooks/useContextState";
import { useState } from "react";
import handleFormatDate from "../../utils/handleFormatDate";

const ClientReport = () => {
  const { token } = useContextState();
  const [viewClientData, setViewClientData] = useState(false);
  const [clientData, setClientData] = useState([]);
  const { formattedEndDate, formattedStartDate, onChange } =
    useDatePicker("currentDate");
  const { newFormattedEndDate, newFormattedStartDate } = handleFormatDate(
    formattedStartDate,
    formattedEndDate
  );

  const getClientReport = async () => {
    const generatedToken = handleRandomToken();
    const payload = {
      type: "getClients",
      fromDate: newFormattedStartDate,
      toDate: newFormattedEndDate,
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
    const data = await getClientReport();
    if (data?.success) {
      if (data?.result?.length > 0) {
        const ws = utils.json_to_sheet(data?.result);
        const wb = utils.book_new();
        utils.book_append_sheet(wb, ws, "Sheet1");
        writeFile(wb, "customers_data.xlsx");
      }
    }
  };

  const handleToggleViewClient = async (e) => {
    e.preventDefault();
    const data = await getClientReport();
    setClientData(data?.result);
    setViewClientData(true);
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
              </div>

              <div className="col-12">
                <input
                  onClick={handleToggleViewClient}
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

      {viewClientData && (
        <>
          <hr className="my-3" />
          {clientData?.length > 0 && (
            <span>Number of clients : {clientData?.length}</span>
          )}

          {clientData?.length > 0 ? (
            <div className="card">
              <h5 className="card-header">Client Report</h5>
              <div className="table-responsive text-nowrap">
                <table className="table table-hover table-sm">
                  <thead className="table-dark">
                    <tr>
                      <th>User Name</th>
                      <th>Mobile</th>
                      <th>Registration Date</th>
                      <th>Credit Limit</th>
                    </tr>
                  </thead>
                  <tbody className="table-border-bottom-0">
                    {clientData?.map((data, i) => {
                      return (
                        <tr key={i}>
                          <td>{data?.username}</td>
                          <td>{data?.mobile}</td>
                          <td>{data?.registrationDate}</td>
                          <td>{data?.credit_limit}</td>
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

export default ClientReport;

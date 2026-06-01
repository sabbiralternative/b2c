import moment from "moment/moment";
import { DatePicker } from "rsuite";
import { API } from "../../api";
import { useState } from "react";
import { defaultDate } from "../../utils/defaultDate";
import DefaultDateButton from "./DefaultDateButton";
import { useExportCSVMutation } from "../../hooks/exportCSV";
import { AxiosSecure } from "../../lib/AxiosSecure";

const DreamReport = () => {
  const { mutate: exportMutation } = useExportCSVMutation();
  const [showData, setShowData] = useState(false);
  const [data, setData] = useState([]);
  const [startDate, setStartDate] = useState(defaultDate(1));
  const [endDate, setEndDate] = useState(new Date());

  const getClientReport = async () => {
    const payload = {
      type: "dreamReport",
      fromDate: moment(startDate).format("YYYY-MM-DD"),
      toDate: moment(endDate).format("YYYY-MM-DD"),

      pagination: true,
    };
    const res = await AxiosSecure.post(API.export, payload);
    return res.data;
  };

  const exportToExcel = async () => {
    const payload = {
      type: "dreamReport",
      fromDate: moment(startDate).format("YYYY-MM-DD"),
      toDate: moment(endDate).format("YYYY-MM-DD"),
      pagination: true,
    };
    exportMutation(payload);
  };

  const handleToggleViewClient = async (e) => {
    e.preventDefault();
    const data = await getClientReport();
    setData(data?.result);
    setShowData(true);
  };

  let totalAmount = 0;
  for (const item of data) {
    const removeComa = item?.amount?.replace(/,/g, "");
    const amount = parseFloat(removeComa);
    totalAmount += amount;
  }

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
                <div style={{ display: "flex", gap: "10px" }}>
                  <div style={{ width: "100%" }}>
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
                  <div style={{ width: "100%" }}>
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
                </div>

                <DefaultDateButton
                  setEndDate={setEndDate}
                  setStartDate={setStartDate}
                  lastMonth
                  lastThreeMonth
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
                  type="button"
                  name="submit"
                  className="btn btn-primary"
                  value="Export"
                />
              </div>
            </form>
          </div>
        </div>
      </div>

      {showData && (
        <>
          <hr className="my-3" />
          {data?.length > 0 && (
            <span>
              Total Amount :{" "}
              <span
              // className={`${totalAmount < 0 ? "text-danger" : "text-success"}`}
              >
                {new Intl.NumberFormat("en-IN").format(totalAmount)}
              </span>
            </span>
          )}

          {data?.length > 0 ? (
            <div className="card">
              <h5 className="card-header">Dream Report</h5>
              <div className="table-responsive text-nowrap">
                <table className="table table-hover table-sm">
                  <thead className="table-dark">
                    <tr>
                      <th>Amount</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody className="table-border-bottom-0">
                    {data?.map((data, i) => {
                      // const amount = parseFloat(data?.amount.replace(/,/g, ""));

                      return (
                        <tr key={i}>
                          <td
                          // className={`${amount < 0 ? "text-danger" : "text-success"}`}
                          >
                            {data?.amount}
                          </td>
                          <td>{data?.date}</td>
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

export default DreamReport;

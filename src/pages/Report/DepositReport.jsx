import { DateRangePicker } from "rsuite";
import "rsuite/DateRangePicker/styles/index.css";
import useDatePicker from "../../hooks/useDatePicker";
import { writeFile, utils } from "xlsx";
import handleRandomToken from "../../utils/handleRandomToken";
import { API } from "../../api";
import axios from "axios";
import useContextState from "../../hooks/useContextState";
import { useEffect, useState } from "react";
import ShowImage from "../../components/modal/ShowImage";
import handleFormatDate from "../../utils/handleFormatDate";
import { useNavigate } from "react-router-dom";

const DepositReport = () => {
  const [showDepositImage, setShowDepositImage] = useState(false);
  const [image, setImage] = useState("");
  const { token, setClientId, adminRole, setRefetchViewClient } =
    useContextState();
  const navigate = useNavigate();
  const [viewDepositData, setViewDepositData] = useState(false);
  const [depositData, setDepositData] = useState([]);
  const [totalDeposit, setTotalDeposit] = useState(null);
  const { formattedEndDate, formattedStartDate, onChange } =
    useDatePicker("currentDate");
  const { newFormattedEndDate, newFormattedStartDate } = handleFormatDate(
    formattedStartDate,
    formattedEndDate
  );

  const getDepositReport = async () => {
    const generatedToken = handleRandomToken();
    const payload = {
      type: "getDeposit",
      fromDate: newFormattedStartDate,
      toDate: newFormattedEndDate,
      token: generatedToken,
      pagination: true,
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
    setViewDepositData(true);
    if (data?.result?.length > 0) {
      setDepositData(data?.result);
    }
  };

  useEffect(() => {
    if (depositData?.length > 0) {
      let totalDeposit = 0;
      for (let data of depositData) {
        totalDeposit += parseFloat(data?.amount);
      }
      setTotalDeposit(totalDeposit?.toFixed(2));
    }
  }, [depositData]);

  return (
    <>
      {showDepositImage && (
        <ShowImage image={image} setShowImage={setShowDepositImage} />
      )}
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
            {totalDeposit && <span> Total Deposit : {totalDeposit}</span>}
            {depositData?.length > 0 ? (
              <div className="card">
                <h5 className="card-header">Deposit Report</h5>
                <div className="table-responsive text-nowrap">
                  <table className="table table-hover table-sm">
                    <thead className="table-dark">
                      <tr>
                        <th>User Id</th>
                        {adminRole !== "master" && (
                          <>
                            <th>User Name</th>
                            <th>Mobile</th>
                          </>
                        )}
                        <th>Amount</th>
                        <th>Request Time</th>
                        <th>Approval Time</th>
                        <th>Image</th>
                        <th>Remark</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody className="table-border-bottom-0">
                      {depositData?.map((data, i) => {
                        return (
                          <tr key={i}>
                            <td
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                setClientId(data?.userId);
                                setRefetchViewClient(true);
                                navigate("/view-client");
                              }}
                            >
                              {data?.userId}
                            </td>
                            {adminRole !== "master" && (
                              <>
                                <td>{data?.loginname}</td>
                                <td>{data?.mobile}</td>
                              </>
                            )}
                            <td>{data?.amount}</td>
                            <td>{data?.deposit_date}</td>
                            <td>{data?.date_modified}</td>
                            <td>
                              {data?.image && (
                                <img
                                  onClick={() => {
                                    setImage("");
                                    setShowDepositImage(true);
                                    setImage(data?.image);
                                  }}
                                  style={{
                                    height: "40px",
                                    width: "40px",
                                    objectFit: "contain",
                                    cursor: "pointer",
                                  }}
                                  src={data?.image}
                                  alt=""
                                />
                              )}
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

export default DepositReport;

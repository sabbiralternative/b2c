import { DateRangePicker } from "rsuite";
import "rsuite/DateRangePicker/styles/index.css";
import useDatePicker from "../../hooks/useDatePicker";
import { writeFile, utils } from "xlsx";
import handleRandomToken from "../../utils/handleRandomToken";
import { API, Settings } from "../../api";
import axios from "axios";
import useContextState from "../../hooks/useContextState";
import { useEffect, useState } from "react";
import handleFormatDate from "../../utils/handleFormatDate";
import { useNavigate } from "react-router-dom";
import ShowImage from "../../components/modal/ShowImage";

const WithdrawReport = () => {
  const [showImage, setShowImage] = useState(false);
  const [image, setImage] = useState("");
  const { token, setClientId, adminRole, setRefetchViewClient } =
    useContextState();
  const navigate = useNavigate();
  const [viewWithdrawData, setViewWithdrawData] = useState(false);
  const [withdrawData, setWithdrawData] = useState([]);
  const [totalWithdraw, setTotalWithdraw] = useState(null);
  const { formattedEndDate, formattedStartDate, onChange } =
    useDatePicker("currentDate");
  const { newFormattedEndDate, newFormattedStartDate } = handleFormatDate(
    formattedStartDate,
    formattedEndDate
  );

  const getWithdrawReport = async () => {
    const generatedToken = handleRandomToken();
    const payload = {
      type: "getWithdraw",
      fromDate: newFormattedStartDate,
      toDate: newFormattedEndDate,
      token: generatedToken,
      site: Settings.siteUrl,
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
    const data = await getWithdrawReport();
    if (data?.success) {
      if (data?.result?.length > 0) {
        const ws = utils.json_to_sheet(data?.result);
        const wb = utils.book_new();
        utils.book_append_sheet(wb, ws, "Sheet1");
        writeFile(wb, "withdraw_data.xlsx");
      }
    }
  };

  const handleToggleViewWithdraw = async (e) => {
    e.preventDefault();
    const data = await getWithdrawReport();
    setViewWithdrawData(true);
    if (data?.result?.length > 0) {
      setWithdrawData(data?.result);
    }
  };

  useEffect(() => {
    if (withdrawData?.length > 0) {
      let totalWithdraw = 0;
      for (let data of withdrawData) {
        totalWithdraw += parseFloat(data?.amount);
      }
      setTotalWithdraw(totalWithdraw?.toFixed(2));
    }
  }, [withdrawData]);

  return (
    <>
      {showImage && <ShowImage image={image} setShowImage={setShowImage} />}
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
                    Withdraw Date
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
                    onClick={handleToggleViewWithdraw}
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

        {viewWithdrawData && (
          <>
            <hr className="my-3" />
            {totalWithdraw && <span> Total Withdraw : {totalWithdraw}</span>}
            {withdrawData?.length > 0 ? (
              <div className="card">
                <h5 className="card-header">Withdraw Report</h5>
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

                        <th>Bank A/C</th>
                        <th>Amount</th>
                        <th>Bank Name</th>
                        <th>Image</th>
                        <th>Request Time</th>
                        <th>Approval Time</th>
                        <th>Account No</th>
                        <th>Ifsc</th>
                        <th>Remark</th>
                        <th>Status</th>
                        {/* <th>Action</th> */}
                      </tr>
                    </thead>
                    <tbody className="table-border-bottom-0">
                      {withdrawData?.map((data, i) => {
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
                            <td>{data?.bank_account_name}</td>
                            <td>{data?.amount}</td>
                            <td>{data?.bank_name}</td>
                            <td>
                              {data?.image && (
                                <img
                                  onClick={() => {
                                    setImage("");
                                    setShowImage(true);
                                    setImage(data?.image);
                                  }}
                                  style={{
                                    height: "40px",
                                    width: "40px",
                                    objectFit: "contain",
                                  }}
                                  src={data?.image}
                                  alt=""
                                />
                              )}
                            </td>

                            <td>{data?.withdraw_date}</td>
                            <td>{data?.date_modified}</td>
                            <td>{data?.account_number}</td>
                            <td>{data?.ifsc}</td>
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
                            {/* <td>
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
                          </td> */}
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

export default WithdrawReport;

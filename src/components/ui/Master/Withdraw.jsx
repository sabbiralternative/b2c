import { useNavigate, useLocation } from "react-router-dom";
import useContextState from "../../../hooks/useContextState";
import { MdOutlineContentCopy } from "react-icons/md";
import { Fragment, useEffect, useState } from "react";
import { handleCopyToClipBoard } from "../../../utils/handleCopyToClipBoard";
import toast from "react-hot-toast";
// import { handleSplitUserName } from "../../../utils/handleSplitUserName";
import { FaRegCopy } from "react-icons/fa";
import { DatePicker, Pagination } from "rsuite";
import EditPendingWithdraw from "../../modal/Master/Withdraw/EditPendingWithdraw";
import { AdminRole, clientColor } from "../../../constant/constant";
import Loader from "../Loader/Loader";
import DefaultDateButton from "../../../pages/Report/DefaultDateButton";
import Slip from "../../modal/Master/Deposit/Slip";

const Withdraw = ({
  data,
  title,
  time,
  meta,
  activePage,
  setActivePage,
  setAmountFrom,
  setAmountTo,
  refetchAllWithdraw,
  isLoading,
  isSuccess,
  setBranchId,
  branches,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}) => {
  const {
    setDownLineId,
    setClientId,
    setRefetchViewClient,
    readOnly,
    adminRole,
  } = useContextState();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const location = useLocation();
  const [showPendingWithdraw, setShowPendingWithdraw] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [image, setImage] = useState("");

  useEffect(() => {
    if (message) {
      toast.success(message);
      setMessage("");
    }
  }, [message]);

  const handleCopy = (item) => {
    const formattedText = `
    Client Id: ${item?.userId || ""}
    Amount: ${Math.abs(item?.amount) || ""}
    Bank Account Name: ${item?.bank_account_name || ""}
    Account Number: ${item?.account_number || ""}
    Bank Name: ${item?.bank_name || ""}
    IFSC: ${item?.ifsc || ""}
    Request Time: ${item?.date_added || ""}
  `;
    navigator.clipboard
      .writeText(formattedText)
      .then(() => {
        toast.success("All data copied to clipboard");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  const handleNavigate = (client) => {
    if (!readOnly) {
      const formatUserId = client?.userId?.split("-")[1];
      navigate(
        `/pnl?id=${formatUserId}&role=${client?.role}&downlineId=${client?.downlineId}`
      );
    }
  };

  return (
    <div className="card">
      {showImage && <Slip setShowImage={setShowImage} image={image} />}
      {showPendingWithdraw && (
        <EditPendingWithdraw
          refetchAllWithdraw={refetchAllWithdraw}
          editPendingWithdraw={showPendingWithdraw}
          setEditPendingWithdraw={setShowPendingWithdraw}
        />
      )}
      <div
        className="card-header"
        style={{
          display: "flex",
          alignItems: "start",
          justifyContent: "space-between",
        }}
      >
        {title !== "Pending Withdraw" && (
          <div className="col-md-6 col-12 mb-4 ">
            <h5>{title}</h5>
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
              lastThreeMonth={true}
              lastSixMonth={true}
              lastOneYear={true}
            />
          </div>
        )}

        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          {title === "Pending Withdraw" && (
            <>
              <input
                style={{ width: "200px" }}
                onChange={(e) => setAmountFrom(e.target.value)}
                type="text"
                className="form-control"
                placeholder="Enter From Amount"
              />
              <input
                style={{ width: "200px" }}
                onChange={(e) => setAmountTo(e.target.value)}
                type="text"
                className="form-control"
                placeholder="Enter To Amount"
              />
              {adminRole === AdminRole.admin_staff && (
                <div
                  style={{ display: "flex", alignItems: "center", gap: "5px" }}
                >
                  <div>Branch:</div>
                  <select
                    style={{ width: "200px" }}
                    defaultValue="0"
                    onChange={(e) => setBranchId(e.target.value)}
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
            </>
          )}
        </div>
        {meta && (
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
        )}
      </div>
      <div className="table-responsive text-nowrap">
        <table className="table table-hover table-sm">
          <thead className="table-dark">
            <tr>
              <th>User Id</th>
              <th>Login Name</th>
              {adminRole === AdminRole.admin_staff ||
              adminRole === AdminRole.hyper_master ||
              adminRole === AdminRole.super_master ||
              adminRole === AdminRole.branch_staff ? (
                <th>Branch Name</th>
              ) : null}
              {/* <th>Username</th> */}
              <th>Amount</th>
              {(title === "Completed Withdraw" ||
                title === "Rejected Withdraw") && (
                <Fragment>
                  <th>Remark</th> <th>Slip</th>
                </Fragment>
              )}

              <th>Bank Account Name</th>
              <th>Account Number</th>
              <th>Bank Name</th>
              <th>IFSC</th>
              <th>UPI ID</th>
              <th>Status</th>
              <th>Request Time</th>
              {time && <th>{time}</th>}
              {title === "Pending Withdraw" &&
              (adminRole === "master" || adminRole === "branch_staff") ? (
                <th>Actions</th>
              ) : null}
            </tr>
          </thead>
          <tbody className="table-border-bottom-0">
            {Array.isArray(data) &&
              data?.map((item, i) => {
                return (
                  <tr style={{ background: item?.bgcolor || "none" }} key={i}>
                    <td
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setClientId(item?.userId);
                        setRefetchViewClient(true);
                        navigate(
                          `/view-client?role=${adminRole}&history=withdraw`
                        );
                      }}
                    >
                      <span
                        style={{
                          backgroundColor: clientColor?.[item?.color],
                          width: "8px",
                          height: "8px",
                          borderRadius: "50%",
                          display: "inline-block",
                          marginRight: "5px",
                        }}
                      />
                      <strong> {item?.userId}</strong>
                    </td>
                    <td>{item?.loginnameVisible && item?.loginname}</td>
                    {adminRole === AdminRole.admin_staff ||
                    adminRole === AdminRole.hyper_master ||
                    adminRole === AdminRole.super_master ||
                    adminRole === AdminRole.branch_staff ? (
                      <td>{item?.branch_name}</td>
                    ) : null}
                    {/* <td
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setClientId(item?.loginname);
                        setRefetchViewClient(true);
                        navigate("/view-client");
                      }}
                    >
                      {handleSplitUserName(item?.loginname)}
                    </td> */}
                    <td>{item?.amount}</td>
                    {(title === "Completed Withdraw" ||
                      title === "Rejected Withdraw") && (
                      <Fragment>
                        <td>{item.remark}</td>
                        <td>
                          {item?.image ? (
                            <span
                              onClick={() => {
                                setShowImage(true);
                                setImage(item?.image);
                              }}
                              style={{ color: "#346cee", cursor: "pointer" }}
                            >
                              View
                            </span>
                          ) : (
                            "N/A"
                          )}
                        </td>
                      </Fragment>
                    )}
                    {/* <td>{item?.mobile}</td> */}
                    <td>
                      {item?.bank_account_name}{" "}
                      {location.pathname === "/pending-withdraw" && (
                        <MdOutlineContentCopy
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            handleCopyToClipBoard(
                              item?.bank_account_name,
                              setMessage
                            )
                          }
                        />
                      )}
                    </td>
                    <td>
                      {item?.account_number}{" "}
                      {location.pathname === "/pending-withdraw" && (
                        <MdOutlineContentCopy
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            handleCopyToClipBoard(
                              item?.account_number,
                              setMessage
                            )
                          }
                        />
                      )}
                    </td>
                    <td>
                      {item?.bank_name}{" "}
                      {location.pathname === "/pending-withdraw" && (
                        <MdOutlineContentCopy
                          onClick={() =>
                            handleCopyToClipBoard(item?.bank_name, setMessage)
                          }
                          style={{ cursor: "pointer" }}
                        />
                      )}
                    </td>
                    <td>
                      {item?.ifsc}{" "}
                      {location.pathname === "/pending-withdraw" && (
                        <MdOutlineContentCopy
                          onClick={() =>
                            handleCopyToClipBoard(item?.ifsc, setMessage)
                          }
                          style={{ cursor: "pointer" }}
                        />
                      )}{" "}
                    </td>
                    <td>{item?.upi_id}</td>
                    <td>
                      <span
                        className={`badge me-1
                      ${item?.status === "PENDING" ? "bg-label-warning" : ""}
                      ${item?.status === "APPROVED" ? "bg-label-success" : ""}
                      ${item?.status === "REJECTED" ? "bg-label-danger" : ""}
                      `}
                      >
                        {item?.status}
                      </span>
                    </td>

                    <td>{item?.date_added}</td>
                    {time && <td>{item?.date_modified}</td>}
                    {item?.status === "PENDING" &&
                    (adminRole === "master" || adminRole === "branch_staff") ? (
                      <>
                        <td>
                          <a
                            title="Text Edit"
                            style={{
                              color: "white",
                              cursor: `${
                                !readOnly ? "pointer" : "not-allowed"
                              }`,
                            }}
                            onClick={() => {
                              !readOnly && setDownLineId(item?.withdraw_id);
                              !readOnly && setShowPendingWithdraw(true);
                            }}
                            className="btn btn-icon btn-sm btn-success"
                          >
                            <i className="bx bxs-edit"></i>
                          </a>
                          &nbsp;
                          <a
                            title="Copy All"
                            style={{
                              color: "white",
                              cursor: `${
                                !readOnly ? "pointer" : "not-allowed"
                              }`,
                            }}
                            onClick={() => {
                              !readOnly && handleCopy(item);
                            }}
                            className="btn btn-icon btn-sm btn-primary"
                          >
                            <FaRegCopy size={15} />
                          </a>
                          &nbsp;
                          <a
                            style={{
                              color: "white",
                              cursor: `${
                                !readOnly ? "pointer" : "not-allowed"
                              }`,
                            }}
                            onClick={() => handleNavigate(item)}
                            className="btn btn-icon btn-sm btn-warning"
                          >
                            PL
                          </a>
                        </td>
                      </>
                    ) : null}
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
  );
};

export default Withdraw;

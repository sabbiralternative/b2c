import { Fragment, useEffect, useState } from "react";
import moment from "moment";
import { defaultDate } from "../../utils/defaultDate";
import useContextState from "../../hooks/useContextState";
import { useGetIndex } from "../../hooks";
import { AdminRole, clientColor, Status } from "../../constant/constant";
import useGetALLWithdraw from "../../hooks/Master/Withdraw/useGetAllWithdraw";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Slip from "../../components/modal/Master/Deposit/Slip";
import DepositReport from "../../components/modal/Master/Deposit/DepositReport";
import AddSlip from "../../components/modal/Master/Withdraw/AddSlip";
import EditPendingWithdraw from "../../components/modal/Master/Withdraw/EditPendingWithdraw";
import { Pagination } from "rsuite";
import { MdOutlineContentCopy } from "react-icons/md";
import { handleCopyToClipBoard } from "../../utils/handleCopyToClipBoard";
import { FaRegCopy } from "react-icons/fa";
import Loader from "../../components/ui/Loader/Loader";
import LevelTable from "../../components/shared/LevelTable/LevelTable";

const PendingWithdrawGateway = () => {
  const {
    setDownLineId,
    setClientId,
    setRefetchViewClient,
    readOnly,
    adminRole,
  } = useContextState();
  const startDate = defaultDate(5);
  const endDate = new Date();
  const [branchId, setBranchId] = useState(0);
  const [activePage, setActivePage] = useState(1);
  const [amountFrom, setAmountFrom] = useState(null);
  const [amountTo, setAmountTo] = useState(null);
  const { data: branches } = useGetIndex({
    type: "getBranches",
  });

  const payload = {
    type: "viewWithdraw",
    status: "PENDING_GATEWAY",
    pagination: true,
    amountFrom,
    amountTo,
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

  const { allWithdraw, refetchAllWithdraw, isLoading, isSuccess } =
    useGetALLWithdraw(payload, 30000);
  const meta = allWithdraw?.pagination;

  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const location = useLocation();
  const [showPendingWithdraw, setShowPendingWithdraw] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [image, setImage] = useState("");
  const [addSlipId, setAddSlipId] = useState(null);
  const [depositReport, setDepositReport] = useState(null);

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
        `/pnl?id=${formatUserId}&role=${client?.role}&downlineId=${client?.downlineId}`,
      );
    }
  };

  const status = allWithdraw?.result?.[0]?.status;

  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <div className="card">
        {showImage && <Slip setShowImage={setShowImage} image={image} />}
        {depositReport && (
          <DepositReport
            setDepositReport={setDepositReport}
            depositReport={depositReport}
          />
        )}
        {addSlipId && (
          <AddSlip
            addSlipId={addSlipId}
            setAddSlipId={setAddSlipId}
            refetchAllWithdraw={refetchAllWithdraw}
          />
        )}
        {showPendingWithdraw && (
          <EditPendingWithdraw
            refetchAllWithdraw={refetchAllWithdraw}
            editPendingWithdraw={showPendingWithdraw}
            setEditPendingWithdraw={setShowPendingWithdraw}
            // removePendingSelect={true}
          />
        )}
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
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
                flexWrap: "wrap",
              }}
            >
              <h5 style={{ marginBottom: "0px" }}>
                Pending Withdraw - Gateway
              </h5>
              {(adminRole === AdminRole.branch_staff ||
                adminRole === AdminRole.master) && (
                <Fragment>
                  <input
                    style={{ width: "200px" }}
                    onChange={(e) => setAmountFrom(e.target.value)}
                    type="text"
                    className="form-control"
                    placeholder="Enter From Amount"
                    value={amountFrom}
                  />
                  <input
                    style={{ width: "200px" }}
                    onChange={(e) => setAmountTo(e.target.value)}
                    type="text"
                    className="form-control"
                    placeholder="Enter To Amount"
                    value={amountTo}
                  />
                </Fragment>
              )}

              {(adminRole === AdminRole.admin_staff ||
                adminRole === AdminRole.hyper_master) && (
                <Fragment>
                  <div
                    style={{
                      width: "100%",
                      maxWidth: "260px",
                      display: "flex",
                      alignItems: "center",
                      flexWrap: "wrap",
                      gap: "5px",
                    }}
                  >
                    <div style={{ fontSize: "15px" }}>Branch:</div>
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
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "15px",
                      flexWrap: "wrap",
                    }}
                  >
                    <input
                      style={{ width: "200px" }}
                      onChange={(e) => setAmountFrom(e.target.value)}
                      type="text"
                      className="form-control"
                      placeholder="Enter From Amount"
                      value={amountFrom}
                    />
                    <input
                      style={{ width: "200px" }}
                      onChange={(e) => setAmountTo(e.target.value)}
                      type="text"
                      className="form-control"
                      placeholder="Enter To Amount"
                      value={amountTo}
                    />
                  </div>
                </Fragment>
              )}
            </div>
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
                <th>Level</th>
                <th>User Id</th>
                {status !== Status.PENDING && <th>Login Name</th>}

                {adminRole === AdminRole.admin_staff ||
                adminRole === AdminRole.hyper_master ||
                adminRole === AdminRole.super_master ||
                adminRole === AdminRole.branch_staff ? (
                  <th>Branch</th>
                ) : null}
                {/* <th>Username</th> */}
                <th>Amount</th>
                {(status === Status.APPROVED || status === Status.REJECTED) && (
                  <Fragment>
                    <th>Remark</th> <th>Slip</th>
                  </Fragment>
                )}

                <th>Bank Account Name</th>
                <th>Account Number</th>
                <th>Bank Name</th>
                <th>IFSC</th>
                {status !== Status.PENDING && <th>UPI ID</th>}

                {status !== Status.PENDING && <th>Status</th>}

                <th>Request Time</th>

                {(status === Status.APPROVED || status === Status.REJECTED) && (
                  <th>
                    {status === Status.APPROVED ? "Approved By" : "Rejected By"}
                  </th>
                )}
                {status === Status.PENDING && <th>Bank Added</th>}
                {/* {status === Status.PENDING &&
                (adminRole === "master" || adminRole === "branch_staff") ? ( */}
                <th>Actions</th>
                {/* ) : null} */}
              </tr>
            </thead>
            <tbody className="table-border-bottom-0">
              {Array.isArray(allWithdraw?.result) &&
                allWithdraw?.result?.map((item, i) => {
                  return (
                    <tr style={{ background: item?.bgcolor || "none" }} key={i}>
                      <td>
                        <strong>{item?.level}</strong>
                      </td>
                      <td
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          setClientId(item?.userId);
                          setRefetchViewClient(true);
                          navigate(
                            `/view-client?role=${adminRole}&history=withdraw`,
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
                      {status !== Status.PENDING && (
                        <td>{item?.loginnameVisible && item?.loginname}</td>
                      )}

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
                      {(status === Status.APPROVED ||
                        status === Status.REJECTED) && (
                        <Fragment>
                          <td>{item.remark}</td>
                          <td>
                            {item?.withdraw_slip ? (
                              <span
                                onClick={() => {
                                  setShowImage(true);
                                  setImage(item?.withdraw_slip);
                                }}
                                style={{ color: "#346cee", cursor: "pointer" }}
                              >
                                View
                              </span>
                            ) : (
                              <div
                                onClick={() => setAddSlipId(item?.withdraw_id)}
                                style={{ cursor: "pointer" }}
                                className="text-danger"
                              >
                                Add
                              </div>
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
                                setMessage,
                              )
                            }
                          />
                        )}
                        <br />
                        {status === Status.PENDING &&
                          item?.upi_id &&
                          item?.upi_id}
                      </td>
                      <td>
                        {item?.account_number}{" "}
                        {location.pathname === "/pending-withdraw" && (
                          <MdOutlineContentCopy
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              handleCopyToClipBoard(
                                item?.account_number,
                                setMessage,
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
                      {status !== Status.PENDING && <td>{item?.upi_id}</td>}

                      {status !== Status.PENDING && (
                        <td>
                          <span
                            className={`badge me-1
                      ${
                        item?.status === Status.PENDING
                          ? "bg-label-warning"
                          : ""
                      }
                      ${
                        item?.status === Status.APPROVED
                          ? "bg-label-success"
                          : ""
                      }
                      ${
                        item?.status === Status.REJECTED
                          ? "bg-label-danger"
                          : ""
                      }
                      `}
                          >
                            {item?.status}
                          </span>
                        </td>
                      )}

                      <td>
                        {status === Status.PENDING ? (
                          <span>
                            {" "}
                            {item?.reject_request == "1"
                              ? "Withdraw Reject"
                              : item?.date_added}
                          </span>
                        ) : item?.reject_request == "1" ? (
                          "Withdraw Reject"
                        ) : (
                          item?.date_added
                        )}
                      </td>

                      {(item?.status === Status.APPROVED ||
                        item?.status === Status.REJECTED) && (
                        <td>{item?.modify_by}</td>
                      )}
                      {item?.status === Status.PENDING && (
                        <td>
                          {" "}
                          <span className="badge bg-label-warning">
                            {item?.bank_added}
                          </span>
                        </td>
                      )}
                      {/* {item?.status === Status.PENDING &&
                      (adminRole === "master" ||
                        adminRole === "branch_staff") ? ( */}
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
                          &nbsp;
                          {(adminRole === AdminRole.master ||
                            adminRole === AdminRole.branch_staff) && (
                            <a
                              style={{
                                color: "white",
                                cursor: `${
                                  !readOnly ? "pointer" : "not-allowed"
                                }`,
                              }}
                              onClick={() => setDepositReport(item?.downlineId)}
                              className="btn btn-icon btn-sm btn-info"
                            >
                              DR
                            </a>
                          )}
                        </td>
                      </>
                      {/* // ) : null} */}
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

          {isSuccess && allWithdraw?.result?.length === 0 && (
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
                No pending withdraw - gateway.
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
      <LevelTable />
    </div>
  );
};

export default PendingWithdrawGateway;

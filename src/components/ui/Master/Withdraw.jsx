import { useNavigate, useLocation } from "react-router-dom";
import useContextState from "../../../hooks/useContextState";
import { MdOutlineContentCopy } from "react-icons/md";
import { useEffect, useState } from "react";
import { handleCopyToClipBoard } from "../../../utils/handleCopyToClipBoard";
import toast from "react-hot-toast";
import { handleSplitUserName } from "../../../utils/handleSplitUserName";
import { FaRegCopy } from "react-icons/fa";

const Withdraw = ({ data, title, time }) => {
  const {
    setEditPendingWithdraw,
    setDownLineId,
    setClientId,
    setRefetchViewClient,
    readOnly,
    adminRole,
  } = useContextState();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const location = useLocation();

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

  const handleNavigate = (username, link) => {
    localStorage.setItem("downLineId", username);
    navigate(`/${link}`);
  };

  return (
    <div className="card">
      <h5 className="card-header">{title}</h5>
      <div className="table-responsive text-nowrap">
        <table className="table table-hover table-sm">
          <thead className="table-dark">
            <tr>
              <th>User Id</th>
              <th>Username</th>
              <th>Amount</th>
              {/* <th>Mobile</th> */}
              <th>Bank Account Name</th>
              <th>Account Number</th>
              <th>Bank Name</th>
              <th>IFSC</th>

              <th>Status</th>
              <th>Request Time</th>
              {time && <th>{time}</th>}
              {title === "Pending Withdraw" && <th>Actions</th>}
            </tr>
          </thead>
          <tbody className="table-border-bottom-0">
            {Array.isArray(data) &&
              data?.map((item, i) => {
                console.log(data);
                return (
                  <tr key={i}>
                    <td
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setClientId(item?.userId);
                        setRefetchViewClient(true);
                        navigate("/view-client");
                      }}
                    >
                      {item?.userId}
                    </td>
                    <td
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setClientId(item?.loginname);
                        setRefetchViewClient(true);
                        navigate("/view-client");
                      }}
                    >
                      {handleSplitUserName(item?.loginname)}
                    </td>
                    <td>{item?.amount}</td>

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
                    {item?.status === "PENDING" && adminRole === "master" && (
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
                              !readOnly && setEditPendingWithdraw(true);
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
                            onClick={() => {
                              !readOnly &&
                                handleNavigate(item?.loginname, "pnl");
                            }}
                            className="btn btn-icon btn-sm btn-warning"
                          >
                            PL
                          </a>
                        </td>
                      </>
                    )}
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Withdraw;

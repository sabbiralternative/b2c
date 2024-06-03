import { useNavigate, useLocation } from "react-router-dom";
import useContextState from "../../../hooks/useContextState";
import { MdOutlineContentCopy } from "react-icons/md";
import { useEffect, useState } from "react";
import { handleCopyToClipBoard } from "../../../utils/handleCopyToClipBoard";
import toast from "react-hot-toast";
import { handleSplitUserName } from "../../../utils/handleSplitUserName";

const Withdraw = ({ data, title }) => {
 
  const { setEditPendingWithdraw, setDownLineId, setClientId } =
    useContextState();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const location = useLocation();

  useEffect(() => {
    if (message) {
      toast.success(message);
      setMessage("");
    }
  }, [message]);

  return (
    <div className="card">
      <h5 className="card-header">{title}</h5>
      <div className="table-responsive text-nowrap">
        <table className="table table-hover table-sm">
          <thead className="table-dark">
            <tr>
              <th>Username</th>
              <th>Amount</th>
              <th>Mobile</th>
              <th>Bank Account Name</th>
              <th>Account Number</th>
              <th>Bank Name</th>
              <th>IFSC</th>

              <th>Status</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="table-border-bottom-0">
            {Array.isArray(data) && data?.map((item, i) => {
              return (
                <tr key={i}>
                  <td
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setClientId(item?.loginname);
                      navigate("/view-client");
                    }}
                  >
                    {handleSplitUserName(item?.loginname)}
                  </td>
                  <td>{item?.amount}</td>

                  <td>{item?.mobile}</td>
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
                  {item?.status === "PENDING" && (
                    <td>
                      <a
                        style={{ color: "white" }}
                        onClick={() => {
                          setDownLineId(item?.withdraw_id);
                          setEditPendingWithdraw(true);
                        }}
                        className="btn btn-icon btn-sm btn-success"
                      >
                        <i className="bx bxs-edit"></i>
                      </a>
                    </td>
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

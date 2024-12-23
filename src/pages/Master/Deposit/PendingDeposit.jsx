import { useEffect, useState } from "react";
import useContextState from "../../../hooks/useContextState";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Slip from "../../../components/modal/Master/Deposit/Slip";
import { handleSplitUserName } from "../../../utils/handleSplitUserName";
import { MdOutlineContentCopy } from "react-icons/md";
import { handleCopyToClipBoard } from "../../../utils/handleCopyToClipBoard";
import useGetALLDeposit from "../../../hooks/Master/Deposit/useGetALLDeposit";

const PendingDeposit = () => {
  const {
    setEditPendingDeposit,
    setDownLineId,
    setClientId,
    setRefetchViewClient,
    readOnly,
    adminRole,
  } = useContextState();
  const [amountFrom, setAmountFrom] = useState(null);
  const [amountTo, setAmountTo] = useState(null);
  const navigate = useNavigate();
  const [showImage, setShowImage] = useState(false);
  const [image, setImage] = useState("");
  const [message, setMessage] = useState("");
  const location = useLocation();
  const { allUTRs } = useGetALLDeposit(
    {
      type: "viewUTR",
      status: "PENDING",
      amountFrom: amountFrom,
      amountTo: amountTo,
      pagination: true,
    },
    30000
  );

  useEffect(() => {
    if (message) {
      toast.success(message);
      setMessage("");
    }
  }, [message]);

  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <div className="card">
        {showImage && <Slip setShowImage={setShowImage} image={image} />}
        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          <h5 className="card-header">Pending Deposit</h5>
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
        </div>

        <div className="table-responsive text-nowrap">
          <table className="table table-hover table-sm">
            <thead className="table-dark">
              <tr>
                <th>User Id</th>
                <th>Username</th>
                <th>Amount</th>
                <th>UTR</th>
                <th>Slip</th>
                <th>Type</th>
                <th>Status</th>
                <th>Remark</th>
                <th>Request Time</th>
                {/* {time && <th>{time}</th>} */}
                {adminRole === "master" && <th>Actions</th>}
              </tr>
            </thead>
            <tbody className="table-border-bottom-0">
              {allUTRs?.result?.map((item, i) => {
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

                    <td>
                      {item?.utr}{" "}
                      {location.pathname === "/pending-deposit" && (
                        <MdOutlineContentCopy
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            handleCopyToClipBoard(item?.utr, setMessage)
                          }
                        />
                      )}
                    </td>
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
                    <td>{item?.type}</td>
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
                    <td>{item?.remark}</td>
                    <td>{item?.date_added}</td>
                    {/* {time && <td>{item?.date_modified}</td>} */}
                    {item?.status === "PENDING" && adminRole === "master" && (
                      <td>
                        <a
                          style={{
                            color: "white",
                            cursor: `${!readOnly ? "pointer" : "not-allowed"}`,
                          }}
                          onClick={() => {
                            !readOnly && setDownLineId(item?.id);
                            !readOnly && setEditPendingDeposit(true);
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
    </div>
  );
};

export default PendingDeposit;

import { useNavigate, useLocation } from "react-router-dom";
import useContextState from "../../../hooks/useContextState";
import { useEffect, useState } from "react";
import Slip from "../../modal/Master/Deposit/Slip";
import toast from "react-hot-toast";
import { MdOutlineContentCopy } from "react-icons/md";
import { handleCopyToClipBoard } from "../../../utils/handleCopyToClipBoard";

const Deposit = ({ data, title }) => {
  const { setEditPendingDeposit, setDownLineId, setClientId } =
    useContextState();
  const navigate = useNavigate();
  const [showImage, setShowImage] = useState(false);
  const [image, setImage] = useState("");
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
      {showImage && <Slip setShowImage={setShowImage} image={image} />}
      <h5 className="card-header">{title}</h5>
      <div className="table-responsive text-nowrap">
        <table className="table table-hover table-sm">
          <thead className="table-dark">
            <tr>
              <th>Username</th>
              <th>Amount</th>
              <th>UTR</th>
              <th>Slip</th>
              <th>Type</th>
              <th>Status</th>
              <th>Remark</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="table-border-bottom-0">
            {data?.map((item, i) => {
              return (
                <tr key={i}>
                  <td
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setClientId(item?.loginname);
                      navigate("/view-client");
                    }}
                  >
                    {item?.loginname}
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
                  {item?.status === "PENDING" && (
                    <td>
                      <a
                        style={{ color: "white" }}
                        onClick={() => {
                          setDownLineId(item?.id);
                          setEditPendingDeposit(true);
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

export default Deposit;

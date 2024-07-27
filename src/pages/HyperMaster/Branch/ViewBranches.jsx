import { handleDownLineId } from "../../../utils/handleDownLineId";
import useContextState from "../../../hooks/useContextState";
import useGetAllBranch from "../../../hooks/HyperMaster/Branch/useGetAllBranch";
import { handleSplitUserName } from "../../../utils/handleSplitUserName";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API } from "../../../api";
import handleRandomToken from "../../../utils/handleRandomToken";

const ViewBranches = () => {
  const { branches } = useGetAllBranch();
  const {
    setShowChangePassword,
    setShowChangeStatus,
    setShowDeposit,
    setShowWithdraw,
    setDownLineId,
    setShowCreditRef,
    setRegistrationStatus,
    token,
    adminRole,
  } = useContextState();
  const navigate = useNavigate();

  const handleNavigate = (username, link) => {
    localStorage.setItem("downLineId", username);
    navigate(`/${link}`);
  };

  /* Handle login read only without password */
  const handleLoginReadOnly = async (username) => {
    const generatedToken = handleRandomToken();
    const payload = {
      username,
      token: generatedToken,
    };
    const res = await axios.post(API.loginReadOnly, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = res.data;
    if (data?.success) {
      const baseUrl = window.location.origin;
      const readOnlyLoginCredential = {
        token: data?.result?.token,
        site: data?.result?.site,
        role: data?.result?.role,
        loginname: data?.result?.loginname,
        readOnly: data?.result?.readOnly,
      };
      const readOnlyLoginData = encodeURIComponent(
        JSON.stringify(readOnlyLoginCredential)
      );
      const newTabUrl = `${baseUrl}?data=${readOnlyLoginData}`;
      window.open(newTabUrl, "_blank");
    }
  };

  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <div className="card">
        <h5 className="card-header">Branches</h5>
        <div className="table-responsive text-nowrap">
          <table className="table table-hover table-sm">
            <thead className="table-dark">
              <tr>
                <th>Username</th>
                <th>Credit Reference</th>
                <th>Balance</th>
                <th>P/L</th>
                <th>Status</th>
                <th>Betting Status</th>
                <th>Registration Status</th>
                <th>Reg. Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="table-border-bottom-0">
              {branches?.map((branch, i) => {
                return (
                  <tr key={i}>
                    <td>
                      <strong>{handleSplitUserName(branch?.username)}</strong>
                    </td>
                    <td>{branch?.creditReferance}</td>
                    <td>{branch?.balance}</td>
                    <td>{branch?.pnl}</td>

                    <td>
                      <span
                        className={`badge  me-1 ${
                          branch?.userStatus === 1
                            ? "bg-label-primary"
                            : "bg-label-danger"
                        }`}
                      >
                        {branch?.userStatus === 1 ? "active" : "inactive"}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`badge  me-1 ${
                          branch?.bettingStatus === 1
                            ? "bg-label-primary"
                            : "bg-label-danger"
                        }`}
                      >
                        {branch?.bettingStatus === 1 ? "active" : "inactive"}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`badge  me-1 ${
                          branch?.registrationStatus === 1
                            ? "bg-label-primary"
                            : "bg-label-danger"
                        }`}
                      >
                        {branch?.registrationStatus === 1
                          ? "active"
                          : "inactive"}
                      </span>
                    </td>

                    <td>{branch?.registrationDate}</td>
                    <td style={{ display: "flex", color: "white" }}>
                      <a
                        onClick={() =>
                          handleDownLineId(
                            setShowDeposit,
                            branch?.username,
                            setDownLineId
                          )
                        }
                        className="btn btn-icon btn-sm btn-success"
                      >
                        D
                      </a>
                      &nbsp;
                      <a
                        onClick={() =>
                          handleDownLineId(
                            setShowWithdraw,
                            branch?.username,
                            setDownLineId
                          )
                        }
                        className="btn btn-icon btn-sm btn-danger"
                      >
                        W
                      </a>
                      &nbsp;
                      <a
                        style={{ color: "white" }}
                        onClick={() => {
                          handleNavigate(branch?.username, "pnl");
                        }}
                        className="btn btn-icon btn-sm btn-warning"
                      >
                        PL
                      </a>
                      &nbsp;
                      <a
                        onClick={() => {
                          handleDownLineId(
                            setShowChangePassword,
                            branch?.username,
                            setDownLineId
                          );
                        }}
                        className="btn btn-icon btn-sm btn-info"
                      >
                        P
                      </a>
                      &nbsp;
                      <a
                        onClick={() => {
                          handleDownLineId(
                            setShowChangeStatus,
                            branch?.username,
                            setDownLineId
                          );
                          setRegistrationStatus(branch?.registrationStatus);
                        }}
                        className="btn btn-icon btn-sm btn-dark"
                      >
                        S
                      </a>
                      &nbsp;
                      <a
                        style={{ color: "white" }}
                        onClick={() =>
                          handleDownLineId(
                            setShowCreditRef,
                            branch?.username,
                            setDownLineId
                          )
                        }
                        className="btn btn-icon btn-sm btn-primary"
                      >
                        CR
                      </a>
                      &nbsp;
                      {adminRole === "hyper_master" && (
                        <a
                          style={{
                            color: "white",
                            backgroundColor: "lightseagreen",
                          }}
                          onClick={() => handleLoginReadOnly(branch?.username)}
                          className="btn btn-icon btn-sm btn-read-only-login"
                        >
                          L
                        </a>
                      )}
                    </td>
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

export default ViewBranches;

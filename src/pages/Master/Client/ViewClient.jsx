import { useForm } from "react-hook-form";
import useContextState from "../../../hooks/useContextState";
import { handleDownLineId } from "../../../utils/handleDownLineId";
import { useNavigate } from "react-router-dom";
import useGetClient from "../../../hooks/Master/Client/useGetClient";
import { handleSplitUserName } from "../../../utils/handleSplitUserName";
import { useEffect, useState } from "react";

const ViewClient = () => {
  const navigate = useNavigate();
  const [fetchClients, setFetchClients] = useState(false);
  const { handleSubmit } = useForm();
  const {
    readOnly,
    clientId,
    setClientId,
    setClientDeposit,
    setDownLineId,
    setShowChangePassword,
    setShowChangeStatus,
    setShowCreditRef,
    adminRole,
    refetchViewClient,
    setRefetchViewClient,
  } = useContextState();
  const { clients, refetchClients, isSuccess } = useGetClient(
    clientId,
    setFetchClients,
    fetchClients
  );

  const onSubmit = async () => {
    setFetchClients(true);
    refetchClients();
  };
  const handleNavigate = (username, link) => {
    localStorage.setItem("downLineId", username);
    navigate(`/${link}`);
  };

  useEffect(() => {
    if (refetchViewClient) {
      setFetchClients(true);
      refetchClients();
      setRefetchViewClient(false);
      setClientId("");
    }
  }, [refetchClients, refetchViewClient, setRefetchViewClient, setClientId]);

 

  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <div className="col-12">
        <div className="card">
          <div className="card-body">
            <form
              id="formValidationExamples"
              className="row g-3 fv-plugins-bootstrap5 fv-plugins-framework"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="col-md-6 fv-plugins-icon-container">
                <input
                  onChange={(e) => setClientId(e.target.value)}
                  type="text"
                  className="form-control"
                  placeholder="Search Client"
                  value={clientId}
                />
                <div className="fv-plugins-message-container invalid-feedback"></div>
              </div>

              <div className="col-12">
                <input
                  disabled={clientId?.length < 6}
                  type="submit"
                  name="submit"
                  className="btn btn-primary"
                  value="Search"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
      {clients?.length > 0 && (
        <>
          <hr className="my-3" />
          <div className="card">
            <h5 className="card-header">Clients</h5>
            <div className="table-responsive text-nowrap">
              <table className="table table-hover table-sm">
                <thead>
                  <tr>
                    <th>User Id</th>
                    <th>Username</th>
                    {adminRole !== "master" && <th>Mobile</th>}
                    <th>Balance</th>
                    <th>Total Deposit</th>
                    <th>Total Withdraw</th>
                    <th>Exposure</th>
                    <th>Betting Status</th>
                    <th>Status</th>
                    <th>Reg. Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody className="table-border-bottom-0">
                  {clients?.map((client, i) => {
                    return (
                      <tr key={i}>
                        <td>
                          <strong>{client?.userId}</strong>
                        </td>
                        <td>
                          <strong>
                            {handleSplitUserName(client?.username)}
                          </strong>
                        </td>
                        {adminRole !== "master" && (
                          <td>
                            <strong>{client?.mobile}</strong>
                          </td>
                        )}
                        <td>
                          <strong>{client?.balance}</strong>
                        </td>
                        <td>{client?.totalDeposit}</td>
                        <td>{client?.totalWithdraw}</td>
                        <td>{client?.exposure}</td>
                        <td>
                          <span
                            className={`badge  me-1 ${
                              client?.bettingStatus === 1
                                ? "bg-label-primary"
                                : "bg-label-danger"
                            }`}
                          >
                            {client?.bettingStatus === 1
                              ? "Active"
                              : "InActive"}
                          </span>
                        </td>
                        <td>
                          <span
                            className={`badge  me-1 ${
                              client?.userStatus === 1
                                ? "bg-label-primary"
                                : "bg-label-danger"
                            }`}
                          >
                            {client?.userStatus === 1 ? "Active" : "InActive"}
                          </span>
                        </td>
                        <td>{client?.registrationDate}</td>
                        <td>
                          <a
                            style={{
                              color: "white",
                              cursor: `${
                                !readOnly ? "pointer" : "not-allowed"
                              }`,
                            }}
                            onClick={() => {
                              !readOnly &&
                                handleDownLineId(
                                  setClientDeposit,
                                  client?.username,
                                  setDownLineId
                                );
                            }}
                            className="btn btn-icon btn-sm btn-success"
                          >
                            D
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
                                handleNavigate(client?.username, "pnl");
                            }}
                            className="btn btn-icon btn-sm btn-warning"
                          >
                            PL
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
                                handleDownLineId(
                                  setShowChangePassword,
                                  client?.username,
                                  setDownLineId
                                );
                            }}
                            className="btn btn-icon btn-sm btn-info"
                          >
                            P
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
                                handleDownLineId(
                                  setShowChangeStatus,
                                  client?.username,
                                  setDownLineId
                                );
                            }}
                            className="btn btn-icon btn-sm btn-dark"
                          >
                            S
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
                                handleDownLineId(
                                  setShowCreditRef,
                                  client?.username,
                                  setDownLineId
                                );
                            }}
                            className="btn btn-icon btn-sm btn-primary"
                          >
                            CR
                          </a>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
      {isSuccess && clients?.length === 0 && (
        <div className="card">
          <h5 style={{ fontSize: "18px" }} className="card-header">
            No users found with given search query.
          </h5>
        </div>
      )}
    </div>
  );
};

export default ViewClient;

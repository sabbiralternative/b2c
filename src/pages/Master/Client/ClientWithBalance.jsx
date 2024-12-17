import useContextState from "../../../hooks/useContextState";
import { handleDownLineId } from "../../../utils/handleDownLineId";
import { useNavigate } from "react-router-dom";
import { handleSplitUserName } from "../../../utils/handleSplitUserName";
import { Pagination } from "rsuite";
import "rsuite/Pagination/styles/index.css";
import { useState } from "react";
import DirectWithdraw from "../../../components/modal/Master/Client/DirectWithdraw";
import { useClient } from "../../../hooks/Master/Client/useClient";

const ClientWithBalance = () => {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState(1);
  const [directWithdraw, setDirectWithdraw] = useState(false);
  const {
    downLineId,
    setDirectDeposit,
    setClientDeposit,
    setDownLineId,
    setShowChangePassword,
    setShowChangeStatus,
    setShowCreditRef,
    adminRole,
    setRefetchViewClient,
    setClientId,
  } = useContextState();
  const { data } = useClient({
    searchId: "userWithCredit",
    page: activePage,
  });

  const handleNavigate = (username, link) => {
    localStorage.setItem("downLineId", username);
    navigate(`/${link}`);
  };

  const meta = data?.pagination;

  return (
    <>
      <div className="container-xxl flex-grow-1 container-p-y">
        <div className="card">
          <div
            className="card-header"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <h5>Clients</h5>
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
                {data?.result?.map((client, i) => {
                  return (
                    <tr key={i}>
                      <td
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          setClientId(client?.userId);
                          setRefetchViewClient(true);
                          navigate("/view-client");
                        }}
                      >
                        <strong>{client?.userId}</strong>
                      </td>
                      <td
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          setClientId(client?.username);
                          setRefetchViewClient(true);
                          navigate("/view-client");
                        }}
                      >
                        <strong>{handleSplitUserName(client?.username)}</strong>
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
                      <td>
                        {client?.exposure || client?.exposure == 0
                          ? Number(client.exposure).toFixed(0)
                          : client?.exposure}
                      </td>
                      <td>
                        <span
                          className={`badge  me-1 ${
                            client?.bettingStatus === 1
                              ? "bg-label-primary"
                              : "bg-label-danger"
                          }`}
                        >
                          {client?.bettingStatus === 1 ? "Active" : "InActive"}
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
                        {adminRole !== "hyper_master" && (
                          <>
                            <a
                              style={{ color: "white" }}
                              onClick={() =>
                                handleDownLineId(
                                  setClientDeposit,
                                  client?.username,
                                  setDownLineId
                                )
                              }
                              className="btn btn-icon btn-sm btn-success"
                            >
                              D
                            </a>
                            &nbsp;
                            <a
                              style={{ color: "white" }}
                              onClick={() =>
                                handleDownLineId(
                                  setDirectWithdraw,
                                  client?.username,
                                  setDownLineId
                                )
                              }
                              className="btn btn-icon btn-sm btn-danger"
                            >
                              W
                            </a>
                            &nbsp;
                          </>
                        )}
                        <a
                          style={{ color: "white" }}
                          onClick={() => {
                            handleNavigate(client?.username, "pnl");
                          }}
                          className="btn btn-icon btn-sm btn-warning"
                        >
                          PL
                        </a>
                        &nbsp;
                        <a
                          style={{ color: "white" }}
                          onClick={() =>
                            handleDownLineId(
                              setShowChangePassword,
                              client?.username,
                              setDownLineId
                            )
                          }
                          className="btn btn-icon btn-sm btn-info"
                        >
                          P
                        </a>
                        &nbsp;
                        <a
                          style={{ color: "white" }}
                          onClick={() =>
                            handleDownLineId(
                              setShowChangeStatus,
                              client?.username,
                              setDownLineId
                            )
                          }
                          className="btn btn-icon btn-sm btn-dark"
                        >
                          S
                        </a>
                        {adminRole !== "hyper_master" && (
                          <>
                            &nbsp;
                            <a
                              style={{ color: "white" }}
                              onClick={() =>
                                handleDownLineId(
                                  setShowCreditRef,
                                  client?.username,
                                  setDownLineId
                                )
                              }
                              className="btn btn-icon btn-sm btn-primary"
                            >
                              CR
                            </a>
                            &nbsp;
                            <a
                              style={{
                                color: "white",
                              }}
                              onClick={() => {
                                handleDownLineId(
                                  setDirectDeposit,
                                  client?.username,
                                  setDownLineId
                                );
                              }}
                              className="btn btn-icon btn-sm btn-success"
                            >
                              DD
                            </a>
                          </>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        {meta && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "end",
              width: "100%",
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

      {directWithdraw && (
        <DirectWithdraw
          downlineId={downLineId}
          setDirectWithdraw={setDirectWithdraw}
        />
      )}
    </>
  );
};

export default ClientWithBalance;

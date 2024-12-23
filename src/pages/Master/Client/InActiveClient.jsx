import useContextState from "../../../hooks/useContextState";
import { useNavigate } from "react-router-dom";
import { handleSplitUserName } from "../../../utils/handleSplitUserName";
import { useState } from "react";
import DirectWithdraw from "../../../components/modal/Master/Client/DirectWithdraw";
import { useClient } from "../../../hooks/Master/Client/useClient";
import { Pagination } from "rsuite";

const InActiveClient = () => {
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
    payloadRole,
    setPayloadRole,
    setId,
    id,
  } = useContextState();
  const { data } = useClient({
    searchId: "inactiveUsers",
    page: activePage,
  });

  const handleNavigate = (username, link) => {
    localStorage.setItem("downLineId", username);
    navigate(`/${link}`);
  };
  const meta = data?.pagination;

  const handleOpenModal = (setModal, username, role, id) => {
    setModal(true), setDownLineId(username), setPayloadRole(role), setId(id);
  };
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
            <h5>Inactive Clients</h5>
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
                        {" "}
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
                                handleOpenModal(
                                  setClientDeposit,
                                  client?.username,
                                  client?.role,
                                  client?.downlineId
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
                                handleOpenModal(
                                  setDirectWithdraw,
                                  client?.username,
                                  client?.role,
                                  client?.downlineId
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
                            handleOpenModal(
                              setShowChangePassword,
                              client?.username,
                              client?.role,
                              client?.downlineId
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
                            handleOpenModal(
                              setShowChangeStatus,
                              client?.username,
                              client?.role,
                              client?.downlineId
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
                                handleOpenModal(
                                  setShowCreditRef,
                                  client?.username,
                                  client?.role,
                                  client?.downlineId
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
                                handleOpenModal(
                                  setDirectDeposit,
                                  client?.username,
                                  client?.role,
                                  client?.downlineId
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
      </div>
      {directWithdraw && (
        <DirectWithdraw
          id={id}
          role={payloadRole}
          downlineId={downLineId}
          setDirectWithdraw={setDirectWithdraw}
        />
      )}
    </>
  );
};

export default InActiveClient;

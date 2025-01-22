import { useForm } from "react-hook-form";
import useContextState from "../../../hooks/useContextState";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useGetClient from "../../../hooks/Master/Client/useGetClient";
import { handleSplitUserName } from "../../../utils/handleSplitUserName";
import { useEffect, useRef, useState } from "react";
import DirectWithdraw from "../../../components/modal/Master/Client/DirectWithdraw";
import ChangePassword from "../../../components/modal/ChangePassword";
import ClientDeposit from "../../../components/modal/Master/Client/Deposit";
import ChangeStatus from "../../../components/modal/ChangeStatus";
import CreditReference from "../../../components/modal/CreditReference";
import DirectDeposit from "../../../components/modal/Master/Client/DirectDeposit";
import useCloseModalClickOutside from "../../../hooks/useCloseModalClickOutside";
import { jwtDecode } from "jwt-decode";
import { AdminRole } from "../../../constant/constant";
// import useCloseModalClickOutside from "../../../hooks/useCloseModalClickOutside";

const ViewClient = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const searchBy = params.get("role");
  const searchHistory = params.get("history");

  const [depositPermission, setDepositPermission] = useState(false);
  const [withdrawPermission, setWithdrawPermission] = useState(false);
  const [clientPermission, setClientPermission] = useState(false);
  const showMoreRef = useRef(null);
  const [showMore, setShowMore] = useState(null);
  const navigate = useNavigate();
  const [fetchClients, setFetchClients] = useState(false);
  const { handleSubmit } = useForm();
  const [directWithdraw, setDirectWithdraw] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [clientDeposit, setClientDeposit] = useState(false);
  const [directDeposit, setDirectDeposit] = useState(false);
  const [showChangeStatus, setShowChangeStatus] = useState(false);
  const [showCreditRef, setShowCreditRef] = useState(false);
  const [downLineId, setDownLineId] = useState("");
  const [payloadRole, setPayloadRole] = useState("");
  const [id, setId] = useState("");
  const {
    readOnly,
    clientId,
    setClientId,
    adminRole,
    refetchViewClient,
    setRefetchViewClient,
    token,
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
  const handleNavigate = (client) => {
    if (!readOnly) {
      const formatUserId = client?.userId?.split("-")[1];
      navigate(
        `/pnl?id=${formatUserId}&role=${client?.role}&downlineId=${client?.downlineId}`
      );
    }
  };

  useEffect(() => {
    if (refetchViewClient) {
      setFetchClients(true);
      refetchClients();
      setRefetchViewClient(false);
    }
  }, [refetchClients, refetchViewClient, setRefetchViewClient, setClientId]);

  const handleOpenModal = (setModal, username, role, id) => {
    if (!readOnly) {
      setModal(true), setDownLineId(username), setPayloadRole(role), setId(id);
    }
  };

  const handleShowMore = (i) => {
    if (i === showMore) {
      setShowMore(null);
    } else {
      setShowMore(i);
    }
  };

  useCloseModalClickOutside(showMoreRef, () => {
    setShowMore(null);
  });

  useEffect(() => {
    if (adminRole) {
      if (adminRole === "branch_staff") {
        const decode = jwtDecode(token);
        const permissions = decode?.permissions;
        const depositPermission = permissions?.includes("deposit") ?? false;
        const withdrawPermission = permissions?.includes("withdraw") ?? false;
        const clientPermission = permissions?.includes("client") ?? false;
        setDepositPermission(depositPermission);
        setWithdrawPermission(withdrawPermission);
        setClientPermission(clientPermission);
      } else {
        setDepositPermission(true);
        setWithdrawPermission(true);
        setClientPermission(true);
      }
    }
  }, [adminRole, token]);

  return (
    <>
      {clientDeposit && (
        <ClientDeposit
          downlineId={downLineId}
          id={id}
          role={payloadRole}
          setClientDeposit={setClientDeposit}
        />
      )}

      {directWithdraw && (
        <DirectWithdraw
          id={id}
          role={payloadRole}
          downlineId={downLineId}
          setDirectWithdraw={setDirectWithdraw}
        />
      )}

      {showChangePassword && (
        <ChangePassword
          downlineId={downLineId}
          id={id}
          role={payloadRole}
          setShowChangePassword={setShowChangePassword}
        />
      )}
      {showChangeStatus && (
        <ChangeStatus
          downlineId={downLineId}
          id={id}
          registrationStatus={null}
          role={payloadRole}
          setShowChangeStatus={setShowChangeStatus}
        />
      )}
      {showCreditRef && (
        <CreditReference
          downlineId={downLineId}
          id={id}
          role={payloadRole}
          setShowCreditRef={setShowCreditRef}
        />
      )}
      {directDeposit && (
        <DirectDeposit
          downlineId={downLineId}
          id={id}
          role={payloadRole}
          setDirectDeposit={setDirectDeposit}
        />
      )}

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
                    disabled={clientId?.length < 2}
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
              <div
                className="table-responsive text-nowrap"
                style={{ minHeight: "200px" }}
              >
                <table className="table table-hover table-sm">
                  <thead>
                    <tr>
                      <th>User Id</th>
                      {adminRole !== "master" && adminRole !== "checker" && (
                        <th>Username</th>
                      )}
                      {adminRole !== "master" && adminRole !== "checker" && (
                        <th>Mobile</th>
                      )}
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
                      // console.log(client);
                      return (
                        <tr key={i}>
                          <td>
                            <strong>{client?.userId}</strong>
                          </td>
                          {adminRole !== "master" &&
                            adminRole !== "checker" && (
                              <td>
                                <strong>
                                  {handleSplitUserName(client?.username)}
                                </strong>
                              </td>
                            )}

                          {adminRole !== "master" &&
                            adminRole !== "checker" && (
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

                          {/* Not for branch_staff */}
                          {adminRole !== AdminRole.branch_staff && (
                            <td>
                              {adminRole !== "hyper_master" &&
                                adminRole !== "checker" && (
                                  <>
                                    <a
                                      style={{
                                        color: "white",
                                        cursor: `${
                                          !readOnly ? "pointer" : "not-allowed"
                                        }`,
                                      }}
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
                                      style={{
                                        color: "white",
                                        cursor: `${
                                          !readOnly ? "pointer" : "not-allowed"
                                        }`,
                                      }}
                                      onClick={() => {
                                        handleOpenModal(
                                          setDirectWithdraw,
                                          client?.username,
                                          client?.role,
                                          client?.downlineId
                                        );
                                      }}
                                      className="btn btn-icon btn-sm btn-danger"
                                    >
                                      W
                                    </a>
                                    &nbsp;
                                  </>
                                )}
                              <a
                                style={{
                                  color: "white",
                                  cursor: `${
                                    !readOnly ? "pointer" : "not-allowed"
                                  }`,
                                }}
                                onClick={() => handleNavigate(client)}
                                className="btn btn-icon btn-sm btn-warning"
                              >
                                PL
                              </a>
                              {adminRole !== "checker" && (
                                <>
                                  &nbsp;
                                  <a
                                    style={{
                                      color: "white",
                                      cursor: `${
                                        !readOnly ? "pointer" : "not-allowed"
                                      }`,
                                    }}
                                    onClick={() => {
                                      handleOpenModal(
                                        setShowChangePassword,
                                        client?.username,
                                        client?.role,
                                        client?.downlineId
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
                                      handleOpenModal(
                                        setShowChangeStatus,
                                        client?.username,
                                        client?.role,
                                        client?.downlineId
                                      );
                                    }}
                                    className="btn btn-icon btn-sm btn-dark"
                                  >
                                    S
                                  </a>
                                </>
                              )}
                              {adminRole !== "hyper_master" &&
                                adminRole !== "checker" && (
                                  <>
                                    &nbsp;
                                    <a
                                      style={{
                                        color: "white",
                                        cursor: `${
                                          !readOnly ? "pointer" : "not-allowed"
                                        }`,
                                      }}
                                      onClick={() => {
                                        handleOpenModal(
                                          setShowCreditRef,
                                          client?.username,
                                          client?.role,
                                          client?.downlineId
                                        );
                                      }}
                                      className="btn btn-icon btn-sm btn-primary"
                                    >
                                      CR
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
                              &nbsp;
                              {adminRole === "master" ||
                              adminRole === AdminRole.branch_staff ? (
                                <div className="btn-group">
                                  <button
                                    onClick={() => handleShowMore(i)}
                                    style={{
                                      height: "auto",
                                      width: "auto",
                                      padding: "0px 2px",
                                    }}
                                    type="button"
                                    className="btn btn-primary btn-icon  dropdown-toggle hide-arrow"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                  >
                                    <i className="bx bx-dots-vertical-rounded"></i>
                                  </button>

                                  {i === showMore && (
                                    <div
                                      style={{
                                        height: "100vh",
                                        width: "100vw",
                                        position: "fixed",
                                        top: "0",
                                        left: "0",
                                        right: "0",
                                        bottom: "0",
                                        zIndex: 999,
                                      }}
                                    />
                                  )}
                                  {i === showMore && (
                                    <ul
                                      ref={showMoreRef}
                                      style={{
                                        display: "block",
                                        right: "0px",
                                        top: "25px",
                                        zIndex: 9999,
                                      }}
                                      className="dropdown-menu dropdown-menu-end"
                                    >
                                      <li>
                                        <Link
                                          to={`/activity-logs?role=${client?.role}&id=${client?.userId}`}
                                          className="dropdown-item"
                                        >
                                          Activity Logs
                                        </Link>
                                      </li>
                                      <li>
                                        <a className="dropdown-item">
                                          Another action
                                        </a>
                                      </li>
                                    </ul>
                                  )}
                                </div>
                              ) : null}
                            </td>
                          )}
                          {/* For search branch_staff for deposit */}
                          {searchBy === AdminRole.branch_staff &&
                            searchHistory === "deposit" &&
                            depositPermission && (
                              <td>
                                <a
                                  style={{
                                    color: "white",
                                    cursor: `${
                                      !readOnly ? "pointer" : "not-allowed"
                                    }`,
                                  }}
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
                                &nbsp;{" "}
                                <a
                                  style={{
                                    color: "white",
                                    cursor: `${
                                      !readOnly ? "pointer" : "not-allowed"
                                    }`,
                                  }}
                                  onClick={() => {
                                    handleOpenModal(
                                      setShowChangeStatus,
                                      client?.username,
                                      client?.role,
                                      client?.downlineId
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
                              </td>
                            )}
                          {/* For search branch_staff for withdraw */}
                          {searchBy === AdminRole.branch_staff &&
                            searchHistory === "withdraw" &&
                            withdrawPermission && (
                              <td>
                                <a
                                  style={{
                                    color: "white",
                                    cursor: `${
                                      !readOnly ? "pointer" : "not-allowed"
                                    }`,
                                  }}
                                  onClick={() => {
                                    handleOpenModal(
                                      setDirectWithdraw,
                                      client?.username,
                                      client?.role,
                                      client?.downlineId
                                    );
                                  }}
                                  className="btn btn-icon btn-sm btn-danger"
                                >
                                  W
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
                                    handleOpenModal(
                                      setShowChangeStatus,
                                      client?.username,
                                      client?.role,
                                      client?.downlineId
                                    );
                                  }}
                                  className="btn btn-icon btn-sm btn-dark"
                                >
                                  S
                                </a>
                              </td>
                            )}
                          {/* For search branch_staff  */}
                          {adminRole === AdminRole.branch_staff &&
                            !searchBy &&
                            !searchHistory &&
                            clientPermission && (
                              <td>
                                <a
                                  style={{
                                    color: "white",
                                    cursor: `${
                                      !readOnly ? "pointer" : "not-allowed"
                                    }`,
                                  }}
                                  onClick={() => {
                                    handleOpenModal(
                                      setShowChangePassword,
                                      client?.username,
                                      client?.role,
                                      client?.downlineId
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
                                    handleOpenModal(
                                      setShowChangeStatus,
                                      client?.username,
                                      client?.role,
                                      client?.downlineId
                                    );
                                  }}
                                  className="btn btn-icon btn-sm btn-dark"
                                >
                                  S
                                </a>
                                &nbsp;
                                {adminRole === "master" ||
                                adminRole === AdminRole.branch_staff ? (
                                  <div className="btn-group">
                                    <button
                                      onClick={() => handleShowMore(i)}
                                      style={{
                                        height: "auto",
                                        width: "auto",
                                        padding: "0px 2px",
                                      }}
                                      type="button"
                                      className="btn btn-primary btn-icon  dropdown-toggle hide-arrow"
                                      data-bs-toggle="dropdown"
                                      aria-expanded="false"
                                    >
                                      <i className="bx bx-dots-vertical-rounded"></i>
                                    </button>

                                    {i === showMore && (
                                      <div
                                        style={{
                                          height: "100vh",
                                          width: "100vw",
                                          position: "fixed",
                                          top: "0",
                                          left: "0",
                                          right: "0",
                                          bottom: "0",
                                          zIndex: 999,
                                        }}
                                      />
                                    )}
                                    {i === showMore && (
                                      <ul
                                        ref={showMoreRef}
                                        style={{
                                          display: "block",
                                          right: "0px",
                                          top: "25px",
                                          zIndex: 9999,
                                        }}
                                        className="dropdown-menu dropdown-menu-end"
                                      >
                                        <li>
                                          <Link
                                            to={`/activity-logs?role=${client?.role}&id=${client?.userId}`}
                                            className="dropdown-item"
                                          >
                                            Activity Logs
                                          </Link>
                                        </li>
                                        <li>
                                          <a className="dropdown-item">
                                            Another action
                                          </a>
                                        </li>
                                      </ul>
                                    )}
                                  </div>
                                ) : null}
                              </td>
                            )}
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
    </>
  );
};

export default ViewClient;

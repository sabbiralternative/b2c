import { Fragment, useRef, useState } from "react";
import useContextState from "../../hooks/useContextState";
import { AdminRole } from "../../constant/constant";
import { Link, useNavigate } from "react-router-dom";
import useCloseModalClickOutside from "../../hooks/useCloseModalClickOutside";
import DirectDeposit from "../modal/Master/Client/DirectDeposit";
import ChangePassword from "../modal/ChangePassword";
import ClientDeposit from "../modal/Master/Client/Deposit";
import ChangeStatus from "../modal/ChangeStatus";
import CreditReference from "../modal/CreditReference";
import DirectWithdraw from "../modal/Master/Client/DirectWithdraw";
import ChangeColor from "../modal/ChangeColor";
import ChangeBranch from "../modal/HyperMaster/Client/ChangeBranch";
import { usePermission } from "../../hooks/use-permission";

const ClientAction = ({ refetchClient, client, index }) => {
  const { permissions } = usePermission();
  const navigate = useNavigate();
  const [showColor, setShowColor] = useState(false);
  const [directWithdraw, setDirectWithdraw] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [clientDeposit, setClientDeposit] = useState(false);
  const [directDeposit, setDirectDeposit] = useState(false);
  const [showChangeStatus, setShowChangeStatus] = useState(false);
  const [showCreditRef, setShowCreditRef] = useState(false);
  const [downLineId, setDownLineId] = useState("");
  const [payloadRole, setPayloadRole] = useState("");
  const [id, setId] = useState("");
  const [showChangeBranch, setShowChangeBranch] = useState(false);
  const { adminRole, readOnly } = useContextState();

  const [showMore, setShowMore] = useState(null);
  const showMoreRef = useRef();
  useCloseModalClickOutside(showMoreRef, () => {
    setShowMore(null);
  });
  const handleNavigate = (client) => {
    if (!readOnly) {
      const formatUserId = client?.userId?.split("-")[1];
      navigate(
        `/pnl?id=${formatUserId}&role=${client?.role}&downlineId=${client?.downlineId}`
      );
    }
  };

  const handleOpenModal = (setModal, username, role, id) => {
    setModal(true), setDownLineId(username), setPayloadRole(role), setId(id);
  };

  const handleShowMore = (i) => {
    if (i === showMore) {
      setShowMore(null);
    } else {
      setShowMore(i);
    }
  };

  return (
    <Fragment>
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
          refetchAllBranch={refetchClient}
        />
      )}
      {showChangeStatus && (
        <ChangeStatus
          downlineId={downLineId}
          id={id}
          registrationStatus={null}
          role={payloadRole}
          setShowChangeStatus={setShowChangeStatus}
          refetchAllBranch={refetchClient}
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
      {showColor && (
        <ChangeColor
          downlineId={downLineId}
          id={id}
          role={payloadRole}
          setShowColor={setShowColor}
        />
      )}
      {showChangeBranch && (
        <ChangeBranch
          downlineId={downLineId}
          id={id}
          role={payloadRole}
          setShowChangeBranch={setShowChangeBranch}
          refetchClient={refetchClient}
        />
      )}
      {adminRole !== "hyper_master" &&
        adminRole !== AdminRole.branch_staff &&
        adminRole !== "admin_staff" && (
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
          </>
        )}
      {adminRole !== AdminRole.branch_staff && (
        <>
          <a
            style={{ color: "white" }}
            onClick={() => handleNavigate(client)}
            className="btn btn-icon btn-sm btn-warning"
          >
            PL
          </a>
        </>
      )}
      {permissions.includes("client") &&
        adminRole !== AdminRole.master &&
        adminRole !== AdminRole.hyper_master && (
          <Fragment>
            {permissions.includes("deposit") && (
              <Fragment>
                <a
                  style={{
                    color: "white",
                    cursor: `${!readOnly ? "pointer" : "not-allowed"}`,
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

                <a
                  style={{
                    color: "white",
                    cursor: `${!readOnly ? "pointer" : "not-allowed"}`,
                  }}
                  onClick={() => {
                    handleOpenModal(
                      setClientDeposit,
                      client?.username,
                      client?.role,
                      client?.downlineId
                    );
                  }}
                  className="btn btn-icon btn-sm btn-primary"
                >
                  D
                </a>
              </Fragment>
            )}
            {permissions.includes("withdraw") && (
              <Fragment>
                <a
                  style={{
                    color: "white",
                    cursor: `${!readOnly ? "pointer" : "not-allowed"}`,
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
              </Fragment>
            )}
            {/* <a
                                style={{ color: "white" }}
                                onClick={() => {
                                  setShowMore(false);
                                  handleOpenModal(
                                    setShowChangePassword,
                                    client?.username,
                                    client?.role,
                                    client?.downlineId
                                  );
                                }}
                                className="btn btn-icon btn-sm btn-success"
                              >
                                P
                              </a> */}
            {/* {adminRole !== "admin_staff" && (
                                <a
                                  style={{ color: "white" }}
                                  onClick={() => {
                                    setShowMore(false);
                                    handleOpenModal(
                                      setShowChangeStatus,
                                      client?.username,
                                      client?.role,
                                      client?.downlineId
                                    );
                                  }}
                                  className="btn btn-icon btn-sm btn-label-secondary"
                                >
                                  S
                                </a>
                              )} */}
          </Fragment>
        )}
      {adminRole == AdminRole.hyper_master ||
      adminRole === AdminRole.admin_staff ? (
        <Fragment>
          <a
            style={{ color: "white" }}
            onClick={() => navigate(`/change-branch-report/${client?.userId}`)}
            className="btn btn-icon btn-sm btn-info"
          >
            B
          </a>
          {((adminRole === AdminRole.admin_staff &&
            permissions?.includes("change_branch")) ||
            adminRole == AdminRole.hyper_master) && (
            <a
              style={{ color: "white" }}
              onClick={() => {
                handleOpenModal(
                  setShowChangeBranch,
                  client?.username,
                  client?.role,
                  client?.downlineId
                );
              }}
              className="btn btn-icon btn-sm btn-danger"
            >
              M
            </a>
          )}
        </Fragment>
      ) : null}
      {adminRole !== AdminRole.hyper_master &&
        adminRole !== AdminRole.branch_staff &&
        adminRole !== "admin_staff" && (
          <>
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

      {adminRole === "master" || adminRole === AdminRole.branch_staff ? (
        <div className="btn-group">
          <button
            onClick={() => handleShowMore(index)}
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

          {index === showMore && (
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
          {index === showMore && (
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
              {permissions.includes("depositWithSlip") && (
                <li
                  onClick={() => {
                    setShowMore(false);
                    handleOpenModal(
                      setClientDeposit,
                      client?.username,
                      client?.role,
                      client?.downlineId
                    );
                  }}
                >
                  <a className="dropdown-item">Deposit With Slip</a>
                </li>
              )}
              {permissions?.includes("directWithdraw") && (
                <li
                  onClick={() => {
                    setShowMore(false);
                    handleOpenModal(
                      setDirectWithdraw,
                      client?.username,
                      client?.role,
                      client?.downlineId
                    );
                  }}
                >
                  <a className="dropdown-item">Withdraw</a>
                </li>
              )}
              {permissions?.includes("directDeposit") && (
                <li
                  onClick={() => {
                    setShowMore(false);
                    handleOpenModal(
                      setDirectDeposit,
                      client?.username,
                      client?.role,
                      client?.downlineId
                    );
                  }}
                >
                  <a className="dropdown-item">Direct Deposit</a>
                </li>
              )}

              <li>
                <Link
                  to={`/activity-logs?role=${client?.role}&id=${client?.userId}`}
                  className="dropdown-item"
                >
                  Activity Logs
                </Link>
              </li>
              <li
                onClick={() => {
                  setShowMore(false);
                  handleOpenModal(
                    setShowColor,
                    client?.username,
                    client?.role,
                    client?.downlineId
                  );
                }}
              >
                <a className="dropdown-item">Client Group</a>
              </li>
              {permissions.includes("client") &&
                adminRole !== "admin_staff" && (
                  <>
                    {permissions.includes("password") && (
                      <li
                        onClick={() => {
                          setShowMore(false);
                          handleOpenModal(
                            setShowChangePassword,
                            client?.username,
                            client?.role,
                            client?.downlineId
                          );
                        }}
                      >
                        <a className="dropdown-item">Change Password</a>
                      </li>
                    )}

                    <li
                      onClick={() => {
                        setShowMore(false);
                        handleOpenModal(
                          setShowChangeStatus,
                          client?.username,
                          client?.role,
                          client?.downlineId
                        );
                      }}
                    >
                      <a className="dropdown-item">Change Status</a>
                    </li>
                  </>
                )}
              {adminRole !== AdminRole.hyper_master &&
                adminRole !== AdminRole.branch_staff &&
                adminRole !== "admin_staff" &&
                adminRole !== AdminRole.master && (
                  <li
                    onClick={() => {
                      setShowMore(false);
                      handleOpenModal(
                        setShowCreditRef,
                        client?.username,
                        client?.role,
                        client?.downlineId
                      );
                    }}
                  >
                    <a className="dropdown-item">Credit Reference</a>
                  </li>
                )}
            </ul>
          )}
        </div>
      ) : null}
    </Fragment>
  );
};

export default ClientAction;

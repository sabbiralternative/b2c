import { useForm } from "react-hook-form";
import useContextState from "../../hooks/useContextState";
import { useLocation, useNavigate } from "react-router-dom";
import useGetClient from "../../hooks/Master/Client/useGetClient";
// import { handleSplitUserName } from "../../../../utils/handleSplitUserName";
import { useEffect, useRef, useState } from "react";
import DirectWithdraw from "../../components/modal/Master/Client/DirectWithdraw";
import ChangePassword from "../../components/modal/ChangePassword";
import ClientDeposit from "../../components/modal/Master/Client/Deposit";
import ChangeStatus from "../../components/modal/ChangeStatus";
import CreditReference from "../../components/modal/CreditReference";
import DirectDeposit from "../../components/modal/Master/Client/DirectDeposit";
import useCloseModalClickOutside from "../../hooks/useCloseModalClickOutside";
import { AdminRole } from "../../constant/constant";
import ClientWithdrawDeposit from "../../components/module/ViewClient/ClientWithdrawDeposit";
import DepositPermission from "../../components/module/ViewClient/DepositPermission";
import ClientPermission from "../../components/module/ViewClient/ClientPermission";
import WithdrawPermission from "../../components/module/ViewClient/WithdrawPermission";
import OtherRoleAction from "../../components/module/ViewClient/OtherRoleAction";
import DepositClient from "../../components/module/ViewClient/DepositClient";
import DepositWithdraw from "../../components/module/ViewClient/DepositWithdraw";
import WithdrawClient from "../../components/module/ViewClient/WithdrawClient";
import ChangeColor from "../../components/modal/ChangeColor";
import ChangeBranch from "../../components/modal/HyperMaster/Client/ChangeBranch";
import handleNavigateToWhatsApp from "../../utils/handleNavigateToWhatsApp";
import Loader from "../../components/ui/Loader/Loader";
import { usePermission } from "../../hooks/use-permission";
import LevelTable from "../../components/shared/LevelTable/LevelTable";

// import useCloseModalClickOutside from "../../../hooks/useCloseModalClickOutside";

const ViewClient = () => {
  const { permissions } = usePermission();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const searchBy = params.get("role");
  const searchHistory = params.get("history");
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
  const [showColor, setShowColor] = useState(false);
  const [showChangeBranch, setShowChangeBranch] = useState(false);
  const {
    readOnly,
    clientId,
    setClientId,
    adminRole,
    refetchViewClient,
    setRefetchViewClient,
    token,
  } = useContextState();
  const { clients, refetchClients, isSuccess, isLoading } = useGetClient(
    clientId,
    setFetchClients,
    fetchClients,
  );

  const onSubmit = async () => {
    setFetchClients(true);
    refetchClients();
  };
  const handleNavigate = (client) => {
    if (!readOnly) {
      const formatUserId = client?.userId?.split("-")[1];
      navigate(
        `/pnl?id=${formatUserId}&role=${client?.role}&downlineId=${client?.downlineId}`,
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
      (setModal(true),
        setDownLineId(username),
        setPayloadRole(role),
        setId(id));
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
    if (showColor || showChangeStatus || showCreditRef || showChangePassword) {
      setShowMore(false);
    }
  }, [
    adminRole,
    token,
    showColor,
    showChangePassword,
    showChangeStatus,
    showCreditRef,
  ]);

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
          refetchAllBranch={refetchClients}
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
          refetchClient={refetchClients}
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
                style={{ minHeight: showMore !== null ? "300px" : "auto" }}
              >
                <table className="table table-hover table-sm">
                  <thead>
                    <tr>
                      <th>Level</th>
                      <th>User Id</th>
                      {clients?.[0]?.username2Visible && <th>Username</th>}

                      {adminRole == AdminRole.hyper_master ||
                      adminRole == "admin_staff" ? (
                        <th>Branch</th>
                      ) : null}
                      {/* {adminRole !== "master" &&
                        adminRole !== "admin_staff" && <th>Username</th>} */}
                      {adminRole !== "master" &&
                        adminRole !== "admin_staff" && <th>Mobile</th>}
                      <th>Balance</th>
                      <th>Total Deposit</th>
                      <th>Total Withdraw</th>
                      <th>Exposure</th>
                      <th>Betting Status</th>
                      <th>Status</th>
                      <th>Site</th>
                      <th>Reg. Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody className="table-border-bottom-0">
                    {clients?.map((client, i) => {
                      return (
                        <tr key={i}>
                          <td>
                            <strong>{client?.level}</strong>
                          </td>
                          <td>
                            {/* <span
                              style={{
                                backgroundColor: clientColor?.[client?.color],
                                width: "8px",
                                height: "8px",
                                borderRadius: "50%",
                                display: "inline-block",
                                marginRight: "5px",
                              }}
                            ></span> */}
                            <strong>{client?.userId}</strong>
                          </td>
                          {client?.username2Visible && (
                            <td>{client?.username2}</td>
                          )}

                          {adminRole == AdminRole.hyper_master ||
                          adminRole == "admin_staff" ? (
                            <td>
                              <strong>{client?.branch}</strong>
                            </td>
                          ) : null}
                          {/* {adminRole !== "master" &&
                            adminRole !== "admin_staff" && (
                              <td>
                                <strong>
                                  {handleSplitUserName(client?.username)}
                                </strong>
                              </td>
                            )} */}

                          {adminRole !== "master" &&
                            adminRole !== "admin_staff" && (
                              <td
                                style={{
                                  cursor:
                                    adminRole === AdminRole.hyper_master
                                      ? "pointer"
                                      : "auto",
                                }}
                                onClick={() =>
                                  handleNavigateToWhatsApp(
                                    adminRole,
                                    client?.mobile,
                                  )
                                }
                              >
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
                          <td>{client?.site}</td>
                          <td>{client?.registrationDate}</td>

                          {/* Not for branch_staff */}
                          {adminRole !== AdminRole.branch_staff && (
                            <OtherRoleAction
                              setShowChangeBranch={setShowChangeBranch}
                              adminRole={adminRole}
                              client={client}
                              handleNavigate={handleNavigate}
                              handleOpenModal={handleOpenModal}
                              handleShowMore={handleShowMore}
                              i={i}
                              readOnly={readOnly}
                              setClientDeposit={setClientDeposit}
                              setDirectDeposit={setDirectDeposit}
                              setDirectWithdraw={setDirectWithdraw}
                              setShowChangePassword={setShowChangePassword}
                              setShowChangeStatus={setShowChangeStatus}
                              setShowCreditRef={setShowCreditRef}
                              showMore={showMore}
                              showMoreRef={showMoreRef}
                              setShowColor={setShowColor}
                            />
                          )}

                          {/* For search branch_staff for deposit */}
                          {searchBy === AdminRole.branch_staff &&
                            permissions.includes("deposit") &&
                            !permissions.includes("withdraw") &&
                            !permissions.includes("client") && (
                              <DepositPermission
                                client={client}
                                handleNavigate={handleNavigate}
                                handleOpenModal={handleOpenModal}
                                readOnly={readOnly}
                                setClientDeposit={setClientDeposit}
                                setDirectDeposit={setDirectDeposit}
                                setShowChangeStatus={setShowChangeStatus}
                              />
                            )}
                          {/* For search branch_staff for withdraw */}
                          {searchBy === AdminRole.branch_staff &&
                            permissions.includes("withdraw") &&
                            !permissions.includes("deposit") &&
                            !permissions.includes("client") && (
                              <WithdrawPermission
                                client={client}
                                handleNavigate={handleNavigate}
                                handleOpenModal={handleOpenModal}
                                readOnly={readOnly}
                                setDirectWithdraw={setDirectWithdraw}
                                setShowChangeStatus={setShowChangeStatus}
                              />
                            )}
                          {/* For search branch_staff  */}
                          {adminRole === AdminRole.branch_staff &&
                            !searchBy &&
                            !searchHistory && (
                              <ClientPermission
                                adminRole={adminRole}
                                client={client}
                                handleNavigate={handleNavigate}
                                handleOpenModal={handleOpenModal}
                                handleShowMore={handleShowMore}
                                i={i}
                                readOnly={readOnly}
                                setShowChangePassword={setShowChangePassword}
                                setShowChangeStatus={setShowChangeStatus}
                                showMore={showMore}
                                showMoreRef={showMoreRef}
                                permissions={permissions}
                                setDirectDeposit={setDirectDeposit}
                                setDirectWithdraw={setDirectWithdraw}
                                setClientDeposit={setClientDeposit}
                              />
                            )}

                          {/* all */}
                          {searchBy === AdminRole.branch_staff &&
                            permissions.includes("deposit") &&
                            permissions.includes("withdraw") &&
                            permissions.includes("client") && (
                              <ClientWithdrawDeposit
                                client={client}
                                handleNavigate={handleNavigate}
                                handleOpenModal={handleOpenModal}
                                readOnly={readOnly}
                                setClientDeposit={setClientDeposit}
                                setDirectDeposit={setDirectDeposit}
                                setDirectWithdraw={setDirectWithdraw}
                                setShowChangePassword={setShowChangePassword}
                                setShowChangeStatus={setShowChangeStatus}
                              />
                            )}

                          {/* deposit client */}
                          {searchBy === AdminRole.branch_staff &&
                            permissions.includes("deposit") &&
                            !permissions.includes("withdraw") &&
                            permissions.includes("client") && (
                              <DepositClient
                                client={client}
                                handleNavigate={handleNavigate}
                                handleOpenModal={handleOpenModal}
                                readOnly={readOnly}
                                setClientDeposit={setClientDeposit}
                                setDirectDeposit={setDirectDeposit}
                                setShowChangePassword={setShowChangePassword}
                                setShowChangeStatus={setShowChangeStatus}
                              />
                            )}
                          {/* deposit withdraw */}
                          {searchBy === AdminRole.branch_staff &&
                            permissions.includes("deposit") &&
                            permissions.includes("withdraw") &&
                            !permissions.includes("client") && (
                              <DepositWithdraw
                                setDirectWithdraw={setDirectWithdraw}
                                client={client}
                                handleNavigate={handleNavigate}
                                handleOpenModal={handleOpenModal}
                                readOnly={readOnly}
                                setClientDeposit={setClientDeposit}
                                setDirectDeposit={setDirectDeposit}
                                setShowChangeStatus={setShowChangeStatus}
                              />
                            )}
                          {/* withdraw client */}
                          {searchBy === AdminRole.branch_staff &&
                            !permissions.includes("deposit") &&
                            permissions.includes("withdraw") &&
                            permissions.includes("client") && (
                              <WithdrawClient
                                client={client}
                                handleNavigate={handleNavigate}
                                handleOpenModal={handleOpenModal}
                                readOnly={readOnly}
                                setShowChangeStatus={setShowChangeStatus}
                                setDirectWithdraw={setDirectWithdraw}
                                setShowChangePassword={setShowChangePassword}
                              />
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
        <LevelTable />

        {isLoading && !isSuccess && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Loader />
          </div>
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

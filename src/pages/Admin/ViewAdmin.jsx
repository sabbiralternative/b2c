import { useAdminQuery } from "../../hooks/admin";
import { useState } from "react";
import ClientDeposit from "../../components/modal/Master/Client/Deposit";
import DirectWithdraw from "../../components/modal/Master/Client/DirectWithdraw";
import ChangePassword from "../../components/modal/ChangePassword";
import CreditReference from "../../components/modal/CreditReference";

const ViewAdmin = () => {
  const [downLineId, setDownLineId] = useState("");
  const [id, setId] = useState("");
  const [showCreditRef, setShowCreditRef] = useState(false);
  const [clientDeposit, setClientDeposit] = useState(false);
  const [directWithdraw, setDirectWithdraw] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [payloadRole, setPayloadRole] = useState("");
  const { data, refetch } = useAdminQuery({
    type: "viewAdmin",
  });
  const handleOpenModal = (setModal, username, role, id) => {
    setModal(true);
    setDownLineId(username);
    setPayloadRole(role);
    setId(id);
  };

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
          refetch={refetch}
        />
      )}
      {showCreditRef && (
        <CreditReference
          downlineId={downLineId}
          id={id}
          role={payloadRole}
          setShowCreditRef={setShowCreditRef}
          refetch={refetch}
        />
      )}
      <div className="container-xxl flex-grow-1 container-p-y">
        <div className="card">
          <h5 className="card-header">View Admin</h5>
          <div className="table-responsive text-nowrap">
            <table className="table table-hover table-sm">
              <thead className="table-dark">
                <tr>
                  <th>Username </th>
                  <th>Credit Reference </th>
                  <th>Balance</th>
                  <th>PNL</th>
                  <th>User Status </th>
                  <th>Betting Status</th>
                  <th>Reg. Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody className="table-border-bottom-0">
                {data?.result?.map((admin, i) => {
                  return (
                    <tr key={i}>
                      <td>{admin?.username}</td>
                      <td>{admin?.creditReferance}</td>
                      <td>{admin?.balance}</td>
                      <td
                        className={`${admin?.pnl?.startsWith("-") || admin?.pnl?.startsWith("0") ? "text-danger" : "text-success"}`}
                      >
                        {admin?.pnl}
                      </td>
                      <td>
                        <span
                          className={`badge  me-1 ${
                            admin?.userStatus === 1
                              ? "bg-label-primary"
                              : "bg-label-danger"
                          }`}
                        >
                          {admin?.userStatus === 1 ? "active" : "inactive"}
                        </span>
                      </td>
                      <td>
                        <span
                          className={`badge  me-1 ${
                            admin?.bettingStatus === 1
                              ? "bg-label-primary"
                              : "bg-label-danger"
                          }`}
                        >
                          {admin?.bettingStatus === 1 ? "active" : "inactive"}
                        </span>
                      </td>

                      <td>{admin?.registrationDate}</td>
                      <td
                        style={{ display: "flex", color: "white", gap: "4px" }}
                      >
                        <a
                          className="btn btn-icon btn-sm btn-success"
                          onClick={() => {
                            handleOpenModal(
                              setShowCreditRef,
                              admin?.username,
                              admin?.role,
                              admin?.downlineId,
                            );
                          }}
                        >
                          CR
                        </a>
                        <a
                          className="btn btn-icon btn-sm btn-warning"
                          onClick={() =>
                            handleOpenModal(
                              setClientDeposit,
                              admin?.username,
                              admin?.role,
                              admin?.downlineId,
                            )
                          }
                        >
                          D
                        </a>
                        <a
                          className="btn btn-icon btn-sm btn-primary"
                          onClick={() => {
                            handleOpenModal(
                              setDirectWithdraw,
                              admin?.username,
                              admin?.role,
                              admin?.downlineId,
                            );
                          }}
                        >
                          W
                        </a>
                        <a
                          className="btn btn-icon btn-sm btn-danger"
                          onClick={() => {
                            handleOpenModal(
                              setShowChangePassword,
                              admin?.username,
                              admin?.role,
                              admin?.downlineId,
                            );
                          }}
                        >
                          P
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewAdmin;

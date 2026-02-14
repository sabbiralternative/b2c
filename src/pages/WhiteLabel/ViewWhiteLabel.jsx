import { useState } from "react";
import UpdateChecker from "../../components/modal/HyperMaster/Staff/UpdateChecker";
import UpdatePassword from "../../components/modal/HyperMaster/Staff/UpdatePassword";
import { useWhiteLabel } from "../../hooks/AdminMaster/whiteLabel";
import Deposit from "../../components/modal/Master/Client/Deposit";
import DirectWithdraw from "../../components/modal/Master/Client/DirectWithdraw";
import ChangePassword from "../../components/modal/ChangePassword";
import CreditReference from "../../components/modal/CreditReference";
import { useNavigate } from "react-router-dom";

const ViewWhiteLabel = () => {
  const navigate = useNavigate();
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [showCreditRefModal, setShowCreditRefModal] = useState(false);
  const [downLineId, setDownLineId] = useState("");
  const [payloadRole, setPayloadRole] = useState("");
  const [id, setId] = useState("");
  const [updateStatusId, setUpdateStatusId] = useState(null);
  const [updatePasswordId, setUpdatePasswordId] = useState(null);
  const { data, refetch } = useWhiteLabel({
    type: "viewWhitelabel",
  });

  const handleOpenModal = (setModal, username, role, id) => {
    (setModal(true), setDownLineId(username), setPayloadRole(role), setId(id));
  };

  return (
    <>
      {updateStatusId && (
        <UpdateChecker
          setUpdateStatusId={setUpdateStatusId}
          updateStatusId={updateStatusId}
        />
      )}
      {updatePasswordId && (
        <UpdatePassword
          setUpdatePasswordId={setUpdatePasswordId}
          updatePasswordId={updatePasswordId}
        />
      )}

      {showDepositModal && (
        <Deposit
          downlineId={downLineId}
          id={id}
          role={payloadRole}
          setClientDeposit={setShowDepositModal}
        />
      )}

      {showWithdrawModal && (
        <DirectWithdraw
          id={id}
          role={payloadRole}
          downlineId={downLineId}
          setDirectWithdraw={setShowWithdrawModal}
        />
      )}

      {showChangePasswordModal && (
        <ChangePassword
          downlineId={downLineId}
          id={id}
          role={payloadRole}
          setShowChangePassword={setShowChangePasswordModal}
          refetchAllBranch={refetch}
        />
      )}

      {showCreditRefModal && (
        <CreditReference
          downlineId={downLineId}
          id={id}
          role={payloadRole}
          setShowCreditRef={setShowCreditRefModal}
        />
      )}

      <div className="container-xxl flex-grow-1 container-p-y">
        <div className="card">
          <h5 className="card-header">White Label</h5>
          <div className="table-responsive text-nowrap">
            <table className="table table-hover table-sm">
              <thead className="table-dark">
                <tr>
                  <th>Site Name</th>
                  <th>Site URL</th>
                  <th>Admin</th>
                  <th>Theme</th>
                  <th>Deposit Limit</th>
                  <th>Withdraw Limit</th>
                  <th>Casino Currency </th>
                  <th>Currency </th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody className="table-border-bottom-0">
                {data?.result?.map((whiteLabel, i) => {
                  return (
                    <tr key={i}>
                      <td>{whiteLabel?.site_name}</td>
                      <td>{whiteLabel?.site_url}</td>
                      <td>{whiteLabel?.admin}</td>
                      <td>{whiteLabel?.theme}</td>
                      <td>{whiteLabel?.deposit_limit}</td>
                      <td>{whiteLabel?.withdraw_limit}</td>
                      <td>{whiteLabel?.casino_currency}</td>
                      <td>{whiteLabel?.currency}</td>

                      <td style={{ display: "flex", color: "white" }}>
                        <a
                          onClick={() =>
                            handleOpenModal(
                              setShowDepositModal,
                              whiteLabel?.username,
                              whiteLabel?.role,
                              whiteLabel?.downlineId,
                            )
                          }
                          className="btn btn-icon btn-sm btn-success"
                        >
                          D
                        </a>
                        &nbsp;
                        <a
                          onClick={() =>
                            handleOpenModal(
                              setShowWithdrawModal,
                              whiteLabel?.username,
                              whiteLabel?.role,
                              whiteLabel?.downlineId,
                            )
                          }
                          className="btn btn-icon btn-sm btn-danger"
                        >
                          W
                        </a>
                        &nbsp;
                        <a
                          onClick={() => {
                            handleOpenModal(
                              setShowChangePasswordModal,
                              whiteLabel?.username,
                              whiteLabel?.role,
                              whiteLabel?.downlineId,
                            );
                          }}
                          className="btn btn-icon btn-sm btn-info"
                        >
                          P
                        </a>
                        &nbsp;
                        <a
                          style={{ color: "white" }}
                          onClick={() => {
                            handleOpenModal(
                              setShowCreditRefModal,
                              whiteLabel?.username,
                              whiteLabel?.role,
                              whiteLabel?.downlineId,
                            );
                          }}
                          className="btn btn-icon btn-sm btn-primary"
                        >
                          CR
                        </a>
                        &nbsp;
                        <a
                          style={{ color: "white" }}
                          onClick={() =>
                            navigate(
                              `/update-whitelabel?whitelabel_id=${whiteLabel?.whitelabel_id}`,
                            )
                          }
                          className="btn btn-icon btn-sm btn-warning"
                        >
                          E
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

export default ViewWhiteLabel;

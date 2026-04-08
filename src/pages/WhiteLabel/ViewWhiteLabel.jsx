import { useRef, useState } from "react";
import UpdateChecker from "../../components/modal/HyperMaster/Staff/UpdateChecker";
import UpdatePassword from "../../components/modal/HyperMaster/Staff/UpdatePassword";
import { useWhiteLabel } from "../../hooks/AdminMaster/whiteLabel";
import Deposit from "../../components/modal/Master/Client/Deposit";
import DirectWithdraw from "../../components/modal/Master/Client/DirectWithdraw";
import ChangePassword from "../../components/modal/ChangePassword";
import CreditReference from "../../components/modal/CreditReference";
import { useNavigate } from "react-router-dom";
import useCloseModalClickOutside from "../../hooks/useCloseModalClickOutside";
import AddLogo from "../../components/modal/WhiteLable/AddLogo";
import AddTheme from "../../components/modal/WhiteLable/AddTheme";
import AddFavicon from "../../components/modal/WhiteLable/AddFavicon";

const ViewWhiteLabel = () => {
  const [modal, setModal] = useState({
    name: "",
    site: "",
  });
  const [showMore, setShowMore] = useState(null);
  const showMoreRef = useRef();
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
          refetch={refetch}
        />
      )}

      {showCreditRefModal && (
        <CreditReference
          downlineId={downLineId}
          id={id}
          role={payloadRole}
          setShowCreditRef={setShowCreditRefModal}
          refetch={refetch}
        />
      )}
      {modal.name === "addLogo" && (
        <AddLogo modal={modal} refetch={refetch} setModal={setModal} />
      )}
      {modal.name === "addTheme" && (
        <AddTheme modal={modal} refetch={refetch} setModal={setModal} />
      )}
      {modal.name === "addFavicon" && (
        <AddFavicon modal={modal} refetch={refetch} setModal={setModal} />
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
                  <th>Assets</th>
                  <th>Deposit Limit</th>
                  <th>Withdraw Limit</th>
                  <th>Casino Currency </th>
                  <th>Currency </th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody className="table-border-bottom-0">
                {data?.result?.map((whiteLabel, index) => {
                  return (
                    <tr key={index}>
                      <td>{whiteLabel?.site_name}</td>
                      <td
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          window.open(`https://${whiteLabel?.site_url}`)
                        }
                      >
                        {whiteLabel?.site_url}
                      </td>
                      <td>{whiteLabel?.admin}</td>
                      <td>{whiteLabel?.theme}</td>
                      <td
                        style={{
                          display: "flex",
                          gap: "0px 5px",
                          color: "white",
                        }}
                      >
                        <a
                          className="btn btn-icon btn-sm btn-success"
                          onClick={() =>
                            window.open(`https://mythemedata.com/sitethemes/${whiteLabel?.site_url}/logo.${whiteLabel?.logo_format}
`)
                          }
                        >
                          L
                        </a>
                        <a
                          className="btn btn-icon btn-sm btn-danger"
                          onClick={() =>
                            window.open(`https://mythemedata.com/sitethemes/${whiteLabel?.site_url}/theme.css
`)
                          }
                        >
                          T
                        </a>
                        <a
                          className="btn btn-icon btn-sm btn-info"
                          onClick={() =>
                            window.open(`https://mythemedata.com/sitethemes/${whiteLabel?.site_url}/favicon.png
`)
                          }
                        >
                          F
                        </a>
                      </td>
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
                        &nbsp;
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
                              <li
                                onClick={() => {
                                  setModal({
                                    name: "addLogo",
                                    site: whiteLabel?.site_url,
                                  });
                                  setShowMore(null);
                                }}
                              >
                                <a className="dropdown-item">Add Logo</a>
                              </li>
                              <li
                                onClick={() => {
                                  setModal({
                                    name: "addTheme",
                                    site: whiteLabel?.site_url,
                                  });
                                  setShowMore(null);
                                }}
                              >
                                <a className="dropdown-item">Add Theme.css</a>
                              </li>
                              <li
                                onClick={() => {
                                  setModal({
                                    name: "addFavicon",
                                    site: whiteLabel?.site_url,
                                  });
                                  setShowMore(null);
                                }}
                              >
                                <a className="dropdown-item">Add Favicon</a>
                              </li>
                            </ul>
                          )}
                        </div>
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

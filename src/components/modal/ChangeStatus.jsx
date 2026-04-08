import { useEffect, useRef, useState } from "react";
import useCloseModalClickOutside from "../../hooks/useCloseModalClickOutside";
import useGetStatus from "../../hooks/HyperMaster/Branch/useGetStatus";

import { API } from "../../api";
import toast from "react-hot-toast";
import { AxiosSecure } from "../../lib/AxiosSecure";

const ChangeStatus = ({
  setShowChangeStatus,
  downlineId,
  role,
  id,
  refetchClients,
}) => {
  const [disabled, setDisabled] = useState(false);

  /* close modal ck=lick outside */
  const statusRef = useRef();
  useCloseModalClickOutside(statusRef, () => {
    setShowChangeStatus(false);
  });

  const [betStatus, setBetStatus] = useState(false);
  const [userStatus, setUserStatus] = useState(false);
  const [withdrawStatus, setWithdrawStatus] = useState(false);

  const { status } = useGetStatus({
    downlineId,
    type: "getStatus",
    id,
    role,
  });

  /* handle edit user lock */
  const handleChangeUserLock = async (e) => {
    setDisabled(true);
    e.preventDefault();

    const payload = {
      id,
      downlineId,
      type: "changeStatus",
      userStatus: userStatus ? 1 : 0,
      bettingStatus: betStatus ? 1 : 0,
      withdrawStatus: withdrawStatus ? 1 : 0,

      role,
    };

    const res = await AxiosSecure.post(API.downLineEdit, payload);
    const data = res.data;
    if (data?.success) {
      toast.success(data?.result?.message);
      setDisabled(false);
      refetchClients();
      setShowChangeStatus(false);
    } else {
      setDisabled(false);
      toast.error(data?.error?.status?.[0]?.description);
    }
  };

  useEffect(() => {
    if (status) {
      console.log({ status });
      setUserStatus(status?.userStatus === 1);
      setBetStatus(status?.bettingStatus === 1);
      setWithdrawStatus(status?.lock_withdraw === 1);
    }
  }, [status]);

  if (status === undefined) {
    return null;
  }

  return (
    <>
      <div className="content-backdrop fade show"></div>
      <div
        className="modal fade show"
        id="modalCenter"
        aria-modal="true"
        role="dialog"
        style={{ display: "block" }}
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content" ref={statusRef}>
            <div className="modal-header">
              <h5 className="modal-title" id="modalCenterTitle">
                Change Status
              </h5>
              <button
                onClick={() => setShowChangeStatus(false)}
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form onSubmit={handleChangeUserLock}>
              <div className="modal-body">
                <div className="row">
                  <div className="col mb-3">
                    <label className="switch">
                      <input
                        onChange={() => setUserStatus((prev) => !prev)}
                        type="checkbox"
                        className="switch-input is-valid"
                        checked={userStatus}
                      />
                      <span className="switch-toggle-slider">
                        <span className="switch-on"></span>
                        <span className="switch-off"></span>
                      </span>
                      <span className="switch-label">User Status</span>
                    </label>
                  </div>
                </div>

                <div className="row">
                  <div className="col mb-3">
                    <label className="switch">
                      <input
                        onChange={() => setBetStatus((prev) => !prev)}
                        type="checkbox"
                        className="switch-input"
                        checked={betStatus}
                      />
                      <span className="switch-toggle-slider">
                        <span className="switch-on"></span>
                        <span className="switch-off"></span>
                      </span>
                      <span className="switch-label">Betting Status</span>
                    </label>
                  </div>
                </div>

                <div className="row">
                  <div className="col mb-3">
                    <label className="switch">
                      <input
                        onChange={() => setWithdrawStatus((prev) => !prev)}
                        type="checkbox"
                        className="switch-input"
                        checked={withdrawStatus}
                      />
                      <span className="switch-toggle-slider">
                        <span className="switch-on"></span>
                        <span className="switch-off"></span>
                      </span>
                      <span className="switch-label">Withdraw Lock</span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  onClick={() => setShowChangeStatus(false)}
                  type="button"
                  className="btn btn-label-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  disabled={disabled}
                  type="submit"
                  className="btn btn-primary"
                >
                  Save changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangeStatus;

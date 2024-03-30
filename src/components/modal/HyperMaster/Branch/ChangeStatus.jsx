import { useEffect, useRef, useState } from "react";
import useCloseModalClickOutside from "../../../../hooks/useCloseModalClickOutside";
import useGetStatus from "../../../../hooks/HyperMaster/Branch/useGetStatus";
import handleRandomToken from "../../../../utils/handleRandomToken";
import axios from "axios";
import { API } from "../../../../api";
import useContextState from "../../../../hooks/useContextState";
import toast from "react-hot-toast";

const ChangeStatus = ({ setShowChangeStatus, downlineId }) => {
  const statusRef = useRef();
  useCloseModalClickOutside(statusRef, () => {
    setShowChangeStatus(false);
  });
  const { token } = useContextState();
  const [betStatus, setBetStatus] = useState(false);
  const [userStatus, setUserStatus] = useState(false);
  const { status, refetchStatus } = useGetStatus("getStatus", downlineId);

  useEffect(() => {
    if (status?.bettingStatus === 0) {
      setBetStatus(false);
    } else {
      setBetStatus(true);
    }
    if (status?.userStatus === 0) {
      setUserStatus(false);
    } else {
      setUserStatus(true);
    }
  }, [status]);

  const handleChangeUserLock = async (e) => {
    e.preventDefault();
    const generatedToken = handleRandomToken();
    const payload = {
      downlineId,
      type: "changeStatus",
      userStatus: userStatus ? 1 : 0,
      bettingStatus: betStatus ? 1 : 0,
      token: generatedToken,
    };
    const res = await axios.post(API.downLineEdit, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = res.data;

    if (data?.success) {
      toast.success(data?.result?.message);
      setShowChangeStatus(false);
      refetchStatus();
    } else {
      toast.error(data?.error?.status?.[0]?.description);
    }
  };

  return (
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
              <button type="submit" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangeStatus;

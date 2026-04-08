import { useEffect, useRef, useState } from "react";
import useCloseModalClickOutside from "../../hooks/useCloseModalClickOutside";
import useGetStatus from "../../hooks/HyperMaster/Branch/useGetStatus";
import handleRandomToken from "../../utils/handleRandomToken";
import { API } from "../../api";
import toast from "react-hot-toast";
import { AxiosSecure } from "../../lib/AxiosSecure";

const ChangeLevel = ({
  setShowChangeLevelModal,
  downlineId,
  role,
  id,
  refetch,
}) => {
  const [disabled, setDisabled] = useState(false);

  const [clientStatus, setClientStatus] = useState(null);

  /* close modal ck=lick outside */
  const statusRef = useRef();
  useCloseModalClickOutside(statusRef, () => {
    setShowChangeLevelModal(false);
  });

  let payload = {
    downlineId,
    type: "getLevel",
    id,
    role,
  };

  const { status, refetchStatus } = useGetStatus(payload);

  /* set check box default value */
  useEffect(() => {
    if (status?.level || status?.level === 0) {
      setClientStatus(status?.level);
    }
  }, [status]);

  /* handle edit user lock */
  const handleChangeUserColor = async (e) => {
    setDisabled(true);
    e.preventDefault();
    const generatedToken = handleRandomToken();
    let payload = {
      id,
      downlineId,
      type: "changeLevel",
      level: clientStatus,
      token: generatedToken,
      role,
    };

    const res = await AxiosSecure.post(API.downLineEdit, payload);
    const data = res.data;
    if (data?.success) {
      setDisabled(false);
      refetch();

      toast.success(data?.result?.message);
      setShowChangeLevelModal(false);
      refetchStatus();
    } else {
      setDisabled(false);
      toast.error(data?.error?.status?.[0]?.description);
    }
  };

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
                Change Level
              </h5>
              <button
                onClick={() => setShowChangeLevelModal(false)}
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form onSubmit={handleChangeUserColor}>
              <div className="modal-body">
                {[
                  { label: "Non-Trusted Client", value: 0 },
                  { label: "Trusted Client", value: 1 },
                  { label: "VIP Client", value: 2 },
                  { label: "VVIP Client", value: 3 },
                  { label: "Premium Client", value: 4 },
                ].map(({ label, value }) => (
                  <div className="row" key={value}>
                    <div className="col mb-3">
                      <label className="switch">
                        <input
                          onChange={(e) =>
                            setClientStatus(Number(e.target.value))
                          }
                          type="radio"
                          className="switch-input is-valid"
                          value={value}
                          checked={clientStatus === value}
                        />
                        <span className="switch-toggle-slider">
                          <span className="switch-on"></span>
                          <span className="switch-off"></span>
                        </span>
                        <span className="switch-label">{label}</span>
                      </label>
                    </div>
                  </div>
                ))}
              </div>

              <div className="modal-footer">
                <button
                  onClick={() => setShowChangeLevelModal(false)}
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

export default ChangeLevel;

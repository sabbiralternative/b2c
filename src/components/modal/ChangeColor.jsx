import { useEffect, useRef, useState } from "react";
import useCloseModalClickOutside from "../../hooks/useCloseModalClickOutside";
import useGetStatus from "../../hooks/HyperMaster/Branch/useGetStatus";
import handleRandomToken from "../../utils/handleRandomToken";
import toast from "react-hot-toast";
import { AxiosSecure } from "../../lib/AxiosSecure";
import { API } from "../../api";

const ChangeColor = ({ setShowColor, downlineId, role, id, refetchClient }) => {
  const [disabled, setDisabled] = useState(false);
  const [color, setColor] = useState(null);

  /* close modal ck=lick outside */
  const statusRef = useRef();
  useCloseModalClickOutside(statusRef, () => {
    setShowColor(false);
  });

  const { status } = useGetStatus({
    downlineId,
    type: "getColor",
    id,
    role,
  });

  /* set check box default value */
  useEffect(() => {
    if (status?.color || status?.color === 0) {
      setColor(status?.color);
    }
  }, [status]);

  /* handle edit user lock */
  const handleChangeUserColor = async (e) => {
    setDisabled(true);
    e.preventDefault();
    const generatedToken = handleRandomToken();
    const payload = {
      id,
      downlineId,
      type: "changeColor",
      color: color,
      token: generatedToken,
      role,
    };

    const res = await AxiosSecure.post(API.downLineEdit, payload);
    const data = res.data;
    if (data?.success) {
      setDisabled(false);
      refetchClient();
      toast.success(data?.result?.message);
      setShowColor(false);
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
                Change Color
              </h5>
              <button
                onClick={() => setShowColor(false)}
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form onSubmit={handleChangeUserColor}>
              <div className="modal-body">
                {[
                  { label: "White", value: 0 },
                  { label: "Green", value: 1 },
                  { label: "Red", value: 2 },
                  { label: "Yellow", value: 3 },
                  { label: "Blue", value: 4 },
                ].map(({ label, value }) => (
                  <div className="row" key={value}>
                    <div className="col mb-3">
                      <label className="switch">
                        <input
                          onChange={(e) => setColor(Number(e.target.value))}
                          type="radio"
                          className="switch-input is-valid"
                          value={value}
                          checked={color === value}
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
                  onClick={() => setShowColor(false)}
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

export default ChangeColor;

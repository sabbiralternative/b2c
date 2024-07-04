import { useRef } from "react";
import useCloseModalClickOutside from "../../hooks/useCloseModalClickOutside";

const ShowDepositReportImage = ({ image, setShowDepositImage }) => {
  const depositImageRef = useRef();
  useCloseModalClickOutside(depositImageRef, () => {
    setShowDepositImage(false);
  });
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
          <div className="modal-content" ref={depositImageRef}>
            <div className="modal-header">
              <h5 className="modal-title" id="modalCenterTitle">
                Deposit Image
              </h5>
              <button
                onClick={() => setShowDepositImage(false)}
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form>
              <div className="modal-body">
                <div className="row">
                  <div className="col mb-3"
                  style={{display:'flex',alignItems:'center',justifyContent:'center'}}
                  >
                    <img
                      style={{
                        height: "500px",
                        width: "500px",
                        objectFit: "contain",
                      }}
                      src={image}
                      alt=""
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  onClick={() => setShowDepositImage(false)}
                  type="button"
                  className="btn btn-label-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShowDepositReportImage;

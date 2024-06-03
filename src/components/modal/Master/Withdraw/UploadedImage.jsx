import { useRef } from "react";
import useCloseModalClickOutside from "../../../../hooks/useCloseModalClickOutside";
import useContextState from "../../../../hooks/useContextState";

const UploadedImage = () => {
  const { setShowUploadedImage, setUploadedImage, uploadedImage } =
    useContextState();
  const uploadedImageRef = useRef();
  useCloseModalClickOutside(uploadedImageRef, () => {
    setUploadedImage("");
    setShowUploadedImage(false);
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
          <div className="modal-content" ref={uploadedImageRef}>
            <div className="modal-header">
              <h5 className="modal-title" id="modalCenterTitle">
                Edit Withdraw
              </h5>
              <button
                onClick={() => {
                  setUploadedImage("");
                  setShowUploadedImage(false);
                }}
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form>
              <div className="modal-body">
                <div className="row">
                  <div className="row mb-3" id="bank_account_name_div">
                    <img src={uploadedImage} alt="" />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  onClick={() => {
                    setUploadedImage("");
                    setShowUploadedImage(false);
                  }}
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

export default UploadedImage;

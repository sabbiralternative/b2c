import { useRef, useState } from "react";
import toast from "react-hot-toast";
import useCloseModalClickOutside from "../../../hooks/useCloseModalClickOutside";
import { useForm } from "react-hook-form";
import { API } from "../../../api";
import useContextState from "../../../hooks/useContextState";
import axios from "axios";

const AddTheme = ({ modal, setModal, refetch }) => {
  const [disabled, setDisabled] = useState(false);
  const { token } = useContextState();
  const ref = useRef();
  useCloseModalClickOutside(ref, () => {
    setModal({
      name: "",
      site: "",
    });
  });
  const { handleSubmit, reset } = useForm();

  const [image, setImage] = useState(null);

  const onSubmit = async () => {
    setDisabled(true);

    const payload = {
      site: modal.site,
      file_type: "theme",
    };

    const formData = new FormData();
    formData.append("image", image);
    formData.append("data", JSON.stringify(payload));

    const res = await axios.post(API.upload_assets, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = res.data;
    if (data?.success) {
      setDisabled(false);
      toast.success(data?.message);
      reset();
      refetch();
      setModal({
        name: "",
        site: "",
      });
    } else {
      setDisabled(false);
      toast.error(data?.message);
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
          <div className="modal-content" ref={ref}>
            <div className="modal-header">
              <h5 className="modal-title" id="modalCenterTitle">
                Add Theme
              </h5>
              <button
                onClick={() =>
                  setModal({
                    name: "",
                    site: "",
                  })
                }
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="modal-body">
                <div className="row">
                  <div className="row mb-3" id="bank_account_name_div">
                    <label
                      className="col-sm-2 col-form-label"
                      htmlFor="basic-default-name"
                    >
                      Theme
                    </label>
                    <div className="col-sm-10">
                      <input
                        onChange={(e) => setImage(e.target.files[0])}
                        type="file"
                        accept=".svg,.png,.css"
                        className="form-control"
                        id="basic-default-name"
                        placeholder="Slip"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  onClick={() =>
                    setModal({
                      name: "",
                      site: "",
                    })
                  }
                  type="button"
                  className="btn btn-label-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  disabled={disabled || !image}
                  type="submit"
                  className="btn btn-primary"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddTheme;

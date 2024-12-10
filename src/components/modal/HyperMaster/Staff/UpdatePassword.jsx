import { useRef } from "react";
import { useForm } from "react-hook-form";
import {
  useGetAllChecker,
  useUpdateSingleChecker,
} from "../../../../hooks/HyperMaster/Staff";
import useCloseModalClickOutside from "../../../../hooks/useCloseModalClickOutside";
import toast from "react-hot-toast";

const UpdatePassword = ({ updatePasswordId, setUpdatePasswordId }) => {
  const updatePasswordRef = useRef();
  useCloseModalClickOutside(updatePasswordRef, () => {
    setUpdatePasswordId(null);
  });

  const { register, handleSubmit, reset } = useForm();
  const { mutate: updatePassword } = useUpdateSingleChecker();
  const { refetch } = useGetAllChecker();

  const handleUpdatePassword = ({ password, confirmPassword }) => {
    if (password !== confirmPassword) {
      return toast.error("Password did not matched!");
    }
    const payload = {
      type: "updateStaffPassword",
      staff_id: updatePasswordId,
      password,
    };
    updatePassword(payload, {
      onSuccess: (data) => {
        if (data?.success) {
          toast.success(data?.result);
          reset();
          refetch();
          setUpdatePasswordId(null);
        } else {
          toast.error(data?.error);
        }
      },
    });
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
          <div className="modal-content" ref={updatePasswordRef}>
            <div className="modal-header">
              <h5 className="modal-title" id="modalCenterTitle">
                Change Password
              </h5>
              <button
                onClick={() => setUpdatePasswordId(null)}
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form onSubmit={handleSubmit(handleUpdatePassword)}>
              <div className="modal-body">
                <div className="row">
                  <div className="col mb-3">
                    <label htmlFor="password" className="form-label">
                      New Password
                    </label>
                    <input
                      {...register("password", {
                        required: true,
                      })}
                      type="password"
                      className="form-control"
                      placeholder="Enter New Password"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col mb-3">
                    <label htmlFor="confirmPassword" className="form-label">
                      Confirm Password
                    </label>
                    <input
                      {...register("confirmPassword", {
                        required: true,
                      })}
                      type="password"
                      className="form-control"
                      placeholder="Enter Confirm Password"
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
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
    </>
  );
};

export default UpdatePassword;

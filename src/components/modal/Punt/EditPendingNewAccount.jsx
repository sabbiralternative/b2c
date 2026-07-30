import { Fragment, useRef, useState } from "react";
import toast from "react-hot-toast";
import useCloseModalClickOutside from "../../../hooks/useCloseModalClickOutside";
import { useForm } from "react-hook-form";
import useContextState from "../../../hooks/useContextState";
import { usePanelMutation, usePanelQuery } from "../../../hooks/panel";

const EditPendingNewAccount = ({ setEditPendingAccount, refetch }) => {
  const [disabled, setDisabled] = useState(false);
  const editDepositRef = useRef();
  useCloseModalClickOutside(editDepositRef, () => {
    setEditPendingAccount(false);
  });
  const { register, handleSubmit, reset, watch } = useForm();
  const status = watch("status");
  const { downLineId } = useContextState();
  const payload = {
    type: "viewSingleUTR",
    depositId: downLineId,
  };

  const { data } = usePanelQuery(payload);
  const { mutateAsync } = usePanelMutation();
  const onSubmit = async (values) => {
    // setDisabled(true);

    const payload = {
      ...values,
      lock_withdraw: values.lock_withdraw ? 1 : 0,
      depositId: downLineId,
      type: "editUTR",
    };

    const res = await mutateAsync(payload);
    const data = res.data;

    if (data?.success) {
      refetch();
      toast.success(data?.result?.message);
      reset();
      setDisabled(false);
      setEditPendingAccount(false);
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
          <div className="modal-content" ref={editDepositRef}>
            <div className="modal-header">
              <h5 className="modal-title" id="modalCenterTitle">
                Edit Pending New Account
              </h5>
              <button
                onClick={() => setEditPendingAccount(false)}
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
                      Status
                    </label>
                    <div
                      className="col-sm-10"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "50px",
                      }}
                    >
                      <label
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "5px",
                          cursor: "pointer",
                        }}
                      >
                        <input
                          type="radio"
                          {...register("status", { required: true })}
                          value="APPROVED"
                        />
                        <span>Approve</span>
                      </label>
                      <label
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "5px",
                          cursor: "pointer",
                        }}
                      >
                        <input
                          type="radio"
                          {...register("status", { required: true })}
                          value="REJECTED"
                        />
                        <span>Reject </span>
                      </label>
                    </div>
                  </div>
                  {status === "APPROVED" && (
                    <Fragment>
                      <div
                        className="row mb-3"
                        style={{ alignItems: "center" }}
                      >
                        <label className="col-sm-2 col-form-label">
                          Username
                        </label>
                        <div className="col-sm-10">
                          <input
                            placeholder="Enter Username"
                            className="form-control"
                            {...register("username")}
                            type="text"
                          />
                        </div>
                      </div>
                      <div
                        className="row mb-3"
                        style={{ alignItems: "center" }}
                      >
                        <label className="col-sm-2 col-form-label">
                          Password
                        </label>
                        <div className="col-sm-10">
                          <input
                            placeholder="Enter Password"
                            className="form-control"
                            {...register("password")}
                            type="password"
                          />
                        </div>
                      </div>
                    </Fragment>
                  )}
                </div>
              </div>
              <div className="modal-footer">
                <button
                  onClick={() => setEditPendingAccount(false)}
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
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditPendingNewAccount;

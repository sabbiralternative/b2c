import { useRef, useState } from "react";
import toast from "react-hot-toast";
import useCloseModalClickOutside from "../../../hooks/useCloseModalClickOutside";
import { useForm } from "react-hook-form";
import { usePanelMutation } from "../../../hooks/panel";

const EditPuntPendingWithdraw = ({ modal, setEditPendingAccount, refetch }) => {
  const [disabled, setDisabled] = useState(false);
  const editDepositRef = useRef();
  useCloseModalClickOutside(editDepositRef, () => {
    setEditPendingAccount(false);
  });
  const { register, handleSubmit, reset } = useForm();

  const { mutateAsync } = usePanelMutation();
  const onSubmit = async (values) => {
    setDisabled(true);
    const payload = {
      ...values,
      id: modal?.id,
      type: "update_withdraw",
    };

    const data = await mutateAsync(payload);
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
                Edit Pending Withdraw
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
                          value="1"
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
                          value="0"
                        />
                        <span>Reject </span>
                      </label>
                    </div>
                  </div>
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

export default EditPuntPendingWithdraw;

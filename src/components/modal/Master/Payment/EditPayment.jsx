import { useRef } from "react";
import useCloseModalClickOutside from "../../../../hooks/useCloseModalClickOutside";
import { useForm } from "react-hook-form";
import useContextState from "../../../../hooks/useContextState";
import handleRandomToken from "../../../../utils/handleRandomToken";
import axios from "axios";
import { API } from "../../../../api";
import toast from "react-hot-toast";
import useGetCurrentPaymentStatus from "../../../../hooks/Master/Payment/useGetCurrentPaymentStatus";
import useGetPaymentMethod from "../../../../hooks/Master/Client/useGetPaymentMethod";

const EditPayment = ({ setShowEditPayment }) => {
  const editPayment = useRef();
  useCloseModalClickOutside(editPayment, () => {
    setShowEditPayment(false);
  });
  const { register, handleSubmit} = useForm();
  const { token, downLineId } = useContextState();
  const { currentPaymentStatus } = useGetCurrentPaymentStatus(downLineId);
  const payload = {
    type: "viewPaymentMethods",
  };
  const { refetchPaymentMethods } = useGetPaymentMethod(payload);

  const onSubmit = async ({ status }) => {
    const generatedToken = handleRandomToken();
    const payload = {
      type: "updatePayment",
      paymentId: downLineId,
      status,
      token: generatedToken,
    };
    const res = await axios.post(API.payments, payload, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = res.data;
    if (data?.success) {
      refetchPaymentMethods();
      toast.success(data?.result?.message);
      setShowEditPayment()
    } else {
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
          <div className="modal-content" ref={editPayment}>
            <div className="modal-header">
              <h5 className="modal-title" id="modalCenterTitle">
                Edit Payment
              </h5>
              <button
                onClick={() => setShowEditPayment(false)}
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
                    <div className="col-sm-10">
                      <select
                        {...register("status", {
                          required: true,
                          value: currentPaymentStatus?.status,
                        })}
                        id="type"
                        className="select2 form-select select2-hidden-accessible"
                      >
                        <option
                          value="1"
                          selected={currentPaymentStatus?.status == 1}
                        >
                          Active
                        </option>
                        <option
                          selected={currentPaymentStatus?.status == 2}
                          value="2"
                          data-select2-id="38"
                        >
                          Inactive
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  onClick={() => setShowEditPayment(false)}
                  type="button"
                  className="btn btn-label-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="submit" className="btn btn-primary">
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

export default EditPayment;

import { useRef } from "react";
import { useBonusMutation, useBonusQuery } from "../../../hooks/bonus";
import useCloseModalClickOutside from "../../../hooks/useCloseModalClickOutside";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const EditCoupon = ({ setEditCouponId, editCouponId, refetchCoupons }) => {
  const ref = useRef();
  const { register, handleSubmit } = useForm();

  const closeModal = () => {
    setEditCouponId(null);
  };
  useCloseModalClickOutside(ref, () => {
    closeModal();
  });

  const {
    mutateAsync: handleEditCoupon,
    isPending,
    isSuccess,
  } = useBonusMutation();
  const { data } = useBonusQuery({
    type: "viewSingleCoupon",
    coupon_id: editCouponId,
  });

  /* handle edit user lock */
  const onSubmit = async ({ status }) => {
    const data = await handleEditCoupon({
      type: "editCoupon",
      coupon_id: editCouponId,
      status,
    });

    if (data?.success) {
      refetchCoupons();
      toast.success(data?.result?.message);
      closeModal();
    } else {
      toast.error(data?.error?.status?.[0]?.description);
    }
  };

  if (data === undefined) {
    return null;
  }

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
                Edit Coupon
              </h5>
              <button
                onClick={closeModal}
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="modal-body">
                <div className="row">
                  <div className="col mb-3">
                    <select {...register("status")} className="form-control">
                      <option selected={data?.result?.status == 1} value="1">
                        Active
                      </option>
                      <option selected={data?.result?.status == 2} value="2">
                        Inactive
                      </option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  onClick={closeModal}
                  type="button"
                  className="btn btn-label-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  disabled={isPending && !isSuccess}
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

export default EditCoupon;

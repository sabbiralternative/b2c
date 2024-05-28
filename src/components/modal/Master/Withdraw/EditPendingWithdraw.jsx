import { useEffect, useRef, useState } from "react";
import useCloseModalClickOutside from "../../../../hooks/useCloseModalClickOutside";
import { useForm } from "react-hook-form";
import handleRandomToken from "../../../../utils/handleRandomToken";
import axios from "axios";
import { API } from "../../../../api";
import toast from "react-hot-toast";
import useContextState from "../../../../hooks/useContextState";
import useGetSingleWithdraw from "../../../../hooks/Master/Withdraw/useSingleWithdraw";
import useGetALLWithdraw from "../../../../hooks/Master/Withdraw/useGetAllWithdraw";

const EditPendingWithdraw = ({ setEditPendingWithdraw }) => {
  const [image, setImage] = useState(null);
  const editWithdrawRef = useRef();
  useCloseModalClickOutside(editWithdrawRef, () => {
    setEditPendingWithdraw(false);
  });
  const { register, handleSubmit, reset, watch } = useForm();
  const { token, downLineId } = useContextState();
  const statusField = watch("status");

  const SingleWithdrawPayload = {
    type: "viewSingleWithdraw",
    withdrawId: downLineId,
  };

  const payload = {
    type: "viewWithdraw",
    status: "PENDING",
  };
  const { refetchAllWithdraw } = useGetALLWithdraw(payload);
  const { singleWithdraw } = useGetSingleWithdraw(SingleWithdrawPayload);

  const onSubmit = async ({ remark, status }) => {
    const generatedToken = handleRandomToken();
    const payload = {
      withdrawId: downLineId,
      status,
      remark,
      type: "editWithdraw",
      token: generatedToken,
    };
    const res = await axios.post(API.withdraw, payload, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = res.data;
    if (data?.success) {
      refetchAllWithdraw();
      toast.success(data?.result?.message);
      reset();
      setEditPendingWithdraw(false);
    } else {
      toast.error(data?.error?.status?.[0]?.description);
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    e.target.value = null;
  };

  useEffect(() => {
    if (image) {
      const handleSubmitImage = async () => {
        const formData = new FormData();
        formData.append("image", image);
        const res = await axios.post(API.uploadScreenshot, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = res.data;
        console.log(data);
        if (data?.success) {
          setImage(null);
        } else {
          setImage(null);
          toast.error(data?.error);
        }
      };
      handleSubmitImage();
    }
  }, [image, token]);
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
          <div className="modal-content" ref={editWithdrawRef}>
            <div className="modal-header">
              <h5 className="modal-title" id="modalCenterTitle">
                Edit Withdraw
              </h5>
              <button
                onClick={() => setEditPendingWithdraw(false)}
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
                    <div className="row mb-3" id="bank_account_name_div">
                      <label
                        className="col-sm-2 col-form-label"
                        htmlFor="basic-default-name"
                      >
                        Username
                      </label>
                      <div className="col-sm-10">
                        {singleWithdraw?.loginname}
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label
                        htmlFor="exampleFormControlSelect1"
                        className="col-sm-2 col-form-label"
                      >
                        Amount
                      </label>
                      <div className="col-sm-9" data-select2-id="26">
                        <div className="position-relative" data-select2-id="25">
                          {singleWithdraw?.amount}
                        </div>
                      </div>
                    </div>

                    <label
                      className="col-sm-2 col-form-label"
                      htmlFor="basic-default-name"
                    >
                      Status
                    </label>
                    <div className="col-sm-10">
                      <select
                        {...register("status", {
                          value: singleWithdraw?.status,
                          required: true,
                        })}
                        className="select2 form-select select2-hidden-accessible"
                      >
                        <option
                          selected={singleWithdraw?.status === "PENDING"}
                          value="PENDING"
                        >
                          PENDING
                        </option>
                        <option
                          selected={singleWithdraw?.status === "APPROVED"}
                          value="APPROVED"
                        >
                          APPROVED
                        </option>
                        <option
                          selected={singleWithdraw?.status === "REJECTED"}
                          value="REJECTED"
                        >
                          REJECTED
                        </option>
                      </select>
                    </div>
                  </div>
                  {statusField === "APPROVED" && (
                    <div className="row mb-3" id="bank_account_name_div">
                      <label
                        className="col-sm-2 col-form-label"
                        htmlFor="basic-default-name"
                      >
                        Withdraw Slip
                      </label>
                      <div className="col-sm-10">
                        <input
                          onChange={(e) => handleImageChange(e)}
                          type="file"
                          className="form-control"
                          id="basic-default-name"
                        />
                      </div>
                    </div>
                  )}

                  <div className="row mb-3" id="bank_account_name_div">
                    <label
                      className="col-sm-2 col-form-label"
                      htmlFor="basic-default-name"
                    >
                      Remark
                    </label>
                    <div className="col-sm-10">
                      <input
                        {...register("remark", {
                          value: singleWithdraw?.remark,
                          required: true,
                        })}
                        type="text"
                        className="form-control"
                        id="basic-default-name"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  onClick={() => setEditPendingWithdraw(false)}
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

export default EditPendingWithdraw;

import { useEffect, useRef, useState } from "react";
import useCloseModalClickOutside from "../../../../hooks/useCloseModalClickOutside";
import { useForm } from "react-hook-form";
import useContextState from "../../../../hooks/useContextState";
import handleRandomToken from "../../../../utils/handleRandomToken";
import axios from "axios";
import { API } from "../../../../api";
import toast from "react-hot-toast";
import useGetCurrentPaymentStatus from "../../../../hooks/Master/Payment/useGetCurrentPaymentStatus";
import useGetPaymentMethod from "../../../../hooks/Master/Client/useGetPaymentMethod";
import { FaSpinner } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";

const EditPayment = ({ setShowEditPayment }) => {
  const { token, downLineId } = useContextState();
  const { currentPaymentStatus: currentPayment } =
    useGetCurrentPaymentStatus(downLineId);
  /* type upi  start*/
  const [qr_code, setQr_code] = useState(currentPayment?.qr_code);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  /*  /* type upi end */

  const editPayment = useRef();
  useCloseModalClickOutside(editPayment, () => {
    setShowEditPayment(false);
  });
  const { register, handleSubmit, reset } = useForm();

  const payload = {
    type: "viewPaymentMethods",
  };
  const { refetchPaymentMethods } = useGetPaymentMethod(payload);

  const onSubmit = async (fieldValues) => {
    const generatedToken = handleRandomToken();
    let payload;
    if (currentPayment?.type === "qr") {
      payload = {
        type: "updatePayment",
        paymentId: downLineId,
        ...fieldValues,
        qr_code,
        token: generatedToken,
      };
    }
    if (currentPayment?.type === "bank" || currentPayment?.type === "upi") {
      payload = {
        type: "updatePayment",
        paymentId: downLineId,
        ...fieldValues,
        token: generatedToken,
      };
    }

    const res = await axios.post(API.payments, payload, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = res.data;
    if (data?.success) {
      refetchPaymentMethods();
      toast.success(data?.result?.message);
      setShowEditPayment();
    } else {
      toast.error(data?.error?.status?.[0]?.description);
    }
  };

  /* type upi start */
  useEffect(() => {
    if (image) {
      setLoading(true);
      const handleSubmitImage = async () => {
        const formData = new FormData();
        formData.append("image", image);
        const res = await axios.post(API.uploadScreenshot, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = res.data;
        setLoading(false);
        if (data?.success) {
          setQr_code(data?.filePath);
        }
      };
      handleSubmitImage();
    }
  }, [image, token]);
  /* type upi end */

  /* default values */
  useEffect(() => {
    if (currentPayment) {
      if (currentPayment?.type === "qr") {
        setQr_code(currentPayment?.qr_code);
        reset({
          title: currentPayment?.title,
          max_amount: currentPayment?.max_amount,
          min_amount: currentPayment?.min_amount,
        });
      }
      if (currentPayment?.type === "bank") {
        reset({
          bank_name: currentPayment?.bank_name,
          ifsc: currentPayment?.ifsc,
          min_amount: currentPayment?.min_amount,
          max_amount: currentPayment?.max_amount,
          account_number: currentPayment?.account_number,
          bank_account_name: currentPayment?.bank_account_name,
        });
      }
      if (currentPayment?.type === "upi") {
        reset({
          upi_id: currentPayment?.upi_id,
          upi_account_name: currentPayment?.upi_account_name,
          min_amount: currentPayment?.min_amount,
          max_amount: currentPayment?.max_amount,
        });
      }
    }
  }, [currentPayment, reset]);


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
                <div className="row mb-3" id="qr_code">
                  <label
                    className="col-sm-2 col-form-label"
                    htmlFor="basic-default-company"
                  >
                    Status
                  </label>
                  <div className="col-sm-10">
                    <select
                      {...register("status", {
                        required: true,
                      })}
                      name=""
                      className="form-control"
                      id=""
                    >
                      <option
                        selected={currentPayment?.status === 1}
                        value="active"
                      >
                        Active
                      </option>
                      <option
                        selected={currentPayment?.status === 2}
                        value="inactive"
                      >
                        In Active
                      </option>
                    </select>
                  </div>
                </div>
                {currentPayment?.type === "qr" && (
                  <div className="row">
                    <div className="row mb-3">
                      <div className="card-body">
                        <div className="row mb-3" id="qr_code">
                          <label
                            className="col-sm-2 col-form-label"
                            htmlFor="basic-default-company"
                          >
                            Title
                          </label>
                          <div className="col-sm-10">
                            <input
                              {...register("title", {
                                required: true,
                              })}
                              className="form-control"
                              type="text"
                            />
                          </div>
                        </div>
                        {!loading && !qr_code && (
                          <div className="row mb-3" id="qr_code">
                            <label
                              className="col-sm-2 col-form-label"
                              htmlFor="basic-default-company"
                            >
                              QR Code
                            </label>
                            <div className="col-sm-10">
                              <input
                                onChange={(e) => setImage(e.target.files[0])}
                                className="form-control"
                                type="file"
                                id="fileToUpload"
                                name="fileToUpload"
                              />
                            </div>
                          </div>
                        )}
                        {!loading && qr_code && (
                          <div className="row mb-3" id="qr_code">
                            <span
                              className="col-sm-2 col-form-label"
                              htmlFor="basic-default-company"
                            >
                              <RxCross2
                                onClick={() => setQr_code("")}
                                size={30}
                                cursor="pointer"
                              />
                            </span>
                            <div className="col-sm-10">
                              <img
                                style={{
                                  height: "200px",
                                  objectFit: "contain",
                                }}
                                className="form-control"
                                src={qr_code}
                                alt=""
                              />
                            </div>
                          </div>
                        )}
                        {loading && (
                          <div className="row mb-3" id="qr_code">
                            <span
                              className="col-sm-2 col-form-label"
                              htmlFor="basic-default-company"
                            >
                              {" "}
                              QR Code
                            </span>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                marginTop: "5px",
                                marginBottom: "5px",
                              }}
                              className="col-sm-10"
                            >
                              <FaSpinner size={30} className="animate-spin" />
                            </div>
                          </div>
                        )}

                        <div className="row mb-3">
                          <label
                            className="col-sm-2 col-form-label"
                            htmlFor="basic-default-company"
                          >
                            Minimum Deposit Amount
                          </label>
                          <div className="col-sm-10">
                            <input
                              {...register("min_amount", {
                                required: true,
                              })}
                              type="number"
                              className="form-control"
                              id="basic-default-company"
                            />
                          </div>
                        </div>

                        <div className="row mb-3">
                          <label
                            className="col-sm-2 col-form-label"
                            htmlFor="basic-default-company"
                          >
                            Maximum Deposit Amount
                          </label>
                          <div className="col-sm-10">
                            <input
                              {...register("max_amount", {
                                required: true,
                              })}
                              type="number"
                              className="form-control"
                              id="basic-default-company"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {currentPayment?.type === "bank" && (
                  <>
                    <div className="row mb-3" id="bank_account_name_div">
                      <label
                        className="col-sm-2 col-form-label"
                        htmlFor="basic-default-name"
                      >
                        Bank Account Name
                      </label>
                      <div className="col-sm-10">
                        <input
                          {...register("bank_account_name", {
                            required: true,
                          })}
                          type="text"
                          className="form-control"
                          id="basic-default-name"
                        />
                      </div>
                    </div>
                    <div className="row mb-3" id="bank_account_number_div">
                      <label
                        className="col-sm-2 col-form-label"
                        htmlFor="basic-default-company"
                      >
                        Account Number
                      </label>
                      <div className="col-sm-10">
                        <input
                          {...register("account_number", {
                            required: true,
                          })}
                          type="text"
                          className="form-control"
                          id="basic-default-company"
                        />
                      </div>
                    </div>
                    <div className="row mb-3" id="ifsc_div">
                      <label
                        className="col-sm-2 col-form-label"
                        htmlFor="basic-default-company"
                      >
                        IFSC
                      </label>
                      <div className="col-sm-10">
                        <input
                          {...register("ifsc", {
                            required: true,
                          })}
                          type="text"
                          className="form-control"
                          id="basic-default-company"
                        />
                      </div>
                    </div>

                    <div className="row mb-3" id="bank_name_div">
                      <label
                        className="col-sm-2 col-form-label"
                        htmlFor="basic-default-company"
                      >
                        Bank Name
                      </label>
                      <div className="col-sm-10">
                        <input
                          {...register("bank_name", {
                            required: true,
                          })}
                          type="text"
                          className="form-control"
                          id="basic-default-company"
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label
                        className="col-sm-2 col-form-label"
                        htmlFor="basic-default-company"
                      >
                        Minimum Deposit Amount
                      </label>
                      <div className="col-sm-10">
                        <input
                          {...register("min_amount", {
                            required: true,
                          })}
                          type="number"
                          className="form-control"
                          id="basic-default-company"
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label
                        className="col-sm-2 col-form-label"
                        htmlFor="basic-default-company"
                      >
                        Maximum Deposit Amount
                      </label>
                      <div className="col-sm-10">
                        <input
                          {...register("max_amount", {
                            required: true,
                          })}
                          type="number"
                          className="form-control"
                          id="basic-default-company"
                        />
                      </div>
                    </div>
                  </>
                )}
                {currentPayment?.type === "upi" && (
                  <>
                    <div className="row mb-3" id="upi_id">
                      <label
                        className="col-sm-2 col-form-label"
                        htmlFor="basic-default-company"
                      >
                        UPI ID
                      </label>
                      <div className="col-sm-10">
                        <input
                          {...register("upi_id", {
                            required: true,
                          })}
                          type="text"
                          className="form-control"
                          id="basic-default-company"
                        />
                      </div>
                    </div>

                    <div className="row mb-3" id="upi_account_name">
                      <label
                        className="col-sm-2 col-form-label"
                        htmlFor="basic-default-company"
                      >
                        UPI Account Name
                      </label>
                      <div className="col-sm-10">
                        <input
                          {...register("upi_account_name", {
                            required: true,
                          })}
                          type="text"
                          className="form-control"
                          id="basic-default-company"
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label
                        className="col-sm-2 col-form-label"
                        htmlFor="basic-default-company"
                      >
                        Minimum Deposit Amount
                      </label>
                      <div className="col-sm-10">
                        <input
                          {...register("min_amount", {
                            required: true,
                          })}
                          type="number"
                          className="form-control"
                          id="basic-default-company"
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label
                        className="col-sm-2 col-form-label"
                        htmlFor="basic-default-company"
                      >
                        Maximum Deposit Amount
                      </label>
                      <div className="col-sm-10">
                        <input
                          {...register("max_amount", {
                            required: true,
                          })}
                          type="number"
                          className="form-control"
                          id="basic-default-company"
                        />
                      </div>
                    </div>
                  </>
                )}
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

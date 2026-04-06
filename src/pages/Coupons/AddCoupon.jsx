import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { useWhiteLabel } from "../../hooks/AdminMaster/whiteLabel";
import useContextState from "../../hooks/useContextState";
import { AdminRole } from "../../constant/constant";
import { useBonusMutation } from "../../hooks/bonus";
import { handleCopyToClipBoard } from "../../utils/handleCopyToClipBoard";
import { FaCopy } from "react-icons/fa";

const AddCoupon = () => {
  const { adminRole } = useContextState();
  const { data } = useWhiteLabel({
    type: "viewWhitelabelByAdmin",
  });

  const ref = useRef("");

  const { mutateAsync: handleBonus } = useBonusMutation();
  const [disabled, setDisabled] = useState(false);
  const navigate = useNavigate();
  const { register, handleSubmit, reset, getValues } = useForm();

  const onSubmit = async (value) => {
    const payload = {
      type: "addCoupon",
      ...value,
    };

    setDisabled(true);
    const data = await handleBonus(payload);
    if (data?.success) {
      setDisabled(false);
      toast.success(data?.result?.message);
      reset();
      navigate("/view-coupons");
    } else {
      setDisabled(false);
      toast.error(data?.error?.status?.[0]?.description);
    }
  };

  const generateCoupon = async () => {
    const data = await handleBonus({ type: "generateCoupon" });
    if (data?.success) {
      reset({ coupon_code: data?.result?.code });
    }
  };

  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <h4 className="py-3 breadcrumb-wrapper mb-4">
        <span className="text-muted fw-light">Home /</span> Add Coupon
      </h4>

      <div className="row">
        <div className="col-xxl">
          <div className="card mb-4">
            <div className="card-body">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row mb-3">
                  <label className="col-sm-2 col-form-label">
                    Coupon Code *
                  </label>
                  <div className="col-sm-10" style={{ position: "relative" }}>
                    <input
                      type="text"
                      disabled
                      readOnly
                      {...register("coupon_code", {
                        required: true,
                      })}
                      placeholder="Generate Coupon Code"
                      className="form-control"
                    />
                    <div
                      style={{
                        position: "absolute",
                        right: "20px",
                        top: "6px",
                        display: "flex",
                        gap: "10px",
                      }}
                    >
                      <button
                        onClick={generateCoupon}
                        className="btn btn-primary btn-sm"
                        type="button"
                      >
                        Generate Coupon
                      </button>
                      <button
                        onClick={() =>
                          handleCopyToClipBoard(getValues("coupon_code"))
                        }
                        disabled={!getValues("coupon_code")}
                        className="btn btn-icon btn-sm btn-success"
                      >
                        <FaCopy />
                      </button>
                    </div>
                  </div>
                </div>
                {(adminRole === AdminRole.hyper_master ||
                  adminRole === AdminRole.admin_staff) &&
                  data?.result?.length > 0 && (
                    <div className="row mb-3">
                      <label
                        className="col-sm-2 col-form-label"
                        htmlFor="basic-default-name"
                      >
                        Site *
                      </label>
                      <div className="col-sm-10">
                        <select
                          defaultValue=""
                          {...register("site", {
                            required: true,
                          })}
                          className="form-control"
                        >
                          <option disabled value="">
                            Select Site
                          </option>
                          {data?.result?.map((site) => (
                            <option key={site?.site_url} value={site?.site_url}>
                              {site?.site_url}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}

                <div className="row mb-3">
                  <label className="col-sm-2 col-form-label">Amount *</label>
                  <div className="col-sm-10">
                    <input
                      type="number"
                      className="form-control"
                      min={1}
                      step={1}
                      onInput={(e) => {
                        const raw = e.target.value;

                        if (raw === "") {
                          ref.current = "";
                          return;
                        }

                        const value = Number(raw);

                        if (value >= 1) {
                          ref.current = raw;
                        } else {
                          e.target.value = ref.current;
                        }
                      }}
                      onKeyDown={(e) => {
                        if (
                          e.key === "-" ||
                          e.key === "e" ||
                          e.key === "E" ||
                          e.key === "." ||
                          e.key === "+"
                        ) {
                          e.preventDefault();
                        }
                      }}
                      {...register("bonus_amount", {
                        required: true,
                        min: {
                          value: 1,
                        },
                        valueAsNumber: true,
                      })}
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <label className="col-sm-2 col-form-label">
                    Usage Limit *
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="number"
                      className="form-control"
                      min={1}
                      step={1}
                      onInput={(e) => {
                        const raw = e.target.value;

                        if (raw === "") {
                          ref.current = "";
                          return;
                        }

                        const value = Number(raw);

                        if (value >= 1) {
                          ref.current = raw;
                        } else {
                          e.target.value = ref.current;
                        }
                      }}
                      onKeyDown={(e) => {
                        if (
                          e.key === "-" ||
                          e.key === "e" ||
                          e.key === "E" ||
                          e.key === "." ||
                          e.key === "+"
                        ) {
                          e.preventDefault();
                        }
                      }}
                      {...register("usage_limit", {
                        required: true,
                        min: {
                          value: 1,
                        },
                        valueAsNumber: true,
                      })}
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <label className="col-sm-2 col-form-label">
                    Coupon Expiry Days *
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="number"
                      className="form-control"
                      min={1}
                      step={1}
                      onInput={(e) => {
                        const raw = e.target.value;

                        if (raw === "") {
                          ref.current = "";
                          return;
                        }

                        const value = Number(raw);

                        if (value >= 1) {
                          ref.current = raw;
                        } else {
                          e.target.value = ref.current;
                        }
                      }}
                      onKeyDown={(e) => {
                        if (
                          e.key === "-" ||
                          e.key === "e" ||
                          e.key === "E" ||
                          e.key === "." ||
                          e.key === "+"
                        ) {
                          e.preventDefault();
                        }
                      }}
                      {...register("coupon_expiry_days", {
                        required: true,
                        min: {
                          value: 1,
                        },
                        valueAsNumber: true,
                      })}
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <label className="col-sm-2 col-form-label">Status *</label>
                  <div
                    className="col-sm-10"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0px 30px",
                    }}
                  >
                    <label
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "3px",
                        cursor: "pointer",
                      }}
                    >
                      <input
                        type="radio"
                        {...register("status", { required: true })}
                        value="1"
                      />
                      <span>Active</span>
                    </label>
                    <label
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "3px",
                        cursor: "pointer",
                      }}
                    >
                      <input
                        type="radio"
                        {...register("status", { required: true })}
                        value="0"
                      />
                      <span>Inactive</span>
                    </label>
                  </div>
                </div>
                <div className="row mb-3">
                  <label className="col-sm-2 col-form-label">
                    Transaction Code *
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      {...register("transaction_code", {
                        required: true,
                      })}
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="row justify-content-end">
                  <div className="col-sm-10">
                    <input
                      disabled={disabled}
                      type="submit"
                      name="submit"
                      value="Submit"
                      className="btn btn-primary"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCoupon;

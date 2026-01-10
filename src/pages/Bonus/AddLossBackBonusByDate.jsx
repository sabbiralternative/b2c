import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { useLossBackMutation } from "../../hooks/lossback";
import { DatePicker } from "rsuite";
import formatDate from "../../utils/formatDate";

const AddLossBackBonusByDate = () => {
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const lastLossBackValue = useRef("");
  const minimumLossAmount = useRef("");
  const maximumBonusAmount = useRef("");
  const bonusExpiryDate = useRef("");
  const { mutate: handleLossBack } = useLossBackMutation();
  const [disabled, setDisabled] = useState(false);
  const navigate = useNavigate();
  const { register, handleSubmit, reset, watch } = useForm();
  const clients = watch("clients");

  const onSubmit = async (value) => {
    const payload = {
      type: "add_lossback_bonus",
      mode: "date",
      from_date: formatDate(fromDate),
      to_date: formatDate(toDate),
      ...value,
    };

    setDisabled(true);
    handleLossBack(payload, {
      onSuccess: (data) => {
        if (data?.success) {
          setDisabled(false);
          toast.success(data?.result?.message);
          reset();
          navigate("/view-bonus");
        } else {
          setDisabled(false);
          toast.error(value?.error?.description);
        }
      },
    });
  };
  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <h4 className="py-3 breadcrumb-wrapper mb-4">
        <span className="text-muted fw-light">Home /</span> Add Lossback Bonus
        By Date
      </h4>

      <div className="row">
        <div className="col-xxl">
          <div className="card mb-4">
            <div className="card-body">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row mb-3">
                  <label className="col-sm-2 col-form-label">From Date *</label>
                  <div className="col-sm-10">
                    <DatePicker
                      style={{ width: "100%" }}
                      format="yyyy-MM-dd"
                      editable
                      onChange={(date) => setFromDate(date)}
                      value={fromDate}
                      block
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <label className="col-sm-2 col-form-label">To Date *</label>
                  <div className="col-sm-10">
                    <DatePicker
                      style={{ width: "100%" }}
                      format="yyyy-MM-dd"
                      editable
                      onChange={(date) => setToDate(date)}
                      value={toDate}
                      block
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <label className="col-sm-2 col-form-label">Clients *</label>
                  <div className="col-sm-10">
                    <select
                      defaultValue=""
                      {...register("clients", {
                        required: true,
                      })}
                      className="form-control"
                    >
                      <option disabled value="">
                        Select Clients
                      </option>

                      <option value="all">All Clients</option>
                      <option value="referral">Referral</option>
                      <option value="individual">Individual Clients</option>
                    </select>
                  </div>
                </div>

                {clients === "referral" && (
                  <div className="row mb-3">
                    <label className="col-sm-2 col-form-label">
                      Referral Id *
                    </label>
                    <div className="col-sm-10">
                      <input
                        type="text"
                        {...register("downline_id", {
                          required: clients === "referral" ? true : false,
                        })}
                        className="form-control"
                      />
                    </div>
                  </div>
                )}

                {clients === "individual" && (
                  <div className="row mb-3">
                    <label className="col-sm-2 col-form-label">
                      Client Id *
                    </label>
                    <div className="col-sm-10">
                      <input
                        type="text"
                        {...register("downline_id", {
                          required: clients === "individual" ? true : false,
                        })}
                        className="form-control"
                      />
                    </div>
                  </div>
                )}

                <div className="row mb-3">
                  <label className="col-sm-2 col-form-label">
                    Lossback (%) *
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="number"
                      className="form-control"
                      min={1}
                      max={100}
                      step={1}
                      onInput={(e) => {
                        const raw = e.target.value;

                        if (raw === "") {
                          lastLossBackValue.current = "";
                          return;
                        }

                        const value = Number(raw);

                        if (value >= 1 && value <= 100) {
                          lastLossBackValue.current = raw;
                        } else {
                          e.target.value = lastLossBackValue.current;
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
                      {...register("lossback", {
                        required: "Lossback is required",
                        min: {
                          value: 1,
                          message: "Minimum value is 1",
                        },
                        max: {
                          value: 100,
                          message: "Maximum value is 100",
                        },
                        valueAsNumber: true,
                        validate: (v) =>
                          (v >= 1 && v <= 100) ||
                          "Value must be between 1 and 100",
                      })}
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <label className="col-sm-2 col-form-label">
                    Minimum Loss Amount *
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
                          minimumLossAmount.current = "";
                          return;
                        }

                        const value = Number(raw);

                        if (value >= 1) {
                          minimumLossAmount.current = raw;
                        } else {
                          e.target.value = minimumLossAmount.current;
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
                      {...register("loss_amount", {
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
                    Maximum Bonus Amount *
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
                          maximumBonusAmount.current = "";
                          return;
                        }

                        const value = Number(raw);

                        if (value >= 1) {
                          maximumBonusAmount.current = raw;
                        } else {
                          e.target.value = maximumBonusAmount.current;
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
                      {...register("maximum_bonus_amount", {
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
                    Bonus Expiry (No. of days) *
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="number"
                      className="form-control"
                      max={14}
                      min={1}
                      step={1}
                      onInput={(e) => {
                        const raw = e.target.value;

                        if (raw === "") {
                          bonusExpiryDate.current = "";
                          return;
                        }

                        const value = Number(raw);

                        if (value >= 1 && value <= 14) {
                          bonusExpiryDate.current = raw;
                        } else {
                          e.target.value = bonusExpiryDate.current;
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
                      {...register("bonus_expiry_date", {
                        required: true,
                        min: {
                          value: 1,
                        },
                        max: {
                          value: 14,
                        },
                        valueAsNumber: true,
                      })}
                    />
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

export default AddLossBackBonusByDate;

import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useLossBackMutation } from "../../hooks/lossback";

const AddLossBackBonus = () => {
  const { mutate: handleLossBack } = useLossBackMutation();
  const [disabled, setDisabled] = useState(false);
  const navigate = useNavigate();
  const { register, handleSubmit, reset, watch } = useForm();
  const clients = watch("clients");

  const onSubmit = async (value) => {
    const payload = {
      type: "add_lossback_bonus",
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
      </h4>

      <div className="row">
        <div className="col-xxl">
          <div className="card mb-4">
            <div className="card-body">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row mb-3">
                  <label className="col-sm-2 col-form-label">Event Id *</label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      {...register("event_id", {
                        required: true,
                      })}
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <label className="col-sm-2 col-form-label">
                    Market Name *
                  </label>
                  <div className="col-sm-10">
                    <select
                      defaultValue=""
                      {...register("market_name", {
                        required: true,
                      })}
                      className="form-control"
                    >
                      <option disabled value="">
                        Select Market Name
                      </option>

                      <option value="match_odds">Match Odds</option>
                      <option value="bookmaker">Bookmaker</option>
                      <option value="mini_bookmaker">Mini Bookmaker</option>
                    </select>
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

                      <option value="all">All</option>
                      <option value="referral">Referral</option>
                      <option value="individual">Individual</option>
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
                    Lossback (%)
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      {...register("lossback", {
                        required: true,
                      })}
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <label className="col-sm-2 col-form-label">
                    Minimum Loss Amount *
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      {...register("loss_amount", {
                        required: true,
                      })}
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <label className="col-sm-2 col-form-label">
                    Minimum Bonus Amount *
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      {...register("max_bonus_amount", {
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

export default AddLossBackBonus;

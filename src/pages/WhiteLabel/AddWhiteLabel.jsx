import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import handleRandomToken from "../../utils/handleRandomToken";
import {
  useAddWhiteLabel,
  useWhiteLabel,
} from "../../hooks/AdminMaster/whiteLabel";
import { useNavigate } from "react-router-dom";

const AddWhiteLabel = () => {
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState(false);
  const { register, handleSubmit, reset, watch } = useForm();
  const { mutate, data } = useAddWhiteLabel();
  const { refetch } = useWhiteLabel({
    type: "viewWhitelabel",
  });

  const admin = watch("admin");

  const onSubmit = async (values) => {
    setDisabled(true);
    if (values?.password !== values?.confirm_password) {
      return toast.error("Password did not matched!");
    }
    const generatedToken = handleRandomToken();
    const payload = {
      type: "addWhitelabel",
      ...values,
      minimum_deposit: Number(values?.minimum_deposit),
      minimum_withdraw: Number(values?.minimum_withdraw),
      change_password: Number(values?.change_password),
      referral: Number(values?.referral),
      referral_create_account: Number(values?.referral_create_account),
      demo_login: Number(values?.demo_login),
      deposit: Number(values?.deposit),
      withdraw: Number(values?.withdraw),
      registration: Number(values?.registration),
      force_login: Number(values?.force_login),
      b2c: Number(values?.b2c),
      language: Number(values?.language),
      otp: Number(values?.otp),
      complaint: Number(values?.complaint),
      token: generatedToken,
    };

    mutate(payload, {
      onSuccess: (data) => {
        if (data?.success) {
          setDisabled(false);
          refetch();
          toast.success(data?.result);
          reset();
          navigate("/view-whitelable");
        } else {
          setDisabled(false);
          toast.error(data?.error);
        }
      },
    });
  };
  const SETTINGS_OPTIONS = [
    {
      label: "Logo Format",
      key: "logo_format",
      options: [
        {
          label: "PNG",
          value: "png",
          checked: true,
        },
        {
          label: "SVG",
          value: "svg",
          checked: false,
        },
      ],
    },
    {
      label: "Casino Currency",
      key: "casino_currency",
      options: [
        {
          label: "INR",
          value: "INR",
          checked: true,
        },
        {
          label: "AED",
          value: "AED",
          checked: false,
        },
      ],
    },
    {
      label: "Currency",
      key: "currency",
      options: [
        {
          label: "INR",
          value: "INR",
          checked: true,
        },
        {
          label: "AED",
          value: "AED",
          checked: false,
        },
      ],
    },
    {
      label: "Change Password",
      key: "change_password",
      options: [
        {
          label: "Yes",
          value: "1",
          checked: false,
        },
        {
          label: "No",
          value: "0",
          checked: true,
        },
      ],
    },
    {
      label: "Referral",
      key: "referral",
      options: [
        {
          label: "Yes",
          value: "1",
          checked: true,
        },
        {
          label: "No",
          value: "0",
          checked: false,
        },
      ],
    },
    {
      label: "Referral Create Account",
      key: "referral_create_account",
      options: [
        {
          label: "Yes",
          value: "1",
          checked: true,
        },
        {
          label: "No",
          value: "0",
          checked: false,
        },
      ],
    },
    {
      label: "Demo Login",
      key: "demo_login",
      options: [
        {
          label: "Yes",
          value: "1",
          checked: true,
        },
        {
          label: "No",
          value: "0",
          checked: false,
        },
      ],
    },
    {
      label: "Deposit",
      key: "deposit",
      options: [
        {
          label: "Yes",
          value: "1",
          checked: true,
        },
        {
          label: "No",
          value: "0",
          checked: false,
        },
      ],
    },
    {
      label: "Withdraw",
      key: "withdraw",
      options: [
        {
          label: "Yes",
          value: "1",
          checked: true,
        },
        {
          label: "No",
          value: "0",
          checked: false,
        },
      ],
    },
    {
      label: "Registration",
      key: "registration",
      options: [
        {
          label: "Yes",
          value: "1",
          checked: true,
        },
        {
          label: "No",
          value: "0",
          checked: false,
        },
      ],
    },
    {
      label: "Force Login",
      key: "force_login",
      options: [
        {
          label: "Yes",
          value: "1",
          checked: false,
        },
        {
          label: "No",
          value: "0",
          checked: true,
        },
      ],
    },
    {
      label: "B2C",
      key: "b2c",
      options: [
        {
          label: "Yes",
          value: "1",
          checked: true,
        },
        {
          label: "No",
          value: "0",
          checked: false,
        },
      ],
    },
    {
      label: "Language",
      key: "language",
      options: [
        {
          label: "Yes",
          value: "1",
          checked: true,
        },
        {
          label: "No",
          value: "0",
          checked: false,
        },
      ],
    },
    {
      label: "OTP",
      key: "otp",
      options: [
        {
          label: "Yes",
          value: "1",
          checked: true,
        },
        {
          label: "No",
          value: "0",
          checked: false,
        },
      ],
    },
    {
      label: "Complaint",
      key: "complaint",
      options: [
        {
          label: "Yes",
          value: "1",
          checked: false,
        },
        {
          label: "No",
          value: "0",
          checked: true,
        },
      ],
    },
  ];

  useEffect(() => {
    if (admin === "existing") {
      mutate({ type: "viewAdmin" });
    }
  }, [admin, mutate]);

  return (
    <>
      <div className="container-xxl flex-grow-1 container-p-y">
        <h4 className="py-3 breadcrumb-wrapper mb-4">
          <span className="text-muted fw-light">Home /</span> Add white Label
        </h4>

        <div className="row">
          <div className="col-xxl">
            <div className="card mb-4">
              <div className="card-body">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="row">
                    <div className="row mb-3">
                      <label className="col-sm-2 col-form-label">
                        Site Name
                      </label>
                      <div className="col-sm-10">
                        <input
                          type="text"
                          {...register("site_name", {
                            required: true,
                          })}
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label className="col-sm-2 col-form-label">
                        Owner Name
                      </label>
                      <div className="col-sm-10">
                        <input
                          type="text"
                          {...register("owner_name", {
                            required: true,
                          })}
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label className="col-sm-2 col-form-label">
                        Site URL
                      </label>
                      <div className="col-sm-10">
                        <input
                          type="text"
                          {...register("site_url", {
                            required: true,
                          })}
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label className="col-sm-2 col-form-label">
                        Live URL
                      </label>
                      <div className="col-sm-10">
                        <input
                          type="text"
                          {...register("live_url", {
                            required: true,
                          })}
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label className="col-sm-2 col-form-label">Admin</label>

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
                            defaultChecked
                            type="radio"
                            {...register("admin", {
                              required: true,
                            })}
                            value="new"
                          />
                          <span>New Admin</span>
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
                            {...register("admin", {
                              required: true,
                            })}
                            value="existing"
                          />
                          <span>Existing Admin</span>
                        </label>
                      </div>
                    </div>
                    {!admin || admin === "new" ? (
                      <div className="row mb-3">
                        <label className="col-sm-2 col-form-label">
                          Admin Name
                        </label>
                        <div className="col-sm-10">
                          <input
                            type="text"
                            {...register("admin_name", {
                              required: true,
                            })}
                            className="form-control"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="row mb-3">
                        <label className="col-sm-2 col-form-label">
                          Admin Name
                        </label>
                        <div className="col-sm-10">
                          <select
                            defaultValue=""
                            {...register("admin_id", {
                              required: true,
                            })}
                            className="form-control"
                          >
                            <option disabled value="">
                              Select Admin Name
                            </option>
                            {data?.result?.map((admin) => (
                              <option
                                key={admin?.admin_id}
                                value={admin?.admin_id}
                              >
                                {admin?.loginname}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    )}

                    <div className="row mb-3">
                      <label className="col-sm-2 col-form-label">
                        Password
                      </label>
                      <div className="col-sm-10">
                        <input
                          type="text"
                          {...register("password", {
                            required: true,
                          })}
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label className="col-sm-2 col-form-label">
                        Confirm Password
                      </label>
                      <div className="col-sm-10">
                        <input
                          type="text"
                          {...register("confirm_password", {
                            required: true,
                          })}
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label className="col-sm-2 col-form-label">
                        Minimum Deposit
                      </label>
                      <div className="col-sm-10">
                        <input
                          type="number"
                          {...register("minimum_deposit", {
                            required: true,
                          })}
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label className="col-sm-2 col-form-label">
                        Minimum Withdraw
                      </label>
                      <div className="col-sm-10">
                        <input
                          type="number"
                          {...register("minimum_withdraw", {
                            required: true,
                          })}
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label className="col-sm-2 col-form-label">Theme</label>
                      <div className="col-sm-10">
                        <input
                          type="text"
                          {...register("theme", {
                            required: true,
                          })}
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label className="col-sm-2 col-form-label">
                        Cloud Front
                      </label>
                      <div className="col-sm-10">
                        <input
                          type="text"
                          {...register("cloudfront", {
                            required: true,
                          })}
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label className="col-sm-2 col-form-label">
                        APK Link
                      </label>
                      <div className="col-sm-10">
                        <input
                          type="text"
                          {...register("apk_link", {
                            required: true,
                          })}
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label className="col-sm-2 col-form-label">
                        Logo Height
                      </label>
                      <div className="col-sm-10">
                        <input
                          type="text"
                          {...register("logo_height", {
                            required: true,
                          })}
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label className="col-sm-2 col-form-label">
                        Logo Width
                      </label>
                      <div className="col-sm-10">
                        <input
                          type="text"
                          {...register("logo_width", {
                            required: true,
                          })}
                          className="form-control"
                        />
                      </div>
                    </div>

                    {SETTINGS_OPTIONS.map((item, index) => {
                      return (
                        <div key={index} className="row mb-3">
                          <label className="col-sm-2 col-form-label">
                            {item.label}
                          </label>

                          <div
                            className="col-sm-10"
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "0px 30px",
                            }}
                          >
                            {item?.options?.map((option, idx) => (
                              <label
                                key={idx}
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "3px",
                                  cursor: "pointer",
                                }}
                              >
                                <input
                                  defaultChecked={option.checked}
                                  type="radio"
                                  {...register(item.key, {
                                    required: true,
                                  })}
                                  value={option.value}
                                />
                                <span>{option.label}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      );
                    })}

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
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddWhiteLabel;

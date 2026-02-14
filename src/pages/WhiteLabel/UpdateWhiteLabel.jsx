import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  useAddWhiteLabel,
  useWhiteLabel,
} from "../../hooks/AdminMaster/whiteLabel";
import { useLocation, useNavigate } from "react-router-dom";

const UpdateWhiteLabel = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const whitelabel_id = params.get("whitelabel_id");
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const { mutate: handleUpdate } = useAddWhiteLabel();

  const { data } = useWhiteLabel({
    type: "viewWhitelabelByID",
    whitelable_id: whitelabel_id,
  });

  const onSubmit = async (values) => {
    setDisabled(true);
    if (values?.password !== values?.confirm_password) {
      return toast.error("Password did not matched!");
    }

    const payload = {
      type: "updateWhitelabel",
      whitelable_id: whitelabel_id,
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
    };

    handleUpdate(payload, {
      onSuccess: (data) => {
        if (data?.success) {
          setDisabled(false);
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

  useEffect(() => {
    if (data?.result) {
      reset({ ...data.result });
    }
  }, [data]);

  if (!data?.result) return;

  const SETTINGS_OPTIONS = [
    {
      label: "Logo Format",
      key: "logo_format",
      options: [
        {
          label: "PNG",
          value: "png",
          checked: data?.result?.logo_format === "png",
        },
        {
          label: "SVG",
          value: "svg",
          checked: data?.result?.logo_format === "svg",
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
          checked: data?.result?.casino_currency === "INR",
        },
        {
          label: "AED",
          value: "AED",
          checked: data?.result?.casino_currency === "AED",
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
          checked: data?.result?.currency === "INR",
        },
        {
          label: "AED",
          value: "AED",
          checked: data?.result?.currency === "AED",
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
          checked: data?.result?.change_password,
        },
        {
          label: "No",
          value: "0",
          checked: !data?.result?.change_password,
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
          checked: data?.result?.referral,
        },
        {
          label: "No",
          value: "0",
          checked: !data?.result?.referral,
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
          checked: data?.result?.referral_create_account,
        },
        {
          label: "No",
          value: "0",
          checked: !data?.result?.referral_create_account,
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
          checked: data?.result?.demo_login,
        },
        {
          label: "No",
          value: "0",
          checked: !data?.result?.demo_login,
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
          checked: data?.result?.deposit,
        },
        {
          label: "No",
          value: "0",
          checked: !data?.result?.deposit,
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
          checked: data?.result?.withdraw,
        },
        {
          label: "No",
          value: "0",
          checked: !data?.result?.withdraw,
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
          checked: data?.result?.registration,
        },
        {
          label: "No",
          value: "0",
          checked: !data?.result?.registration,
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
          checked: data?.result?.force_login,
        },
        {
          label: "No",
          value: "0",
          checked: !data?.result?.force_login,
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
          checked: data?.result?.b2c,
        },
        {
          label: "No",
          value: "0",
          checked: !data?.result?.b2c,
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
          checked: data?.result?.language,
        },
        {
          label: "No",
          value: "0",
          checked: !data?.result?.language,
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
          checked: data?.result?.otp,
        },
        {
          label: "No",
          value: "0",
          checked: !data?.result?.otp,
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
          checked: data?.result?.complaint,
        },
        {
          label: "No",
          value: "0",
          checked: !data?.result?.complaint,
        },
      ],
    },
  ];

  return (
    <>
      <div className="container-xxl flex-grow-1 container-p-y">
        <h4 className="py-3 breadcrumb-wrapper mb-4">
          <span className="text-muted fw-light">Home /</span> Update white Label
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
                          {...register("site_name")}
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
                          {...register("owner_name")}
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
                          {...register("site_url")}
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
                          {...register("live_url")}
                          className="form-control"
                        />
                      </div>
                    </div>

                    {/* <div className="row mb-3">
                      <label className="col-sm-2 col-form-label">
                        Admin Name
                      </label>
                      <div className="col-sm-10">
                        <input
                          type="text"
                          {...register("admin_name")}
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label className="col-sm-2 col-form-label">
                        Password
                      </label>
                      <div className="col-sm-10">
                        <input
                          type="text"
                          {...register("password")}
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
                          {...register("confirm_password")}
                          className="form-control"
                        />
                      </div>
                    </div> */}

                    <div className="row mb-3">
                      <label className="col-sm-2 col-form-label">
                        Minimum Deposit
                      </label>
                      <div className="col-sm-10">
                        <input
                          type="number"
                          {...register("minimum_deposit")}
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
                          {...register("minimum_withdraw")}
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label className="col-sm-2 col-form-label">Theme</label>
                      <div className="col-sm-10">
                        <input
                          type="text"
                          {...register("theme")}
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
                          {...register("cloudfront")}
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
                          {...register("apk_link")}
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
                          {...register("logo_height")}
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
                          {...register("logo_width")}
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
                                  {...register(item.key)}
                                  value={option.value}
                                />
                                <span>{option.label}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      );
                    })}

                    <div className="row justify-content-start">
                      <div className="col-sm-10">
                        <input
                          disabled={disabled}
                          type="submit"
                          name="submit"
                          value="Update"
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

export default UpdateWhiteLabel;

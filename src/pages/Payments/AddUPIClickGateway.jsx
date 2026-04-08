import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import useGetPaymentMethod from "../../hooks/Master/Client/useGetPaymentMethod";

import { API } from "../../api";
import { classifications } from "../../static/classification";
import { AxiosSecure } from "../../lib/AxiosSecure";

const AddUPIClickGateway = () => {
  const [disabled, setDisabled] = useState(false);
  const payload = {
    type: "viewPaymentMethods",
  };
  const navigate = useNavigate();
  const { refetchPaymentMethods } = useGetPaymentMethod(payload);
  const { register, handleSubmit, reset } = useForm();

  /* add new payment gateway */
  const onSubmit = async (values) => {
    setDisabled(true);

    const payload = {
      type: "addPayment",
      ...values,

      method: "upiclick",
    };

    const res = await AxiosSecure.post(API.payments, payload);

    const data = res.data;
    if (data?.success) {
      setDisabled(false);
      refetchPaymentMethods();
      toast.success(data?.result?.message);
      reset();
      navigate("/view-payment-method");
    } else {
      setDisabled(false);
      toast.error(data?.error?.status?.[0]?.description);
    }
  };
  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <h4 className="py-3 breadcrumb-wrapper mb-4">
        <span className="text-muted fw-light">Home /</span> Add New Payment
        Gateway
      </h4>
      <div className="row">
        <div className="col-xxl">
          <div className="card mb-4">
            <div className="card-body">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row mb-3" id="upi_id">
                  <label
                    className="col-sm-2 col-form-label"
                    htmlFor="basic-default-company"
                  >
                    API Key
                  </label>
                  <div className="col-sm-10">
                    <input
                      {...register("api_key", {
                        required: true,
                      })}
                      type="text"
                      className="form-control"
                      id="basic-default-company"
                    />
                  </div>
                </div>
                <div className="row mb-3" id="upi_id">
                  <label
                    className="col-sm-2 col-form-label"
                    htmlFor="basic-default-company"
                  >
                    Secret Key
                  </label>
                  <div className="col-sm-10">
                    <input
                      {...register("secret_key", {
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
                    Minimum deposit amount
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
                <div className="row mb-3" id="bank_account_name_div">
                  <label
                    className="col-sm-2 col-form-label"
                    htmlFor="basic-default-name"
                  >
                    Client Level
                  </label>
                  <div
                    className="col-sm-10"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0px 30px",
                    }}
                  >
                    {classifications.map((item) => (
                      <label
                        key={item?.value}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "3px",
                          cursor: "pointer",
                        }}
                      >
                        <input
                          type="checkbox"
                          defaultChecked
                          {...register("level", { required: true })}
                          value={item?.value}
                        />
                        <span>{item?.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="row mb-3">
                  <label
                    className="col-sm-2 col-form-label"
                    htmlFor="basic-default-company"
                  >
                    Transaction Code
                  </label>
                  <div className="col-sm-10">
                    <input
                      {...register("transaction_code", {
                        required: "Transaction code is required",
                      })}
                      type="number"
                      className="form-control"
                      id="basic-default-company"
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

export default AddUPIClickGateway;

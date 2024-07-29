import axios from "axios";
import { API } from "../../../api";
import toast from "react-hot-toast";
import handleRandomToken from "../../../utils/handleRandomToken";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useContextState from "../../../hooks/useContextState";

const AddBonus = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();
  const { token, site } = useContextState();

  /* handle add client */
  const onSubmit = async (data) => {
    const generatedToken = handleRandomToken();
    console.log(data);
    // const payload = {
    //   username,
    //   password,
    //   mobile,
    //   remark,
    //   token: generatedToken,
    //   site,
    // };
    // const res = await axios.post(API.registerPanel, payload, {
    //   headers: { Authorization: `Bearer ${token}` },
    // });
    // const data = res.data;
    // if (data?.success) {
    //   toast.success("Client added successfully");
    //   reset();
    //   navigate("/view-client");
    // } else {
    //   toast.error(data?.error?.description);
    // }
  };
  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <h4 className="py-3 breadcrumb-wrapper mb-4">
        <span className="text-muted fw-light">Home /</span> Add Bonus
      </h4>

      <div className="row">
        <div className="col-xxl">
          <div className="card mb-4">
            <div className="card-body">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row mb-3" id="bank_account_name_div">
                  <label
                    className="col-sm-2 col-form-label"
                    htmlFor="basic-default-name"
                  >
                    Bonus Title *
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      {...register("bonusTitle", {
                        required: true,
                      })}
                      className="form-control"
                      id="basic-default-name"
                    />
                  </div>
                </div>

                <div className="row mb-3" id="bank_account_name_div">
                  <label
                    className="col-sm-2 col-form-label"
                    htmlFor="basic-default-name"
                  >
                    Bonus Method *
                  </label>
                  <div
                    className="col-sm-10"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "50px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "5px",
                      }}
                    >
                      <span>Deposit Bonus</span>
                      <input
                        type="radio"
                        {...register("bonusMethod")}
                        value="depositBonus"
                        className=""
                        id="basic-default-name"
                      />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "5px",
                      }}
                    >
                      <span>Registration Bonus</span>
                      <input
                        type="radio"
                        {...register("bonusMethod")}
                        className=""
                        id="basic-default-name"
                        value="registrationBonus"
                      />
                    </div>
                  </div>
                </div>

                <div className="row mb-3" id="bank_account_name_div">
                  <label
                    className="col-sm-2 col-form-label"
                    htmlFor="basic-default-name"
                  >
                    Bonus Wallet Type *
                  </label>
                  <div
                    className="col-sm-10"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "50px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "5px",
                      }}
                    >
                      <span>Bonus Wallet</span>
                      <input
                        type="radio"
                        {...register("bonusWalletType")}
                        className=""
                        id="basic-default-name"
                        value="bonusWallet"
                      />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "5px",
                      }}
                    >
                      <span>Main Wallet</span>
                      <input
                        type="radio"
                        {...register("bonusWalletType")}
                        className=""
                        value="mainWallet"
                        id="basic-default-name"
                      />
                    </div>
                  </div>
                </div>

                <div className="row mb-3" id="bank_account_name_div">
                  <label
                    className="col-sm-2 col-form-label"
                    htmlFor="basic-default-name"
                  >
                    Bonus Amount *
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="number"
                      {...register("bonusAmount", {
                        required: true,
                      })}
                      className="form-control"
                      id="basic-default-name"
                    />
                  </div>
                </div>

                <div className="row mb-3" id="bank_account_name_div">
                  <label
                    className="col-sm-2 col-form-label"
                    htmlFor="basic-default-name"
                  >
                    Bonus Amount Type *
                  </label>
                  <div
                    className="col-sm-10"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "50px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "5px",
                      }}
                    >
                      <span>Fixed Amount</span>
                      <input
                        type="radio"
                        {...register("bonusAmountType")}
                        className=""
                        id="basic-default-name"
                        value="fixedAmount"
                      />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "5px",
                      }}
                    >
                      <span>Percentage</span>
                      <input
                        type="radio"
                        {...register("bonusAmountType")}
                        className=""
                        value="percentage"
                        id="basic-default-name"
                      />
                    </div>
                  </div>
                </div>

                <div className="row mb-3" id="bank_account_name_div">
                  <label
                    className="col-sm-2 col-form-label"
                    htmlFor="basic-default-name"
                  >
                    Bonus Status *
                  </label>
                  <div
                    className="col-sm-10"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "50px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "5px",
                      }}
                    >
                      <span>Active</span>
                      <input
                        type="radio"
                        {...register("bonusStatus")}
                        className=""
                        value="active"
                        id="basic-default-name"
                      />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "5px",
                      }}
                    >
                      <span>Inactive</span>
                      <input
                        type="radio"
                        {...register("bonusStatus")}
                        className=""
                        id="basic-default-name"
                        value="inactive"
                      />
                    </div>
                  </div>
                </div>

                <div className="row mb-3" id="bank_account_name_div">
                  <label
                    className="col-sm-2 col-form-label"
                    htmlFor="basic-default-name"
                  >
                    Max Bonus Amount *
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      {...register("maxBonusAmount", {
                        required: true,
                      })}
                      className="form-control"
                      id="basic-default-name"
                    />
                  </div>
                </div>

                <div className="row justify-content-end">
                  <div className="col-sm-10">
                    <input
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

export default AddBonus;

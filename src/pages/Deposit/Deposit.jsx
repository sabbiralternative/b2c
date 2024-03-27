import axios from "axios";
import { API } from "../../api";
import toast from "react-hot-toast";
import handleRandomToken from "../../utils/handleRandomToken";
import useContextState from "../../hooks/useContextState";
import { useForm } from "react-hook-form";

const Deposit = () => {
  const { register, handleSubmit, reset } = useForm();
  const { token } = useContextState();
  const downlineId = localStorage.getItem("downLineId");

  const onSubmit = async ({ amount, remark }) => {
    const generatedToken = handleRandomToken();
    //   const encryptedData = handleEncryptData({
    //     newPassword: newPassword,
    //     confirmPassword: newPasswordConfirm,
    //     mpassword: transactionCode,
    //     type: "panel",
    //     token: generatedToken,
    //   });
    const payload = {
      downlineId,
      type: "deposit",
      amount,
      remark,
      token: generatedToken,
    };
    const res = await axios.post(API.downLineEdit, payload, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = res.data;
    if (data?.success) {
      toast.success(data?.result?.message);
      reset();
    } else {
      toast.error(data?.error?.status?.[0]?.description);
    }
  };
  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <h4 className="py-3 breadcrumb-wrapper mb-4">
        <span className="text-muted fw-light">
          <a href="index.php">Home</a> /
        </span>
        Deposit
      </h4>

      <div className="row">
        <div className="col-xxl">
          <div className="card mb-4">
            <div className="card-header d-flex align-items-center justify-content-between">
              <h5 className="mb-0">Basic Layout</h5>{" "}
              <small className="text-muted float-end">Default label</small>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row mb-3" id="bank_account_name_div">
                  <label
                    className="col-sm-2 col-form-label"
                    htmlFor="basic-default-name"
                  >
                    Amount *
                  </label>
                  <div className="col-sm-10">
                    <input
                      {...register("amount", {
                        required: true,
                      })}
                      type="number"
                      className="form-control"
                      id="basic-default-name"
                      placeholder="Amount"
                    />
                  </div>
                </div>

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
                        required: true,
                      })}
                      type="text"
                      className="form-control"
                      id="basic-default-name"
                      placeholder="Remark"
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

export default Deposit;

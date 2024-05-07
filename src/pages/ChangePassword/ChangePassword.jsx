import { useForm } from "react-hook-form";
import useContextState from "../../hooks/useContextState";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { API, Settings } from "../../api";
import { handleLogOut } from "../../utils/handleLogOut";
import handleRandomToken from "../../utils/handleRandomToken";

const ChangePassword = () => {
  const { register, handleSubmit } = useForm();
  const { token } = useContextState();
  const navigate = useNavigate();

  const onSubmit = async ({ oldPassword, newPassword, confirmPassword }) => {

    const generatedToken = handleRandomToken();
    //   const encryptedData = handleEncryptData({
    //     newPassword: newPassword,
    //     confirmPassword: newPasswordConfirm,
    //     mpassword: transactionCode,
    //     type: "panel",
    //     token: generatedToken,
    //   });
    const payload = {
      newPassword,
      oldPassword,
      confirmPassword,
      token: generatedToken,
      site:Settings.siteUrl
    };
    const res = await axios.post(API.changePassword, payload, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = res.data;

    if (data?.success) {
      toast.success(data?.result?.message);
      setTimeout(() => {
        handleLogOut();
        navigate("/login");
      }, 1000);
    } else {
      toast.error(data?.error?.status?.[0]?.description);
    }
  };
  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <h4 className="py-3 breadcrumb-wrapper mb-4">
        <span className="text-muted fw-light">Home /</span> Change Password
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
                    Old Password *
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      {...register("oldPassword", {
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
                    New Password *
                  </label>
                  <div className="col-sm-10">
                    <input
                      {...register("newPassword", {
                        required: true,
                      })}
                      type="text"
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
                    Confirm Password *
                  </label>
                  <div className="col-sm-10">
                    <input
                      {...register("confirmPassword", {
                        required: true,
                      })}
                      type="text"
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

export default ChangePassword;

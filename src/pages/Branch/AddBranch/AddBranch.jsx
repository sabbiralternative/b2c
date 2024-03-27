import { useForm } from "react-hook-form";
import useContextState from "../../../hooks/useContextState";
import toast from "react-hot-toast";
import handleRandomToken from "../../../utils/handleRandomToken";
import axios from "axios";
import { API } from "../../../api";

const AddBranch = () => {
  const { register, handleSubmit, reset } = useForm();
  const { token } = useContextState();

  const onSubmit = async ({ username, password, notes }) => {
    const generatedToken = handleRandomToken();
    //   const encryptedData = handleEncryptData({
    //     newPassword: newPassword,
    //     confirmPassword: newPasswordConfirm,
    //     mpassword: transactionCode,
    //     type: "panel",
    //     token: generatedToken,
    //   });
    const payload = {
      username,
      password,
      notes,
      token: generatedToken,
    };
    const res = await axios.post(API.addBranch, payload, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = res.data;
    if (data?.success) {
      toast.success("Branch created successfully");
      reset();
    } else {
      toast.error(data?.error?.status?.[0]?.description);
    }
  };
  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <h4 className="py-3 breadcrumb-wrapper mb-4">
        <span className="text-muted fw-light">Home /</span> Add Branch
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
                    User Name *
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      {...register("username", {
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
                    Password *
                  </label>
                  <div className="col-sm-10">
                    <input
                      {...register("password", {
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
                    Notes *
                  </label>
                  <div className="col-sm-10">
                    <input
                      {...register("notes", {
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

export default AddBranch;

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useContextState from "../../../hooks/useContextState";
import handleRandomToken from "../../../utils/handleRandomToken";
import axios from "axios";
import { API, Settings } from "../../../api";
import toast from "react-hot-toast";

const AddClient = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();
  const { token } = useContextState();

  /* handle add client */
  const onSubmit = async ({ username, password, mobile, remark }) => {
    const generatedToken = handleRandomToken();
    const payload = {
      username,
      password,
      mobile,
      remark,
      token: generatedToken,
      site:Settings.siteUrl
    };
    const res = await axios.post(API.registerPanel, payload, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = res.data;
    if (data?.success) {
      toast.success("Client added successfully");
      reset();
      navigate("/view-client");
    } else {
      toast.error(data?.error?.description);
    }
  };
  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <h4 className="py-3 breadcrumb-wrapper mb-4">
        <span className="text-muted fw-light">Home /</span> Add Client
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
                    Username *
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
                      type="text"
                      {...register("password", {
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
                    Mobile *
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="number"
                      {...register("mobile", {
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
                    Remark
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      {...register("remark", {
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

export default AddClient;

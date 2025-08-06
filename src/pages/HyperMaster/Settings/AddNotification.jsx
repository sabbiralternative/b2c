import { useState } from "react";
import useContextState from "../../../hooks/useContextState";
import { API } from "../../../api";
import handleRandomToken from "../../../utils/handleRandomToken";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useWhiteLabel } from "../../../hooks/AdminMaster/whiteLabel";
import { AdminRole } from "../../../constant/constant";
import { AxiosSecure } from "../../../lib/AxiosSecure";

const AddNotification = () => {
  const { data } = useWhiteLabel({
    type: "viewWhitelabelByAdmin",
  });
  const [status, setStatus] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();
  const { adminRole } = useContextState();

  const onSubmit = async (fieldValues) => {
    if (!status) {
      return toast.error("Status is required!");
    }
    setDisabled(true);
    const generatedToken = handleRandomToken();
    const payload = {
      ...fieldValues,
      type: "addNotification",
      status,
      token: generatedToken,
    };
    const res = await AxiosSecure.post(API.index, payload);
    const data = res.data;
    if (data?.success) {
      setDisabled(false);

      toast.success(data?.result?.message);
      reset();
      navigate("/view-notification");
    } else {
      setDisabled(false);
      toast.error(data?.error?.status?.[0]?.description);
    }
  };
  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <h4 className="py-3 breadcrumb-wrapper mb-4">
        <span className="text-muted fw-light">Home /</span> Add Notification
      </h4>

      <div className="row">
        <div className="col-xxl">
          <div className="card mb-4">
            <div className="card-body">
              <form onSubmit={handleSubmit(onSubmit)}>
                {adminRole === AdminRole.hyper_master &&
                  data?.result?.length > 0 && (
                    <div className="row mb-3" id="bank_account_name_div">
                      <label
                        className="col-sm-2 col-form-label"
                        htmlFor="basic-default-name"
                      >
                        Site *
                      </label>
                      <div className="col-sm-10">
                        <select
                          defaultValue=""
                          {...register("site", {
                            required: true,
                          })}
                          className="form-control"
                        >
                          <option disabled value="">
                            Select Site
                          </option>
                          {data?.result?.map((site) => (
                            <option key={site?.site_url} value={site?.site_url}>
                              {site?.site_url}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}

                <div className="row mb-3" id="bank_account_number_div">
                  <label
                    className="col-sm-2 col-form-label"
                    htmlFor="basic-default-company"
                  >
                    Notification Text{" "}
                  </label>
                  <div className="col-sm-10">
                    <textarea
                      {...register("notification_text", {
                        required: true,
                      })}
                      type="number"
                      className="form-control"
                      id="basic-default-company"
                      placeholder=""
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <label
                    htmlFor="exampleFormControlSelect1"
                    className="col-sm-2 col-form-label"
                  >
                    Status
                  </label>
                  <div className="col-sm-10" data-select2-id="26">
                    <div className="position-relative" data-select2-id="25">
                      <div
                        style={{
                          display: "flex",
                          gap: "20px",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                          }}
                        >
                          <p style={{ margin: "0px" }}>Active</p>
                          <input
                            onChange={(e) => setStatus(e.target.value)}
                            checked={status === "active"}
                            type="radio"
                            value="active"
                          />
                        </div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                          }}
                        >
                          <p style={{ margin: "0px" }}>Inactive </p>
                          <input
                            onChange={(e) => setStatus(e.target.value)}
                            checked={status === "inactive"}
                            type="radio"
                            value="inactive"
                          />
                        </div>
                      </div>
                    </div>
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

export default AddNotification;

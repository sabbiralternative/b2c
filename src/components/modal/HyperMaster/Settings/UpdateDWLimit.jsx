import toast from "react-hot-toast";
import { useEffect, useRef, useState } from "react";
import useCloseModalClickOutside from "../../../../hooks/useCloseModalClickOutside";
import { useForm } from "react-hook-form";
import useContextState from "../../../../hooks/useContextState";
import { API } from "../../../../api";
import { useWhiteLabel } from "../../../../hooks/AdminMaster/whiteLabel";
import { AdminRole } from "../../../../constant/constant";
import { useGetIndex } from "../../../../hooks";
import { AxiosSecure } from "../../../../lib/AxiosSecure";

const UpdateDWLimit = ({ setShowDWLimit }) => {
  const { data } = useWhiteLabel({
    type: "viewWhitelabelByAdmin",
  });
  const [disabled, setDisabled] = useState(false);
  const ref = useRef();
  useCloseModalClickOutside(ref, () => {
    setShowDWLimit(false);
  });

  const { register, handleSubmit, reset, watch } = useForm();
  const { adminRole } = useContextState();
  const site = watch("site");
  const { data: dwLimit } = useGetIndex({
    site,
    type: "viewDWLimit",
  });

  const onSubmit = async (values) => {
    setDisabled(true);

    const payload = {
      type: "updateDWLimit",
      ...values,
    };

    const res = await AxiosSecure.post(API.index, payload);
    const data = res.data;
    if (data?.success) {
      setDisabled(false);
      toast.success(data?.result?.message);
      reset();
      setShowDWLimit(false);
    } else {
      setDisabled(false);
      toast.error(data?.error?.status?.[0]?.description);
    }
  };

  useEffect(() => {
    if (dwLimit?.success) {
      reset({
        site,
        ...dwLimit?.result,
      });
    }
  }, [dwLimit, reset, site]);

  return (
    <>
      <div className="content-backdrop fade show"></div>
      <div
        className="modal fade show"
        id="modalCenter"
        aria-modal="true"
        role="dialog"
        style={{ display: "block" }}
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content" ref={ref}>
            <div className="modal-header">
              <h5 className="modal-title" id="modalCenterTitle">
                Update D/W limits
              </h5>
              <button
                onClick={() => setShowDWLimit(false)}
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="modal-body">
                <div className="row">
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
                              <option
                                key={site?.site_url}
                                value={site?.site_url}
                              >
                                {site?.site_url}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    )}
                  <div className="row mb-3" id="bank_account_name_div">
                    <label
                      className="col-sm-2 col-form-label"
                      htmlFor="basic-default-name"
                    >
                      Deposit Limit
                    </label>
                    <div className="col-sm-10">
                      <input
                        {...register("deposit_limit")}
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
                      Withdraw Limit
                    </label>
                    <div className="col-sm-10">
                      <input
                        {...register("withdraw_limit")}
                        type="text"
                        className="form-control"
                        id="basic-default-name"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  onClick={() => setShowDWLimit(false)}
                  type="button"
                  className="btn btn-label-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  disabled={disabled || !site}
                  type="submit"
                  className="btn btn-primary"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateDWLimit;

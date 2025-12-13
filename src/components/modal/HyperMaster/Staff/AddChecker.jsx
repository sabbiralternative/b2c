import { useRef, useState } from "react";
import useCloseModalClickOutside from "../../../../hooks/useCloseModalClickOutside";
import handleRandomToken from "../../../../utils/handleRandomToken";
import { useForm } from "react-hook-form";

import {
  useAddChecker,
  useGetAllChecker,
} from "../../../../hooks/HyperMaster/Staff";
import toast from "react-hot-toast";
import useContextState from "../../../../hooks/useContextState";
import { AdminRole } from "../../../../constant/constant";

const AddChecker = ({ setShowAddChecker }) => {
  const [disabled, setDisabled] = useState(false);
  const { adminRole } = useContextState();

  const addCheckerRef = useRef();
  useCloseModalClickOutside(addCheckerRef, () => {
    setShowAddChecker(false);
  });
  const { register, handleSubmit, reset } = useForm();
  const { mutate: addChecker } = useAddChecker();
  const { refetch } = useGetAllChecker({
    type: "viewStaff",
    role: "admin_staff",
  });

  const onSubmit = async (values) => {
    setDisabled(true);
    const generatedToken = handleRandomToken();
    let payload;
    if (adminRole === "master") {
      payload = {
        ...values,
        type: "addStaff",
        token: generatedToken,
      };
    } else {
      payload = {
        ...values,
        type: "addStaff",
        role: "admin_staff",
        token: generatedToken,
      };
    }

    addChecker(payload, {
      onSuccess: (data) => {
        if (data?.success) {
          setDisabled(false);
          refetch();
          toast.success(data?.result);
          reset();
          setShowAddChecker(false);
        } else {
          setDisabled(false);
          toast.error(data?.error);
        }
      },
    });
  };

  const permissionsList = [
    { label: "Deposit", value: "deposit", show: true },
    { label: "Withdraw", value: "withdraw", show: true },
    { label: "Client", value: "client", show: true },
    { label: "Payment", value: "payment", show: true },
    { label: "Report", value: "report", show: true },
    {
      label: "Direct Deposit",
      value: "directDeposit",
      show: adminRole !== AdminRole.hyper_master,
    },
    {
      label: "Deposit With Slip",
      value: "depositWithSlip",
      show: adminRole !== AdminRole.hyper_master,
    },
    {
      label: "Direct Withdraw",
      value: "directWithdraw",
      show: adminRole !== AdminRole.hyper_master,
    },
    { label: "Settings", value: "settings", show: true },
    { label: "Bonus", value: "bonus", show: true },
    { label: "Exposure", value: "exposure", show: true },
    { label: "Dashboard", value: "dashboard", show: true },
  ];

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
          <div className="modal-content" ref={addCheckerRef}>
            <div className="modal-header">
              <h5 className="modal-title" id="modalCenterTitle">
                Add {adminRole === "master" ? "Staff" : "admin_staff"}
              </h5>
              <button
                onClick={() => setShowAddChecker(false)}
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="modal-body">
                <div className="row">
                  <div className="row mb-3" id="bank_account_name_div">
                    <label
                      className="col-sm-2 col-form-label"
                      htmlFor="basic-default-name"
                    >
                      Staff Name
                    </label>
                    <div className="col-sm-10">
                      <input
                        type="text"
                        {...register("staffname", {
                          required: true,
                        })}
                        className="form-control"
                        id="basic-default-name"
                        placeholder=""
                      />
                    </div>
                  </div>
                  <div className="row mb-3" id="bank_account_number_div">
                    <label
                      className="col-sm-2 col-form-label"
                      htmlFor="basic-default-company"
                    >
                      Username
                    </label>
                    <div className="col-sm-10">
                      <input
                        type="text"
                        {...register("username", {
                          required: true,
                        })}
                        className="form-control"
                        id="basic-default-company"
                        placeholder=""
                      />
                    </div>
                  </div>
                  <div className="row mb-3" id="ifsc_div">
                    <label
                      className="col-sm-2 col-form-label"
                      htmlFor="basic-default-company"
                    >
                      Password
                    </label>
                    <div className="col-sm-10">
                      <input
                        type="text"
                        {...register("password", {
                          required: true,
                        })}
                        className="form-control"
                        id="basic-default-company"
                        placeholder=""
                      />
                    </div>
                  </div>
                  {(adminRole === "master" ||
                    adminRole === AdminRole.hyper_master) && (
                    <div className="row mb-3" id="ifsc_div">
                      <label
                        style={{ paddingTop: "0px" }}
                        className="col-sm-2 col-form-label"
                        htmlFor="basic-default-company"
                      >
                        Permissions
                      </label>
                      <div
                        className="col-sm-10"
                        style={{
                          display: "flex",

                          gap: "15px",
                          flexWrap: "wrap",
                        }}
                      >
                        {permissionsList.map((permission) => {
                          if (!permission.show) return;
                          return (
                            <div
                              key={permission.value}
                              style={{
                                display: "flex",
                                alignItems: "start",

                                gap: "3px",
                              }}
                            >
                              <input
                                style={{ height: "100%" }}
                                type="checkbox"
                                {...register("permissions", { required: true })}
                                value={permission.value}
                              />
                              <p
                                style={{
                                  margin: "0px",

                                  height: "100%",
                                }}
                              >
                                {permission.label}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="modal-footer">
                <button
                  onClick={() => setShowAddChecker(false)}
                  type="button"
                  className="btn btn-label-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  disabled={disabled}
                  type="submit"
                  className="btn btn-primary"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddChecker;

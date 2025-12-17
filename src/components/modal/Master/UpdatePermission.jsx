import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  useGetAllChecker,
  useGetSingleChecker,
  useUpdateSingleChecker,
} from "../../../hooks/HyperMaster/Staff";
import useCloseModalClickOutside from "../../../hooks/useCloseModalClickOutside";
import handleRandomToken from "../../../utils/handleRandomToken";
import useContextState from "../../../hooks/useContextState";
import { AdminRole } from "../../../constant/constant";

const UpdatePermission = ({ setShowPermission, showPermission }) => {
  const { adminRole } = useContextState();
  const [disabled, setDisabled] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const updatePermissionRef = useRef();
  useCloseModalClickOutside(updatePermissionRef, () => {
    setShowPermission(false);
  });

  const { data: checkerData } = useGetSingleChecker({
    type: "viewSingleStaff",
    staff_id: showPermission,
  });

  const { mutate: updatePermission } = useUpdateSingleChecker();
  const { refetch } = useGetAllChecker();

  const onSubmit = async (values) => {
    setDisabled(true);
    const generatedToken = handleRandomToken();
    const payload = {
      ...values,
      type: "updateStaffRole",
      token: generatedToken,
      staff_id: showPermission,
    };

    updatePermission(payload, {
      onSuccess: (data) => {
        if (data?.success) {
          setDisabled(false);
          refetch();
          toast.success(data?.result);
          reset();
          setShowPermission(false);
        } else {
          setDisabled(false);
          toast.error(data?.error);
        }
      },
    });
  };
  const staffData = checkerData?.result?.[0]?.permissions;

  if (!checkerData?.success) {
    return null;
  }

  const permissionsList = [
    {
      label: "Dashboard",
      value: "dashboard",
      show:
        adminRole === AdminRole.hyper_master || adminRole === AdminRole.master,
    },
    {
      label: "Deposit",
      value: "deposit",
      show:
        adminRole === AdminRole.hyper_master || adminRole === AdminRole.master,
    },
    {
      label: "Withdraw",
      value: "withdraw",
      show:
        adminRole === AdminRole.hyper_master || adminRole === AdminRole.master,
    },
    {
      label: "Client",
      value: "client",
      show:
        adminRole === AdminRole.hyper_master || adminRole === AdminRole.master,
    },
    {
      label: "Direct Deposit",
      value: "directDeposit",
      show: true,
    },
    {
      label: "Deposit With Slip",
      value: "depositWithSlip",
      show: true,
    },
    {
      label: "Direct Withdraw",
      value: "directWithdraw",
      show: true,
    },
    {
      label: "Payment",
      value: "payment",
      show: adminRole === AdminRole.master,
    },
    {
      label: "Report",
      value: "report",
      show:
        adminRole === AdminRole.hyper_master || adminRole === AdminRole.master,
    },
    {
      label: "Settings",
      value: "setting",
      show: adminRole === AdminRole.hyper_master,
    },
    {
      label: "Bonus",
      value: "bonus",
      show: adminRole === AdminRole.master,
    },
    {
      label: "Exposure",
      value: "exposure",
      show:
        adminRole === AdminRole.hyper_master || adminRole === AdminRole.master,
    },

    {
      label: "Password",
      value: "password",
      show:
        adminRole === AdminRole.hyper_master || adminRole === AdminRole.master,
    },
    {
      label: "Branch",
      value: "branch",
      show: adminRole === AdminRole.hyper_master,
    },
    {
      label: "Complaint",
      value: "complaint",
      show: adminRole === AdminRole.hyper_master,
    },
    {
      label: "Staff",
      value: "staff",
      show:
        adminRole === AdminRole.master || adminRole === AdminRole.hyper_master,
    },
    {
      label: "Affiliate",
      value: "affiliate",
      show: adminRole === AdminRole.hyper_master,
    },
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
          <div className="modal-content" ref={updatePermissionRef}>
            <div className="modal-header">
              <h5 className="modal-title" id="modalCenterTitle">
                Update Permissions
              </h5>
              <button
                onClick={() => setShowPermission(false)}
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="modal-body">
                <div className="row">
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
                        flexWrap: "wrap",
                        gap: "15px",
                      }}
                    >
                      {permissionsList.map((permission) => {
                        if (!permission?.show) return null;

                        return (
                          <label
                            key={permission.value}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "3px",
                              cursor: "pointer",
                            }}
                          >
                            <input
                              type="checkbox"
                              {...register("permissions", { required: true })}
                              value={permission.value}
                              defaultChecked={staffData?.includes(
                                permission.value
                              )}
                            />
                            <span>{permission.label}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  onClick={() => setShowPermission(false)}
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

export default UpdatePermission;

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

const AddChecker = ({ setShowAddChecker }) => {
  const { adminRole } = useContextState();
  const [selected, setSelected] = useState(null);

  const handleCheckboxChange = (value) => {
    if (selected === value) {
      setSelected(null);
    } else {
      setSelected(value);
    }
  };
  const addCheckerRef = useRef();
  useCloseModalClickOutside(addCheckerRef, () => {
    setShowAddChecker(false);
  });
  const { register, handleSubmit, reset } = useForm();
  const { mutate: addChecker } = useAddChecker();
  const { refetch } = useGetAllChecker({
    type: "viewStaff",
    role: "checker",
  });

  const onSubmit = async (values) => {
    const generatedToken = handleRandomToken();
    let payload;
    if (adminRole === "master") {
      payload = {
        ...values,
        permissions: values?.permissions?.[0],
        type: "addStaff",
        role: "checker",
        token: generatedToken,
      };
    } else {
      payload = {
        ...values,
        type: "addStaff",
        role: "checker",
        token: generatedToken,
      };
    }

    addChecker(payload, {
      onSuccess: (data) => {
        if (data?.success) {
          refetch();
          toast.success(data?.result);
          reset();
          setShowAddChecker(false);
        } else {
          toast.error(data?.error);
        }
      },
    });
  };
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
                Add Checker
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
                  {adminRole === "master" && (
                    <div className="row mb-3" id="ifsc_div">
                      <label
                        className="col-sm-2 col-form-label"
                        htmlFor="basic-default-company"
                      >
                        Permissions
                      </label>
                      <div
                        className="col-sm-10"
                        style={{
                          display: "flex",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "start",
                            marginRight: "40px",
                            gap: "3px",
                          }}
                        >
                          <input
                            style={{ height: "100%" }}
                            type="checkbox"
                            {...register("permissions", { required: true })}
                            checked={selected === "deposit"}
                            onChange={() => handleCheckboxChange("deposit")}
                            value="deposit"
                          />
                          <p
                            style={{
                              margin: "0px",
                              marginTop: "5px",
                              height: "100%",
                            }}
                          >
                            Deposit
                          </p>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "start",
                            gap: "3px",
                          }}
                        >
                          <input
                            value="withdraw"
                            style={{ height: "100%" }}
                            type="checkbox"
                            {...register("permissions", { required: true })}
                            checked={selected === "withdraw"}
                            onChange={() => handleCheckboxChange("withdraw")}
                          />
                          <p
                            style={{
                              margin: "0px",
                              marginTop: "5px",
                              height: "100%",
                            }}
                          >
                            Withdraw
                          </p>
                        </div>
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
                <button type="submit" className="btn btn-primary">
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

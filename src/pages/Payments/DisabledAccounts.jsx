import Swal from "sweetalert2";
import axios from "axios";
import toast from "react-hot-toast";
import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { useGetIndex } from "../../hooks";
import useContextState from "../../hooks/useContextState";
import { AdminRole } from "../../constant/constant";
import useGetPaymentMethod from "../../hooks/Master/Client/useGetPaymentMethod";
import handleRandomToken from "../../utils/handleRandomToken";
import { API } from "../../api";
import ShowImage from "../../components/modal/ShowImage";

const DisabledAccounts = () => {
  const [branchId, setBranchId] = useState(0);
  const { data } = useGetIndex({
    type: "getBranches",
  });
  const [showPaymentImage, setShowPaymentImage] = useState(false);
  const [image, setImage] = useState("");
  const { token, setShowEditPayment, setDownLineId, readOnly, adminRole } =
    useContextState();
  const payload = {
    type: "viewPaymentMethods",
    payment_status: "disabled",
  };
  if (adminRole === AdminRole.admin_staff) {
    payload.branch_id = branchId;
  }
  const { paymentsMethods, refetchPaymentMethods } =
    useGetPaymentMethod(payload);

  console.log(paymentsMethods);

  /* delete payments method */
  const handleDeletePaymentMethod = async (paymentId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this account!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const generatedToken = handleRandomToken();
        const payload = {
          type: "deletePayment",
          paymentId,
          token: generatedToken,
        };
        const res = await axios.post(API.payments, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = res.data;
        if (data?.success) {
          refetchPaymentMethods();
          toast.success(data?.result?.message);
        } else {
          toast.error(data?.error?.status?.[0]?.description);
        }
      }
    });
  };

  return (
    <>
      {showPaymentImage && (
        <ShowImage image={image} setShowImage={setShowPaymentImage} />
      )}
      <div className="container-xxl flex-grow-1 container-p-y">
        <div className="card">
          <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
            <h5 className="card-header">Disabled Accounts</h5>
            {adminRole === AdminRole.admin_staff && (
              <div
                style={{ display: "flex", alignItems: "center", gap: "5px" }}
              >
                <div>Branch:</div>
                <select
                  style={{ width: "200px" }}
                  defaultValue="0"
                  onChange={(e) => setBranchId(e.target.value)}
                  className="form-control"
                >
                  <option disabled value="">
                    Branch
                  </option>
                  <option value="0">All Branch</option>
                  {data?.result?.map((site) => (
                    <option key={site?.branch_id} value={site?.branch_id}>
                      {site?.branch_name}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          <div className="table-responsive text-nowrap">
            <table className="table table-hover table-sm">
              <thead className="table-dark">
                <tr>
                  <th>Type</th>
                  {adminRole === AdminRole.admin_staff && <th>Branch name</th>}
                  <th>Account name</th>
                  <th>Level</th>
                  <th>Image</th>
                  <th>Limits</th>

                  <th>status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className="table-border-bottom-0">
                {paymentsMethods?.map((method, i) => {
                  return (
                    <tr key={i}>
                      <td>{method?.type}</td>
                      {adminRole === AdminRole.admin_staff && (
                        <td>{method?.branchName}</td>
                      )}

                      <td>{method?.name}</td>
                      <td>{method?.level}</td>
                      <td>
                        {method?.image ? (
                          <span
                            onClick={() => {
                              setImage("");
                              setShowPaymentImage(true);
                              setImage(method?.image);
                            }}
                            style={{
                              color: "#346cee",
                              cursor: "pointer",
                            }}
                          >
                            View
                          </span>
                        ) : (
                          <span>N/A</span>
                        )}
                      </td>

                      <td>
                        Rs.{method?.minAmount}-{method?.maxAmount}
                      </td>

                      <td>
                        <span
                          className={`badge ${
                            method?.status == 1
                              ? "bg-label-primary"
                              : method?.status == 0
                                ? "bg-label-warning"
                                : "bg-label-danger"
                          } me-1`}
                        >
                          {method?.status == 1
                            ? "Active"
                            : method?.status == 0
                              ? "inactive"
                              : "deleted"}
                        </span>
                      </td>

                      <td>
                        {(adminRole === AdminRole.admin_staff ||
                          adminRole === AdminRole.hyper_master) && (
                          <Link
                            to={`/view-payment-logs/${method?.id}`}
                            style={{
                              color: "white",
                              cursor: `${
                                !readOnly ? "pointer" : "not-allowed"
                              }`,
                              marginRight: "4px",
                            }}
                            className="btn btn-icon btn-sm btn-success"
                          >
                            L
                          </Link>
                        )}
                        {adminRole !== AdminRole.admin_staff && (
                          <Fragment>
                            <a
                              style={{
                                color: "white",
                                cursor: `${
                                  !readOnly ? "pointer" : "not-allowed"
                                }`,
                                marginRight: "4px",
                              }}
                              onClick={() => {
                                !readOnly && setDownLineId(method?.id);
                                !readOnly && setShowEditPayment(true);
                              }}
                              className="btn btn-icon btn-sm btn-success"
                            >
                              <i className="bx bxs-edit"></i>
                            </a>
                            <a
                              onClick={() => {
                                !readOnly &&
                                  handleDeletePaymentMethod(method?.id);
                              }}
                              style={{
                                color: "white",
                                cursor: `${
                                  !readOnly ? "pointer" : "not-allowed"
                                }`,
                                marginRight: "4px",
                              }}
                              className="btn btn-icon btn-sm btn-danger"
                            >
                              <i className="bx bxs-checkbox-minus"></i>
                            </a>
                          </Fragment>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default DisabledAccounts;

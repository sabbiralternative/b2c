import { useState } from "react";
import { useGetIndex } from "../../hooks";
import useContextState from "../../hooks/useContextState";
import { AdminRole } from "../../constant/constant";
import useGetPaymentMethod from "../../hooks/Master/Client/useGetPaymentMethod";
import ShowImage from "../../components/modal/ShowImage";

const DisabledAccounts = () => {
  const [branchId, setBranchId] = useState(0);
  const { data } = useGetIndex({
    type: "getBranches",
  });
  const [showPaymentImage, setShowPaymentImage] = useState(false);
  const [image, setImage] = useState("");
  const { adminRole } = useContextState();
  const payload = {
    type: "viewPaymentMethods",
    payment_status: "disabled",
  };
  if (adminRole === AdminRole.admin_staff) {
    payload.branch_id = branchId;
  }
  const { paymentsMethods } = useGetPaymentMethod(payload);

  console.log(paymentsMethods);

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
                        <span className={`badge bg-label-danger me-1`}>
                          deleted
                        </span>
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

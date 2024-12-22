import { useState } from "react";
import UpdateChecker from "../../../components/modal/HyperMaster/Staff/UpdateChecker";
import UpdatePassword from "../../../components/modal/HyperMaster/Staff/UpdatePassword";
import { useWhiteLabel } from "../../../hooks/AdminMaster/whiteLabel";

const ViewWhiteLabel = () => {
  const [updateStatusId, setUpdateStatusId] = useState(null);
  const [updatePasswordId, setUpdatePasswordId] = useState(null);
  const { data } = useWhiteLabel({
    type: "viewWhitelabel",
  });

  return (
    <>
      {updateStatusId && (
        <UpdateChecker
          setUpdateStatusId={setUpdateStatusId}
          updateStatusId={updateStatusId}
        />
      )}
      {updatePasswordId && (
        <UpdatePassword
          setUpdatePasswordId={setUpdatePasswordId}
          updatePasswordId={updatePasswordId}
        />
      )}
      <div className="container-xxl flex-grow-1 container-p-y">
        <div className="card">
          <h5 className="card-header">White Label</h5>
          <div className="table-responsive text-nowrap">
            <table className="table table-hover table-sm">
              <thead className="table-dark">
                <tr>
                  <th>Id</th>
                  <th>Casino Currency </th>
                  <th>Currency </th>
                  <th>Deposit Limit</th>
                  <th>Withdraw Limit</th>
                  <th>Site Name</th>
                  <th>Site URL</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody className="table-border-bottom-0">
                {data?.result?.map((whiteLabel, i) => {
                  return (
                    <tr key={i}>
                      <td>
                        <strong>{whiteLabel?.id}</strong>
                      </td>
                      <td>{whiteLabel?.casino_currency}</td>
                      <td>{whiteLabel?.currency}</td>
                      <td>{whiteLabel?.deposit_limit}</td>
                      <td>{whiteLabel?.withdraw_limit}</td>

                      <td>{whiteLabel?.site_name}</td>
                      <td>{whiteLabel?.site_url}</td>
                      <td style={{ display: "flex", color: "white" }}>
                        <a
                          onClick={() =>
                            setUpdateStatusId(whiteLabel?.staff_id)
                          }
                          className="btn btn-icon btn-sm btn-success"
                        >
                          S
                        </a>
                        &nbsp;
                        <a
                          onClick={() =>
                            setUpdatePasswordId(whiteLabel?.staff_id)
                          }
                          className="btn btn-icon btn-sm btn-danger"
                        >
                          p
                        </a>
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

export default ViewWhiteLabel;

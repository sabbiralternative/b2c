import { useForm } from "react-hook-form";
import useContextState from "../../../hooks/useContextState";
import handleRandomToken from "../../../utils/handleRandomToken";
import axios from "axios";
import { API } from "../../../api";
import { useState } from "react";

const ViewClient = () => {
  const [clientData, setClientData] = useState([]);
  const { register, handleSubmit, reset } = useForm();
  const { token } = useContextState();
  const onSubmit = async ({ searchId }) => {
    const generatedToken = handleRandomToken();
    const payload = {
      searchId,
      token: generatedToken,
    };
    const res = await axios.post(API.viewClients, payload, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = res.data;
    if (data?.success) {
      setClientData(data?.result);
      reset();
    }
  };
  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <div className="col-12">
        <div className="card">
          <div className="card-body">
            <form
              id="formValidationExamples"
              className="row g-3 fv-plugins-bootstrap5 fv-plugins-framework"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="col-md-6 fv-plugins-icon-container">
                <input
                  {...register("searchId", {
                    required: true,
                  })}
                  type="text"
                  className="form-control"
                  placeholder="Search Client"
                />
                <div className="fv-plugins-message-container invalid-feedback"></div>
              </div>

              <div className="col-12">
                <input
                  type="submit"
                  name="submit"
                  className="btn btn-primary"
                  value="Search"
                />
              </div>
            </form>
          </div>
        </div>
      </div>

      <hr className="my-3" />

      <div className="card">
        <h5 className="card-header">Clients</h5>
        <div className="table-responsive text-nowrap">
          <table className="table table-hover table-sm">
            <thead>
              <tr>
                <th>Username</th>
                <th>Mobile</th>
                <th>Balance</th>
                <th>Total Deposit</th>
                <th>Total Withdraw</th>
                <th>Exposure</th>
                <th>Status</th>
                <th>Type</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="table-border-bottom-0">
              {clientData?.map((client, i) => {
                return (
                  <tr key={i}>
                    <td>
                      <strong>{client?.username}</strong>
                    </td>
                    <td>
                      <strong>{client?.mobile}</strong>
                    </td>
                    <td>
                      <strong>{client?.balance}</strong>
                    </td>
                    <td>{client?.totalDeposit}</td>
                    <td>{client?.totalWithdraw}</td>
                    <td>{client?.exposure}</td>
                    <td>
                      <span
                        className={`badge  me-1 ${
                          client?.userStatus === 1
                            ? "bg-label-primary"
                            : "bg-label-danger"
                        }`}
                      >
                        {client?.userStatus === 1 ? "Active" : "InActive"}
                      </span>
                    </td>
                    <td>{client?.accountType}</td>
                    <td>
                      <a
                        href="deposit_client.php?branch_id=user0077&amp;type=d"
                        className="btn btn-icon btn-sm btn-success"
                      >
                        D
                      </a>
                      &nbsp;
                      <a
                        href="pnl.php?username=user0077&amp;type=w"
                        className="btn btn-icon btn-sm btn-warning"
                      >
                        PL
                      </a>
                      &nbsp;
                      <a
                        href="change_password.php?downline_id=user0077"
                        className="btn btn-icon btn-sm btn-info"
                      >
                        P
                      </a>
                      &nbsp;
                      <a
                        href="change_status.php?downline_id=user0077"
                        className="btn btn-icon btn-sm btn-dark"
                      >
                        S
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
  );
};

export default ViewClient;

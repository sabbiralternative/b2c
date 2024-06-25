import useContextState from "../../../hooks/useContextState";
import { handleDownLineId } from "../../../utils/handleDownLineId";
import { useNavigate } from "react-router-dom";
import { handleSplitUserName } from "../../../utils/handleSplitUserName";
import useGetClientWithBalance from "../../../hooks/Master/Client/useGetClientWithBalance";

const ClientWithBalance = () => {
  const navigate = useNavigate();

  const {
    setClientDeposit,
    setDownLineId,
    setShowChangePassword,
    setShowChangeStatus,
    setShowCreditRef,
    adminRole,
  } = useContextState();
  const { clientWithBalance } = useGetClientWithBalance();

  const handleNavigate = (username, link) => {
    localStorage.setItem("downLineId", username);
    navigate(`/${link}`);
  };

  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <div className="card">
        <h5 className="card-header">Clients</h5>
        <div className="table-responsive text-nowrap">
          <table className="table table-hover table-sm">
            <thead>
              <tr>
                <th>User Id</th>
                <th>Username</th>
                {adminRole !== "master" && <th>Mobile</th>}
                <th>Balance</th>
                <th>Total Deposit</th>
                <th>Total Withdraw</th>
                <th>Exposure</th>
                <th>Betting Status</th>
                <th>Status</th>
                <th>Reg. Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="table-border-bottom-0">
              {clientWithBalance?.map((client, i) => {
                return (
                  <tr key={i}>
                    <td>
                      <strong>{client?.userId}</strong>
                    </td>
                    <td>
                      <strong>{handleSplitUserName(client?.username)}</strong>
                    </td>
                    {adminRole !== "master" && (
                      <td>
                        <strong>{client?.mobile}</strong>
                      </td>
                    )}

                    <td>
                      <strong>{client?.balance}</strong>
                    </td>
                    <td>{client?.totalDeposit}</td>
                    <td>{client?.totalWithdraw}</td>
                    <td>{client?.exposure}</td>
                    <td>
                      <span
                        className={`badge  me-1 ${
                          client?.bettingStatus === 1
                            ? "bg-label-primary"
                            : "bg-label-danger"
                        }`}
                      >
                        {client?.bettingStatus === 1 ? "Active" : "InActive"}
                      </span>
                    </td>
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
                    <td>{client?.registrationDate}</td>
                    <td>
                      <a
                        style={{ color: "white" }}
                        onClick={() =>
                          handleDownLineId(
                            setClientDeposit,
                            client?.username,
                            setDownLineId
                          )
                        }
                        className="btn btn-icon btn-sm btn-success"
                      >
                        D
                      </a>
                      &nbsp;
                      <a
                        style={{ color: "white" }}
                        onClick={() => {
                          handleNavigate(client?.username, "pnl");
                        }}
                        className="btn btn-icon btn-sm btn-warning"
                      >
                        PL
                      </a>
                      &nbsp;
                      <a
                        style={{ color: "white" }}
                        onClick={() =>
                          handleDownLineId(
                            setShowChangePassword,
                            client?.username,
                            setDownLineId
                          )
                        }
                        className="btn btn-icon btn-sm btn-info"
                      >
                        P
                      </a>
                      &nbsp;
                      <a
                        style={{ color: "white" }}
                        onClick={() =>
                          handleDownLineId(
                            setShowChangeStatus,
                            client?.username,
                            setDownLineId
                          )
                        }
                        className="btn btn-icon btn-sm btn-dark"
                      >
                        S
                      </a>
                      &nbsp;
                      <a
                        style={{ color: "white" }}
                        onClick={() =>
                          handleDownLineId(
                            setShowCreditRef,
                            client?.username,
                            setDownLineId
                          )
                        }
                        className="btn btn-icon btn-sm btn-primary"
                      >
                        CR
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

export default ClientWithBalance;

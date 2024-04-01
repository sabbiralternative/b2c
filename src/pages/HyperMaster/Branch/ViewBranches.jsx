import { handleDownLineId } from "../../../utils/handleDownLineId";
import useContextState from "../../../hooks/useContextState";
import useGetAllBranch from "../../../hooks/HyperMaster/Branch/useGetAllBranch";

const ViewBranches = () => {
  const { branches } = useGetAllBranch();
  const {
    setShowChangePassword,
    setShowChangeStatus,
    setShowDeposit,
    setShowWithdraw,
    setDownLineId,
  } = useContextState();

  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <div className="card">
        <h5 className="card-header">Branches</h5>
        <div className="table-responsive text-nowrap">
          <table className="table table-hover table-sm">
            <thead className="table-dark">
              <tr>
                <th>Username</th>
                <th>Balance</th>
                <th>P/L</th>

                <th>Status</th>
                <th>Type</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="table-border-bottom-0">
              {branches?.map((branch, i) => {
                console.log(branch);
                return (
                  <tr key={i}>
                    <td>
                      <strong>{branch?.username}</strong>
                    </td>
                    <td>{branch?.balance}</td>
                    <td>{branch?.pnl}</td>

                    <td>
                      <span
                        className={`badge  me-1 ${
                          branch?.userStatus === 1
                            ? "bg-label-primary"
                            : "bg-label-danger"
                        }`}
                      >
                        {branch?.userStatus === 1 ? "active" : "inactive"}
                      </span>
                    </td>
                    <td>{branch?.accountType}</td>
                    <td style={{ display: "flex", color: "white" }}>
                      <a
                        onClick={() =>
                          handleDownLineId(
                            setShowDeposit,
                            branch?.username,
                            setDownLineId
                          )
                        }
                        className="btn btn-icon btn-sm btn-success"
                      >
                        D
                      </a>
                      &nbsp;
                      <a
                        onClick={() =>
                          handleDownLineId(
                            setShowWithdraw,
                            branch?.username,
                            setDownLineId
                          )
                        }
                        className="btn btn-icon btn-sm btn-danger"
                      >
                        W
                      </a>
                      &nbsp;
                      <a
                        onClick={() =>
                          handleDownLineId(
                            setShowChangePassword,
                            branch?.username,
                            setDownLineId
                          )
                        }
                        className="btn btn-icon btn-sm btn-info"
                      >
                        P
                      </a>
                      &nbsp;
                      <a
                        onClick={() =>
                          handleDownLineId(
                            setShowChangeStatus,
                            branch?.username,
                            setDownLineId
                          )
                        }
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

export default ViewBranches;

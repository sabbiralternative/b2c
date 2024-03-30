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
    downLineId,
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
                            downLineId,
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
                            downLineId,
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
                            downLineId,
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
                            downLineId,
                            setDownLineId
                          )
                        }
                        className="btn btn-icon btn-sm btn-dark"
                      >
                        S
                      </a>
                      {/* &nbsp;
                      <button
                        type="button"
                        className="btn btn-icon btn-sm btn-primary"
                      >
                        {" "}
                        T
                      </button>{" "}
                      &nbsp;
                      <button
                        type="button"
                        className="btn btn-icon btn-sm btn-warning"
                      >
                        {" "}
                        E
                      </button>{" "}
                      &nbsp;
                      <button
                        type="button"
                        className="btn btn-icon btn-sm btn-info"
                      >
                        {" "}
                        P
                      </button>{" "}
                      &nbsp;
                      <button
                        type="button"
                        className="btn btn-icon btn-sm btn-dark"
                      >
                        {" "}
                        S
                      </button>{" "} */}
                      {/* &nbsp;
                      <div className="dropdown">
                        <button
                          type="button"
                          className="btn p-0 dropdown-toggle hide-arrow"
                          data-bs-toggle="dropdown"
                        >
                          <i className="bx bx-dots-vertical-rounded"></i>
                        </button>
                        <div className="dropdown-menu">
                          <a className="dropdown-item">
                            <i className="bx bxs-plus-circle"></i> Deposit
                          </a>
                          <a className="dropdown-item">
                            <i className="bx bxs-minus-circle"></i> Withdraw
                          </a>
                          <a className="dropdown-item">
                            <i className="bx bxs-bank"></i> Transfer
                          </a>
                          <a className="dropdown-item">
                            <i className="bx bxs-lock-alt"></i> Change Password
                          </a>
                          <a className="dropdown-item">
                            <i className="bx bxs-edit-alt"></i> Edit
                          </a>
                          <a className="dropdown-item">
                            <i className="bx bxs-report"></i> D/W Statement
                          </a>
                        </div>
                      </div> */}
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

import { Link } from "react-router-dom";
import useGetAllBranch from "../../../hooks/Branch/useGetAllBranch";

const ViewBranches = () => {
  const { branches } = useGetAllBranch();
  const handleDownLineId = (branch) => {
    localStorage.removeItem('downLineId')
    localStorage.setItem('downLineId',branch?.username)
  }
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
                      <span className="badge bg-label-primary me-1">
                        {branch?.userStatus === 1 ? "Active" : "DeActive"}
                      </span>
                    </td>
                    <td>{branch?.accountType}</td>
                    <td style={{ display: "flex",color:'white' }}>
                      <Link
                      onClick={()=> handleDownLineId(branch)}
                      to='/deposit'
                      className="btn btn-icon btn-sm btn-success">D</Link>
                      &nbsp;
                      <Link
                       onClick={()=> handleDownLineId(branch)}
                      to='/withdraw'
                       className="btn btn-icon btn-sm btn-danger">W</Link>
                      &nbsp;
                      <Link className="btn btn-icon btn-sm btn-info">P</Link>
                      &nbsp;
                      <Link className="btn btn-icon btn-sm btn-dark">S</Link>
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

import { useGetAllChecker } from "../../../hooks/HyperMaster/Staff";

const ViewChecker = () => {
  const { data } = useGetAllChecker({
    type: "viewStaff",
    role: "checker",
  });

  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <div className="card">
        <h5 className="card-header">Checkers</h5>
        <div className="table-responsive text-nowrap">
          <table className="table table-hover table-sm">
            <thead className="table-dark">
              <tr>
                <th>Staff Name</th>
                <th>Username </th>
                <th>Status </th>
                <th>Role</th>
                <th>Reg. Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="table-border-bottom-0">
              {data?.result?.map((checker, i) => {
                return (
                  <tr key={i}>
                    <td>
                      <strong>{checker?.staff_name}</strong>
                    </td>
                    <td>{checker?.username}</td>

                    <td>
                      <span
                        className={`badge  me-1 ${
                          checker?.status === 1
                            ? "bg-label-primary"
                            : "bg-label-danger"
                        }`}
                      >
                        {checker?.status === 1 ? "active" : "inactive"}
                      </span>
                    </td>

                    <td>{checker?.role}</td>
                    <td>{checker?.date}</td>
                    <td style={{ display: "flex", color: "white" }}>
                      <a className="btn btn-icon btn-sm btn-success">S</a>
                      &nbsp;
                      <a className="btn btn-icon btn-sm btn-danger">p</a>
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

export default ViewChecker;

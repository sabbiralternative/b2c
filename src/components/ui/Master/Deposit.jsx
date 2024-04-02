import useContextState from "../../../hooks/useContextState";

const Deposit = ({ data }) => {
  const { setEditPendingDeposit,setDownLineId } = useContextState();
  return (
    <div className="card">
      <h5 className="card-header">Deposits</h5>
      <div className="table-responsive text-nowrap">
        <table className="table table-hover table-sm">
          <thead className="table-dark">
            <tr>
              <th>Username</th>
              <th>Amount</th>
              <th>UTR</th>
              <th>Slip</th>
              <th>Type</th>

              <th>Status</th>
              <th>Remark</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="table-border-bottom-0">
            {data?.map((item, i) => {
              // console.log(item);
              return (
                <tr key={i}>
                  <td>{item?.loginname}</td>
                  <td>{item?.amount}</td>

                  <td>{item?.utr}</td>
                  <td>{item?.image}</td>
                  <td>{item?.type}</td>
                  <td>
                    <span
                      className={`badge me-1
                      ${item?.status === "PENDING" ? "bg-label-warning" : ""}
                      ${item?.status === "APPROVED" ? "bg-label-success" : ""}
                      ${item?.status === "REJECTED" ? "bg-label-danger" : ""}
                      `}
                    >
                      {item?.status}
                    </span>
                  </td>
                  <td>{item?.remark}</td>
                  <td>{item?.date_added}</td>
                  {item?.status === "PENDING" && (
                    <td>
                      <a
                      style={{color:'white'}}
                        onClick={() => {
                          setDownLineId(item?.id)
                          setEditPendingDeposit(true)
                        }}
                        className="btn btn-icon btn-sm btn-success"
                      >
                        <i className="bx bxs-edit"></i>
                      </a>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Deposit;

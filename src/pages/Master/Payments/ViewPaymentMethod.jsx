import useGetPaymentMethod from "../../../hooks/Master/Client/useGetPaymentMethod";

const ViewPaymentMethod = () => {
  const payload = {
    type: "viewPaymentMethods",
  };
  const { paymentsMethods } = useGetPaymentMethod(payload);
  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <div className="card">
        <h5 className="card-header">Payment Methods</h5>
        <div className="table-responsive text-nowrap">
          <table className="table table-hover table-sm">
            <thead className="table-dark">
              <tr>
                <th>Type</th>
                <th>Account name</th>
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
                    <td>{method?.name}</td>

                    <td>
                      Rs.{method?.minAmount}-{method?.maxAmount}
                    </td>

                    <td>
                      <span
                        className={`badge ${
                          method?.status == 1
                            ? "bg-label-primary"
                            : "bg-label-warning"
                        } me-1`}
                      >
                        {method?.status == 1 ? "Active" : "inactive"}
                      </span>
                    </td>

                    <td>
                      <a
                        href="add_bank.php?id=21"
                        className="btn btn-icon btn-sm btn-success"
                      >
                        <i className="bx bxs-edit"></i>
                      </a>
                      &nbsp;
                      <a
                        href="delete_bank.php?id=21"
                        className="btn btn-icon btn-sm btn-danger"
                      >
                        <i className="bx bxs-checkbox-minus"></i>
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

export default ViewPaymentMethod;

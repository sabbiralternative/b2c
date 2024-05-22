import Swal from "sweetalert2";
import useGetPaymentMethod from "../../../hooks/Master/Client/useGetPaymentMethod";
import handleRandomToken from "../../../utils/handleRandomToken";
import axios from "axios";
import { API } from "../../../api";
import useContextState from "../../../hooks/useContextState";
import toast from "react-hot-toast";

const ViewPaymentMethod = () => {
  const { token, setShowEditPayment, setDownLineId,site } = useContextState();
  const payload = {
    type: "viewPaymentMethods",
    site
  };
  const { paymentsMethods, refetchPaymentMethods } =
    useGetPaymentMethod(payload);


    /* delete payments method */
  const handleDeletePaymentMethod = async (paymentId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this account!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const generatedToken = handleRandomToken();
        const payload = {
          type: "deletePayment",
          paymentId,
          token: generatedToken,
          site
        };
        const res = await axios.post(API.payments, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = res.data;
        if (data?.success) {
          refetchPaymentMethods();
          toast.success(data?.result?.message);
        } else {
          toast.error(data?.error?.status?.[0]?.description);
        }
      }
    });
  };

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
                        style={{ color: "white" }}
                        onClick={() => {
                          setDownLineId(method?.id);
                          setShowEditPayment(true);
                        }}
                        className="btn btn-icon btn-sm btn-success"
                      >
                        <i className="bx bxs-edit"></i>
                      </a>
                      &nbsp;
                      <a
                        onClick={() => handleDeletePaymentMethod(method?.id)}
                        style={{ color: "white" }}
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

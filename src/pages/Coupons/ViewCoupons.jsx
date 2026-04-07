import Swal from "sweetalert2";
import { useBonusMutation, useBonusQuery } from "../../hooks/bonus";
import toast from "react-hot-toast";
import { useState } from "react";
import EditCoupon from "../../components/modal/Coupons/EditCoupon";

const ViewCoupons = () => {
  const [editCouponId, setEditCouponId] = useState(null);
  const { mutateAsync } = useBonusMutation();
  const { data, refetch: refetchCoupons } = useBonusQuery({
    type: "viewCoupon",
  });

  const handleDelete = async (coupon_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this coupon!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const data = await mutateAsync({
          type: "deleteCoupon",
          coupon_id,
        });
        if (data?.success) {
          refetchCoupons();
          toast.success(data?.result?.message);
        } else {
          toast.error(data?.error?.status?.[0]?.description);
        }
      }
    });
  };

  return (
    <>
      {editCouponId && (
        <EditCoupon
          setEditCouponId={setEditCouponId}
          editCouponId={editCouponId}
          refetchCoupons={refetchCoupons}
        />
      )}
      <div className="container-xxl flex-grow-1 container-p-y">
        <div className="card">
          <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
            <h5 className="card-header">View Coupons</h5>
          </div>

          <div className="table-responsive text-nowrap">
            <table className="table table-hover table-sm">
              <thead className="table-dark">
                <tr>
                  <th>Coupon Code</th>
                  <th>Added By</th>
                  <th>Coupon Amount</th>
                  <th>Date Added</th>
                  <th>Expiry Date</th>
                  <th>Usage Limits</th>
                  <th>Used Count</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className="table-border-bottom-0">
                {data?.result?.map((coupon) => {
                  return (
                    <tr key={coupon?.coupon_id}>
                      <td>{coupon?.coupon_code}</td>

                      <td>{coupon?.added_by}</td>
                      <td>{coupon?.coupon_amount}</td>
                      <td>{coupon?.date_added}</td>

                      <td>{coupon?.expiry_date}</td>
                      <td>{coupon?.usage_limit}</td>
                      <td>{coupon?.used_count}</td>

                      <td>
                        <span
                          className={`badge ${
                            coupon?.status == 0
                              ? "bg-label-danger"
                              : coupon?.status == 1
                                ? "bg-label-primary"
                                : coupon?.status == 2
                                  ? "bg-label-warning"
                                  : ""
                          }  me-1`}
                        >
                          {coupon?.status == 0
                            ? "deleted"
                            : coupon?.status == 1
                              ? "active"
                              : coupon?.status == 2
                                ? "inactive"
                                : ""}
                        </span>
                      </td>
                      <td>
                        {coupon?.status !== 0 && (
                          <div style={{ display: "flex", gap: "3px" }}>
                            <a
                              onClick={() => setEditCouponId(coupon?.coupon_id)}
                              style={{
                                color: "white",
                              }}
                              className="btn btn-icon btn-sm btn-success"
                            >
                              E
                            </a>
                            <a
                              onClick={() => handleDelete(coupon?.coupon_id)}
                              style={{
                                color: "white",
                              }}
                              className="btn btn-icon btn-sm btn-danger"
                            >
                              D
                            </a>
                          </div>
                        )}
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

export default ViewCoupons;

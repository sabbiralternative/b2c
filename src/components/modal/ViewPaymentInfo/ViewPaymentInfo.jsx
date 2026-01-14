import { useRef } from "react";
import { usePaymentQuery } from "../../../hooks/payments";
import useCloseModalClickOutside from "../../../hooks/useCloseModalClickOutside";

const ViewPaymentInfo = ({ paymentInfoId, setPaymentInfoId }) => {
  const ref = useRef();
  const { data, isSuccess } = usePaymentQuery({
    type: "viewPaymentInfo",
    paymentId: paymentInfoId,
  });

  useCloseModalClickOutside(ref, () => {
    setPaymentInfoId(null);
  });
  return (
    <>
      <div className="content-backdrop fade show"></div>
      <div
        className="modal fade show"
        id="modalCenter"
        aria-modal="true"
        role="dialog"
        style={{ display: "block" }}
      >
        <div
          className="modal-dialog modal-dialog-centered"
          role="document"
          style={{ maxWidth: "70vw" }}
        >
          <div className="modal-content" ref={ref}>
            <div className="modal-header">
              <h5 className="modal-title" id="modalCenterTitle">
                View Payment Info
              </h5>

              <button
                onClick={() => setPaymentInfoId(null)}
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div>
              <div className="modal-body">
                <div className="table-responsive text-nowrap">
                  <table className="table table-hover table-sm">
                    <thead className="table-dark">
                      <tr>
                        <th>Type</th>
                        <th>Title</th>
                        <th>QR Code</th>
                        <th>Min Amount</th>
                        <th>Max Amount</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody className="table-border-bottom-0">
                      <tr>
                        <td>{data?.result?.info?.type}</td>
                        <td>{data?.result?.info?.title}</td>
                        <td>
                          {data?.result?.info?.qr_code && (
                            <img
                              style={{ height: "30px" }}
                              src={data?.result?.info?.qr_code}
                            />
                          )}
                        </td>
                        <td>{data?.result?.info?.min_amount}</td>
                        <td>{data?.result?.info?.max_amount}</td>
                        <td>{data?.result?.info?.status}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {isSuccess && !data?.result?.info && (
                  <div className="card">
                    <h5 style={{ fontSize: "18px" }} className="card-header">
                      Payment info not found
                    </h5>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewPaymentInfo;

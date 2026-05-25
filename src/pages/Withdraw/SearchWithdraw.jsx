import { AdminRole, clientColor, Status } from "../../constant/constant";
import Loader from "../../components/ui/Loader/Loader";
import { useWithdrawMutation } from "../../hooks/withdraw";
import { Fragment, useState } from "react";
import useContextState from "../../hooks/useContextState";
import { MdOutlineContentCopy } from "react-icons/md";
import { handleCopyToClipBoard } from "../../utils/handleCopyToClipBoard";
import { useNavigate } from "react-router-dom";
import Slip from "../../components/modal/Master/Deposit/Slip";
import AddSlip from "../../components/modal/Master/Withdraw/AddSlip";

const SearchWithdraw = () => {
  const [addSlipId, setAddSlipId] = useState(null);
  const [showImage, setShowImage] = useState(false);
  const [image, setImage] = useState("");
  const { adminRole, setClientId, setRefetchViewClient } = useContextState();
  const navigate = useNavigate();
  const [search, setSearch] = useState();
  const { mutateAsync, data, isSuccess, isPending } = useWithdrawMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      type: "searchWithdraw",
      withdrawId: search,
    };
    await mutateAsync(payload);
  };

  return (
    <Fragment>
      {addSlipId && (
        <AddSlip
          addSlipId={addSlipId}
          setAddSlipId={setAddSlipId}
          refetchAllWithdraw={handleSubmit}
        />
      )}
      {showImage && <Slip setShowImage={setShowImage} image={image} />}
      <div className="container-xxl flex-grow-1 container-p-y">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <form
                id="formValidationExamples"
                className="row g-3 fv-plugins-bootstrap5 fv-plugins-framework"
                onSubmit={handleSubmit}
              >
                <div className="col-md-6 fv-plugins-icon-container">
                  <input
                    onChange={(e) => setSearch(e.target.value)}
                    type="text"
                    className="form-control"
                    placeholder="Search by Withdraw ID/UTR"
                    value={search}
                  />
                  <div className="fv-plugins-message-container invalid-feedback"></div>
                </div>

                <div className="col-12">
                  <input
                    type="submit"
                    name="submit"
                    className="btn btn-primary"
                    value="Search"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
        {data?.result?.length > 0 && (
          <Fragment>
            <hr className="my-3" />
            <div className="card">
              <h5 className="card-header">Clients</h5>
              <div className="table-responsive text-nowrap">
                <table className="table table-hover table-sm">
                  <thead>
                    <tr>
                      <th>Withdraw Id</th>
                      <th>Level</th>
                      <th>User Id</th>
                      {adminRole === AdminRole.admin_staff ||
                      adminRole === AdminRole.hyper_master ||
                      adminRole === AdminRole.super_master ||
                      adminRole === AdminRole.branch_staff ? (
                        <th>Branch</th>
                      ) : null}
                      <th>Amount</th>
                      <th>Remark</th> <th>Slip</th>
                      <th>Bank Account Name</th>
                      <th>Account Number</th>
                      <th>Bank Name</th>
                      <th>IFSC</th>
                      <th>UPI ID</th>
                      <th>Status</th>
                      <th>Request Time</th>
                      <th>Approved By</th>
                    </tr>
                  </thead>
                  <tbody className="table-border-bottom-0">
                    {data?.result?.map((item, i) => {
                      return (
                        <tr
                          style={{ background: item?.bgcolor || "none" }}
                          key={i}
                        >
                          {item?.status === Status.APPROVED && (
                            <td>
                              <strong>{item?.withdraw_id}</strong>
                            </td>
                          )}
                          <td>
                            <strong>{item?.level}</strong>
                          </td>
                          <td
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              setClientId(item?.userId);
                              setRefetchViewClient(true);
                              navigate(
                                `/view-client?role=${adminRole}&history=withdraw`,
                              );
                            }}
                          >
                            <span
                              style={{
                                backgroundColor: clientColor?.[item?.color],
                                width: "8px",
                                height: "8px",
                                borderRadius: "50%",
                                display: "inline-block",
                                marginRight: "5px",
                              }}
                            />
                            <strong> {item?.userId}</strong>
                          </td>

                          {adminRole === AdminRole.admin_staff ||
                          adminRole === AdminRole.hyper_master ||
                          adminRole === AdminRole.super_master ||
                          adminRole === AdminRole.branch_staff ? (
                            <td>{item?.branch_name}</td>
                          ) : null}

                          <td>{item?.amount}</td>

                          <td>{item.remark}</td>
                          <td>
                            {item?.withdraw_slip ? (
                              <span
                                onClick={() => {
                                  setShowImage(true);
                                  setImage(item?.withdraw_slip);
                                }}
                                style={{ color: "#346cee", cursor: "pointer" }}
                              >
                                View
                              </span>
                            ) : (
                              <div
                                onClick={() => setAddSlipId(item?.withdraw_id)}
                                style={{ cursor: "pointer" }}
                                className="text-danger"
                              >
                                Add
                              </div>
                            )}
                          </td>

                          <td>
                            {item?.bank_account_name}{" "}
                            {location.pathname === "/pending-withdraw" && (
                              <MdOutlineContentCopy
                                style={{ cursor: "pointer" }}
                                onClick={() =>
                                  handleCopyToClipBoard(item?.bank_account_name)
                                }
                              />
                            )}
                          </td>
                          <td>
                            {item?.account_number}{" "}
                            {location.pathname === "/pending-withdraw" && (
                              <MdOutlineContentCopy
                                style={{ cursor: "pointer" }}
                                onClick={() =>
                                  handleCopyToClipBoard(item?.account_number)
                                }
                              />
                            )}
                          </td>
                          <td>
                            {item?.bank_name}{" "}
                            {location.pathname === "/pending-withdraw" && (
                              <MdOutlineContentCopy
                                onClick={() =>
                                  handleCopyToClipBoard(item?.bank_name)
                                }
                                style={{ cursor: "pointer" }}
                              />
                            )}
                          </td>
                          <td>
                            {item?.ifsc}{" "}
                            {location.pathname === "/pending-withdraw" && (
                              <MdOutlineContentCopy
                                onClick={() =>
                                  handleCopyToClipBoard(item?.ifsc)
                                }
                                style={{ cursor: "pointer" }}
                              />
                            )}{" "}
                          </td>
                          <td>{item?.upi_id}</td>

                          <td>
                            <span
                              className={`badge me-1
                                           ${
                                             item?.status === Status.PENDING
                                               ? "bg-label-warning"
                                               : ""
                                           }
                                           ${
                                             item?.status === Status.APPROVED
                                               ? "bg-label-success"
                                               : ""
                                           }
                                           ${
                                             item?.status === Status.REJECTED
                                               ? "bg-label-danger"
                                               : ""
                                           }
                                           `}
                            >
                              {item?.status}
                            </span>
                          </td>

                          <td>{item?.date_added}</td>

                          <td>{item?.modify_by}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </Fragment>
        )}

        {isPending && !isSuccess && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Loader />
          </div>
        )}
        {isSuccess && data?.result?.length === 0 && (
          <div className="card">
            <h5 style={{ fontSize: "18px" }} className="card-header">
              No withdraw found with given search query.
            </h5>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default SearchWithdraw;

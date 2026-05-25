import { clientColor } from "../../constant/constant";
import Loader from "../../components/ui/Loader/Loader";
import { useWithdrawMutation } from "../../hooks/withdraw";
import { useState } from "react";

const SearchWithdraw = () => {
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

  console.log(data);

  return (
    <>
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
                    disabled={data?.result?.length < 2}
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
          <>
            <hr className="my-3" />
            <div className="card">
              <h5 className="card-header">Clients</h5>
              <div className="table-responsive text-nowrap">
                <table className="table table-hover table-sm">
                  <thead>
                    <tr>
                      <th>Level</th>
                      <th>User Id</th>

                      <th>Balance</th>
                      <th>Total Deposit</th>
                      <th>Total Withdraw</th>
                      <th>Exposure</th>
                      <th>Betting Status</th>
                      <th>Status</th>
                      <th>Site</th>
                      <th>Reg. Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody className="table-border-bottom-0">
                    {data?.result?.map((client, i) => {
                      return (
                        <tr key={i}>
                          <td>
                            <strong>{client?.level}</strong>
                          </td>
                          <td>
                            <span
                              style={{
                                backgroundColor: clientColor?.[client?.color],
                                width: "8px",
                                height: "8px",
                                borderRadius: "50%",
                                display: "inline-block",
                                marginRight: "5px",
                              }}
                            ></span>
                            <strong>{client?.userId}</strong>
                          </td>
                          {client?.username2Visible && (
                            <td>{client?.username2}</td>
                          )}

                          <td>
                            <strong>{client?.balance}</strong>
                          </td>
                          <td>{client?.totalDeposit}</td>
                          <td>{client?.totalWithdraw}</td>
                          <td>
                            {" "}
                            {client?.exposure || client?.exposure == 0
                              ? Number(client.exposure).toFixed(0)
                              : client?.exposure}
                          </td>
                          <td>
                            <span
                              className={`badge  me-1 ${
                                client?.bettingStatus === 1
                                  ? "bg-label-primary"
                                  : "bg-label-danger"
                              }`}
                            >
                              {client?.bettingStatus === 1
                                ? "Active"
                                : "InActive"}
                            </span>
                          </td>
                          <td>
                            <span
                              className={`badge  me-1 ${
                                client?.userStatus === 1
                                  ? "bg-label-primary"
                                  : "bg-label-danger"
                              }`}
                            >
                              {client?.userStatus === 1 ? "Active" : "InActive"}
                            </span>
                          </td>
                          <td>{client?.site}</td>
                          <td>{client?.registrationDate}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </>
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
    </>
  );
};

export default SearchWithdraw;

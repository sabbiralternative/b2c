import { useState } from "react";
import { usePanelQuery } from "../../hooks/panel";
import { Pagination } from "rsuite";
import Loader from "../../components/ui/Loader/Loader";
import EditPuntPendingWithdraw from "../../components/modal/Punt/EditPuntPendingWithdraw";

const PuntPendingWithdraw = () => {
  const [modal, setModal] = useState({ name: "", id: "" });
  const [activePage, setActivePage] = useState(1);
  const { data, isLoading, isSuccess, refetch } = usePanelQuery({
    status: 0,
    type: "withdraw",
    page: activePage,
  });
  const meta = data?.pagination;

  return (
    <>
      <div className="container-xxl flex-grow-1 container-p-y">
        {modal?.name === "withdraw" && (
          <EditPuntPendingWithdraw
            setEditPendingAccount={setModal}
            modal={modal}
            refetch={refetch}
          />
        )}
        <div className="card">
          <h5
            className="card-header"
            style={{
              display: "flex",
              alignItems: "start",
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            <h5>Pending Withdraw</h5>

            <Pagination
              prev
              next
              size="md"
              total={meta?.totalRecords}
              limit={meta?.recordsPerPage}
              activePage={activePage}
              onChangePage={setActivePage}
              maxButtons={5}
              ellipsis
              boundaryLinks
            />
          </h5>
          <div className="table-responsive text-nowrap">
            <table className="table table-hover table-sm">
              <thead className="table-dark">
                <tr>
                  <th>Punter Id</th>
                  <th>Username </th>
                  <th>Amount </th>
                  <th>Site </th>
                  <th>Date Added</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody className="table-border-bottom-0">
                {data?.result?.map((withdraw, i) => {
                  return (
                    <tr key={i}>
                      <td>
                        <strong>{withdraw?.punter_id}</strong>
                      </td>
                      <td>{withdraw?.username}</td>
                      <td>{withdraw?.amount}</td>

                      <td>
                        <strong
                          onClick={() =>
                            window.open(`https://${withdraw?.site}`)
                          }
                        >
                          {withdraw?.site}
                        </strong>
                      </td>

                      <td>{withdraw?.date_added}</td>
                      <td style={{ display: "flex", color: "white" }}>
                        <a
                          onClick={() =>
                            setModal({
                              id: withdraw?.id,
                              name: "withdraw",
                            })
                          }
                          className="btn btn-icon btn-sm btn-success"
                        >
                          <i className="bx bxs-edit"></i>
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {isLoading && !isSuccess && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  margin: "20px",
                }}
              >
                <Loader />
              </div>
            )}

            {isSuccess && data?.length === 0 && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "5px",
                  marginTop: "15px",
                }}
                className="card"
              >
                <h5
                  style={{ fontSize: "18px", padding: "0px" }}
                  className="card-header"
                >
                  No Pending New Account
                </h5>
              </div>
            )}
            {meta && (
              <div
                style={{
                  marginTop: "20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "end",
                }}
              >
                <Pagination
                  prev
                  next
                  size="md"
                  total={meta?.totalRecords}
                  limit={meta?.recordsPerPage}
                  activePage={activePage}
                  onChangePage={setActivePage}
                  maxButtons={5}
                  ellipsis
                  boundaryLinks
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PuntPendingWithdraw;

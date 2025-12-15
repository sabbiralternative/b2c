import useContextState from "../../../hooks/useContextState";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useClient } from "../../../hooks/Master/Client/useClient";
import { Pagination } from "rsuite";
import { AdminRole, clientColor } from "../../../constant/constant";
import handleNavigateToWhatsApp from "../../../utils/handleNavigateToWhatsApp";
import Loader from "../../../components/ui/Loader/Loader";
import ClientAction from "../../../components/shared/ClientAction";

const InActiveClient = () => {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState(1);

  const { adminRole, setRefetchViewClient, setClientId } = useContextState();

  const {
    data,
    refetch: refetchClient,
    isLoading,
    isSuccess,
  } = useClient({
    searchId: "inactiveUsers",
    page: activePage,
  });

  const meta = data?.pagination;

  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <div className="card">
        <div
          className="card-header"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h5>Inactive Clients</h5>
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

        <div className="table-responsive text-nowrap">
          <table className="table table-hover table-sm">
            <thead>
              <tr>
                <th>User Id</th>
                {data?.result?.[0]?.username2Visible && <th>Username</th>}
                {adminRole == AdminRole.hyper_master ||
                adminRole == "admin_staff" ? (
                  <th>Branch</th>
                ) : null}
                {/* {adminRole === AdminRole.hyper_master ||
                  adminRole === AdminRole.admin_master ? (
                    <th>Username</th>
                  ) : null} */}
                {adminRole === AdminRole.hyper_master ||
                adminRole === AdminRole.admin_master ? (
                  <th>Mobile</th>
                ) : null}
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
                    <td
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setClientId(client?.userId);
                        setRefetchViewClient(true);
                        navigate("/view-client");
                      }}
                    >
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
                    {client?.username2Visible && <td>{client?.username2}</td>}
                    {adminRole == AdminRole.hyper_master ||
                    adminRole == "admin_staff" ? (
                      <td>
                        <strong>{client?.branch}</strong>
                      </td>
                    ) : null}
                    {/* {adminRole === AdminRole.hyper_master ||
                      adminRole === AdminRole.admin_master ? (
                        <td
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            setClientId(client?.username);
                            setRefetchViewClient(true);
                            navigate("/view-client");
                          }}
                        >
                          <strong>
                            {handleSplitUserName(client?.username)}
                          </strong>
                        </td>
                      ) : null} */}

                    {adminRole === AdminRole.hyper_master ||
                    adminRole === AdminRole.admin_master ? (
                      <td
                        style={{
                          cursor:
                            adminRole === AdminRole.hyper_master
                              ? "pointer"
                              : "auto",
                        }}
                        onClick={() =>
                          handleNavigateToWhatsApp(adminRole, client?.mobile)
                        }
                      >
                        <strong>{client?.mobile}</strong>
                      </td>
                    ) : null}

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
                        {client?.bettingStatus === 1 ? "Active" : "InActive"}
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
                    <td style={{ display: "flex", gap: "3px" }}>
                      <ClientAction
                        client={client}
                        index={i}
                        refetchClient={refetchClient}
                      />
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
  );
};

export default InActiveClient;

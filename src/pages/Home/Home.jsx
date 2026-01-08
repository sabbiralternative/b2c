import { Permission } from "../../constant/constant";
import { useGetIndex } from "../../hooks";
import useBalance from "../../hooks/useBalance";
import DashboardDW from "./DashboardDW";
import Loader from "../../components/ui/Loader/Loader";
import { usePermission } from "../../hooks/use-permission";
import { useState } from "react";
import { DatePicker } from "rsuite";
import { useUser } from "../../hooks/use-user";
import moment from "moment";

const Home = () => {
  const today = new Date();
  const { user } = useUser();
  const [date, setDate] = useState(new Date());
  const { permissions } = usePermission();
  const { data } = useGetIndex({ type: "getDashboardDW" });
  const { balanceData, isLoading, isPending } = useBalance({
    date: moment(date).format("YYYY-MM-DD"),
    user_id: user?.user_id,
    role: user?.role,
  });
  const defineBalanceColor = (amount) => {
    if (amount) {
      const parseAmount = parseFloat(amount);
      if (parseAmount === 0) {
        return "white";
      } else if (parseAmount > 0) {
        return "#39da8a";
      } else {
        return "#ff5b5c";
      }
    }
  };
  const deposit = data?.result?.deposit;
  const withdraw = data?.result?.withdraw;
  const rejected_deposit = data?.result?.rejected_deposit;
  const rejected_withdraw = data?.result?.rejected_withdraw;

  const disableOutsideLast14Days = (date) => {
    const start = new Date();
    start.setDate(today.getDate() - 14);

    return date < start || date > today;
  };

  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <div style={{ marginBottom: "10px" }}>
        <DatePicker
          style={{ width: "100%", maxWidth: "300px" }}
          format="dd-MM-yyyy"
          editable={false}
          value={date}
          onChange={setDate}
          disabledDate={disableOutsideLast14Days}
          block
        />
      </div>
      {permissions.includes(Permission.dashboard) && (
        <div className="row">
          <div className="col-lg-6 col-md-12">
            <div className="row">
              {/* <div className="col-sm-6 col-12 mb-4">
                <a>
                  <div className="card">
                    <div className="card-body text-center">
                      <h2 className="mb-1">
                        {balanceData?.upperLevelCreditReferance}
                      </h2>
                      <span className="text-muted">
                        Upper Level Credit Reference
                      </span>
                    </div>
                  </div>
                </a>
              </div> */}
              <div className="col-sm-6 col-12 mb-4">
                <a>
                  <div className="card">
                    <div className="card-body text-center">
                      <h2
                        className="mb-1"
                        style={{
                          color: `${defineBalanceColor(
                            balanceData?.upperLevel
                          )}`,
                        }}
                      >
                        {isLoading || isPending ? (
                          <Loader />
                        ) : (
                          balanceData?.upperLevel
                        )}
                      </h2>
                      <span className="text-muted">Upper Level</span>
                    </div>
                  </div>
                </a>
              </div>

              <div className="col-sm-6 col-12 mb-4">
                <div className="card">
                  <div className="card-body text-center">
                    <h2 className="mb-1">
                      {isLoading || isPending ? (
                        <Loader />
                      ) : (
                        balanceData?.downLevelOccupyBalance
                      )}
                    </h2>
                    <span className="text-muted">Total Client Balance</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6 col-md-12">
            <div className="row">
              {/* <div className="col-sm-6 col-12 mb-4">
                <div className="card">
                  <div className="card-body text-center">
                    <h2 className="mb-1">
                      {balanceData?.downLevelCreditReferance}
                    </h2>
                    <span className="text-muted">Down level Cred. Reference</span>
                  </div>
                </div>
              </div> */}
              <div className="col-sm-6 col-12 mb-4">
                <div className="card">
                  <div className="card-body text-center">
                    <h2 className="mb-1">
                      {isLoading || isPending ? (
                        <Loader />
                      ) : (
                        balanceData?.availableBalance ||
                        (balanceData?.availableBalance == 0 &&
                          balanceData?.availableBalance?.toFixed(2))
                      )}
                    </h2>
                    <span className="text-muted">Available Balance</span>
                  </div>
                </div>
              </div>

              <div className="col-sm-6 col-12 mb-4">
                <div className="card">
                  <div className="card-body text-center">
                    <h2 className="mb-1">
                      {isLoading || isPending ? (
                        <Loader />
                      ) : (
                        balanceData?.totalMasterBalance
                      )}
                    </h2>
                    <span className="text-muted">Total Master Balance</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6 col-md-12">
            <div className="row">
              <div className="col-sm-6 col-12 mb-4">
                <div className="card">
                  <div className="card-body text-center">
                    <h2 className="mb-1">
                      {isLoading || isPending ? (
                        <Loader />
                      ) : (
                        balanceData?.usersToday
                      )}
                    </h2>
                    <span className="text-muted">New Users Today</span>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-12 mb-4">
                <div className="card">
                  <div className="card-body text-center">
                    <h2 className="mb-1">
                      {isLoading || isPending ? (
                        <Loader />
                      ) : (
                        balanceData?.depositToday
                      )}
                    </h2>
                    <span className="text-muted">Total Deposit Today</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6 col-md-12">
            <div className="row">
              <div className="col-sm-6 col-12 mb-4">
                <div className="card">
                  <div className="card-body text-center">
                    <h2 className="mb-1">
                      {isLoading || isPending ? (
                        <Loader />
                      ) : (
                        balanceData?.withdrawToday
                      )}
                    </h2>
                    <span className="text-muted">Total Withdraw Today</span>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-12 mb-4">
                <div className="card">
                  <div className="card-body text-center">
                    <h2
                      style={{
                        color: `${defineBalanceColor(balanceData?.pnlToday)}`,
                      }}
                      className="mb-1"
                    >
                      {isLoading || isPending ? (
                        <Loader />
                      ) : (
                        balanceData?.pnlToday
                      )}
                    </h2>
                    <span className="text-muted">P/L Today</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="col-lg-6 col-md-12">
            <div className="row">
              <div className="col-sm-6 col-12 mb-4">
                <div className="card">
                  <div className="card-body text-center">
                    <h2 className="mb-1">
                      {isLoading || isPending ? (
                        <Loader />
                      ) : (
                        balanceData?.rejectedDepositToday
                      )}
                    </h2>
                    <span className="text-muted">Rejected Deposit Today</span>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-12 mb-4">
                <div className="card">
                  <div className="card-body text-center">
                    <h2 className="mb-1">
                      {isLoading || isPending ? (
                        <Loader />
                      ) : (
                        balanceData?.rejectedWithdrawToday
                      )}
                    </h2>
                    <span className="text-muted">Rejected Withdraw Today</span>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      )}

      <div className="d-lg-flex" style={{ gap: "10px" }}>
        {permissions.includes(Permission.deposit) && (
          <DashboardDW
            data={deposit}
            title="Pending Deposit"
            emptyMessage="No pending deposit"
          />
        )}
        {permissions.includes(Permission.withdraw) && (
          <DashboardDW
            data={withdraw}
            title="Pending Withdraw"
            emptyMessage="No pending withdraw"
          />
        )}
      </div>
      <div className="d-lg-flex" style={{ gap: "10px" }}>
        {permissions.includes(Permission.deposit) && (
          <DashboardDW
            data={rejected_deposit}
            title="Rejected Deposit"
            emptyMessage="No rejected deposit"
          />
        )}
        {permissions.includes(Permission.withdraw) && (
          <DashboardDW
            data={rejected_withdraw}
            title="Rejected Withdraw"
            emptyMessage="No rejected withdraw"
          />
        )}
      </div>
    </div>
  );
};

export default Home;

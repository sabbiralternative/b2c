import useBalance from "../../hooks/useBalance";
import useContextState from "../../hooks/useContextState";

const Home = () => {
  const { adminRole } = useContextState();
  const { balanceData } = useBalance();
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

  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      {adminRole && adminRole !== "checker" && adminRole !== "branch_staff" && (
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
                        {balanceData?.upperLevel}
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
                      {balanceData?.downLevelOccupyBalance}
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
                      {balanceData?.availableBalance ||
                        (balanceData?.availableBalance == 0 &&
                          balanceData?.availableBalance?.toFixed(2))}
                    </h2>
                    <span className="text-muted">Available Balance</span>
                  </div>
                </div>
              </div>

              <div className="col-sm-6 col-12 mb-4">
                <div className="card">
                  <div className="card-body text-center">
                    <h2 className="mb-1">{balanceData?.totalMasterBalance}</h2>
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
                    <h2 className="mb-1">{balanceData?.usersToday}</h2>
                    <span className="text-muted">New Users Today</span>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-12 mb-4">
                <div className="card">
                  <div className="card-body text-center">
                    <h2 className="mb-1">{balanceData?.depositToday}</h2>
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
                    <h2 className="mb-1">{balanceData?.withdrawToday}</h2>
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
                      {balanceData?.pnlToday}
                    </h2>
                    <span className="text-muted">P/L Today</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;

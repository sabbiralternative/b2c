import useBalance from "../../hooks/useBalance";

const Home = () => {
  const { balanceData } = useBalance();
  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <div className="row">
        <div className="col-lg-6 col-md-12">
          <div className="row">
            <div className="col-sm-6 col-12 mb-4">
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
            </div>

            <div className="col-sm-6 col-12 mb-4">
              <div className="card">
                <div className="card-body text-center">
                  <h2 className="mb-1">
                    {balanceData?.downLevelOccupyBalance}
                  </h2>
                  <span className="text-muted">Down level occupy balance</span>
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
                    {balanceData?.downLevelCreditReferance}
                  </h2>
                  <span className="text-muted">Down level Cred. Reference</span>
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
              <a>
                <div className="card">
                  <div className="card-body text-center">
                    <h2 className="mb-1">{balanceData?.upperLevel}</h2>
                    <span className="text-muted">Upper Level</span>
                  </div>
                </div>
              </a>
            </div>

            <div className="col-sm-6 col-12 mb-4">
              <div className="card">
                <div className="card-body text-center">
                  <h2 className="mb-1">{balanceData?.downLevelProfitLoss}</h2>
                  <span className="text-muted">Downlevel Profit/Loss</span>
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
                  <h2 className="mb-1">{balanceData?.availableBalance}</h2>
                  <span className="text-muted">Available Balance</span>
                </div>
              </div>
            </div>

            <div className="col-sm-6 col-12 mb-4">
              <div className="card">
                <div className="card-body text-center">
                  <h2 className="mb-1">
                    {balanceData?.availableBalanceWithProfitLoss}
                  </h2>
                  <span className="text-muted">Available Balance with P/L</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

import { useState } from "react";
// import useCloseModalClickOutside from "../../../../hooks/useCloseModalClickOutside";
import useBalance from "../../../../hooks/useBalance";
import moment from "moment";
import { DatePicker } from "rsuite";

const DashboardBalance = ({ user_id, role, setShowDashboardBalance }) => {
  const today = new Date();
  const [date, setDate] = useState(new Date());
  //   const ref = useRef();
  //   useCloseModalClickOutside(ref, () => {
  //     setShowDashboardBalance(false);
  //   });
  const { balanceData, isSuccess } = useBalance({
    date: moment(date).format("DD-MM-YYYY"),
    user_id,
    role,
  });

  const disableOutsideLast14Days = (date) => {
    const start = new Date();
    start.setDate(today.getDate() - 14);
    return date < start || date > today;
  };

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
          style={{ maxWidth: "80vw" }}
        >
          <div
            className="modal-content"

            //   ref={ref}
          >
            <div className="modal-header">
              <h5 className="modal-title" id="modalCenterTitle">
                Dashboard Balance
              </h5>

              <button
                onClick={() => setShowDashboardBalance(false)}
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div>
              <div className="modal-body">
                <div style={{ marginBottom: "20px" }}>
                  <DatePicker
                    // ref={ref}
                    style={{
                      width: "100%",
                      maxWidth: "300px",
                    }}
                    format="dd-MM-yyyy"
                    editable={false}
                    value={date}
                    onChange={setDate}
                    disabledDate={disableOutsideLast14Days}
                    block
                  />
                </div>
                <div className="table-responsive text-nowrap">
                  <table className="table table-hover table-sm">
                    <thead className="table-dark">
                      <tr>
                        <th>Upper Level</th>
                        <th>Total Client Balance</th>
                        <th>Available Balance</th>
                        <th>Total Master Balance</th>
                        <th>New Users Today</th>
                        <th>Total Deposit Today</th>
                        <th>Total Withdraw Today</th>
                        <th>P/L Today</th>
                      </tr>
                    </thead>
                    <tbody className="table-border-bottom-0">
                      <tr>
                        <td
                          style={{
                            color: `${defineBalanceColor(
                              balanceData?.upperLevel
                            )}`,
                          }}
                        >
                          {balanceData?.upperLevel}
                        </td>
                        <td>{balanceData?.downLevelOccupyBalance}</td>
                        <td>
                          {balanceData?.availableBalance ||
                            (balanceData?.availableBalance == 0 &&
                              balanceData?.availableBalance?.toFixed(2))}
                        </td>
                        <td>{balanceData?.totalMasterBalance}</td>
                        <td>{balanceData?.usersToday}</td>
                        <td>{balanceData?.depositToday}</td>
                        <td>{balanceData?.withdrawToday}</td>
                        <td
                          style={{
                            color: `${defineBalanceColor(
                              balanceData?.pnlToday
                            )}`,
                          }}
                        >
                          {balanceData?.pnlToday}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                {isSuccess && !balanceData && (
                  <div className="card">
                    <h5 style={{ fontSize: "18px" }} className="card-header">
                      Dashboard balance not found
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

export default DashboardBalance;

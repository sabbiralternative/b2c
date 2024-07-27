import useDatePicker from "../../../hooks/useDatePicker";
import { DateRangePicker } from "rsuite";
import "rsuite/DateRangePicker/styles/index.css";
import useGetPNL from "../../../hooks/Master/Client/useGetPNL";
import { useState } from "react";
import SettleBets from "../../../components/modal/Master/SettleBets";
import handleFormatDate from "../../../utils/handleFormatDate";
const PNL = () => {
  const [showBetsModal, setShowBetsModal] = useState(false);
  const [marketId, setMarketId] = useState("");
  const downlineId = localStorage.getItem("downLineId");
  const { formattedEndDate, formattedStartDate, onChange } =
    useDatePicker("currentDate");
  const { newFormattedEndDate, newFormattedStartDate } = handleFormatDate(
    formattedStartDate,
    formattedEndDate
  );
  const payload = {
    downlineId,
    fromDate: newFormattedStartDate,
    toDate: newFormattedEndDate,
  };
  const { pnl, refetchPNL } = useGetPNL(payload);

  /* Handle user history */
  const handleUserHistory = async (e) => {
    e.preventDefault();
    refetchPNL();
  };

  const defineColor = (transfer_type, pl) => {
    if (transfer_type === "deposit") {
      return "pl-deposit";
    }
    if (transfer_type === "withdraw") {
      return "pl-withdraw";
    }
    if (pl > 0) {
      return "text-green";
    }
    if (pl < 0) {
      return "text-danger";
    }
  };

  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      {showBetsModal && (
        <SettleBets
          setShowBetsModal={setShowBetsModal}
          marketId={marketId}
          searchUser={downlineId}
        />
      )}
      <div className="col-12">
        <div className="card">
          <div className="card-body">
            <form
              id="formValidationExamples"
              className="row g-3 fv-plugins-bootstrap5 fv-plugins-framework"
              onSubmit={handleUserHistory}
            >
              <div className="col-md-6 col-12 mb-4">
                <label htmlFor="flatpickr-range" className="form-label">
                  Range Picker
                </label>
                <DateRangePicker
                  format="dd-MM-yyyy"
                  editable
                  onChange={onChange}
                  defaultValue={[
                    new Date(new Date().setDate(new Date().getDate() - 7)),
                    new Date(),
                  ]}
                  block
                />
                {/* <input
                  type="text"
                  name="date"
                  className="form-control flatpickr-input active"
                  placeholder="YYYY-MM-DD to YYYY-MM-DD"
                  id="flatpickr-range"
                /> */}
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

      <hr className="my-3" />
      <div className="card">
        <h5 className="card-header">Clients</h5>
        <div className="table-responsive text-nowrap">
          <table className="table table-hover table-sm">
            <thead>
              <tr>
                <th style={{ textAlign: "right" }}>PL</th>
                <th style={{ textAlign: "right" }}>Balance</th>
                <th style={{ textAlign: "left" }}>Date</th>

                <th style={{ textAlign: "left" }}>Narration</th>
                <th style={{ textAlign: "left" }}>Type</th>
              </tr>
            </thead>
            <tbody className="table-border-bottom-0">
              {pnl?.map((item, i) => {
                const handleSettledBets = (statement_type, market_id) => {
                  if (statement_type === "Betting P&L") {
                    setMarketId(market_id);
                    setShowBetsModal(true);
                  }
                };
                return (
                  <tr
                    key={i}
                    style={{
                      cursor: `${
                        item?.statement_type === "Betting P&L" ? "pointer" : ""
                      }`,
                    }}
                    onClick={() =>
                      handleSettledBets(item?.statement_type, item?.market_id)
                    }
                  >
                    <td
                      style={{ textAlign: "right" }}
                      className={`
                        ${defineColor(item?.transfer_type, item?.pl)}
                        `}
                    >
                      <strong>{item?.pl}</strong>
                    </td>
                    <td style={{ textAlign: "right" }}>{item?.balance}</td>
                    <td style={{ textAlign: "left" }}>{item?.date_added}</td>
                    <td style={{ textAlign: "left" }}>{item?.narration}</td>
                    <td style={{ textAlign: "left" }}>{item?.transfer_type}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PNL;

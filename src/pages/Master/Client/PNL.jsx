import { DatePicker, Pagination } from "rsuite";
import useGetPNL from "../../../hooks/Master/Client/useGetPNL";
import { useState } from "react";
import SettleBets from "../../../components/modal/Master/SettleBets";

import { useLocation } from "react-router-dom";
import moment from "moment";
const PNL = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const downlineId = params.get("downlineId");
  const role = params.get("role");
  const id = params.get("id");
  const [activePage, setActivePage] = useState(1);
  const [showBetsModal, setShowBetsModal] = useState(false);
  const [marketId, setMarketId] = useState("");
  const thirtyDayBefore = new Date(
    new Date().setDate(new Date().getDate() - 30)
  );
  const [startDate, setStartDate] = useState(thirtyDayBefore);
  const [endDate, setEndDate] = useState(new Date());

  const { pnl, refetchPNL } = useGetPNL({
    downlineId,
    fromDate: moment(startDate).format("YYYY-MM-DD"),
    toDate: moment(endDate).format("YYYY-MM-DD"),
    role,
    id,
    page: activePage,
  });

  const meta = pnl?.pagination;

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
  console.log(pnl);
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
                <div style={{ display: "flex", gap: "10px" }}>
                  <div style={{ width: "100%" }}>
                    <label htmlFor="flatpickr-range" className="form-label">
                      From Date
                    </label>
                    <DatePicker
                      style={{ width: "100%" }}
                      format="yyyy-MM-dd"
                      editable
                      onChange={(date) => setStartDate(date)}
                      defaultValue={thirtyDayBefore}
                      block
                    />
                  </div>
                  <div style={{ width: "100%" }}>
                    <label htmlFor="flatpickr-range" className="form-label">
                      To Date
                    </label>
                    <DatePicker
                      style={{ width: "100%" }}
                      format="yyyy-MM-dd"
                      editable
                      onChange={(date) => setEndDate(date)}
                      defaultValue={new Date()}
                      block
                    />
                  </div>
                </div>
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
        <div
          className="card-header"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h5>Profit & Loss</h5>
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
          {pnl?.result?.length > 0 && (
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
                {pnl?.result?.map((item, i) => {
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
                          item?.statement_type === "Betting P&L"
                            ? "pointer"
                            : ""
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
                      <td style={{ textAlign: "left" }}>
                        {item?.transfer_type}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}

          {pnl?.result?.length === 0 && (
            <p
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              No records found for given date
            </p>
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

export default PNL;

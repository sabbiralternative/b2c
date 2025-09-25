import { useNavigate } from "react-router-dom";
import useGetMarketAnalysis from "../../../hooks/HyperMaster/Exposure/useGetMarketAnalysis";
import { useState } from "react";
import { useGetIndex } from "../../../hooks";
import { AdminRole } from "../../../constant/constant";
import useContextState from "../../../hooks/useContextState";

const MarketAnalysis = () => {
  const { adminRole } = useContextState();
  const [branchId, setBranchId] = useState(0);
  const { data: branches } = useGetIndex({
    type: "getBranches",
  });
  const payload = {};
  if (
    adminRole === AdminRole.hyper_master ||
    adminRole === AdminRole.admin_staff
  ) {
    payload.branch_id = branchId;
  }

  const { marketAnalysis } = useGetMarketAnalysis(payload);
  const navigate = useNavigate();

  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <div className="card">
        <div
          style={{ display: "flex", alignItems: "center", columnGap: "15px" }}
        >
          <h5 className="card-header"> Market Analysis</h5>
          {adminRole === AdminRole.admin_staff && (
            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <div>Branch:</div>
              <select
                style={{ width: "200px" }}
                defaultValue="0"
                onChange={(e) => setBranchId(e.target.value)}
                className="form-control"
              >
                <option disabled value="">
                  Branch
                </option>
                <option value="0">All Branch</option>
                {branches?.result?.map((site) => (
                  <option key={site?.branch_id} value={site?.branch_id}>
                    {site?.branch_name}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        <div className="table-responsive text-nowrap">
          <table className="table table-hover table-sm">
            <thead className="table-dark">
              <tr>
                <th style={{ width: "200px" }}>Date</th>
                <th>Event Name</th>
              </tr>
            </thead>
            <tbody className="table-border-bottom-0">
              {marketAnalysis?.map((market, i) => {
                return (
                  <tr
                    onClick={() => {
                      navigate(
                        `/game-details/${market?.eventTypeId}/${market?.eventId}`
                      );
                    }}
                    style={{ cursor: "pointer" }}
                    key={i}
                  >
                    <td>{market?.eventDate}</td>
                    <td>{market?.eventName}</td>
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

export default MarketAnalysis;

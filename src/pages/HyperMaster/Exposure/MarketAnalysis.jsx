// import { useNavigate } from "react-router-dom";
// import useGetMarketAnalysis from "../../../hooks/HyperMaster/Exposure/useGetMarketAnalysis";
// import { useState } from "react";
// import { useGetIndex } from "../../../hooks";
// import { AdminRole } from "../../../constant/constant";
// import useContextState from "../../../hooks/useContextState";

// const MarketAnalysis = () => {
//   const navigate = useNavigate();
//   const { adminRole } = useContextState();
//   const [branchId, setBranchId] = useState(0);
//   const { data: branches } = useGetIndex({
//     type: "getBranches",
//   });
//   const payload = {};
//   if (
//     adminRole === AdminRole.hyper_master ||
//     adminRole === AdminRole.admin_staff
//   ) {
//     payload.branch_id = branchId;
//   }

//   const { marketAnalysis } = useGetMarketAnalysis(payload);

//   const uniqueEvent =
//     marketAnalysis?.length > 0 &&
//     Array.from(new Set(marketAnalysis?.map((market) => market?.event_name)));
//   console.log(marketAnalysis);
//   return (
//     <div className="container-xxl flex-grow-1 container-p-y">
//       <div className="card">
//         <div
//           style={{ display: "flex", alignItems: "center", columnGap: "15px" }}
//         >
//           <h5 className="card-header"> Market Analysis</h5>
//           {adminRole === AdminRole.admin_staff && (
//             <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
//               <div>Branch:</div>
//               <select
//                 style={{ width: "200px" }}
//                 defaultValue="0"
//                 onChange={(e) => setBranchId(e.target.value)}
//                 className="form-control"
//               >
//                 <option disabled value="">
//                   Branch
//                 </option>
//                 <option value="0">All Branch</option>
//                 {branches?.result?.map((site) => (
//                   <option key={site?.branch_id} value={site?.branch_id}>
//                     {site?.branch_name}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           )}
//         </div>

//         <div className="table-responsive text-nowrap">
//           <table className="table table-hover table-sm">
//             <thead className="table-dark">
//               <tr>
//                 <th>Event Id</th>
//                 <th>Event Name</th>
//                 <th>Market Name</th>
//                 <th>Runner Name</th>
//                 <th>Exposure</th>
//               </tr>
//             </thead>
//             <tbody className="table-border-bottom-0">
//               {uniqueEvent?.length > 0 &&
//                 uniqueEvent.map((eventName, i) => {
//                   const event = marketAnalysis?.find(
//                     (item) => item?.event_name === eventName
//                   );
//                   const events = marketAnalysis?.filter(
//                     (item) => item?.event_name === eventName
//                   );

//                   // Unique market names under this event
//                   const uniqueMarketNames = Array.from(
//                     new Set(events.map((item) => item?.market_name))
//                   );

//                   return uniqueMarketNames.map((marketName, j) => {
//                     const marketItems = events.filter(
//                       (item) => item?.market_name === marketName
//                     );

//                     // Unique runner names for this market
//                     const uniqueRunners = Array.from(
//                       new Set(marketItems.map((item) => item?.runner_name))
//                     );

//                     return uniqueRunners.map((runnerName, k) => {
//                       const runnerData = marketItems.find(
//                         (item) => item?.runner_name === runnerName
//                       );

//                       return (
//                         <tr
//                           key={`${i}-${j}-${k}`}
//                           style={{ cursor: "pointer" }}
//                           onClick={() =>
//                             navigate(
//                               `/game-details/${event?.event_type_id}/${event?.event_id}`
//                             )
//                           }
//                         >
//                           {/* show event id and name only for the first market and first runner */}
//                           {j === 0 && k === 0 && (
//                             <>
//                               <td
//                                 rowSpan={uniqueMarketNames.reduce(
//                                   (acc, mName) =>
//                                     acc +
//                                     new Set(
//                                       events
//                                         .filter(
//                                           (item) => item.market_name === mName
//                                         )
//                                         .map((item) => item.runner_name)
//                                     ).size,
//                                   0
//                                 )}
//                               >
//                                 {event?.event_id}
//                               </td>
//                               <td
//                                 rowSpan={uniqueMarketNames.reduce(
//                                   (acc, mName) =>
//                                     acc +
//                                     new Set(
//                                       events
//                                         .filter(
//                                           (item) => item.market_name === mName
//                                         )
//                                         .map((item) => item.runner_name)
//                                     ).size,
//                                   0
//                                 )}
//                               >
//                                 {eventName}
//                               </td>
//                             </>
//                           )}

//                           {/* show market name only for first runner of each market */}
//                           {k === 0 && (
//                             <td
//                               rowSpan={uniqueRunners.length}
//                               style={{ verticalAlign: "middle" }}
//                             >
//                               {marketName}
//                             </td>
//                           )}

//                           {/* runner name and exposure */}
//                           <td>{runnerName}</td>

//                           <td
//                             className={`${
//                               Number(runnerData?.exposure) > 0
//                                 ? "text-success"
//                                 : "text-danger"
//                             }`}
//                           >
//                             {runnerData?.exposure}
//                           </td>
//                         </tr>
//                       );
//                     });
//                   });
//                 })}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MarketAnalysis;

import { useNavigate } from "react-router-dom";
import useGetMarketAnalysis from "../../../hooks/HyperMaster/Exposure/useGetMarketAnalysis";
import { useState, useMemo } from "react";
import { useGetIndex } from "../../../hooks";
import { AdminRole } from "../../../constant/constant";
import useContextState from "../../../hooks/useContextState";

const MarketAnalysis = () => {
  const navigate = useNavigate();
  const { adminRole } = useContextState();
  const [branchId, setBranchId] = useState(0);
  const { data: branches } = useGetIndex({ type: "getBranches" });

  const payload = {};
  if (
    adminRole === AdminRole.hyper_master ||
    adminRole === AdminRole.admin_staff
  ) {
    payload.branch_id = branchId;
  }

  const { marketAnalysis } = useGetMarketAnalysis(payload);

  // ✅ Preprocess data before rendering
  const structuredData = useMemo(() => {
    if (!marketAnalysis?.length) return [];

    // Group data: event -> market -> runners
    const eventMap = new Map();

    console.log(eventMap);

    for (const item of marketAnalysis) {
      const {
        event_id,
        event_name,
        event_type_id,
        market_name,
        runner_name,
        exposure,
      } = item;

      if (!eventMap.has(event_name)) {
        eventMap.set(event_name, {
          event_id,
          event_name,
          event_type_id,
          markets: new Map(),
        });
      }

      const event = eventMap.get(event_name);

      if (!event.markets.has(market_name)) {
        event.markets.set(market_name, []);
      }

      const runners = event.markets.get(market_name);
      // Avoid duplicate runner names
      if (!runners.some((r) => r.runner_name === runner_name)) {
        runners.push({ runner_name, exposure });
      }
    }

    // Convert maps into arrays for easy mapping in JSX
    return Array.from(eventMap.values()).map((event) => ({
      ...event,
      markets: Array.from(event.markets.entries()).map(
        ([market_name, runners]) => ({
          market_name,
          runners,
        })
      ),
    }));
  }, [marketAnalysis]);

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
          <table
            style={{ width: "auto" }}
            className="table table-hover table-sm"
          >
            <thead className="table-dark">
              <tr>
                <th>Event Id</th>
                <th>Event Name</th>
                <th>Market Name</th>
                <th>Runner Name</th>
                <th>Exposure</th>
              </tr>
            </thead>
            <tbody className="table-border-bottom-0">
              {structuredData.map((event, i) => {
                const totalRows = event.markets.reduce(
                  (acc, m) => acc + m.runners.length,
                  0
                );

                return event.markets.map((market, j) =>
                  market.runners.map((runner, k) => (
                    <tr
                      key={`${i}-${j}-${k}`}
                      style={{
                        cursor: "pointer",
                        borderTop:
                          j === 0 && k === 0 ? "2px solid #000" : "none",
                      }}
                      onClick={() =>
                        navigate(
                          `/game-details/${event.event_type_id}/${event.event_id}`
                        )
                      }
                    >
                      {/* show event id & name once */}
                      {j === 0 && k === 0 && (
                        <>
                          <td rowSpan={totalRows}>{event.event_id}</td>
                          <td rowSpan={totalRows}>{event.event_name}</td>
                        </>
                      )}

                      {/* show market name once per group */}
                      {k === 0 && (
                        <td rowSpan={market.runners.length}>
                          {market.market_name}
                        </td>
                      )}

                      {/* show runner info */}
                      <td>{runner.runner_name}</td>
                      <td
                        className={
                          Number(runner.exposure) > 0
                            ? "text-success"
                            : "text-danger"
                        }
                      >
                        {runner.exposure}
                      </td>
                    </tr>
                  ))
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

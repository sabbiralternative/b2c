import { handleDownLineId } from "../../../utils/handleDownLineId";
import useContextState from "../../../hooks/useContextState";
import { handleSplitUserName } from "../../../utils/handleSplitUserName";
import useGetViewBonus from "../../../hooks/HyperMaster/Bonus/useViewBonus";

const ViewBonus = () => {
  const { bonus } = useGetViewBonus();
  const { setShowDeposit, setShowWithdraw, setDownLineId } = useContextState();

  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <div className="card">
        <h5 className="card-header">Bonus</h5>
        <div className="table-responsive text-nowrap">
          <table className="table table-hover table-sm">
            <thead className="table-dark">
              <tr>
                <th>Bonus Name</th>
                <th>Bonus Amount</th>
                <th>Bonus Amount Type</th>
                <th>Max Bonus Amount</th>
                <th>Wagering Multiplier</th>
                <th>Min. Deposit</th>
                <th>Bonus Expiry</th>
                <th>Bonus Type</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="table-border-bottom-0">
              {bonus?.map((bonus, i) => {
                console.log(bonus);
                return (
                  <tr key={i}>
                    <td>
                      <strong>{handleSplitUserName(bonus?.bonus_name)}</strong>
                    </td>
                    <td>{bonus?.bonus_amount}</td>
                    <td>{bonus?.bonus_amount_type}</td>
                    <td>{bonus?.bonus_max_amount}</td>

                    <td>{bonus?.wagering_multiplier}</td>
                    <td>{bonus?.minimum_deposit}</td>
                    <td>{bonus?.bonus_expiry_days}</td>

                    <td>{bonus?.bonus_type}</td>
                    <td>
                      {" "}
                      <span
                        className={`badge  me-1 ${
                          bonus?.status === 1
                            ? "bg-label-primary"
                            : "bg-label-danger"
                        }`}
                      >
                        {bonus?.status === 1 ? "active" : "inactive"}
                      </span>
                    </td>
                    <td style={{ display: "flex", color: "white" }}>
                      <a
                        onClick={() =>
                          handleDownLineId(
                            setShowDeposit,
                            bonus?.username,
                            setDownLineId
                          )
                        }
                        className="btn btn-icon btn-sm btn-success"
                      >
                        E
                      </a>
                      &nbsp;
                      <a
                        onClick={() =>
                          handleDownLineId(
                            setShowWithdraw,
                            bonus?.username,
                            setDownLineId
                          )
                        }
                        className="btn btn-icon btn-sm btn-danger"
                      >
                        D
                      </a>
                    </td>
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

export default ViewBonus;

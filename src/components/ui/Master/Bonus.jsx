const Bonus = ({ data, title }) => {
  return (
    <div className="card">
      <h5 className="card-header">{title}</h5>
      <div className="table-responsive text-nowrap">
        <table className="table table-hover table-sm">
          <thead className="table-dark">
            <tr>
              <th>Bonus Amount</th>
              <th>Wagering Amount</th>
              <th>Wagering Complete Amount</th>
              <th>Is Wagering Complete</th>
              <th>Is Claimed</th>
              <th>Date Added</th>
              <th>Expiry Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="table-border-bottom-0">
            {data?.map((item, i) => {
              console.log(data);
              return (
                <tr key={i}>
                  <td>{item?.bonus_amount}</td>
                  <td style={{ cursor: "pointer" }}>{item?.wagering_amount}</td>
                  <td>{item?.wagering_complete_amount}</td>
                  <td
                    style={{
                      color:
                        item?.is_wagering_complete === "Yes"
                          ? "#39da8a"
                          : "red",
                    }}
                  >
                    {item?.is_wagering_complete}{" "}
                  </td>
                  <td>{item?.is_claimed}</td>
                  <td>{item?.date_added}</td>
                  <td>{item?.expiry_date}</td>

                  <td style={{ color: "white" }}>
                    <a className="btn btn-icon btn-sm btn-success">E</a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Bonus;

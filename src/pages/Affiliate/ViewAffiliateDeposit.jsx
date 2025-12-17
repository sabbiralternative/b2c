import Loader from "../../components/ui/Loader/Loader";
import { Fragment, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAffiliateQuery } from "../../hooks/affiliate";
import { defaultDate } from "../../utils/defaultDate";
import { DatePicker, Pagination } from "rsuite";
import moment from "moment";

const ViewAffiliateDeposit = () => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const affiliate_id = params.get("affiliate_id");
  const [page, setPage] = useState(1);
  const [fromDate, setFromDate] = useState(defaultDate(1));
  const [toDate, setToDate] = useState(new Date());

  const {
    data: affiliateDepositData,
    isSuccess,
    isLoading,
  } = useAffiliateQuery({
    type: "view_affiliate_deposit",
    affiliate_id,
    page,
    fromDate: moment(fromDate).format("YYYY-MM-DD"),
    toDate: moment(toDate).format("YYYY-MM-DD"),
  });

  const meta = affiliateDepositData?.pagination;

  return (
    <>
      <div className="container-xxl flex-grow-1 container-p-y">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <form
                id="formValidationExamples"
                className="row g-3 fv-plugins-bootstrap5 fv-plugins-framework"
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
                        onChange={(date) => setFromDate(date)}
                        value={fromDate}
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
                        onChange={(date) => setToDate(date)}
                        value={toDate}
                        block
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        {affiliateDepositData?.result?.length > 0 && (
          <Fragment>
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
                <h5>View Affiliate Deposit</h5>
                <Pagination
                  prev
                  next
                  size="md"
                  total={meta?.totalRecords}
                  limit={meta?.recordsPerPage}
                  activePage={page}
                  onChangePage={setPage}
                  maxButtons={5}
                  ellipsis
                  boundaryLinks
                />
              </div>
              <div className="table-responsive text-nowrap">
                <table className="table table-hover table-sm">
                  <thead>
                    <tr>
                      <th>User Id</th>
                      <th>Branch</th>
                      <th>Amount</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody className="table-border-bottom-0">
                    {affiliateDepositData?.result?.map((affiliate, i) => {
                      return (
                        <tr key={i}>
                          <td>
                            <strong>{affiliate?.user_id}</strong>
                          </td>

                          <td>{affiliate?.branch}</td>

                          <td>
                            <strong>{affiliate?.amount}</strong>
                          </td>
                          <td>{affiliate?.date}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
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
                      activePage={page}
                      onChangePage={setPage}
                      maxButtons={5}
                      ellipsis
                      boundaryLinks
                    />
                  </div>
                )}
              </div>
            </div>
          </Fragment>
        )}

        {isLoading && !isSuccess && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Loader />
          </div>
        )}
        {isSuccess && affiliateDepositData?.result?.length === 0 && (
          <div className="card">
            <h5 style={{ fontSize: "18px" }} className="card-header">
              No affiliate deposit found.
            </h5>
          </div>
        )}
      </div>
    </>
  );
};

export default ViewAffiliateDeposit;

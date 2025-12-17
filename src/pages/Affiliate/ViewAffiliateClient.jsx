import { useForm } from "react-hook-form";
import Loader from "../../components/ui/Loader/Loader";
import { useAffiliateQuery } from "../../hooks/affiliate";
import { Fragment, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Pagination } from "rsuite";

const ViewAffiliateClient = () => {
  const navigate = useNavigate();
  const { register, watch } = useForm();
  const searchAffiliateId = watch("affiliate_id");
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const affiliate_id = params.get("affiliate_id");
  const [page, setPage] = useState(1);
  const {
    data: affiliateData,
    isSuccess,
    isLoading,
  } = useAffiliateQuery({
    affiliate_id,
    type: "view_affiliate_clients",
    page,
  });

  const meta = affiliateData?.pagination;

  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <div className="col-12">
        <div className="card">
          <div className="card-body">
            <form
              id="formValidationExamples"
              className="row g-3 fv-plugins-bootstrap5 fv-plugins-framework"
            >
              <div className="col-md-6 fv-plugins-icon-container">
                <input
                  {...register("affiliate_id")}
                  type="text"
                  className="form-control"
                  placeholder="Search Affiliate"
                  value={searchAffiliateId}
                />
                <div className="fv-plugins-message-container invalid-feedback"></div>
              </div>

              <div className="col-12">
                <input
                  onClick={() =>
                    navigate(
                      `/view-affiliate?affiliate_id=${searchAffiliateId}`
                    )
                  }
                  type="button"
                  name="submit"
                  className="btn btn-primary"
                  value="Search"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
      {affiliateData?.result?.length > 0 && (
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
              <h5>Affiliate</h5>
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
                    <th>Punter Id</th>
                    <th>Branch</th>
                    <th>Mobile</th>
                    <th>Site</th>
                    <th>Status</th>
                    <th>Registration Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody className="table-border-bottom-0">
                  {affiliateData?.result?.map((affiliate, i) => {
                    return (
                      <tr key={i}>
                        <td>
                          <strong>{affiliate?.punter_id}</strong>
                        </td>

                        <td>{affiliate?.branch}</td>

                        <td>
                          <strong>{affiliate?.mobile}</strong>
                        </td>
                        <td>{affiliate?.site}</td>

                        <td>
                          <span
                            className={`badge  me-1 ${
                              affiliate?.userStatus === 1
                                ? "bg-label-primary"
                                : "bg-label-danger"
                            }`}
                          >
                            {affiliate?.userStatus === 1
                              ? "Active"
                              : "InActive"}
                          </span>
                        </td>

                        <td>{affiliate?.registrationDate}</td>
                        <td>
                          <a
                            onClick={() =>
                              navigate(
                                `/pnl?id=${affiliate?.punter_id}&role=punter&downlineId=${affiliate?.punter_id}`
                              )
                            }
                            style={{ color: "white" }}
                            className="btn btn-icon btn-sm btn-warning"
                          >
                            PL
                          </a>
                        </td>
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
      {isSuccess && affiliateData?.result?.length === 0 && (
        <div className="card">
          <h5 style={{ fontSize: "18px" }} className="card-header">
            No affiliate found with given search query.
          </h5>
        </div>
      )}
    </div>
  );
};

export default ViewAffiliateClient;

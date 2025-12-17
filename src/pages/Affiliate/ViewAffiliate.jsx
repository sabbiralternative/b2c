import { useForm } from "react-hook-form";
import Loader from "../../components/ui/Loader/Loader";
import { Fragment, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAffiliateMutation } from "../../hooks/affiliate";

const ViewAffiliate = () => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const searchedAffiliate_id = params.get("affiliate_id");

  const navigate = useNavigate();
  const {
    mutate: handleSearchAffiliate,
    data: affiliateData,
    isSuccess,
    isPending,
  } = useAffiliateMutation();

  const { handleSubmit, register, watch, reset } = useForm();
  const affiliate_id = watch("affiliate_id");

  const onSubmit = ({ affiliate_id }) => {
    handleSearchAffiliate({
      type: "search_affiliate",
      affiliate_id,
    });
    reset();
  };

  useEffect(() => {
    if (searchedAffiliate_id) {
      handleSearchAffiliate(
        {
          type: "search_affiliate",
          affiliate_id: searchedAffiliate_id,
        },
        {
          onSuccess: () => {
            navigate("/view-affiliate");
          },
        }
      );
    }
  }, [searchedAffiliate_id, handleSearchAffiliate, navigate]);

  return (
    <>
      <div className="container-xxl flex-grow-1 container-p-y">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <form
                id="formValidationExamples"
                className="row g-3 fv-plugins-bootstrap5 fv-plugins-framework"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="col-md-6 fv-plugins-icon-container">
                  <input
                    {...register("affiliate_id")}
                    type="text"
                    className="form-control"
                    placeholder="Search Affiliate"
                    value={affiliate_id}
                  />
                  <div className="fv-plugins-message-container invalid-feedback"></div>
                </div>

                <div className="col-12">
                  <input
                    disabled={affiliate_id?.length < 2}
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
        {affiliateData?.result?.length > 0 && (
          <Fragment>
            <hr className="my-3" />
            <div className="card">
              <h5 className="card-header">Clients</h5>
              <div className="table-responsive text-nowrap">
                <table className="table table-hover table-sm">
                  <thead>
                    <tr>
                      <th>Affiliate Id</th>
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
                            <strong>{affiliate?.affiliate_id}</strong>
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
                                  `/view-affiliate-client?affiliate_id=${affiliate?.affiliate_id}`
                                )
                              }
                              style={{ color: "white" }}
                              className="btn btn-icon btn-sm btn-success"
                            >
                              U
                            </a>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </Fragment>
        )}

        {isPending && !isSuccess && (
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
    </>
  );
};

export default ViewAffiliate;

import useGetViewAllBanner from "../../../hooks/HyperMaster/Settings/useGetViewAllBanner";


const ViewBanner = () => {
  const { banners } = useGetViewAllBanner();
  console.log(banners);
  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <div className="card">
        <h5 className="card-header">Banners</h5>
        <div className="table-responsive text-nowrap">
          <table className="table table-hover table-sm">
            <thead className="table-dark">
              <tr>
                <th>Banner</th>

                <th>Sort</th>

                <th>Status</th>

                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="table-border-bottom-0">
              {banners?.map((banner, i) => {
                return (
                  <tr key={i}>
                    <td>
                      <a>
                        <img src={banner?.banner_link} width="500px" />
                      </a>
                    </td>
                    <td>{banner?.priority}</td>

                    <td>
                      <span className="badge bg-label-primary me-1">
                        {banner?.status == 1 ? 'Active':'DeActive'}
                
                      </span>
                    </td>

                    <td>
                      <a
                        href="edit_banner.php?banner_id=14"
                        className="btn btn-icon btn-sm btn-success"
                      >
                        E
                      </a>
                      &nbsp;
                      <a
                        href="delete_banner.php?banner_id=14"
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

export default ViewBanner;

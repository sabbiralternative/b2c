import { useState } from "react";
import { Pagination } from "rsuite";
import { useBlogMutation, useBlogQuery } from "../../hooks/blog";
import Loader from "../../components/ui/Loader/Loader";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const ViewBlogs = () => {
  const { mutateAsync } = useBlogMutation();
  const [activePage, setActivePage] = useState(1);
  const { data, isLoading, isSuccess, refetch } = useBlogQuery({
    type: "view_blog",
    page: activePage,
  });
  const meta = data?.pagination;
  const result = data?.result;

  const handleDeleteBlog = async (blog) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You want to delete ${blog?.title}!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const payload = {
          type: "delete_blog",
          blog_id: blog?.blog_id,
        };
        const res = await mutateAsync(payload);
        const data = res.data;
        if (data?.success) {
          refetch();
          toast.success("Blog deleted successfully");
        } else {
          toast.error(data?.error?.description);
        }
      }
    });
  };

  return (
    <>
      <div className="container-xxl flex-grow-1 container-p-y">
        <div className="card">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
              <h5 className="card-header">View Blogs</h5>
            </div>
            {meta && (
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
            )}
          </div>
          <div className="table-responsive text-nowrap">
            <table className="table table-hover table-sm">
              <thead className="table-dark">
                <tr>
                  <th>Title</th>
                  <th>Status</th>
                  <th>Site</th>
                  <th>Date Added</th>

                  <th>Action</th>
                </tr>
              </thead>
              <tbody className="table-border-bottom-0">
                {Array.isArray(result) &&
                  result?.map((item, i) => {
                    return (
                      <tr key={i}>
                        <td>{item?.title}</td>
                        <td
                          className={`badge me-1 bg-label-warning
                      
                      `}
                        >
                          {item?.status}
                        </td>
                        <td>{item?.site}</td>
                        <td>{item?.date_added}</td>

                        <td>
                          <Link
                            to={`/edit-blog/${item?.blog_id}`}
                            title="Text Edit"
                            style={{
                              color: "white",
                            }}
                            className="btn btn-icon btn-sm btn-warning"
                          >
                            E
                          </Link>
                          &nbsp;
                          <a
                            onClick={() => handleDeleteBlog(item)}
                            style={{
                              color: "white",
                            }}
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
            {isLoading && !isSuccess && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  margin: "20px",
                }}
              >
                <Loader />
              </div>
            )}

            {isSuccess && result?.length === 0 && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  marginTop: "30px",
                }}
              >
                No Blog found
              </div>
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
    </>
  );
};

export default ViewBlogs;

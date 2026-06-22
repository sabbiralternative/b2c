import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useWhiteLabel } from "../../hooks/AdminMaster/whiteLabel";
import { useBlogMutation, useBlogQuery } from "../../hooks/blog";

const EditBlog = () => {
  const { blog_id } = useParams();
  const { data: blog } = useBlogQuery({ type: "view_single_blog", blog_id });

  const { data } = useWhiteLabel({
    type: "viewWhitelabelByAdmin",
  });

  const { mutate } = useBlogMutation();
  const [disabled, setDisabled] = useState(false);
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm({
    defaultValues: blog?.result,
  });

  const onSubmit = async (value) => {
    const payload = {
      type: "edit_blog",
      ...value,
    };

    setDisabled(true);
    mutate(payload, {
      onSuccess: (data) => {
        if (data?.success) {
          setDisabled(false);
          toast.success(data?.result?.message);
          reset();
          navigate("/view-blogs");
        } else {
          setDisabled(false);
          toast.error(data?.error?.status?.[0]?.description);
        }
      },
    });
  };

  useEffect(() => {
    if (blog?.result) {
      reset({ ...blog.result });
    }
  }, [blog?.result, data?.result]);

  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <h4 className="py-3 breadcrumb-wrapper mb-4">
        <span className="text-muted fw-light">Home /</span> Edit Blog
      </h4>

      <div className="row">
        <div className="col-xxl">
          <div className="card mb-4">
            <div className="card-body">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row mb-3">
                  <label className="col-sm-2 col-form-label">Title *</label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      {...register("title", {
                        required: true,
                      })}
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <label className="col-sm-2 col-form-label">Content *</label>
                  <div className="col-sm-10">
                    <textarea
                      type="text"
                      {...register("content", {
                        required: true,
                      })}
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <label className="col-sm-2 col-form-label">Status *</label>
                  <div
                    className="col-sm-10"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0px 30px",
                    }}
                  >
                    <label
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "3px",
                        cursor: "pointer",
                      }}
                    >
                      <input
                        type="radio"
                        {...register("status", { required: true })}
                        value="1"
                      />
                      <span>Active</span>
                    </label>
                    <label
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "3px",
                        cursor: "pointer",
                      }}
                    >
                      <input
                        type="radio"
                        {...register("status", { required: true })}
                        value="0"
                      />
                      <span>Inactive</span>
                    </label>
                  </div>
                </div>

                <div className="row mb-3">
                  <label className="col-sm-2 col-form-label">Seo Title *</label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      {...register("seo_title", {
                        required: true,
                      })}
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <label className="col-sm-2 col-form-label">
                    Seo Description *
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      {...register("seo_description", {
                        required: true,
                      })}
                      className="form-control"
                    />
                  </div>
                </div>
                {data?.result?.length > 0 && (
                  <div className="row mb-3">
                    <label className="col-sm-2 col-form-label">Site *</label>
                    <div className="col-sm-10">
                      <select
                        {...register("site", {
                          required: true,
                        })}
                        className="form-control"
                      >
                        <option disabled value="">
                          Select Site
                        </option>
                        {data?.result?.map((site) => (
                          <option key={site?.site_url} value={site?.site_url}>
                            {site?.site_url}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}

                <div className="row justify-content-end">
                  <div className="col-sm-10">
                    <input
                      disabled={disabled}
                      type="submit"
                      name="submit"
                      value="Submit"
                      className="btn btn-primary"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditBlog;

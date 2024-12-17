import toast from "react-hot-toast";
import { useRef } from "react";
import useCloseModalClickOutside from "../../../../hooks/useCloseModalClickOutside";
import { useForm } from "react-hook-form";
import handleRandomToken from "../../../../utils/handleRandomToken";
import useContextState from "../../../../hooks/useContextState";
import axios from "axios";
import { API } from "../../../../api";
import useGetAllSocialLink from "../../../../hooks/HyperMaster/Settings/useGetAllSocialLink";

const SocialLink = ({ setShowSocialLink }) => {
  const { socialLinks, refetchAllSocialLinks, isLoading } =
    useGetAllSocialLink();

  /* close modal click outside */
  const socialLinkRef = useRef();
  useCloseModalClickOutside(socialLinkRef, () => {
    setShowSocialLink(false);
  });

  const { register, handleSubmit, reset } = useForm({});
  const { token, adminRole } = useContextState();

  /* handle edit social link */
  const onSubmit = async ({ whatsapp, instagram, telegram }) => {
    const generatedToken = handleRandomToken();
    //   const encryptedData = handleEncryptData({
    //     newPassword: newPassword,
    //     confirmPassword: newPasswordConfirm,
    //     mpassword: transactionCode,
    //     type: "panel",
    //     token: generatedToken,
    //   });
    let payload = {};

    if (adminRole === "master") {
      payload = {
        type: "updateSocial",
        whatsapp,
        token: generatedToken,
      };
    } else {
      payload = {
        type: "updateSocial",
        whatsapp,
        instagram,
        telegram,
        token: generatedToken,
      };
    }

    const res = await axios.post(API.socialLinks, payload, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = res.data;
    if (data?.success) {
      toast.success(data?.result?.message);
      reset();
      setShowSocialLink(false);
      refetchAllSocialLinks();
    } else {
      toast.error(data?.error?.status?.[0]?.description);
    }
  };
  if (isLoading) {
    return;
  }

  return (
    <>
      <div className="content-backdrop fade show"></div>
      <div
        className="modal fade show"
        id="modalCenter"
        aria-modal="true"
        role="dialog"
        style={{ display: "block" }}
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content" ref={socialLinkRef}>
            <div className="modal-header">
              <h5 className="modal-title" id="modalCenterTitle">
                Social Links
              </h5>
              <button
                onClick={() => setShowSocialLink(false)}
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="modal-body">
                <div className="row">
                  <div className="row mb-3" id="bank_account_name_div">
                    <label
                      className="col-sm-2 col-form-label"
                      htmlFor="basic-default-name"
                    >
                      Whatsapp
                    </label>
                    <div className="col-sm-10">
                      <input
                        {...register("whatsapp", {
                          value: socialLinks?.[0]?.whatsapp,
                        })}
                        type="text"
                        className="form-control"
                        id="basic-default-name"
                        placeholder=""
                      />
                    </div>
                  </div>
                  {adminRole !== "master" && (
                    <>
                      <div className="row mb-3" id="bank_account_number_div">
                        <label
                          className="col-sm-2 col-form-label"
                          htmlFor="basic-default-company"
                        >
                          Instagram
                        </label>
                        <div className="col-sm-10">
                          <input
                            {...register("instagram", {
                              value: socialLinks?.[0]?.instagram,
                            })}
                            type="text"
                            className="form-control"
                            id="basic-default-company"
                            placeholder=""
                          />
                        </div>
                      </div>
                      <div className="row mb-3" id="ifsc_div">
                        <label
                          className="col-sm-2 col-form-label"
                          htmlFor="basic-default-company"
                        >
                          Telegram
                        </label>
                        <div className="col-sm-10">
                          <input
                            {...register("telegram", {
                              value: socialLinks?.[0]?.telegram,
                            })}
                            type="text"
                            className="form-control"
                            id="basic-default-company"
                            placeholder=""
                          />
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div className="modal-footer">
                <button
                  onClick={() => setShowSocialLink(false)}
                  type="button"
                  className="btn btn-label-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="submit" className="btn btn-primary">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SocialLink;

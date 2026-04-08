import { useQuery } from "@tanstack/react-query";
import useContextState from "../../useContextState";
import { API } from "../../../api";
import { AxiosSecure } from "../../../lib/AxiosSecure";

const useGetAllSocialLink = (payload) => {
  const { tokenLoading } = useContextState();
  const {
    data: socialLinks = [],
    refetch: refetchAllSocialLinks,
    isLoading,
  } = useQuery({
    queryKey: ["socialLink", payload],
    enabled: !tokenLoading,
    queryFn: async () => {
      const postData = {
        type: "getSocial",
        ...payload,
      };
      const res = await AxiosSecure.post(API.socialLinks, postData);

      const data = res.data;
      if (data?.success) {
        return data?.result;
      }
    },
  });
  return { socialLinks, refetchAllSocialLinks, isLoading };
};

export default useGetAllSocialLink;

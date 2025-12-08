import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useContextState from "../../useContextState";
import { API } from "../../../api";
import handleRandomToken from "../../../utils/handleRandomToken";

const useGetAllSocialLink = (payload) => {
  const { token, tokenLoading } = useContextState();
  const {
    data: socialLinks = [],
    refetch: refetchAllSocialLinks,
    isLoading,
  } = useQuery({
    queryKey: ["socialLink", payload],
    enabled: !tokenLoading,
    queryFn: async () => {
      const generatedToken = handleRandomToken();
      const postData = {
        token: generatedToken,
        type: "getSocial",
        ...payload,
      };
      const res = await axios.post(API.socialLinks, postData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = res.data;
      if (data?.success) {
        return data?.result;
      }
    },
  });
  return { socialLinks, refetchAllSocialLinks, isLoading };
};

export default useGetAllSocialLink;

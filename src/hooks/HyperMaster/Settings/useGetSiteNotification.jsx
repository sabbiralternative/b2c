import { useQuery } from "@tanstack/react-query";
import useContextState from "../../useContextState";
import { API } from "../../../api";
import { AxiosSecure } from "../../../lib/AxiosSecure";

const useGetSiteNotification = () => {
  const { tokenLoading } = useContextState();
  const {
    data: siteNotification = [],
    refetch: refetchSiteNotification,
    isLoading,
  } = useQuery({
    queryKey: ["siteNotify"],
    enabled: !tokenLoading,
    queryFn: async () => {
      const payload = {
        type: "getNotification",
      };
      const res = await AxiosSecure.post(API.notification, payload);

      const data = res.data;
      if (data?.success) {
        return data?.result?.message;
      }
    },
    gcTime: 0,
  });
  return { siteNotification, refetchSiteNotification, isLoading };
};

export default useGetSiteNotification;

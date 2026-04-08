import { useQuery } from "@tanstack/react-query";
import useContextState from "../../useContextState";
import { API } from "../../../api";
import { AxiosSecure } from "../../../lib/AxiosSecure";

const useGetSingleBanner = (bannerId) => {
  const { tokenLoading } = useContextState();
  const {
    data: singleBanner = [],
    refetch: refetchSingleBanner,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["banner"],
    enabled: !tokenLoading,
    queryFn: async () => {
      const payload = {
        type: "getSingleBanner",
        bannerId,
      };
      const res = await AxiosSecure.post(API.banner, payload);

      const data = res.data;
      if (data?.success) {
        return data?.result;
      }
    },
  });
  return { singleBanner, refetchSingleBanner, isLoading, isFetching };
};

export default useGetSingleBanner;

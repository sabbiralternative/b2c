import { useQuery } from "@tanstack/react-query";
import useContextState from "../../useContextState";
import { API } from "../../../api";
import { AxiosSecure } from "../../../lib/AxiosSecure";

const useGetViewAllBanner = () => {
  const { tokenLoading } = useContextState();
  const { data: banners = [], refetch: refetchAllBanners } = useQuery({
    queryKey: ["banner"],
    enabled: !tokenLoading,
    queryFn: async () => {
      const payload = {
        type: "getBanners",
      };
      const res = await AxiosSecure.post(API.banner, payload);

      const data = res.data;
      if (data?.success) {
        return data?.result;
      }
    },
  });
  return { banners, refetchAllBanners };
};

export default useGetViewAllBanner;

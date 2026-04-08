import { useQuery } from "@tanstack/react-query";
import useContextState from "../../useContextState";
import { API } from "../../../api";
import { AxiosSecure } from "../../../lib/AxiosSecure";

const useGetMarketAnalysis = (payload) => {
  const { tokenLoading } = useContextState();
  const { data: marketAnalysis = [], refetch: refetchMarketAnalysis } =
    useQuery({
      queryKey: ["market-analysis", payload],
      enabled: !tokenLoading,
      queryFn: async () => {
        const res = await AxiosSecure.post(API.marketAnalysis, payload);

        const data = res.data;
        if (data?.success) {
          return data?.result;
        }
      },
      refetchInterval: 1000 * 15,
    });
  return { marketAnalysis, refetchMarketAnalysis };
};

export default useGetMarketAnalysis;

import { useQuery } from "@tanstack/react-query";
import { API, Settings } from "../../../api";
import { AxiosSecure } from "../../../lib/AxiosSecure";

const useDeposit = (args, loop) => {
  const { data = [], refetch } = useQuery({
    queryKey: ["deposit-utr", args],
    queryFn: async () => {
      const payload = {
        ...args,
        type: "viewUTR",
        site: Settings.siteUrl,
      };
      const { data } = await AxiosSecure.post(API.utr, payload);
      if (data?.success) {
        return data?.result;
      }
    },
    refetchInterval: loop ? loop : null,
  });

  return { data, refetch };
};

export default useDeposit;

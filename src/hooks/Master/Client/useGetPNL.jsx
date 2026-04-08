import { API } from "../../../api";
import { useQuery } from "@tanstack/react-query";
import useContextState from "../../useContextState";
import { AxiosSecure } from "../../../lib/AxiosSecure";

const useGetPNL = (args) => {
  const { tokenLoading } = useContextState();
  const { data: pnl = [], refetch: refetchPNL } = useQuery({
    queryKey: ["PNL", args],
    enabled: !tokenLoading,
    queryFn: async () => {
      const payload = {
        ...args,
        pagination: true,
      };
      const res = await AxiosSecure.post(API.statement, payload);

      const data = res.data;
      if (data?.success) {
        return data;
      }
    },
  });
  return { pnl, refetchPNL };
};

export default useGetPNL;

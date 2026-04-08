import { useQuery } from "@tanstack/react-query";
import useContextState from "../../useContextState";
import { API } from "../../../api";
import { AxiosSecure } from "../../../lib/AxiosSecure";

const useGetALLWithdraw = (args, time) => {
  const { tokenLoading } = useContextState();
  const {
    data: allWithdraw = [],
    refetch: refetchAllWithdraw,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["withdrawPAR", args],
    enabled: !tokenLoading,
    queryFn: async () => {
      const res = await AxiosSecure.post(API.withdraw, args);

      const data = res.data;
      if (data?.success) {
        return data;
      }
    },
    gcTime: 0,
    refetchInterval: time ? time : null,
  });
  return { allWithdraw, refetchAllWithdraw, isLoading, isSuccess };
};

export default useGetALLWithdraw;

import { useQuery } from "@tanstack/react-query";
import useContextState from "../../useContextState";
import { API } from "../../../api";
import { AxiosSecure } from "../../../lib/AxiosSecure";

const useGetALLDeposit = (args, time) => {
  const { tokenLoading } = useContextState();

  const {
    data: allUTRs = [],
    refetch: refetchAllUTRs,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["pendingUTR", args],
    enabled: !tokenLoading,
    queryFn: async () => {
      const res = await AxiosSecure.post(API.utr, args);

      const data = res.data;

      if (data?.success) {
        return data;
      }
    },
    gcTime: 0,
    refetchInterval: time ? time : null,
  });
  return { allUTRs, refetchAllUTRs, isLoading, isSuccess };
};

export default useGetALLDeposit;

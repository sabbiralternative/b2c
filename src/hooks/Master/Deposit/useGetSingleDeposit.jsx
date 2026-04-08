import { useQuery } from "@tanstack/react-query";
import useContextState from "../../useContextState";
import { API } from "../../../api";
import { AxiosSecure } from "../../../lib/AxiosSecure";

const useGetSingleDeposit = (args) => {
  const { tokenLoading } = useContextState();

  const { data: singleDeposit } = useQuery({
    queryKey: ["singleDeposit"],
    enabled: !tokenLoading,
    queryFn: async () => {
      const res = await AxiosSecure.post(API.utr, args);

      const data = res.data;

      if (data?.success) {
        return data?.result;
      }
    },
    gcTime: 0,
  });
  return { singleDeposit };
};

export default useGetSingleDeposit;

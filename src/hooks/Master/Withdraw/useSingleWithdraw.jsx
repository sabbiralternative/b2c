import { useQuery } from "@tanstack/react-query";
import useContextState from "../../useContextState";
import { API } from "../../../api";
import { AxiosSecure } from "../../../lib/AxiosSecure";

const useGetSingleWithdraw = (args) => {
  const { tokenLoading } = useContextState();

  const { data: singleWithdraw = [], refetch: refetchSingleWithdraw } =
    useQuery({
      queryKey: ["singleWithdraw"],
      enabled: !tokenLoading,
      queryFn: async () => {
        const res = await AxiosSecure.post(API.withdraw, args);

        const data = res.data;

        if (data?.success) {
          return data?.result;
        }
      },
      gcTime: 0,
    });
  return { singleWithdraw, refetchSingleWithdraw };
};

export default useGetSingleWithdraw;

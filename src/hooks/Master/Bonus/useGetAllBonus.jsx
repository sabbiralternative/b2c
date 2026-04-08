import { useQuery } from "@tanstack/react-query";
import useContextState from "../../useContextState";
import { API } from "../../../api";
import { AxiosSecure } from "../../../lib/AxiosSecure";

const useGetAllBonus = (args, time) => {
  const { tokenLoading } = useContextState();
  const { data: bonus = [], refetch: refetchBonus } = useQuery({
    queryKey: ["bonus", args?.is_claimed],
    enabled: !tokenLoading,
    queryFn: async () => {
      const res = await AxiosSecure.post(API.bonus, args);

      const data = res.data;
      if (data?.success) {
        return data?.result;
      }
    },
    gcTime: 0,
    refetchInterval: time ? time : null,
  });
  return { bonus, refetchBonus };
};

export default useGetAllBonus;

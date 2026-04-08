import { useQuery } from "@tanstack/react-query";
import useContextState from "../../useContextState";
import { API } from "../../../api";
import { AxiosSecure } from "../../../lib/AxiosSecure";

const useGetViewBonus = () => {
  const { tokenLoading } = useContextState();
  const { data: bonus = [], refetch: refetchBonus } = useQuery({
    queryKey: ["bonus"],
    enabled: !tokenLoading,
    queryFn: async () => {
      const payload = { type: "viewBonus" };
      const res = await AxiosSecure.post(API.bonus, payload);

      const data = res.data;
      if (data?.success) {
        return data?.result;
      }
    },
  });
  return { bonus, refetchBonus };
};

export default useGetViewBonus;

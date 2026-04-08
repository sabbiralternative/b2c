import useContextState from "../../useContextState";
import { API } from "../../../api";
import handleRandomToken from "../../../utils/handleRandomToken";
import { AxiosSecure } from "../../../lib/AxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useGetSingleViewBonus = (bonus_id) => {
  const { tokenLoading } = useContextState();
  const { data: singleBonus = {}, refetch: refetchSingleBonus } = useQuery({
    queryKey: ["singleBonus", bonus_id],
    enabled: !tokenLoading,
    queryFn: async () => {
      const payload = {
        type: "viewSingleBonus",
        bonus_id,
      };
      const res = await AxiosSecure.post(API.bonus, payload);

      const data = res.data;
      if (data?.success) {
        return data?.result?.[0];
      }
    },
    gcTime: 0,
  });
  return { singleBonus, refetchSingleBonus };
};

export default useGetSingleViewBonus;

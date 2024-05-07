import { useQuery } from "@tanstack/react-query";
import useContextState from "./useContextState";
import handleRandomToken from "../utils/handleRandomToken";
import { API, Settings } from "../api";
import axios from "axios";

const useGetCurrentRef = (downlineId) => {
  const { token, tokenLoading } = useContextState();
  const { data: currentRef = {}, refetch: refetchRef,isSuccess } = useQuery({
    queryKey: ["currentRef"],
    enabled: !tokenLoading,
    queryFn: async () => {
      const generatedToken = handleRandomToken();
      const payload = {
        downlineId: downlineId,
        type: "viewCreditReference",
        token: generatedToken,
        site:Settings.siteUrl
      };
      const res = await axios.post(API.downLineEdit, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = res.data;
      if (data.success) {
        return data.result;
      }
    },
    gcTime:0
  });
  return { currentRef, refetchRef,isSuccess };
};

export default useGetCurrentRef;

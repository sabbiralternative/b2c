import { useQuery } from "@tanstack/react-query";
import useContextState from "./useContextState";
import handleRandomToken from "../utils/handleRandomToken";
import { API } from "../api";
import { AxiosSecure } from "../lib/AxiosSecure";

const useGetCurrentRef = (payload) => {
  const { tokenLoading } = useContextState();
  const {
    data: currentRef = {},
    refetch: refetchRef,
    isSuccess,
  } = useQuery({
    queryKey: ["currentRef"],
    enabled: !tokenLoading,
    queryFn: async () => {
      const generatedToken = handleRandomToken();
      const postData = {
        ...payload,
        type: "viewCreditReference",
        token: generatedToken,
      };
      const res = await AxiosSecure.post(API.downLineEdit, postData);
      const data = res.data;
      if (data.success) {
        return data.result;
      }
    },
    gcTime: 0,
  });
  return { currentRef, refetchRef, isSuccess };
};

export default useGetCurrentRef;

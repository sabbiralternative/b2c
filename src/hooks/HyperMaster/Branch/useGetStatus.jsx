import { useQuery } from "@tanstack/react-query";
import { API } from "../../../api";
import useContextState from "../../useContextState";
import { AxiosSecure } from "../../../lib/AxiosSecure";

const useGetStatus = (payload) => {
  const { tokenLoading } = useContextState();
  const { data: status, refetch: refetchStatus } = useQuery({
    queryKey: ["creditRef"],
    enabled: !tokenLoading,
    queryFn: async () => {
      const res = await AxiosSecure.post(API.downLineEdit, payload);

      const data = res.data;
      if (data?.success) {
        return data?.result;
      }
    },
    gcTime: 0,
  });
  return { status, refetchStatus };
};

export default useGetStatus;

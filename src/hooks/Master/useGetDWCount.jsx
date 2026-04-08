import { useQuery } from "@tanstack/react-query";
import useContextState from "../useContextState";
import { API } from "../../api";
import { AxiosSecure } from "../../lib/AxiosSecure";

const useGetDWCount = () => {
  const { tokenLoading } = useContextState();

  const { data: dwCount = {}, refetch: refetchDWCount } = useQuery({
    queryKey: ["withdrawPRC"],
    enabled: !tokenLoading,
    queryFn: async () => {
      const res = await AxiosSecure.post(API.dwCount);
      const data = res.data;
      if (data?.success) {
        return data?.result;
      }
    },
    refetchInterval: 15000,
  });
  return { dwCount, refetchDWCount };
};

export default useGetDWCount;

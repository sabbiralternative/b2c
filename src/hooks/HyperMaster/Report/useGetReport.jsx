import { API } from "../../../api";
import handleRandomToken from "../../../utils/handleRandomToken";
import { useQuery } from "@tanstack/react-query";
import useContextState from "../../useContextState";
import { AxiosSecure } from "../../../lib/AxiosSecure";

const useGetReport = (args, downloadData) => {
  const { tokenLoading } = useContextState();
  const { data: reports = [], refetch: refetchReports } = useQuery({
    queryKey: ["exports"],
    enabled: !tokenLoading && downloadData,
    queryFn: async () => {
      const payload = {
        ...args,
      };
      const res = await AxiosSecure.post(API.export, payload);
      const data = res.data;
      if (data?.success) {
        return data?.result;
      }
    },
    gcTime: 0,
  });
  return { reports, refetchReports };
};

export default useGetReport;

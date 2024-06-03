import axios from "axios";
import { API, Settings } from "../../../api";
import handleRandomToken from "../../../utils/handleRandomToken";
import { useQuery } from "@tanstack/react-query";
import useContextState from "../../useContextState";

const useGetReport = (args) => {
  const { token, tokenLoading } = useContextState();
  const { data: reports = [], refetch: refetchReports } = useQuery({
    queryKey: ["exports"],
    enabled: !tokenLoading,
    queryFn: async () => {
      const generatedToken = handleRandomToken();
      const payload = {
        ...args,
        token: generatedToken,
        site: Settings.siteUrl,
      };
      const res = await axios.post(API.export, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = res.data;
      return data;
    },
    gcTime: 0,
  });
  return { reports, refetchReports };
};

export default useGetReport;

import axios from "axios";
import { API, Settings } from "../../../api";
import handleRandomToken from "../../../utils/handleRandomToken";
import { useQuery } from "@tanstack/react-query";
import useContextState from "../../useContextState";

const useGetExport = (args) => {
  const { token, tokenLoading } = useContextState();
  const { data: exports = [], refetch: refetchExports } = useQuery({
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
      return data
    },
  });
  return { exports, refetchExports };
};

export default useGetExport;

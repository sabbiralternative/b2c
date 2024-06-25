import axios from "axios";
import { API, Settings } from "../../../api";
import handleRandomToken from "../../../utils/handleRandomToken";
import useContextState from "../../useContextState";
import { useQuery } from "@tanstack/react-query";

const useGetClient = (searchId, setFetchClients, fetchClients) => {
  const { token, tokenLoading } = useContextState();
  const {
    data: clients = [],
    refetch: refetchClients,
    isSuccess,
  } = useQuery({
    queryKey: ["viewClient"],
    enabled: !tokenLoading && searchId?.length === 6 && fetchClients,
    queryFn: async () => {
      const generatedToken = handleRandomToken();
      const payload = {
        searchId,
        token: generatedToken,
        site: Settings.siteUrl,
      };
      const res = await axios.post(API.viewClients, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = res.data;
      if (data?.success) {
        setFetchClients(false);
        return data?.result;
      }
    },
    gcTime: 0,
  });
  return { clients, refetchClients, isSuccess };
};

export default useGetClient;

import { API } from "../../../api";
import { useQuery } from "@tanstack/react-query";
import useContextState from "../../useContextState";
import { AxiosSecure } from "../../../lib/AxiosSecure";

const useRefetchClient = (searchId) => {
  const { tokenLoading, setClientData } = useContextState();

  const { data: clients = [], refetch: refetchClient } = useQuery({
    queryKey: ["refetchClients"],
    enabled: !tokenLoading,
    queryFn: async () => {
      const payload = {
        searchId,
      };
      const res = await AxiosSecure.post(API.viewClients, payload);

      const data = res.data;
      if (data?.success) {
        setClientData(data?.result);
        return data?.result;
      }
    },
  });
  return { clients, refetchClient };
};

export default useRefetchClient;

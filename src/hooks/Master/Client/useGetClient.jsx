import axios from "axios";
import { API } from "../../../api";
import handleRandomToken from "../../../utils/handleRandomToken";
import useContextState from "../../useContextState";
import { useQuery } from "@tanstack/react-query";

const useGetClient = (searchId) => {
  const { token, tokenLoading } = useContextState();
  const { data: clients = [], refetch: refetchClients } = useQuery({
    queryKey: ["viewClient"],
    enabled: !tokenLoading,
    queryFn: async () => {
      if (!searchId) {
        return;
      }
      const generatedToken = handleRandomToken();
      const payload = {
        searchId,
        token: generatedToken,
      };
      const res = await axios.post(API.viewClients, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = res.data;
      if (data?.success) {
        return data?.result;
      }
    },
    gcTime: 0,
  });
  return { clients, refetchClients };
};

export default useGetClient;

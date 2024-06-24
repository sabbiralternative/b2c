import axios from "axios";
import { API, Settings } from "../../../api";
import handleRandomToken from "../../../utils/handleRandomToken";
import useContextState from "../../useContextState";
import { useQuery } from "@tanstack/react-query";

const useGetClientWithBalance = () => {
  const { token, tokenLoading } = useContextState();
  const { data: clientWithBalance = [], refetch: refetchClientWithBalance } =
    useQuery({
      queryKey: ["userWithCredit"],
      enabled: !tokenLoading,
      queryFn: async () => {
        const generatedToken = handleRandomToken();
        const payload = {
          searchId: "userWithCredit",
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
          return data?.result;
        }
      },
      gcTime: 0,
    });
  return { clientWithBalance, refetchClientWithBalance };
};

export default useGetClientWithBalance;

import { useQuery } from "@tanstack/react-query";
import { API } from "../api";
import useContextState from "./useContextState";
import handleRandomToken from "../utils/handleRandomToken";
import handleEncryptData from "../utils/handleEncryptData";
import { AxiosSecure } from "../lib/AxiosSecure";

const useCurrentBets = (eventId) => {
  const { tokenLoading } = useContextState();
  const { data: myBets, refetch: refetchCurrentBets } = useQuery({
    queryKey: ["currentBets"],
    enabled: !tokenLoading,
    queryFn: async () => {
      const generatedToken = handleRandomToken();
      const encryptedData = handleEncryptData({
        type: eventId,
        token: generatedToken,
      });
      const res = await AxiosSecure.post(`${API.currentBets}`, encryptedData);
      const data = res?.data?.result;

      return data;
    },
    refetchInterval: 7000,
  });
  return { myBets, refetchCurrentBets };
};

export default useCurrentBets;

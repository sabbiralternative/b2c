import { useQuery } from "@tanstack/react-query";
import useContextState from "./useContextState";
import handleRandomToken from "../utils/handleRandomToken";
import handleEncryptData from "../utils/handleEncryptData";
import axios from "axios";
import { API } from "../api";

const useMarketAnalysis = () => {
  const { token, tokenLoading } = useContextState();
  const { data: marketAnalysisData, refetch: refetchMarketAnalysis } = useQuery(
    {
      queryKey: ["marketAnalysis"],
      enabled: !tokenLoading,
      queryFn: async () => {
        const generatedToken = handleRandomToken();
        const encryptedData = handleEncryptData({ token: generatedToken });
        const res = await axios.post(API.marketAnalysis, encryptedData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = res.data;
        if (data?.success) {
          return data?.result;
        }
      },
    }
  );
  return { marketAnalysisData, refetchMarketAnalysis };
};

export default useMarketAnalysis;

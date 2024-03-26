import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import handleRandomToken from "../../utils/handleRandomToken";
import handleEncryptData from "../../utils/handleEncryptData";
import { API } from "../../api";
import useContextState from "../useContextState";

const useGetDefaultValues = (type,downLineId) => {
  const { token, tokenLoading } = useContextState();
  const { data, refetch } = useQuery({
    queryKey: ["creditRef"],
    enabled: !tokenLoading,
    queryFn: async () => {
      const generatedToken = handleRandomToken();
      const encryptedData = handleEncryptData({
        downlineId: downLineId,
        type,
        token: generatedToken,
      });
      const res = await axios.post(API.downLineEditForm, encryptedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = res.data;
      if (data?.success) {
        return data?.result;
      }
    },
  });
  return { data, refetch };
};

export default useGetDefaultValues;

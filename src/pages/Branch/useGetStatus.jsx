import { useQuery } from "@tanstack/react-query";
import { API } from "../../api";
import useContextState from "../../hooks/useContextState";
import handleRandomToken from "../../utils/handleRandomToken";
import axios from "axios";

const useGetStatus = (type, downLineId) => {
  const { token, tokenLoading } = useContextState();
  const { data:status, refetchStatus } = useQuery({
    queryKey: ["creditRef"],
    enabled: !tokenLoading,
    queryFn: async () => {
      const generatedToken = handleRandomToken();
      const payload = {
        downlineId: downLineId,
        type,
        token: generatedToken,
      };
      const res = await axios.post(API.downLineEdit, payload, {
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
  return { status,refetchStatus };
};

export default useGetStatus;

import { useQuery } from "@tanstack/react-query";
import useContextState from "./useContextState";
import { API } from "../api";

import handleEncryptData from "../utils/handleEncryptData";
import { AxiosSecure } from "../lib/AxiosSecure";

/* exposure api */
const useExposer = (eventId) => {
  const { tokenLoading } = useContextState();
  const { data: exposer = [], refetch: refetchExposure } = useQuery({
    queryKey: ["exposure"],
    enabled: !tokenLoading,
    queryFn: async () => {
      const encryptedData = handleEncryptData({});
      const res = await AxiosSecure.post(
        `${API.adminExposure}/${eventId}`,
        encryptedData,
      );
      const data = res.data;
      if (data.success) {
        return data.result;
      }
    },
  });
  return { exposer, refetchExposure };
};

export default useExposer;

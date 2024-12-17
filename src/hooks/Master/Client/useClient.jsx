import { API, Settings } from "../../../api";
import handleRandomToken from "../../../utils/handleRandomToken";
import { useQuery } from "@tanstack/react-query";
import { AxiosSecure } from "../../../lib/AxiosSecure";

export const useClient = (args) => {
  return useQuery({
    queryKey: ["clients", args],
    queryFn: async () => {
      const generatedToken = handleRandomToken();
      const payload = {
        ...args,
        token: generatedToken,
      };
      const { data } = await AxiosSecure.post(API.viewClients, payload);
      if (data?.success) {
        return data?.result;
      }
    },
    gcTime: 0,
  });
};

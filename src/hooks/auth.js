import { useQuery } from "@tanstack/react-query";
import { AxiosSecure } from "../lib/AxiosSecure";
import { API } from "../api";

export const useVerifyUser = () => {
  return useQuery({
    queryKey: ["auth"],
    queryFn: async () => {
      const { data } = await AxiosSecure.get(API.auth);
      return data;
    },
    refetchInterval: 10000,
  });
};

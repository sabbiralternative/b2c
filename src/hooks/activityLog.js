import { useQuery } from "@tanstack/react-query";
import { AxiosSecure } from "../lib/AxiosSecure";
import { API } from "../api";

export const useGetActivityLogs = (payload) => {
  return useQuery({
    queryKey: ["activityLogs", payload],
    queryFn: async () => {
      const postData = {
        ...payload,

        pagination: true,
      };
      const { data } = await AxiosSecure.post(API.activityLogs, postData);
      return data;
    },
  });
};

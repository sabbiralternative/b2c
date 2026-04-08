import { useQuery } from "@tanstack/react-query";
import { API } from "../api";
import { AxiosSecure } from "../lib/AxiosSecure";

export const useDownLineEdit = (payload) => {
  return useQuery({
    queryKey: ["downLineEdit", payload],
    queryFn: async () => {
      const postData = {
        ...payload,
      };
      const { data } = await AxiosSecure.post(`${API.downLineEdit}`, postData);
      return data;
    },
    gcTime: 0,
  });
};

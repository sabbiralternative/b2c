import { useMutation, useQuery } from "@tanstack/react-query";
import { API } from "../api";
import { AxiosSecure } from "../lib/AxiosSecure";

export const useBlogMutation = () => {
  return useMutation({
    mutationKey: ["blog"],
    mutationFn: async (payload) => {
      const { data } = await AxiosSecure.post(API.blog, payload);
      return data;
    },
    gcTime: 0,
  });
};
export const useBlogQuery = (payload) => {
  return useQuery({
    queryKey: ["blog", payload],
    queryFn: async () => {
      const { data } = await AxiosSecure.post(API.blog, payload);
      return data;
    },
    gcTime: 0,
  });
};

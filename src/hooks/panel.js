import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosSecure } from "../lib/AxiosSecure";
import { API } from "../api";

export const usePanelMutation = () => {
  return useMutation({
    mutationKey: ["panel"],
    mutationFn: async (payload) => {
      const { data } = await AxiosSecure.post(`${API.panel}`, payload);
      return data;
    },
  });
};
export const usePanelQuery = (payload) => {
  return useQuery({
    queryKey: ["panel", payload],
    queryFn: async () => {
      const { data } = await AxiosSecure.post(`${API.panel}`, payload);
      return data;
    },
  });
};

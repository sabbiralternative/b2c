import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosSecure } from "../../../lib/AxiosSecure";
import { API } from "../../../api";

export const useAddChecker = () => {
  return useMutation({
    mutationKey: ["add-checker"],
    mutationFn: async (payload) => {
      const { data } = await AxiosSecure.post(API.staff, payload);
      return data;
    },
  });
};

export const useGetAllChecker = (payload) => {
  return useQuery({
    queryKey: ["view-checker"],
    queryFn: async () => {
      const { data } = await AxiosSecure.post(API.staff, payload);
      return data;
    },
  });
};

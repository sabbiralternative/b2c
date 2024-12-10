import { useMutation } from "@tanstack/react-query";
import { AxiosSecure } from "../../../lib/AxiosSecure";
import { API } from "../../../api";

export const useAddChecker = () => {
  return useMutation({
    mutationKey: ["add-checker"],
    mutationFn: async (payload) => {
      const res = await AxiosSecure.post(API.staff, payload);
      const data = res.data;
      return data;
    },
  });
};

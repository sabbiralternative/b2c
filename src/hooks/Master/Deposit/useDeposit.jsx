import { useMutation } from "@tanstack/react-query";
import { API } from "../../../api";
import { AxiosSecure } from "../../../lib/AxiosSecure";

const useDeposit = () => {
  return useMutation({
    queryKey: ["deposit-utr"],
    mutationFn: async (payload) => {
      const { data } = await AxiosSecure.post(API.utr, payload);
      return data;
    },
  });
};

export default useDeposit;

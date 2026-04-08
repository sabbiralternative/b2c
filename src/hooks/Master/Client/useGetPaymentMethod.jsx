import useContextState from "../../useContextState";
import { useQuery } from "@tanstack/react-query";
import { API } from "../../../api";
import { AxiosSecure } from "../../../lib/AxiosSecure";

const useGetPaymentMethod = (payload) => {
  const { tokenLoading } = useContextState();
  const {
    data: paymentsMethods = [],
    refetch: refetchPaymentMethods,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["paymentsMethod", payload],
    enabled: !tokenLoading,
    queryFn: async () => {
      const res = await AxiosSecure.post(API.payments, payload);
      const data = res.data;
      if (data?.success) {
        return data?.result;
      }
    },
    gcTime: 0,
  });
  return { paymentsMethods, refetchPaymentMethods, isLoading, isSuccess };
};

export default useGetPaymentMethod;

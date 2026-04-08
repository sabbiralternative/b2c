import { useQuery } from "@tanstack/react-query";
import useContextState from "../../useContextState";
import { API } from "../../../api";
import { AxiosSecure } from "../../../lib/AxiosSecure";

const useGetCurrentPaymentStatus = (paymentId) => {
  const { tokenLoading } = useContextState();
  const { data: currentPaymentStatus } = useQuery({
    queryKey: ["currentPaymentStatus"],
    enabled: !tokenLoading,
    queryFn: async () => {
      const payload = {
        paymentId: paymentId,
        type: "ViewPaymentStatus",
      };
      const res = await AxiosSecure.post(API.payments, payload);

      const data = res.data;

      if (data?.success) {
        return data?.result;
      }
    },
    gcTime: 0,
  });
  return { currentPaymentStatus };
};

export default useGetCurrentPaymentStatus;

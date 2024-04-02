import axios from "axios";
import useContextState from "../../useContextState";
import { useQuery } from "@tanstack/react-query";
import { API } from "../../../api";
import handleRandomToken from "../../../utils/handleRandomToken";

const useGetPaymentMethod = () => {
  const { token, tokenLoading } = useContextState();
  const { data: paymentsMethods = [] } = useQuery({
    queryKey: ["paymentsMethod"],
    enabled: !tokenLoading,
    queryFn: async () => {
      const generatedToken = handleRandomToken();
      const payload = {
        type: "getActivePayments",
        token: generatedToken,
      };
      const res = await axios.post(API.payments, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = res.data;
      if (data?.success) {
        return data?.result;
      }
    },
  });
  return { paymentsMethods };
};

export default useGetPaymentMethod;

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useContextState from "./useContextState";
import { API } from "../api";
import { useEffect } from "react";
import { handleLogOut } from "../utils/handleLogOut";
// import handleRandomToken from "../utils/handleRandomToken";
// import handleEncryptData from "../utils/handleEncryptData";
/* Balance api */
const useBalance = () => {
  const { token, setGetToken, tokenLoading } = useContextState();
  const { data: balanceData, refetch: refetchBalance } = useQuery({
    queryKey: ["balance"],
    enabled: !tokenLoading,
    queryFn: async () => {
      // const generatedToken = handleRandomToken();
      // const encryptedData = handleEncryptData(generatedToken);
      const res = await axios.post(
        API.balance,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res?.data?.success === false && token) {
        /* Logout if success false  */
        handleLogOut();
        /* Get current token */
        setGetToken((prev) => !prev);
      } else if (res?.data?.success && token) {
        const data = res.data?.result;
        return data;
      }
    },
    /* Refetch after 6 second */
    refetchInterval: 6000,
    gcTime: 0,
  });

  useEffect(() => {
    if (token) {
      refetchBalance();
    }
  }, [token, refetchBalance]);

  return { balanceData, refetchBalance };
};

export default useBalance;

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import useContextState from "./useContextState";
import handleRandomToken from "../utils/handleRandomToken";
import handleEncryptData from "../utils/handleEncryptData";
import { API } from "../api";

const useDownLineData = () => {
  const { token, tokenLoading } = useContextState();
  const [searchUser, setSearchUser] = useState("");

  const { data = [], refetch: refetchDownLine } = useQuery({
    queryKey: ["downLineData"],
    enabled: !tokenLoading,
    queryFn: async () => {
      const generatedToken = handleRandomToken();
      const encryptedData = handleEncryptData({
        downlineId: "",
        searchId: searchUser,
        token: generatedToken,
      });
      const res = await axios.post(API.downLine, encryptedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = res?.data?.result;
      return data;
    },
  });

  return { data, refetchDownLine, setSearchUser, searchUser };
};

export default useDownLineData;

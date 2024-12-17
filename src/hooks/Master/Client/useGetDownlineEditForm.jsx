import axios from "axios";
import useContextState from "../../useContextState";
import { useQuery } from "@tanstack/react-query";
import { API, Settings } from "../../../api";
import handleRandomToken from "../../../utils/handleRandomToken";

const useGetDownlineEditForm = (type, downlineId) => {
  const { token, tokenLoading } = useContextState();
  const { data = {}, refetch } = useQuery({
    queryKey: ["downlone-edit-form"],
    enabled: !tokenLoading,
    queryFn: async () => {
      const generatedToken = handleRandomToken();
      const payload = {
        downlineId,
        type,
        token: generatedToken,
      };
      const res = await axios.post(API.downineEditForm, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res);
      const data = res.data;
      console.log(data);
      if (data?.success) {
        return data?.result;
      }
    },
    gcTime: 0,
  });
  return { data, refetch };
};

export default useGetDownlineEditForm;

import useContextState from "../../useContextState";
import { useQuery } from "@tanstack/react-query";
import { API } from "../../../api";
import { AxiosSecure } from "../../../lib/AxiosSecure";

const useGetDownlineEditForm = (payload) => {
  const { tokenLoading } = useContextState();
  const { data = {}, refetch } = useQuery({
    queryKey: ["downlone-edit-form"],
    enabled: !tokenLoading,
    queryFn: async () => {
      const res = await AxiosSecure.post(API.downineEditForm, payload);
      const data = res.data;
      if (data?.success) {
        return data?.result;
      }
    },
    gcTime: 0,
  });
  return { data, refetch };
};

export default useGetDownlineEditForm;

import { useQuery } from "@tanstack/react-query";
import useContextState from "../../useContextState";
import { API } from "../../../api";
import { AdminRole } from "../../../constant/constant";
import { AxiosSecure } from "../../../lib/AxiosSecure";

const useGetAllBranch = (postData) => {
  const { tokenLoading, adminRole } = useContextState();
  const { data: branches = [], refetch: refetchAllBranch } = useQuery({
    queryKey: ["branch", postData],
    enabled:
      !tokenLoading &&
      (adminRole === AdminRole.hyper_master ||
        adminRole === AdminRole.admin_staff),
    queryFn: async () => {
      const payload = { ...postData };

      const res = await AxiosSecure.post(API.viewBranches, payload);

      const data = res.data;

      if (data?.success) {
        return data?.result;
      }
    },
  });
  return { branches, refetchAllBranch };
};

export default useGetAllBranch;

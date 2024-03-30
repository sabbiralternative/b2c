import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useContextState from "../../useContextState";
import { API } from "../../../api";


const useGetAllBranch = () => {
  const { token, tokenLoading } = useContextState();
  const { data: branches = [],refetch:refetchAllBranch} = useQuery({
    queryKey: ["branch"],
    enabled: !tokenLoading,
    queryFn: async () => {
      const res = await axios.post(
        API.viewBranches,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = res.data;
      if (data?.success) {
        return data?.result;
      }
    },
  });
  return { branches,refetchAllBranch };
};

export default useGetAllBranch;

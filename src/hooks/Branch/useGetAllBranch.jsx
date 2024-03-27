import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API } from "../../api";
import useContextState from "../useContextState";

const useGetAllBranch = () => {
  const { token, tokenLoading } = useContextState();
  const { data: branches } = useQuery({
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
      console.log(data);
      return data;
    },
  });
  return { branches };
};

export default useGetAllBranch;

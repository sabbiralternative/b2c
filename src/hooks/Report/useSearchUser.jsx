import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../../api";
import handleRandomToken from "../../utils/handleRandomToken";
import handleEncryptData from "../../utils/handleEncryptData";
import useContextState from "../useContextState";

const useSearchUser = () => {
  const [searchUser, setSearchUser] = useState("");
  const { token } = useContextState();
  const [users, setUsers] = useState([]);
  const [errSearchId, setErrSearchId] = useState("");
  const [showSearchId, setShowSearchId] = useState(false);

  useEffect(() => {
    const handleSearchUser = async () => {
      if (searchUser?.length > 2) {
        const generatedToken = handleRandomToken();
        const encryptedData = handleEncryptData({
          type: searchUser,
          token: generatedToken,
        });
        const res = await axios.post(API.searchUser, encryptedData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = res.data;
        if (data?.success) {
          setUsers(data);

          setShowSearchId(true);
        } else {
          setErrSearchId(
            "No elements found Consider changing the search query"
          );
        }
      }
    };
    handleSearchUser();
  }, [searchUser, token]);

  return {
    users,
    setUsers,
    errSearchId,
    setErrSearchId,
    showSearchId,
    setShowSearchId,
    searchUser,
    setSearchUser,
  };
};

export default useSearchUser;

export const handleRefetchDownLine = (downLine) => {
    if (downLine.hasDownline) {
      //   setDownLineId(downLine?.username);
      //   setSearchId("");
      window.open(`/admin/user/${downLine?.username}`, "_blank");
    }
  };
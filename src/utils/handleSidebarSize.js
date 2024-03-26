export const handleSidebarSize = (sidebarSize, setSidebarSize) => {
  if (sidebarSize === "lg") {
    setSidebarSize("sm");
  } else {
    setSidebarSize("lg");
  }
};

import { createContext, useEffect, useState } from "react";
import { API, Settings } from "../api";
export const StateContext = createContext(null);

const StateProvider = ({ children }) => {
  /* Global state this states we are using in full project */
  const [token, setToken] = useState("");
  const [adminName, setAdminName] = useState("");
  const [adminRole, setAdminRole] = useState("");
  const [getToken, setGetToken] = useState(false);
  const [tokenLoading, setTokenLoading] = useState(true);
  const [logo, setLogo] = useState("");
  const [icon, setIcon] = useState("");
  const [showSidebar,setShowSidebar] = useState(false)
  /* Get token from locale storage */
  useEffect(() => {
    const getToken = localStorage.getItem("adminToken");
    const adminName = localStorage.getItem("adminName");
    const adminRole = localStorage.getItem("adminRole");
    if (getToken) {
      setToken(getToken);
      setAdminName(adminName);
      setAdminRole(adminRole);
      setTokenLoading(false);
    }
  }, [getToken, token]);

  useEffect(() => {
    /* Dynamically get  footer logo  */
    const icon = `${API.assets}/${Settings.siteUrl}/nav-sprite.svg`;
    setIcon(icon);

    /* Dynamically append  theme css  */
    // const link = document.createElement("link");
    // link.rel = "stylesheet";
    // link.type = "text/css";
    // link.href = `${API.assets}/${Settings.siteUrl}/theme.css`;
    // document.head.appendChild(link);
    /*Dynamically append Logo */
    const logo = `${API.assets}/${Settings.siteUrl}/logo.png`;
    setLogo(logo);
    /* Dynamically append  favicon  */
    const FavIconLink = document.createElement("link");
    FavIconLink.rel = "icon";
    FavIconLink.type = "image/png";
    FavIconLink.href = `${API.assets}/${Settings.siteUrl}/favicon.png`;
    document.head.appendChild(FavIconLink);
    /* Site title */
    document.title = Settings.siteTitle;
  }, []);
  const stateInfo = {
    token,
    setToken,
    getToken,
    setGetToken,
    tokenLoading,
    setTokenLoading,
    logo,
    setLogo,
    icon,
    setIcon,
    adminName,
    setAdminName,
    adminRole,
    setAdminRole,
    showSidebar,setShowSidebar
  };
  return (
    <StateContext.Provider value={stateInfo}>{children}</StateContext.Provider>
  );
};

export default StateProvider;

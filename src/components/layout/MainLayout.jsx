import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../ui/Navbar/Navbar";
// import Sidebar from "../ui/Sidebar/Sidebar";
// import Footer from "../ui/Footer/Footer";
import { handleLogOut } from "../../utils/handleLogOut";
import { Settings } from "../../api";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import useContextState from "../../hooks/useContextState";
import disableDevtool from "disable-devtool";
import Sidebar from "../ui/Sidebar/Sidebar";
import NavListItem from "../ui/Navbar/NavListItem";
import Footer from "../ui/Footer/Footer";

const MainLayout = () => {
  const { tokenLoading, showSidebar } = useContextState();
  const navigate = useNavigate();

  /* TODO */
  const token = localStorage.getItem("adminToken");
  const disabledDevtool = Settings.disabledDevtool;
  /*if Token expire logout user */
  useEffect(() => {
    let isTokenExpired;
    if (token) {
      const decodedToken = jwtDecode(token);
      const expirationTime = decodedToken.exp;
      isTokenExpired = expirationTime < Date.now() / 1000;
      if (isTokenExpired) {
        handleLogOut();
        navigate("/login");
      }
      /* if forceLogin true in notice.json and token not available then logout */
    } else if (Settings.forceLogin) {
      if (!token) {
        handleLogOut();
        navigate("/login");
      }
    }
  }, [navigate, token, tokenLoading]);

  /* Disabled devtool based on settings */
  useEffect(() => {
    if (disabledDevtool) {
      disableDevtool({
        ondevtoolopen: (type) => {
          const info = "devtool opened!; type =" + type;
          if (info) {
            handleLogOut();
            navigate("/login");
          }
        },
      });
    }
  }, [navigate, disabledDevtool]);
  return (
    <div className="layout-wrapper layout-navbar-full layout-horizontal layout-without-menu">
      <div className="layout-container">
        <Navbar />

        <div className="layout-page">
          <div className="content-wrapper">
            {showSidebar ? <Sidebar /> : <NavListItem />}

            <Outlet />
            <Footer />
          </div>

          <div className="content-backdrop fade"></div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;

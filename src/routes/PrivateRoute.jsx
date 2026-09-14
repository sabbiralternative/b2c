import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { handleLogOut } from "../utils/handleLogOut";
import { useLocation, useNavigate } from "react-router-dom";
import { Settings } from "../api";
import { roleBasedRoute } from "./roleBasedRoute";
import { usePermission } from "../hooks/use-permission";

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const { permissions } = usePermission();
  const token = localStorage.getItem("adminToken");
  const navigate = useNavigate();

  useEffect(() => {
    // No token
    if (!token) {
      if (Settings.forceLogin) {
        handleLogOut();
        navigate("/login", { replace: true });
      }

      return;
    }

    try {
      const decodedToken = jwtDecode(token);
      const expirationTime = decodedToken.exp;

      // Expired token
      if (!expirationTime || expirationTime < Date.now() / 1000) {
        handleLogOut();
        navigate("/login", { replace: true });
        return;
      }

      // Permission check
      const routes = roleBasedRoute();

      const findUserRoute = routes.find(
        (route) => route.href === location.pathname,
      );

      if (
        findUserRoute &&
        permissions?.length > 0 &&
        !permissions.includes(findUserRoute.permission)
      ) {
        navigate("/", { replace: true });
        return;
      }
    } catch (error) {
      console.error("Invalid token:", error);

      handleLogOut();
      navigate("/login", { replace: true });
    }
  }, [token, navigate, location.pathname, permissions]);

  return children;
};

export default PrivateRoute;

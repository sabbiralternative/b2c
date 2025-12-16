import { jwtDecode } from "jwt-decode";
import { useMemo } from "react";
import useContextState from "./useContextState";

export const usePermission = () => {
  const { token } = useContextState();

  const permissions = useMemo(() => {
    if (!token) return [];

    try {
      const decoded = jwtDecode(token);

      return Array.isArray(decoded?.permissions) ? decoded.permissions : [];
    } catch (err) {
      console.error("Invalid JWT:", err);
      return [];
    }
  }, [token]);

  return { permissions };
};

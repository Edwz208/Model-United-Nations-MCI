import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth.js";

const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();
  console.log("require mounts")
  return auth?.roles?.find((role) => allowedRoles?.includes(role)) ? (
    <Outlet />
  ) : auth?.country ? (
    <Navigate to="/Unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/Login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
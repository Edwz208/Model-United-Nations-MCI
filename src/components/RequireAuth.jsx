import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth.js";

const RequireAuth = ({ allowedRoles }) => {
  const { auth, isLogged } = useAuth();
  const location = useLocation();
    console.log(isLogged, "RequiAuth")
    console.log(auth?.country)
  return ((auth?.roles?.find((role) => allowedRoles?.includes(role)) && isLogged) ? (
    <Outlet />
  ) : 
  (auth?.country && isLogged) ? (
    <Navigate to="/Unauthorized" state={{ from: location }} replace />
  ) : 
(
    <Navigate to="/Login" state={{ from: location }} replace />
  )
  
)
};

export default RequireAuth;

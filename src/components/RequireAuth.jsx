import { useLocation, Navigate, Outlet } from "react-router-dom";
import useStore from '../store/store.js'

const RequireAuth = ({ allowedRoles }) => {
  const roles = useStore((state)=>state.roles)
  const isLogged = useStore((state)=>state.isLogged)
  const country = useStore((state)=>state.country)
  const location = useLocation();
  return ((roles?.find((role) => allowedRoles?.includes(role)) && isLogged) ? (
    <Outlet />
  ) : 
  (roles?.includes('4015')) ? (
    <Navigate to ="/Admin/Dashboard" state={{from: location}} replace/>
  )
  :
  (country && isLogged) ? (
    <Navigate to="/Unauthorized" state={{ from: location }} replace />
  ) : 
(
    <Navigate to="/Login" state={{ from: location }} replace />
  )
  
)
};

export default RequireAuth;

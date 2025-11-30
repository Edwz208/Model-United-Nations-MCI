import { useLocation, Navigate, Outlet } from "react-router-dom";
import useStore from '../store/store.js'

const RequireAuth = ({ allowedRole }) => {
  console.log(allowedRole)
  const role = useStore((state)=>state.role)
  const isLogged = useStore((state)=>state.isLogged)
  const country = useStore((state)=>state.country)
  const location = useLocation();
  return ((role == allowedRoles && isLogged) ? (
    <Outlet />
  ) : 
  (role == 'admin') ? (
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

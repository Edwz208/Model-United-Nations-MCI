import { useLocation, Navigate, Outlet } from "react-router-dom";
import useStore from '../../contexts/store.js'

const AuthRedirect = ({ allowedRole }) => {

  const role = useStore((state)=>state.role)
  const isLogged = useStore((state)=>state.isLogged)
  const location = useLocation()

  return ((role == allowedRole && isLogged) ? (
    <Outlet /> // outlet wrappers dont affect height distribution
  ) : 
  (role == 'admin') ? (
    <Navigate to ="/Admin/Dashboard" state={{from: location}} replace/> // passes the information about where we came from while replacing the location in the history stack
  )
  :
  (isLogged) ? (
    <Navigate to="/Unauthorized" state={{ from: location }} replace />
  ) : 
(
    <Navigate to="/Login" state={{ from: location }} replace />
  )
  
)
};

export default AuthRedirect;

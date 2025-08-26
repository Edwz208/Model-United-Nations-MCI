import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import useStore from '../store/store.js'
import useRefreshToken from '../hooks/useRefreshToken.js'

const PersistentLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const isLogged = useStore((state)=>state.isLogged)
  const country = useStore((state)=>state.country)
  const accessToken = useStore((state)=>state.accessToken)
  const refresh = useRefreshToken();
  useEffect(() => {
    if (isLogged && !country && !accessToken) {
      const verifyRefreshToken = async () => {
        try {
          console.log("refrseh token activated")
          await refresh();
        } catch (err) {
          console.log("Login error:", err);
          if (!err?.response) {
           if (err.response?.status === 401) {
            console.log(err.response?.data?.detail);
          }
        }
        } finally {
          setIsLoading(false);
        }
      };
      verifyRefreshToken();
    }
    else{
      setIsLoading(false)
    }
  }, []);
  return isLoading ? <p>Loading...</p> : <Outlet />;

};

export default PersistentLogin;

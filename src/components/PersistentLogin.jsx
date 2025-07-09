import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { Outlet } from "react-router-dom";
import useRefreshToken from "../hooks/useRefreshToken";

const PersistentLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { auth, setLogged, isLogged } = useAuth();
  const refresh = useRefreshToken();
  useEffect(() => {
    if (!isLogged && !auth?.country) {
      const verifyRefreshToken = async () => {
        try {
          if (!auth?.accessToken) {
            await refresh();
            setLogged(true);
          }
        } catch (err) {
          console.log("Login error:", err);
          setLogged(false);
          if (!err?.response) {
          } else if (err.response?.status === 401) {
            console.log(err.response?.data?.detail);
          } else {
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

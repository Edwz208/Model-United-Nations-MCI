import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { Outlet } from "react-router-dom";
import useRefreshToken from "../hooks/useRefreshToken";

const PersistentLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { auth } = useAuth();
  const refresh = useRefreshToken();
  console.log('persistent login activated')
  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        if (!auth?.accessToken) {
          await refresh();
        }
      } catch (err) {
        console.error("Token refresh failed", err);
      } finally {
        setIsLoading(false);
      }
    };

    verifyRefreshToken();
  }, []);
  // console.log('loaded')
  return isLoading ? <p>Loading...</p> : <Outlet />;
};

export default PersistentLogin;

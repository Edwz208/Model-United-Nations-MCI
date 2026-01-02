import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import useStore from '../../contexts/store.js'
import useRefreshToken from '../../hooks/useRefreshToken.js'

const PersistentLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const isLogged = useStore((state)=> state.isLogged)
  const id = useStore((state)=> state.countryId)
  const accessToken = useStore((state)=> state.accessToken)
  const refresh = useRefreshToken()
  
  useEffect(() => {
    if (isLogged && !id && !accessToken) {
      const verifyRefreshToken = async () => {
        try {
          await refresh()
        } 
        catch (err) {
          console.log("Login error:", err)
        }
        finally {
          setIsLoading(false);
        }
      }
      verifyRefreshToken()
    }
    else{
      setIsLoading(false)
    }
  }, [])

  return isLoading ? <p>Loading...</p> : <Outlet />

};

export default PersistentLogin;

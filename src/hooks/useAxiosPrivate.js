import axiosPrivate from '../api/axiosPrivate.js'
import useRefreshToken from './useRefreshToken.js'
import { useEffect, useRef } from 'react'
import useAuth from './useAuth.js'

function useAxiosPrivate(){

    const { auth, setAuth } = useAuth();
    const refresh = useRefreshToken();
    const accessTokenRef = useRef(auth.accessToken);

    useEffect(() => {
        accessTokenRef.current = auth.accessToken;
    }, [auth.accessToken])

    useEffect(()=>{
        const requestIntercept = axiosPrivate.interceptors.request.use(
            config=>{
                if (!config.headers["Authorization"]){
                    config.headers["Authorization"] = `Bearer ${accessTokenRef.current}`
                }
            return config;
            },
            error =>{
                console.log("config error")
                return Promise.reject(error)
            },
        )

        const responseIntercept = axiosPrivate.interceptors.response.use(
            response =>{
                return response
            },

            async error=>{
                const prevRequest = error?.config;
                if (error?.response?.status === 401 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const refreshDict = await refresh();
                    const newAccessToken = refreshDict.accessToken
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    setAuth((prev)=>(
                        {...prev, "accessToken": newAccessToken}
                    ))
                    return axiosPrivate(prevRequest);
                }
                return Promise.reject(error);
            }
        )

        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        }
    }
    ,[]);
    return axiosPrivate
}

export default useAxiosPrivate;
import axiosPrivate from '../api/axios.js'
import useRefreshToken from './useRefreshToken.js'
import { useEffect } from 'react'
import useAuth from './useAuth.js'

function useAccessToken(){
    const { auth, setAuth} = useAuth();
    const refresh = useRefreshToken();

    useEffect(()=>{
        axiosPrivate.interceptors.request.use(
            config=>{
                if (!config.headers["Authorization"]){
                    config.headers["Authorization"] = `Bearer ${auth.accessToken}`
                }
            },
            error =>{
                return Promise.reject(error)
            }
        )

        axiosPrivate.interceptors.response.use(
            response =>{
                return response
            },
            async error=>{
                const prevRequest = error?.config;
                if (error?.response?.status === 401 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
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
    ,[auth]);
}

export default useAccessToken;
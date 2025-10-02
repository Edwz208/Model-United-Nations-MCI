import axiosPrivate from '../api/axiosPrivate.js'
import useRefreshToken from './useRefreshToken.js'
import { useEffect} from 'react'
import useStore from '../store/store.js'

function useAxiosPrivate(){
 // FOR hooks the useEffect is based on the time of mount of the component calling it 
    const refresh = useRefreshToken();
    const accessToken = useStore((state)=>state.accessToken)
    const controller = new AbortController();
    useEffect(()=>{
        const requestIntercept = axiosPrivate.interceptors.request.use(
            config=>{
                config.signal = controller.signal
                if (!config.headers["Authorization"]){
                    config.headers["Authorization"] = `Bearer ${accessToken}`
                }
            return config;
            },
            error =>{
                console.log("config error")
                return Promise.reject(error) // passes on error to its caller
            },
        )

        const responseIntercept = axiosPrivate.interceptors.response.use(
            response =>{
                return response
            },

            async error=>{
                const prevRequest = error?.config;
                if (error?.response?.status === 401 && !prevRequest?.sent) {
                    try{
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return axiosPrivate(prevRequest);
                }
                catch (err){
                    setLogged(false)
                    return Promise.reject(err)
                }
                }
                return Promise.reject(error)
            }
        )

        return () => {
            controller.abort()
            axiosPrivate.interceptors.request.eject(requestIntercept); // runs as if mounted on component this custom hook was called in
            axiosPrivate.interceptors.response.eject(responseIntercept);
        }
    }
    ,[]);
    return axiosPrivate
}

export default useAxiosPrivate;
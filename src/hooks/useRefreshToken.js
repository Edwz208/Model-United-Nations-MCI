import useAuth from './useAuth.js'
import axios from '../api/axios.js'

const useRefreshToken = () => {
  const { setAuth } = useAuth();
  const refresh = async () =>{
    const response = await axios.get('/refresh')
    setAuth((prev)=>{
      return {...prev, accessToken: response?.data?.accessToken}
    })
    return response?.data?.accessToken;
  }
  return refresh;

}

export default useRefreshToken
import useAuth from './useAuth.js'
import axios from '../api/axios.js'
import useRes from './useResolutions.js'

const useRefreshToken = () => {
  const { setAuth } = useAuth();
  const { setResolutions, setCountries} = useRes();
  const refresh = async () =>{
    const response = await axios.get('/refresh')
    setAuth((prev)=>{
      return {...prev, accessToken: response?.data?.accessToken, country: response?.data?.country, roles: response?.data?.role}
    })
    setResolutions(response?.data?.resolutions)
    setCountries(response?.data?.countryNames)
  }

  return refresh;
}


export default useRefreshToken
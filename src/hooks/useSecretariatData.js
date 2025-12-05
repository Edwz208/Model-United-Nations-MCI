import useAxiosPrivate from './useAxiosPrivate'
import { useNavigate, useLocation } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

function useSecretariatData(){
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();
    return useQuery({
        queryKey: ['secretariat'],
        queryFn: async () => {
            try{
              const response = await axiosPrivate.get('/get-secretariat')
                return response?.data;
              }
            catch (err){
                console.log(err)
                navigate('/Login', {state: {from: location}, replace: true})
            }
        }
    })
}

export default useSecretariatData;
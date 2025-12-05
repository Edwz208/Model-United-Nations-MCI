import useAxiosPrivate from './useAxiosPrivate'
import { useNavigate, useLocation } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

function useResData(){
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();
    return useQuery({
        queryKey: ['amendments'],
        queryFn: async () => {
            try{
              const response = await axiosPrivate.get('/get-resolutions-general')
                return response?.data;
              }
            catch (err){
                console.log(err)
                navigate('/Login', {state: {from: location}, replace: true})
            }
        }
    })
}

export default useResData;
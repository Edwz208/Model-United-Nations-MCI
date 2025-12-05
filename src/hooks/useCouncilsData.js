import useAxiosPrivate from './useAxiosPrivate'
import { useNavigate, useLocation } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

function useCouncilsData(){
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();
    return useQuery({
        queryKey: ['countries'],
        staleTime: 2*60*1000,
        refetchOnMount: true,
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
        
        queryFn: async () => {
            try{
                const response = await axiosPrivate.get('/get-councils-list')
                return response?.data;
              }
            catch (err){
                console.log(err)
                navigate('/Login', {state: {from: location}, replace: true})
            }
        }
    })
}

export default useCouncilsData;
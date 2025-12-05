import useAxiosPrivate from './useAxiosPrivate'
import { useNavigate, useLocation } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

function useCountriesData(){
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
                const response = await axiosPrivate.get('/get-countries') //useQuery is asynchronous, but render is synchronous
                //When you write an async function, JavaScript pauses only inside that function at the await.
                //React components themselves cannot be async in the render function. The function that React calls to render a component runs synchronously.
                return response?.data;
              }
            catch (err){
                console.log(err)
                navigate('/Login', {state: {from: location}, replace: true})
            }
        }
    })
}

export default useCountriesData;
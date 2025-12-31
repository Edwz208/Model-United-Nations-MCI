import useAxiosPrivate from './useAxiosPrivate'
import { useNavigate, useLocation } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
//useQuery is asynchronous, but render is synchronous
//When you write an async function, JavaScript pauses only inside that function at the await. React components themselves cannot be async in the render function. The function that React calls to render a component runs synchronously.
export function useGetAllCountries(){
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();
    return useQuery({
        queryKey: ['countries-all'], 
        staleTime: 2*60*1000,
        refetchOnMount: true,
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
        
        queryFn: async () => {
            try{
                const response = await axiosPrivate.get('/get-countries') 
                return response?.data;
              }
            catch (err){
                console.log(err)
                navigate('/Login', {state: {from: location}, replace: true})
            }
        }
    })
}

export function useGetCountriesInCouncil(council_id){
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();
    return useQuery({
        queryKey: ['countries-council', council_id],
        queryFn: async () => {
            try{
              const response = await axiosPrivate.get(`/countries-council/${council_id}`)
              console.log(response?.data)
                return response?.data;
              }
            catch (err){
                console.log(err)
                navigate('/Login', {state: {from: location}, replace: true})
            }
        }
    })
}

export function useCountry(country_id){
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();
    return useQuery({
        queryKey: ['country', country_id],
        queryFn: async () => {
            try{
              const response = await axiosPrivate.get(`/select-country/${country_id}`)
              console.log(response?.data)
                return response?.data;
              }
            catch (err){
                console.log(err)
                navigate('/Login', {state: {from: location}, replace: true})
            }
        }
    })
}

export const useCreateCountry = (onSuccessCallback, onErrorCallback) => {
  const axiosPrivate = useAxiosPrivate()
  const postResolution = async (formData) => {
  const response = await axiosPrivate.post(
  "/add-single-country", formData)
  return response?.data
  }
  const queryClient = useQueryClient()
  return useMutation({
    queryFn: postResolution,
    onSuccess: (data)=>{  
        queryClient.invalidateQueries({queryKey: ['countries-all']})
        queryClient.invalidateQueries({queryKey: ['countries-council',data?.country?.council_id]})
        queryClient.invalidateQueries({queryKey: ['country',data?.country?.country_id]})
      if (onSuccessCallback && typeof onSuccessCallback === 'function') onSuccessCallback()
    },
    onError: (error)=>{
      if (onErrorCallback && typeof onErrorCallback === 'function') onErrorCallback(error)
    }
  }
)
}

export function usePatchCountry(onSuccessCallback, onErrorCallback){
    const axiosPrivate = useAxiosPrivate()
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (formData) => {
            const response = await axiosPrivate.patch(`/update-single-country/${formData.country_id}`, formData)
            return response?.data
        },
      onSuccess: (data)=>{  
        queryClient.invalidateQueries({queryKey: ['countries-all']})
        queryClient.invalidateQueries({queryKey: ['countries-council',data?.country?.council_id]})
        queryClient.invalidateQueries({queryKey: ['country',data?.country?.country_id]})
        if (onSuccessCallback && typeof onSuccessCallback === 'function') onSuccessCallback()
      },
      onError: (error)=>{
        if (onErrorCallback && typeof onErrorCallback === 'function') onErrorCallback(error)
      }
    })

}

export function useDeleteCountry(onSuccessCallback, onErrorCallback){
    const axiosPrivate = useAxiosPrivate()
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (country_id) => {
            const response = await axiosPrivate.delete(`/delete-country/${country_id}`) // delete no body unless use in config {}
            return response?.data;
        },
      onSuccess: (data)=>{  
        queryClient.invalidateQueries({queryKey: ['countries-all']})
        queryClient.invalidateQueries({queryKey: ['countries-council',data?.country?.council_id]})
        queryClient.invalidateQueries({queryKey: ['country',data?.country?.country_id]}) // must return councils of country
        if (onSuccessCallback && typeof onSuccessCallback === 'function') onSuccessCallback()
      },
      onError: (error)=>{
        if (onErrorCallback && typeof onErrorCallback === 'function') onErrorCallback(error)
      }
    })

}
import useAxiosPrivate from './useAxiosPrivate'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
//useQuery is asynchronous, but render is synchronous
//When you write an async function, JavaScript pauses only inside that function at the await. React components themselves cannot be async in the render function. The function that React calls to render a component runs synchronously.
export function useGetAllCountries(){
    const axiosPrivate = useAxiosPrivate();
    return useQuery({
        queryKey: ['countries-all'], 
        staleTime: 2*60*1000,
        refetchOnMount: true,
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
        
        queryFn: async () => {
                const response = await axiosPrivate.get('/get-countries') 
                return response?.data;
        }
    })
}

export function useCountry(countryId){
    const axiosPrivate = useAxiosPrivate();
    return useQuery({
        queryKey: ['country', countryId],
        queryFn: async () => {
              const response = await axiosPrivate.get(`/select-country/${countryId}`)
              console.log(response?.data)
                return response?.data;
        }
    })
}

export const useCreateCountry = (onSuccessCallback, onErrorCallback) => {
  const axiosPrivate = useAxiosPrivate()
  const postResolution = async (formData) => {
    console.log(formData)
  const response = await axiosPrivate.post(
  "/add-single-country", formData)
  return response?.data
  }
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: postResolution,
    onSuccess: (data)=>{  
        queryClient.invalidateQueries({queryKey: ['countries-all']})
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
        queryClient.invalidateQueries({queryKey: ['country',data?.country?.country_id]})
        if (onSuccessCallback && typeof onSuccessCallback === 'function') onSuccessCallback()
      },
      onError: (error)=>{
        if (onErrorCallback && typeof onErrorCallback === 'function') onErrorCallback(error)
      }
    })

}

export function useDeleteCountries(onSuccessCallback, onErrorCallback){
    const axiosPrivate = useAxiosPrivate()
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (countries) => {
            const response = await axiosPrivate.delete(`/select-country`, {data: { "countries": countries }})
            return response?.data;
        },
      onSuccess: (data)=>{  
        queryClient.invalidateQueries({queryKey: ['countries-all']})
        queryClient.invalidateQueries({queryKey: ['country',data?.country?.country_id]}) // must return councils of country
        if (onSuccessCallback && typeof onSuccessCallback === 'function') onSuccessCallback()
      },
      onError: (error)=>{
        if (onErrorCallback && typeof onErrorCallback === 'function') onErrorCallback(error)
      }
    })

}

export function useAddSpeakerPoints(onSuccessCallback, onErrorCallback){
    const axiosPrivate = useAxiosPrivate()
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({country, speakerPoints}) => { // receives only one object: variables, must destructure
          console.log(country, speakerPoints)
            const response = await axiosPrivate.post(`/update-speaker-points`, { "country": country, "speaker_points": speakerPoints })
            return response?.data;
        },
      onSuccess: (data)=>{  
        queryClient.invalidateQueries({queryKey: ['countries-all']})
        queryClient.invalidateQueries({queryKey: ['country',data?.country?.country_id]}) // must return councils of country
        if (onSuccessCallback && typeof onSuccessCallback === 'function') onSuccessCallback()
      },
      onError: (error)=>{
        if (onErrorCallback && typeof onErrorCallback === 'function') onErrorCallback(error)
      }
    })

}
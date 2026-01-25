import useAxiosPrivate from './useAxiosPrivate'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
// used setQueryData here because nothing relies on it
export function useGetSecretariat(){ // questionable error handling
    const axiosPrivate = useAxiosPrivate();
    return useQuery({
        queryKey: ['secretariat'],
        queryFn: async () => {
              const response = await axiosPrivate.get('/get-secretariat')
                return response?.data;
              }
        }
    )

}

export function usePostSecretariat(onSuccessCallback, onErrorCallback){ // function params are optional byu defualt but if u call will error
    const axiosPrivate = useAxiosPrivate()
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (formData) => {
            const response = await axiosPrivate.post('/set-exec', formData)
            return response?.data;
        },
      onSuccess: ()=>{  
        queryClient.invalidateQueries(['secretariat'])
        if (onSuccessCallback && typeof onSuccessCallback === 'function') onSuccessCallback()
      },
      onError: (error)=>{
        if (onErrorCallback && typeof onErrorCallback === 'function') onErrorCallback(error)
      }
    })

}

export function usePatchSecretariat(onSuccessCallback, onErrorCallback){
    const axiosPrivate = useAxiosPrivate()
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (formData) => {
          console.log(formData)
            const response = await axiosPrivate.patch(`/update-secretariat/${formData.secretariat_id}`, formData)
            return response?.data;
        },
      onSuccess: ()=>{  
        queryClient.setQueryData(['secretariat'])
        if (onSuccessCallback && typeof onSuccessCallback === 'function') onSuccessCallback()
      },
      onError: (error)=>{
        if (onErrorCallback && typeof onErrorCallback === 'function') onErrorCallback(error)
      }
    })

}

export function useDeleteSecretariat(onSuccessCallback, onErrorCallback){
    const axiosPrivate = useAxiosPrivate()
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (secretariat_id) => {
            const response = await axiosPrivate.delete(`/delete-secretariat/${secretariat_id}`) // delete no body unless use in config {}
            return response?.data;
        },
      onSuccess: ()=>{  
        queryClient.invalidateQueries(['secretariat'])
        if (onSuccessCallback && typeof onSuccessCallback === 'function') onSuccessCallback()
      },
      onError: (error)=>{
        if (onErrorCallback && typeof onErrorCallback === 'function') onErrorCallback(error)
      }
    })

}
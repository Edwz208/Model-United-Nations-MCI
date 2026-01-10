import useAxiosPrivate from './useAxiosPrivate'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
// used invalidateQueries because multiple things rely on it
export function useGetAllResolutionsGeneral(){
    const axiosPrivate = useAxiosPrivate();
    return useQuery({
        queryKey: ['resolutions-all-general'],
        queryFn: async () => {
              const response = await axiosPrivate.get('/get-all-resolutions-general-info')
                return response?.data;
        }
    })
}

export function useResolution(resolution_id){
    const axiosPrivate = useAxiosPrivate();
    return useQuery({
        queryKey: ['specific-resolution', resolution_id],
        queryFn: async () => {
              const response = await axiosPrivate.get(`/get-resolution/${resolution_id}`)
                return response?.data;
        }
    })
}

export const useCreateResolution = (onSuccessCallback, onErrorCallback) => {
  const axiosPrivate = useAxiosPrivate()
  const postResolution = async (formData) => {
  const response = await axiosPrivate.post(
  "/upload-resolution", formData)
  return response?.data
  }
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: postResolution,
    onSuccess: (data)=>{  
        queryClient.invalidateQueries({queryKey: ['resolutions-general']})
      if (onSuccessCallback && typeof onSuccessCallback === 'function') onSuccessCallback()
    },
    onError: (error)=>{
      if (onErrorCallback && typeof onErrorCallback === 'function') onErrorCallback(error)
    }
  }
)
}

export function usePatchResolution(onSuccessCallback, onErrorCallback){
    const axiosPrivate = useAxiosPrivate()
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (formData) => {
            const response = await axiosPrivate.patch(`/update-resolution/${formData.resolution_id}`, formData)
            return response?.data
        },
      onSuccess: (data)=>{  
        queryClient.invalidateQueries({queryKey: ['resolutions-general']})
        queryClient.invalidateQueries({queryKey: ['specific-resolution',data?.resolution?.id]})
        if (onSuccessCallback && typeof onSuccessCallback === 'function') onSuccessCallback()
      },
      onError: (error)=>{
        if (onErrorCallback && typeof onErrorCallback === 'function') onErrorCallback(error)
      }
    })

}

export function useDeleteResolutions(onSuccessCallback, onErrorCallback){
    const axiosPrivate = useAxiosPrivate()
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (resolutions) => {
            const response = await axiosPrivate.delete(`/delete-resolutions`, {data: { "resolution_ids": resolutions }}) // delete no body unless use in config {}
            return response?.data;
        },
      onSuccess: (data)=>{  
        queryClient.invalidateQueries({queryKey: ['resolutions-general']})
        queryClient.invalidateQueries({queryKey: ['specific-resolution',data?.resolution?.id]})
        if (onSuccessCallback && typeof onSuccessCallback === 'function') onSuccessCallback()
      },
      onError: (error)=>{
        if (onErrorCallback && typeof onErrorCallback === 'function') onErrorCallback(error)
      }
    })

}
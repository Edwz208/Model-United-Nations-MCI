import useAxiosPrivate from './useAxiosPrivate'
import { useNavigate, useLocation } from 'react-router-dom'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
// used invalidateQueries because multiple things rely on it
export function useGetAllResolutionsGeneral(){
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();
    return useQuery({
        queryKey: ['resolutions-all-general'],
        queryFn: async () => {
            try{
              const response = await axiosPrivate.get('/get-all-resolutions-general-info')
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

export function useGetAllResolutionsInCouncilGeneral(council_id){
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();
    return useQuery({
        queryKey: ['resolutions-council-general', council_id],
        queryFn: async () => {
            try{
              const response = await axiosPrivate.get(`/get-all-resolutions-general-info/${council_id}`)
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

export function useResolution(resolution_id){
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();
    return useQuery({
        queryKey: ['specific-resolution', resolution_id],
        queryFn: async () => {
            try{
              const response = await axiosPrivate.get(`/get-resolution/${resolution_id}`)
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

export const useCreateResolution = (onSuccessCallback, onErrorCallback) => {
  const axiosPrivate = useAxiosPrivate()
  const postResolution = async (formData) => {
  const response = await axiosPrivate.post(
  "/upload-resolution", formData)
  return response?.data
  }
  const queryClient = useQueryClient()
  return useMutation({
    queryFn: postResolution,
    onSuccess: (data)=>{  
        queryClient.invalidateQueries({queryKey: ['resolutions-general']})
        queryClient.invalidateQueries({queryKey: ['resolutions-council-general',data?.resolution?.council_id]})
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
        queryClient.invalidateQueries({queryKey: ['resolutions-council-general',data?.resolution?.council_id]})
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
        queryClient.invalidateQueries({queryKey: ['resolutions-council-general',data?.resolution?.council_id]})
        queryClient.invalidateQueries({queryKey: ['specific-resolution',data?.resolution?.id]})
        if (onSuccessCallback && typeof onSuccessCallback === 'function') onSuccessCallback()
      },
      onError: (error)=>{
        if (onErrorCallback && typeof onErrorCallback === 'function') onErrorCallback(error)
      }
    })

}
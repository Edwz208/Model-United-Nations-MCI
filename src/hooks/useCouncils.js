import useAxiosPrivate from './useAxiosPrivate'
import { useNavigate, useLocation } from 'react-router-dom'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'

export function useGetAllCouncils(){
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  return useQuery({
      queryKey: ['councils'],
      staleTime: 2*60*1000,
      refetchOnMount: true,
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
      
      queryFn: async () => {
          try{
              const response = await axiosPrivate.get('/get-councils-list')
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

export function usePostCouncil(onSuccessCallback, onErrorCallback){
  const axiosPrivate = useAxiosPrivate()
  const queryClient = useQueryClient()
  return useMutation({
      mutationFn: async (formData) => {
          const response = await axiosPrivate.post('/set-council', formData)
          return response?.data;
      },
    onSuccess: (data)=>{  
      queryClient.setQueryData(['councils'], data?.council)
      if (onSuccessCallback && typeof onSuccessCallback === 'function') onSuccessCallback()
    },
    onError: (error)=>{
      if (onErrorCallback && typeof onErrorCallback === 'function') onErrorCallback(error)
    }
  })

}

export function usePatchCouncil(onSuccessCallback, onErrorCallback){
  const axiosPrivate = useAxiosPrivate()
  const queryClient = useQueryClient()
  return useMutation({
      mutationFn: async (formData) => {
          const response = await axiosPrivate.patch(`/update-council/${formData.council_id}`, formData)
          return response?.data;
      },
    onSuccess: (data)=>{  
      queryClient.setQueryData(['councils'], data?.council)
      if (onSuccessCallback && typeof onSuccessCallback === 'function') onSuccessCallback()
    },
    onError: (error)=>{
      if (onErrorCallback && typeof onErrorCallback === 'function') onErrorCallback(error)
    }
  })

}

export function useUpdateMainCouncil(onSuccessCallback, onErrorCallback){
  const axiosPrivate = useAxiosPrivate()
  const queryClient = useQueryClient()
  return useMutation({
      mutationFn: async (council_id) => {
          const response = await axiosPrivate.patch(`/update-main-council/${council_id}`)
          return response?.data;
      },
    onSuccess: (data)=>{  
      queryClient.setQueryData(['councils'], data?.council)
      if (onSuccessCallback && typeof onSuccessCallback === 'function') onSuccessCallback()
    },
    onError: (error)=>{
      if (onErrorCallback && typeof onErrorCallback === 'function') onErrorCallback(error)
    }
  })

}

export function useDeleteCouncil(onSuccessCallback, onErrorCallback){
  const axiosPrivate = useAxiosPrivate()
  const queryClient = useQueryClient()
  return useMutation({
      mutationFn: async (council_id) => {
          const response = await axiosPrivate.delete(`/delete-council/${council_id}`) // delete no body unless use in config {}
          return response?.data;
      },
    onSuccess: (data)=>{  
      queryClient.setQueryData(['councils'], data?.council)
      if (onSuccessCallback && typeof onSuccessCallback === 'function') onSuccessCallback()
    },
    onError: (error)=>{
      if (onErrorCallback && typeof onErrorCallback === 'function') onErrorCallback(error)
    }
  })

}
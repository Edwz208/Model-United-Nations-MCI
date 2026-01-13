import useAxiosPrivate from './useAxiosPrivate'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
// must pass coutry_id into patch

export function useGetAllAmendmentsInResolutionGeneral(resolution_id){
    const axiosPrivate = useAxiosPrivate();
    return useQuery({
        queryKey: ['amendments-resolution', resolution_id],
        queryFn: async () => {
              const response = await axiosPrivate.get(`/all-amendments/${resolution_id}`)
              console.log(response?.data)
                return response?.data;
        }
    })
}

export function useGetAllAmendmentsInCouncil(council_id){
  const axiosPrivate = useAxiosPrivate()
  return useQuery({
    queryKey: ['council-amendments', council_id],
    queryFn: async () =>{
      const response = await axiosPrivate.get(`/council-amendments/${council_id}`)
      console.log(response?.data)
      return response?.data
    }
  })

}

export function useAmendmentsForCountry(countryId){
    const axiosPrivate = useAxiosPrivate();
    return useQuery({
        queryKey: ['country-amendments', countryId],
        queryFn: async () => {
              const response = await axiosPrivate.get(`/specific-amendment-country/${countryId}`)
              console.log(response?.data)
                return response?.data;
        }
    })
}

export const useCreateAmendment = (onSuccessCallback, onErrorCallback) => {
  const axiosPrivate = useAxiosPrivate()
  const postAmendment = async (formData) => {
  const response = await axiosPrivate.post(
  "/upload-amendment", formData)
  return response?.data
  }
  const queryClient = useQueryClient()
  return useMutation({
    queryFn: postAmendment,
    onSuccess: (data)=>{  
        queryClient.invalidateQueries({queryKey: ['amendments-resolution', data?.amendment?.resolution_id]})
        queryClient.invalidateQueries({queryKey: ['country-amendments', data?.amendment?.submitter]})
      if (onSuccessCallback && typeof onSuccessCallback === 'function') onSuccessCallback()
    },
    onError: (error)=>{
      if (onErrorCallback && typeof onErrorCallback === 'function') onErrorCallback(error)
    }
  }
)
}

export function usePatchAmendment(onSuccessCallback, onErrorCallback, countryId){
    const axiosPrivate = useAxiosPrivate()
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (formData) => {
            const response = await axiosPrivate.patch(`/update-resolution/${formData.amendment_id}/${countryId}`, formData)
            return response?.data
        },
      onSuccess: (data)=>{  
        queryClient.invalidateQueries({queryKey: ['amendments-resolution', data?.amendment?.resolution_id]})
        queryClient.invalidateQueries({queryKey: ['country-amendments', data?.amendment?.submitter]})
        if (onSuccessCallback && typeof onSuccessCallback === 'function') onSuccessCallback()
      },
      onError: (error)=>{
        if (onErrorCallback && typeof onErrorCallback === 'function') onErrorCallback(error)
      }
    })
}

export function useApproveRejectAmendment(onSuccessCallback, onErrorCallback, council_id){
    const axiosPrivate = useAxiosPrivate()
    const queryClient = useQueryClient()
    return useMutation({ // destructure here but not in useApproveRejectAmendment params
        mutationFn: async ({formData, amendment_id}) => {
          console.log(formData, amendment_id)
            const response = await axiosPrivate.patch(`/approve-reject-amendment/${amendment_id}`, formData)
            return response?.data
        },
      onSuccess: (data)=>{  
        queryClient.invalidateQueries({queryKey: ['amendments-resolution', data?.amendment?.resolution_id]})
        queryClient.invalidateQueries({queryKey: ['council-amendments', council_id]})
        queryClient.invalidateQueries({queryKey: ['country-amendments', data?.amendment?.submitter]})
        if (onSuccessCallback && typeof onSuccessCallback === 'function') onSuccessCallback()
      },
      onError: (error)=>{
        if (onErrorCallback && typeof onErrorCallback === 'function') onErrorCallback(error)
      }
    })
}

export function useDeleteAmendment(onSuccessCallback, onErrorCallback){
    const axiosPrivate = useAxiosPrivate()
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (amendment_id) => {
            const response = await axiosPrivate.delete(`/delete-amendment/${amendment_id}`) // delete no body unless use in config {}
            return response?.data;
        },
      onSuccess: (data)=>{  
        queryClient.invalidateQueries({queryKey: ['amendments-resolution', data?.amendment?.resolution_id]})
        queryClient.invalidateQueries({queryKey: ['country-amendments', data?.amendment?.submitter]})
        if (onSuccessCallback && typeof onSuccessCallback === 'function') onSuccessCallback()
      },
      onError: (error)=>{
        if (onErrorCallback && typeof onErrorCallback === 'function') onErrorCallback(error)
      }
    })

}
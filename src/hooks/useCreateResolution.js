import axios from "../api/axios.js";
import { useMutation, useQueryClient } from '@tanstack/react-query'

const postResolution = async ({formData}) => {
  const response = await axios.post(
  "/upload-resolution", formData)
  return response?.data
}

export const useCreateResolution = (onSuccessCallback, onErrorCallback) => {
    const queryClient = useQueryClient()
    return useMutation({ 
    mutationFn: postResolution, 
    onSuccess: (data)=>{  
    queryClient.setQueryData(['resolutions'], data?.resolutions)
    onSuccessCallback()
    },
    onError: (error)=>{
      onErrorCallback(error)
    }
}
)
}
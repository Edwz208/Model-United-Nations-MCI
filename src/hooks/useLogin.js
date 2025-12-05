import axios from "../api/axios.js";
import { useMutation, useQueryClient } from '@tanstack/react-query'

const postLogin = async ({code, country}) => {
  const response = await axios.post(
  "/login",
  { code, country }
)
  return response?.data
}

export const useLogin = (onSuccessCallback, onErrorCallback) => {
    const queryClient = useQueryClient()
    return useMutation({ 
    mutationFn: postLogin, 
    onSuccess: (data)=>{  // mutations dont auto trigger, queries do 
    queryClient.setQueryData(['ownAmendments'], data?.ownAmendments)
    queryClient.setQueryData(['recentAmendments'], data?.recentAmendments)
    onSuccessCallback(data)
    },
    onError: (error)=>{
      onErrorCallback(error)
    }
}
)
}
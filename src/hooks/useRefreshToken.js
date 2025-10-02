import useStore from '../store/store.js'
import axios from '../api/axios.js'
import { useQueryClient, useMutation } from '@tanstack/react-query'

 // good to go 
const useRefreshToken = () => {
  const setAccessToken = useStore((state)=>state.setAccessToken)
  const setRoles = useStore((state)=>state.setRoles)
  const setCountry = useStore((state)=>state.setCountry)
  const setID = useStore((state)=>state.setID)
  const setLogged = useStore((state)=>state.setLogged)
  const queryClient = useQueryClient()
  const mutation = useMutation({ 
    mutationFn: async ()=> { // must be an async function 
      const result = await axios.get('/refresh')
      return result?.data
    }, 
    onSuccess: (data)=>{ 
    queryClient.setQueryData(['ownAmendments'], data?.ownAmendments)
    queryClient.setQueryData(['recentAmendments'], data?.recentAmendments)
    setAccessToken(data?.accessToken)
    setRoles(data?.roles)
    setCountry(data?.country)
    setID(data?.id)
    setLogged(true)
    }
  })
  const refresh = () =>{  // myst use a function within because built in hooks must be called at the top level of a sync function
  return mutation.mutateAsync(); // to await must be in async otherwise doesnt matter
  }

  return refresh

}     


export default useRefreshToken
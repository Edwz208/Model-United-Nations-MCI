import useStore from '../contexts/store.js'
import axios from '../api/axios.js'
import { useQueryClient, useMutation } from '@tanstack/react-query'

 // good to go 
const useRefreshToken = () => {
  const setAccessToken = useStore((state)=> state.setAccessToken)
  const setRole = useStore((state)=> state.setRole)
  const setName = useStore((state)=> state.setName)
  const setId = useStore((state)=> state.setCountryId)
  const setLogged = useStore((state)=> state.setLogged)
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
    setRole(data?.role)
    setName(data?.name)
    setId(data?.country_id)
    setLogged(true)
    }
  })
  const refresh = () =>{  // myst use a function within because built in hooks must be called at the top level of a sync function
  return mutation.mutateAsync(); // to await must be in async otherwise doesnt matter
  }

  return refresh

}     


export default useRefreshToken
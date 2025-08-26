import useStore from '../store/store.js'
import { useNavigate } from "react-router-dom";
import axios from '../api/axios.js';
import { useMutation, useQueryClient } from '@tanstack/react-query'
// looks good to go 
const useLogOut = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: ()=>axios.post('/logout', {}),
        onSuccess: ()=>{
            queryClient.setQueryData(['personalDetails'], null)
            queryClient.setQueryData(['ownAmendments'], null)
            queryClient.setQueryData(['recentAmendments'], null)
            queryClient.invalidateQueries({queryKey: ['personalDetails']})
            queryClient.invalidateQueries({queryKey: ['ownAmendments']})
            queryClient.invalidateQueries({queryKey: ['recentAmendments']})
        }
    })
    const clearAuth = useStore((state)=>state.clearAuth)

    const logOut = async () => {
        console.log("loggin out ")
        mutation.mutate();
        clearAuth();
        localStorage.setItem('Logged', false)
        navigate("/Login");
    }
    return { logOut, ...mutation }; // spread operator adds the mutation properties into the new object 
}
export default useLogOut;

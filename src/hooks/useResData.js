import useRes from "./useResolutions.js";
import { useEffect} from 'react'
import useAxiosPrivate from './useAxiosPrivate'
import { useNavigate, useLocation} from 'react-router-dom'

function useResData(){
    const axiosPrivate = useAxiosPrivate();
    const {setResolutions } = useRes();
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(()=>{
        const controller = new AbortController();
        const getResolutions = async () =>{
            try{
                const response = await axiosPrivate.get('/all-resolutions',{
                    signal: controller.signal
            })
            setResolutions(response?.data?.resolutions)
                    }
            
        catch (err){
            console.log(err)
            navigate('/Login', {state: {from: location}, replace: true})
        }
    }
        getResolutions();
        return ()=>{
            controller.abort()
        }
    },  
    []);

}

export default useResData;
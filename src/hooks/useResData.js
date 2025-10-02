import useAxiosPrivate from './useAxiosPrivate'
import { useNavigate, useLocation } from 'react-router-dom'

function useResData(){
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();
    const getResolutions = async () =>{
            try{
                const response = await axiosPrivate.get('/all-resolutions',{
            })
            setResolutions(response?.data?.resolutions)
                    }
            
        catch (err){
            console.log(err)
            navigate('/Login', {state: {from: location}, replace: true})
        }
    }
        getResolutions();

}

export default useResData;
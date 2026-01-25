import {useGetAllCouncils} from '../../hooks/useCouncils';
import Button from '../../components/UI/Button.jsx';
import { useNavigate } from 'react-router-dom'

function Home() {

    const { data: councilsData, isLoading: isCouncilsLoading, isError: isCouncilsError, error: councilsError } = useGetAllCouncils()
    const errorMessage = councilsError?.response ? (councilsError.response.data?.detail ||councilsError.response.status) : councilsError?.request ? "Server unreachable. Check your connection." : (councilsError?.message || "Unexpected error");
    const navigate = useNavigate()

    const handleEnterCouncil = (councilId, councilName) =>{
        navigate(`/Admin/Dashboard/Council/${councilId}/${councilName}/resolutions`)
    }

    if (isCouncilsError) {
        const status = councilsError?.response?.status
        if (status === 401){ // no need for useeffect, no other side effects
            return <Unauthorized/>
        }
        return <p>Error: {errorMessage}</p>}
    if (isCouncilsLoading) return <div>Loading councils...</div>
    
    return (
        councilsData.map((council, index) => (
            <div key={index} className="p-4 mt-4 bg-white rounded shadow flex justify-between items-center">
                <p className="text-md">{index+1} - {council.name}</p>
                <Button onClick={()=>handleEnterCouncil(council.council_id, council.name)}>Enter</Button>
            </div>
        ))
    )
}

export default Home;
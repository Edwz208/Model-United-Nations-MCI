import {useGetAllCouncils} from '../../hooks/useCouncils';
import Button from '../../components/UI/Button.jsx';
import { useNavigate } from 'react-router-dom'

function Home() {

    const { data: councilsData, isLoading: isCouncilsLoading, isError: isCouncilsError } = useGetAllCouncils()

    const navigate = useNavigate()

    const handleEnterCouncil = (councilId) =>{
        navigate(`/Admin/Dashboard/Council/${councilId}/resolutions`)
    }

    if (isCouncilsLoading) return <div>Loading...</div>
    if (isCouncilsError) return <div>Error loading councils data.</div>
    
    return (
        councilsData.map((council, index) => (
            <div key={index} className="p-4 mt-4 bg-white rounded shadow flex justify-between items-center">
                <p className="text-md">{index+1} - {council.name}</p>
                <Button onClick={()=>handleEnterCouncil(council.council_id)}>Enter</Button>
            </div>
        ))
    )
}

export default Home;
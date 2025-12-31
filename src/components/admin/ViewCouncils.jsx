import {useGetAllCouncils} from '../../hooks/useCouncils';
function ViewCouncils() {
    const { data: councilsData, isLoading: isCouncilsLoading, isError: isCouncilsError } = useGetAllCouncils()
    if (isCouncilsLoading) return <div>Loading...</div>
    if (isCouncilsError) return <div>Error loading councils data.</div>
    return (
        councilsData.map((council, index) => (
            <div key={index} className="p-4 mt-4 bg-white rounded shadow">
                <p className="text-md mb-2">{index} - {council.name}</p>
            </div>
        ))
    )
}

export default ViewCouncils;
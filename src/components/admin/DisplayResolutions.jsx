import { useGetAllResolutionsGeneral, useDeleteResolutions } from '../../hooks/useResolutions'
import { useGetAllCouncils } from '../../hooks/useCouncils';
import { useState, useEffect } from 'react'
import Button from '../UI/Button';
import {filterBySearch, filterResolutionsByCouncil} from '../../utils/helpers.js'
import CouncilFilter from '../UI/CouncilFilter';
import ConfirmModal from '../UI/ConfirmModal';
import Unauthorized from '../../pages/public/Unauthorized';

const ViewResolutions = ({councilScopedId, setOpenedResolution, setIsDeleteOpen, setIsEditOpen}) => {
  const [selectedCouncilIds, setSelectedCouncilIds] = useState([])
  const {data: councilsData = [], isLoading: isCouncilsLoading, isError: isCouncilsError } = useGetAllCouncils()
  
  useEffect(() =>{
  if (!Array.isArray(councilsData)) return
  const validCouncilIds = councilsData.map(c => c.council_id)
  setSelectedCouncilIds(prev => {
      if (prev.length === 0){
          return validCouncilIds
      }
      return prev.filter(id => validCouncilIds.includes(id))
  })}, [councilsData])

  const useDeleteResolutionsMutation = useDeleteResolutions()

  const [searchBar, setSearchBar] = useState('')

  const [selectedResolutions, setSelectedResolutions] = useState([])
  const [selectAllOrUnselect, setSelectAllOrUnselect] = useState(true)

  const {data: resolutionsData = [], isLoading: isResolutionsLoading, isError: isResolutionsError, error: resolutionsError } = useGetAllResolutionsGeneral();
  const errorMessage = resolutionsError?.response ? (resolutionsError.response.data?.detail || resolutionsError.response.status) : resolutionsError?.request ? "Server unreachable. Check your connection." : (resolutionsError?.message || "Unexpected error");
  console.log(filterResolutionsByCouncil(filterBySearch(resolutionsData, "title", searchBar), selectedCouncilIds))
  // If already selected remove it else add it (checkbox)
  const handleSelect = (resolution) => {
    setSelectedResolutions(prev => prev.includes(resolution.resolution_id)
    ? prev.filter(id => id !== resolution.resolution_id)
    : [...prev, resolution.resolution_id]
  )
  }

  const handleEdit = (resolution) =>{
    setIsEditOpen(true)
    setOpenedResolution(resolution)
  }

  const handleDeleteViaEmoji = (resolution) =>{
    setIsDeleteOpen(true)
    setOpenedResolution(resolution)
  }

  const [isSelectDeleteOpen, setIsSelectDeleteOpen] = useState(false)
  const onDeleteViaCheckbox = () =>{
  if (selectedResolutions.length==0) return   
  useDeleteResolutionsMutation.mutate(selectedResolutions)
  setSelectedResolutions([])
  } 

  if (isResolutionsError) {
      const status = resolutionsError?.response?.status
      if (status === 401){
          return <Unauthorized/>
      }
      return <p>Error: {errorMessage}</p>}
  if (isResolutionsLoading) return <div>Loading resolutions...</div>

  return (<>
    <div className='flex gap-3'>
    <ConfirmModal open={isSelectDeleteOpen} setOpen={setIsSelectDeleteOpen} title={"Delete resolutions?"} description={`Are you sure you want to delete ${resolutionsData.filter(resolution => selectedResolutions.includes(resolution.resolution_id)).map(resolution => resolution.title).join(", ")}? This action cannot be undone.`} onConfirm={onDeleteViaCheckbox}></ConfirmModal>
    <input id = 'search-bar' value={searchBar} placeholder=' Search here' type='search' onChange={(e)=>setSearchBar(e.target.value)}className='border border-border flex-1 '/>
    {!councilScopedId && <CouncilFilter councilsData={councilsData} selectedCouncilIds={selectedCouncilIds} setSelectedCouncilIds={setSelectedCouncilIds} isError={isCouncilsError} isLoading={isCouncilsLoading}/>}
    </div>
    <div className='flex mt-1 gap-5'>
    <Button variant={"secondary"} className="mr-5" onClick={() => {selectAllOrUnselect ? setSelectedResolutions(filterResolutionsByCouncil(filterBySearch(resolutionsData, "council_id", searchBar),selectedCouncilIds).map(c=>c.country_id)) : setSelectedResolutions([]); setSelectAllOrUnselect(prev => !prev)}}>{selectAllOrUnselect ? 'Select All' : 'Unselect'}</Button>
    {(!selectAllOrUnselect || selectedResolutions.length > 0) && (<Button variant={"primary"} onClick={() => onDeleteViaCheckbox()}>Delete</Button>)}
    </div>
    <div className=''>  
      {filterResolutionsByCouncil(filterBySearch(resolutionsData, "title", searchBar), selectedCouncilIds).map((resolution, index) => (
        <div key={resolution.resolution_id} className="flex gap-5 p-4 mt-4 bg-white rounded shadow items-center">
          <input type='checkbox' checked={selectedResolutions.includes(resolution.resolution_id)} onChange={()=> handleSelect(resolution)}/>
          <p className="text-md">{index+1} - {resolution.title}</p>
            <div className='flex gap-x-2'>
              <button className="border border-border transition transform hover:scale-110" onClick={()=>handleEdit(resolution)}>✏️</button>
              <button className="border border-border transition transform hover:scale-110"onClick={()=>handleDeleteViaEmoji(resolution)}>🗑️</button>
            </div>

        </div>
      ))}
    </div>
  </>)
};

export default ViewResolutions;
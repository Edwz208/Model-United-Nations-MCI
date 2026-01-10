import { useGetAllResolutionsGeneral, useDeleteResolutions, usePatchResolution } from '../../hooks/useResolutions'
import { useGetAllCouncils } from '../../hooks/useCouncils';
import { useState, useEffect } from 'react'
import Button from '../UI/Button';
import ConfirmModal from '../UI/ConfirmModal.jsx';
import FormModal from '../UI/FormModal';
import {filterBySearch, filterResolutionsByCouncil} from '../../utils/helpers.js'
import CouncilFilter from '../UI/CouncilFilter';

const ViewResolutions = ({councilScopedId}) => {
  const {data: councilsData, isLoading: isCouncilsLoading, isError: isCouncilsError } = useGetAllCouncils()
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [openedResolution, setOpenedResolution] = useState(null) // actual resolution obj
  const [selectedResolutions, setSelectedResolutions] = useState([]) // list of ids
  const [selectUnselect, setSelectUnselect] = useState(true)
  const [selectedCouncilIds, setSelectedCouncilIds] = useState([])
  useEffect(() =>{
    if (Array.isArray(councilsData) && selectedCouncilIds.length == 0){
      setSelectedCouncilIds(councilsData.map(council => council.council_id))
    }
  }, [councilsData, selectedCouncilIds.length])

  const [searchBar, setSearchBar] = useState('')
  const useDeleteResolutionsMutation = useDeleteResolutions()
  const usePatchCountryMutation = usePatchResolution()

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

  const onSaveChanges = () => {
    usePatchCountryMutation.mutate(openedResolution)
    setIsEditOpen(false)
    setOpenedResolution(null)
  }

  const handleDeleteViaEmoji = (resolution) =>{
    setIsDeleteOpen(true)
    setOpenedResolution(resolution)
  }

  const onOpenConfirmDelete = () =>{
    if (!openedResolution?.resolution_id) return
    useDeleteResolutionsMutation.mutate([openedResolution.resolution_id])
    setIsDeleteOpen(false)
    setOpenedResolution(null)
  }

  const onDeleteViaCheckbox = () =>{
    if (selectedResolutions.length==0) return
    useDeleteResolutionsMutation.mutate(selectedResolutions)
    setSelectedResolutions([])
  } 
  
  const {data: resolutionsData, isLoading: isResolutionsLoading, isError: isResolutionsError } = useGetAllResolutionsGeneral();
  if (isResolutionsLoading) return <div>Loading...</div>
  if (isResolutionsError) return <div>Error loading resolution data.</div>
  return (<>
  <ConfirmModal open={isDeleteOpen} setOpen={setIsDeleteOpen} title={"Delete resolution?"} description={`Are you sure you want to delete resolution ${openedResolution?.title}? This action cannot be undone.`} onConfirm={onOpenConfirmDelete}></ConfirmModal>
  <FormModal open={isEditOpen} setOpen={setIsEditOpen} title={`Modify resolution ${openedResolution?.title}`} description={`Make changes to resolution ${openedResolution?.title}.`} onSubmit={onSaveChanges}>
  </FormModal>
    <div className='flex gap-3'>
    <input id = 'search-bar' value={searchBar} placeholder='Search here' type='search' onChange={(e)=>setSearchBar(e.target.value)}className='border border-border flex-1 '/>
    {!councilScopedId && <CouncilFilter councilsData={councilsData} selectedCouncilIds={selectedCouncilIds} setSelectedCouncilIds={setSelectedCouncilIds}/>}
    </div>
    <div className='flex mt-1 gap-5'>
    <Button variant={"secondary"} className="mr-5" onClick={() => {selectUnselect ? setSelectedResolutions(filterResolutionsByCouncil(filterBySearch(resolutionsData, "council_id", searchBar),selectedCouncilIds).map(c=>c.country_id)) : setSelectedResolutions([]); setSelectUnselect(prev => !prev)}}>{selectUnselect ? 'Select All' : 'Unselect'}</Button>
    {(!selectUnselect || selectedResolutions.length > 0) && (<Button variant={"primary"} onClick={() => onDeleteViaCheckbox()}>Delete</Button>)}
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
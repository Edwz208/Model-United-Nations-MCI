import { useGetAllCountries, useDeleteCountries, usePatchCountry, useCreateCountry, useAddSpeakerPoints} from '../../hooks/useCountries'
import { useGetAllCouncils } from '../../hooks/useCouncils';
import { useState, useEffect } from 'react'
import Button from '../UI/Button';
import ConfirmModal from '../UI/ConfirmModal.jsx';
import FormModal from '../UI/FormModal';
import {filterBySearch, filterCountriesByCouncil} from '../../utils/helpers.js'
import CouncilFilter from '../UI/CouncilFilter';

const ViewCountries = () => {
  const {data: councilsData, isLoading: isCouncilsLoading, isError: isCouncilsError } = useGetAllCouncils()
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [openedCountry, setOpenedCountry] = useState(null) // actual country obj
  const [selectedCountries, setSelectedCountries] = useState([]) // list of ids
  const [selectUnselect, setSelectUnselect] = useState(true)
  const [selectedCouncilIds, setSelectedCouncilIds] = useState([])
  const [speakerPointsUpdate, setSpeakerPointsUpdate] = useState(null)
  const [isAddOpen, setIsAddOpen] = useState(false)
  console.log(isAddOpen)
  const [addForm, setAddForm] = useState({assigned_country: "", councils: null, delegate1: "", delegate2: null, delegate3: null, delegate4: null, role: "member", amendments_submitted: null, speaker_points: null, login: ""})

  useEffect(() =>{
    if (Array.isArray(councilsData) && selectedCouncilIds.length == 0){
      setSelectedCouncilIds(councilsData.map(council => council.council_id))
    }
  }, [councilsData])

  const [searchBar, setSearchBar] = useState('')
  const useDeleteCountriesMutation = useDeleteCountries()
  const usePatchCountryMutation = usePatchCountry()
  const useCreateCountryMutation = useCreateCountry()
  const useAddSpeakerPointsMutation = useAddSpeakerPoints()

  const handleSelect = (country) => {
    setSelectedCountries(prev => prev.includes(country.country_id)
    ? prev.filter(id => id !== country.country_id)
    : [...prev, country.country_id]
  )
  }

  const handleEdit = (country) =>{
    setIsEditOpen(true)
    setOpenedCountry(country)
  }

  const handleUpdateSpeakerPoints = (countryId, speakerPoints) =>{
    console.log("country id", countryId)
    console.log(speakerPoints)
    useAddSpeakerPointsMutation.mutate({"country": countryId, speakerPoints})
  }
  const handleAdd = () =>{
    setIsAddOpen(true)
  }

  const onAddNew = (addForm) =>{
    useCreateCountryMutation.mutate(addForm)
  }

  const onSaveChanges = () => {
    usePatchCountryMutation.mutate(openedCountry)
    setIsEditOpen(false)
    setOpenedCountry(null)
  }

  const handleDelete = (country) =>{
    setIsDeleteOpen(true)
    setOpenedCountry(country)
  }

  const onOpenConfirmDelete = () =>{
    if (!openedCountry?.country_id) return
    useDeleteCountriesMutation.mutate([openedCountry.country_id])
    setIsDeleteOpen(false)
    setOpenedCountry(null)
  }

  const onDeleteCheckbox = () =>{
    if (selectedCountries.length==0) return
    useDeleteCountriesMutation.mutate(selectedCountries)
    setSelectedCountries([])
  } 
  // sketchy select logic right now
  const {data: countriesData, isLoading: isCountriesLoading, isError: isCountriesError } = useGetAllCountries();
  if (isCountriesLoading) return <div>Loading...</div>
  if (isCountriesError) return <div>Error loading countries data.</div>
  return (<>
  <ConfirmModal open={isDeleteOpen} setOpen={setIsDeleteOpen} title={"Delete country?"} description={`Are you sure you want to delete country ${openedCountry?.name}? This action cannot be undone.`} onConfirm={onOpenConfirmDelete}></ConfirmModal>
  <FormModal open={isEditOpen} setOpen={setIsEditOpen} title={`Modify country ${openedCountry?.name}`} description={`Make changes to country ${openedCountry?.name}.`} onSubmit={onSaveChanges}></FormModal>
  <FormModal open={isAddOpen} size={"xl"} setOpen={setIsAddOpen} title={`Add New Country`} description={`Add a new country`} onSubmit={()=> onAddNew(addForm)}>
  <div className='flex flex-col '>
  
  <label htmlFor='country-name' className='flex gap-5'>Country Name
  <input name="country-name" value={addForm.assigned_country} className='flex-1' placeholder='Enter country name here' onChange={(e) => setAddForm(prev => ({...prev, assigned_country: e.target.value}))} /></label>
  <label htmlFor='delegate1' className='flex gap-5'>Delegate 1 Name
  <input name="delegate1" value={addForm.delegate1} className='flex-1' placeholder='Enter delegate 1 name here' onChange={(e) => setAddForm(prev => ({...prev, delegate1: e.target.value}))} /></label>
  <label htmlFor='delegate2' className='flex gap-5'>Delegate 2 Name
  <input name="delegate2" value={addForm.delegate2} className='flex-1' placeholder='Enter delegate 2 name here' onChange={(e) => setAddForm(prev => ({...prev, delegate2: e.target.value}))} /></label>
  <label htmlFor='delegate3' className='flex gap-5'>Delegate 3 Name
  <input name="delegate3" value={addForm.delegate3} className='flex-1' placeholder='Enter delegate 3 name here' onChange={(e) => setAddForm(prev => ({...prev, delegate3: e.target.value}))} /></label>
  <label htmlFor='delegate4' className='flex gap-5'>Delegate 4 Name
  <input name="delegate4" value={addForm.delegate4} className='flex-1' placeholder='Enter delegate 4 name here' onChange={(e) => setAddForm(prev => ({...prev, delegate4: e.target.value}))} /></label>
  <label htmlFor='councils' className='flex gap-5'>Councils
  <input name="councils" value={addForm.councils} className='flex-1' placeholder='Enter councils here' onChange={(e) => setAddForm(prev => ({...prev, councils: e.target.value}))} /></label>
  <label htmlFor='login' className='flex gap-5'>Login Code
  <input name="login" value={addForm.login} className='flex-1' placeholder='Enter login code here' onChange={(e) => setAddForm(prev => ({...prev, login: e.target.value}))} /></label>
  </div>
  </FormModal>
    <div className='flex gap-3'>
    <input id = 'search-bar' value={searchBar} placeholder='Search here' type='search' onChange={(e)=>setSearchBar(e.target.value)}className='border border-border flex-1 '/>
    <CouncilFilter councilsData={councilsData} selectedCouncilIds={selectedCouncilIds} setSelectedCouncilIds={setSelectedCouncilIds}/>
    </div>
    <div className='flex justify-between mt-3 gap-5'>
    <div>
    <Button variant={"secondary"} className="mr-5" onClick={() => {selectUnselect ? setSelectedCountries(filterCountriesByCouncil(filterBySearch(countriesData, "name", searchBar),selectedCouncilIds).map(c=>c.country_id)) : setSelectedCountries([]); setSelectUnselect(prev => !prev)}}>{selectUnselect ? 'Select All' : 'Unselect'}</Button>
    {(!selectUnselect || selectedCountries.length > 0) && (<Button variant={"primary"} onClick={() => onDeleteCheckbox()}>Delete</Button>)}
    </div>
    <Button variant={"primary"} className="" onClick={()=>{handleAdd()}}>Add +</Button>
    </div>
    <div className=''>
      {filterCountriesByCouncil(filterBySearch(countriesData, "name", searchBar),selectedCouncilIds).map((country, index) => (
        <div key={country.country_id} className="flex gap-5 p-4 mt-4 bg-white rounded shadow items-center">
          <input type='checkbox' checked={selectedCountries.includes(country.country_id)} onChange={()=> handleSelect(country)}/>
          <p className="text-md">{index+1} - {country.name}</p>
            <div className='flex gap-x-2'>
              <label htmlFor='speaker-points'>Speaker Points: {country.speaker_points}</label>
              <input key={country.country_id} name='speaker-points' type='number' placeholder='Add' value={speakerPointsUpdate} onChange={(e)=>setSpeakerPointsUpdate(e.target.value)}className='text-md'/>
              <button className="border border-border transition transform hover:scale-110"onClick={()=>handleUpdateSpeakerPoints(country.country_id, speakerPointsUpdate)}>+</button>
              <button className="border border-border transition transform hover:scale-110" onClick={()=>handleEdit(country)}>✏️</button>
              <button className="border border-border transition transform hover:scale-110"onClick={()=>handleDelete(country)}>🗑️</button>
            </div>

        </div>
      ))}
    </div>
  </>)
};
export default ViewCountries;
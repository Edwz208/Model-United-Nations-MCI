import { useGetAllCountries, useDeleteCountries, usePatchCountry } from '../../hooks/useCountries'
import { useState } from 'react'
import Button from '../UI/Button';
import ConfirmModal from '../UI/ConfirmModal.jsx';
import FormModal from '../UI/FormModal';
import {filterCountriesBySearch} from '../../utils/helpers.js'

const ViewCountries = () => {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [openedCountry, setOpenedCountry] = useState(null) // actual country obj
  const [selectedCountries, setSelectedCountries] = useState([]) // list of ids
  const [selectUnselect, setSelectUnselect] = useState(true)
  const [searchBar, setSearchBar] = useState('')
  const useDeleteCountriesMutation = useDeleteCountries()
  const usePatchCountryMutation = usePatchCountry()

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
  const {data: countriesData, isLoading: isCountriesLoading, isError: isCountriesError } = useGetAllCountries();
  if (isCountriesLoading) return <div>Loading...</div>
  if (isCountriesError) return <div>Error loading countries data.</div>
  return (<>
  <ConfirmModal open={isDeleteOpen} setOpen={setIsDeleteOpen} title={"Delete country?"} description={`Are you sure you want to delete country ${openedCountry?.name}? This action cannot be undone.`} onConfirm={onOpenConfirmDelete}></ConfirmModal>
  <FormModal open={isEditOpen} setOpen={setIsEditOpen} title={`Modify country ${openedCountry?.name}`} description={`Make changes to country ${openedCountry?.name}.`} onSubmit={onSaveChanges}>
  </FormModal>
    <input id = 'search-bar' value={searchBar} placeholder='Search here' type='search' onChange={(e)=>setSearchBar(e.target.value)}className='border border-border'/>
    <div className='flex mt-1 gap-5'>
    <Button variant={"secondary"} className="mr-5" onClick={() => {selectUnselect ? setSelectedCountries(countriesData.map(c=>c.country_id)) : setSelectedCountries([]); setSelectUnselect(prev => !prev)}}>{selectUnselect ? 'Select All' : 'Unselect'}</Button>
    {(!selectUnselect || selectedCountries.length > 0) && (<Button variant={"primary"} onClick={() => onDeleteCheckbox()}>Delete</Button>)}
    </div>
    <div className=''>
      {filterCountriesBySearch(countriesData, searchBar).map((country, index) => (
        <div key={country.country_id} className="flex gap-5 p-4 mt-4 bg-white rounded shadow items-center">
          <input type='checkbox' checked={selectedCountries.includes(country.country_id)} onChange={()=> handleSelect(country)}/>
          <p className="text-md">{index+1} - {country.name}</p>
            <div className='flex gap-x-2'>
              <button className="border border-border transition transform hover:scale-110" onClick={()=>handleEdit(country)}>✏️</button>
              <button className="border border-border transition transform hover:scale-110"onClick={()=>handleDelete(country)}>🗑️</button>
            </div>

        </div>
      ))}
    </div>
  </>)
};
export default ViewCountries;
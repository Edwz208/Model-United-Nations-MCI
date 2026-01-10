import { useState, useEffect } from 'react'
import {filterBySearch, filterCountriesByCouncil} from '../../utils/helpers.js'

import { useAddSpeakerPoints, useDeleteCountries, useGetAllCountries } from '../../hooks/useCountries.js'
import { useGetAllCouncils } from '../../hooks/useCouncils'

import CouncilFilter from '../UI/CouncilFilter.jsx'
import Button from '../UI/Button.jsx'

function DisplayCountries({setIsAddOpen, setIsEditOpen, setIsDeleteOpen, setOpenedCountry, councilScopedId}){

    const [selectedCouncilIds, setSelectedCouncilIds] = useState([])
    const {data: councilsData, isLoading: isCouncilsLoading, isError: isCouncilsError } = useGetAllCouncils()
    useEffect(() =>{
    if (!Array.isArray(councilsData)) return
    const validCouncilIds = councilsData.map(c => c.council_id)
    setSelectedCouncilIds(prev => {
        if (prev.length === 0){
            return validCouncilIds
        }
        return prev.filter(id => validCouncilIds.includes(id))
    })}, [councilsData])


    const {data: countriesData, isLoading: isCountriesLoading, isError: isCountriesError } = useGetAllCountries()

    const useAddSpeakerPointsMutation = useAddSpeakerPoints()
    const useDeleteCountriesMutation = useDeleteCountries()
    
    const [searchBar, setSearchBar] = useState('')

    const [selectAllOrUnselect, setSelectAllOrUnselect] = useState(true)
    const [selectedCountries, setSelectedCountries] = useState([])

    const [speakerPointsUpdate, setSpeakerPointsUpdate] = useState({})


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
        useAddSpeakerPointsMutation.mutate({"country": countryId, "speakerPoints": Number(speakerPoints[countryId])})
        setSpeakerPointsUpdate(prev => ({ ...prev, [countryId]: "" }))
    }

    const handleAdd = () =>{
        setIsAddOpen(true)
    }

    const handleDelete = (country) => {
        setIsDeleteOpen(true)
        setOpenedCountry(country)
    }

    const onDeleteViaCheckbox = () =>{
        if (selectedCountries.length==0) return
        useDeleteCountriesMutation.mutate(selectedCountries)
        setSelectedCountries([])
    } 
    if (isCountriesError) return <div></div>
    if (isCountriesLoading) return <div></div>
    return (<>
        <div className='flex gap-3'>
        <input id = 'search-bar' value={searchBar} placeholder='Search here' type='search' onChange={(e)=>setSearchBar(e.target.value)}className='border border-border flex-1 '/>
        {!councilScopedId && <CouncilFilter councilsData={councilsData} selectedCouncilIds={selectedCouncilIds} setSelectedCouncilIds={setSelectedCouncilIds}/>}
        </div>
        <div className='flex justify-between mt-3 gap-5'>
        <div>
        <Button variant={"secondary"} className="mr-5" onClick={() => {selectAllOrUnselect ? setSelectedCountries(filterCountriesByCouncil(filterBySearch(countriesData, "name", searchBar),selectedCouncilIds).map(c=>c.country_id)) : setSelectedCountries([]); setSelectAllOrUnselect(prev => !prev)}}>{selectAllOrUnselect ? 'Select All' : 'Unselect'}</Button>
        {(!selectAllOrUnselect || selectedCountries.length > 0) && (<Button variant={"primary"} onClick={() => onDeleteViaCheckbox()}>Delete</Button>)}
        </div>
        <Button variant={"primary"} onClick={()=>{handleAdd()}}>Add +</Button>
        </div>
        {filterCountriesByCouncil(filterBySearch(countriesData, "name", searchBar),selectedCouncilIds).map((country, index) => (
            <div key={country.country_id} className="flex items-center justify-between gap-5 p-4 mt-4 bg-white rounded shadow">
            <div className="flex items-center gap-3">
            <input type='checkbox' checked={selectedCountries.includes(country.country_id)} onChange={()=> handleSelect(country)}/>
            <p className="text-md">{index+1} - {country.name}</p>
            </div>
                <div className='flex gap-x-2'>
                    {/* store speaker points as string until form submission for ipnut weirdness, use square brackets around to add key with spread operator on dict */}
                <label htmlFor='speaker-points'>Speaker Points: {country.speaker_points}</label> 
                <div className="flex items-center gap-2">
                <input
                    name='speaker-points'
                    type='number'
                    placeholder='Enter new value'
                    value={speakerPointsUpdate[country.country_id]!=null + country.speaker_points ? country.speaker_points + speakerPointsUpdate[country.country_id] : ""}
                    onChange={(e) =>
                    setSpeakerPointsUpdate(prev => ({
                        ...prev,
                        [country.country_id]: e.target.value - country.speaker_points
                    }))
                    }
                    className='text-md w-24'
                />
                <button
                type="button"
                className="border border-border px-3 transition transform hover:scale-110"
                onClick={() =>
                    handleUpdateSpeakerPoints(
                    country.country_id,
                    {
                        ...speakerPointsUpdate,
                        [country.country_id]: 1
                    }
                    )
                }
                >
                +1
                </button>

                <button
                    className="border border-border transition transform hover:scale-110"
                    onClick={() =>
                    handleUpdateSpeakerPoints(country.country_id, speakerPointsUpdate)
                    }
                >
                    ✔
                </button>
                </div>
                <button className="border border-border transition transform hover:scale-110" onClick={()=>handleEdit(country)}>✏️</button>
                <button className="border border-border transition transform hover:scale-110"onClick={()=>handleDelete(country)}>🗑️</button>
                </div>

            </div>
        ))}
    </>)
}

export default DisplayCountries;
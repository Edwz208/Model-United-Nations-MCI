import { useState, useEffect } from 'react'
import {filterBySearch, filterCountriesByCouncil} from '../../utils/helpers.js'

import { useGetAllCountries } from '../../hooks/useCountries.js'
import { useGetAllCouncils } from '../../hooks/useCouncils'

import CouncilFilter from '../UI/CouncilFilter.jsx'

function DisplayCountries(){

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
    
    const [searchBar, setSearchBar] = useState('')
    if (isCountriesError) return <div></div>
    if (isCountriesLoading) return <div></div>
    return (<>
        <div className='flex gap-3'>
        <input id = 'search-bar' value={searchBar} placeholder='Search here' type='search' onChange={(e)=>setSearchBar(e.target.value)}className='border border-border flex-1 '/>
        <CouncilFilter councilsData={councilsData} selectedCouncilIds={selectedCouncilIds} setSelectedCouncilIds={setSelectedCouncilIds} isError={isCouncilsError} isLoading={isCouncilsLoading}/>
        </div>
        {filterCountriesByCouncil(filterBySearch(countriesData, "name", searchBar),selectedCouncilIds).map((country, index) => (
            <div key={country.country_id} className="flex gap-5 p-4 mt-4 bg-white rounded shadow items-center">
            <p className="text-md">{index+1} - {country.name}</p>
            <div className='flex gap-x-2'>
                    {/* store speaker points as string until form submission for ipnut weirdness, use square brackets around to add key with spread operator on dict */}
                <p>Speaker Points: {country.speaker_points}</p> 
            </div>

            </div>
        ))}
    </>)
}

export default DisplayCountries;
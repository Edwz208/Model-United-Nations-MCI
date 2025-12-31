import { useGetAllCountries } from '../../hooks/useCountries'

const ViewCountries = () => {
  const {data: countriesData, isLoading: isCountriesLoading, isError: isCountriesError } = useGetAllCountries();
  if (isCountriesLoading) return <div>Loading...</div>
  if (isCountriesError) return <div>Error loading countries data.</div>
  return (
    <div className=''>
      {countriesData.map((country, index) => (
        <div key={index} className="p-4 mt-4 bg-white rounded shadow">
          <p className="text-md mb-2">{index+1} - {country.name}</p>
        </div>
      ))}
    </div>
  )
};
export default ViewCountries;
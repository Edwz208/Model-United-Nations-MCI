import { useState, useEffect } from 'react';
import FormModal from '../UI/FormModal';
import { useCreateCountry } from '../../hooks/useCountries';
import { useGetAllCouncils } from '../../hooks/useCouncils';
import { validatePosInteger, validateCharExists } from "../../utils/validators.js";

function CreateCountryForm({isAddOpen, setIsAddOpen, councilScopedId, title = "Add new country", description = "Modify or add country here", footerSubmit = "Submit"}){

  const {data: councilsData = [], isLoading: isCouncilLoading, isError: isCouncilError, error: councilsError } = useGetAllCouncils()
  const errorRetrievingCouncils = councilsError?.response ? (councilsError.response.data?.detail || councilsError.response.status) : councilsError?.request ? "Server unreachable. Check your connection." : (councilsError?.message || "Unexpected error")

  const [countryName, setCountryName] = useState('')
  const [delegate1, setDelegate1] = useState('')
  const [delegate2, setDelegate2] = useState('')
  const [delegate3, setDelegate3] = useState('')
  const [delegate4, setDelegate4] = useState('')
  const [speakerPoints, setSpeakerPoints] = useState('0')
  const [login, setLogin] = useState('')
  
  const [councilIds, setCouncilIds] = useState([])
  useEffect(()=>{
    if (councilScopedId !=null) setCouncilIds([councilScopedId])
  }, [councilScopedId])
  
  const onCancel = () =>{
    setCountryName('')
    setDelegate1('')
    setDelegate2('')
    setDelegate3('')
    setDelegate4('')
    setSpeakerPoints('0')
    setLogin('')
    setErrorSubmit('')
    if (councilScopedId !=null) setCouncilIds([councilScopedId])
    else setCouncilIds([])
    setIsAddOpen(false)
  }

  const [errorSubmit, setErrorSubmit] = useState('')
  useEffect(() => {
    if (errorSubmit) setErrorSubmit("");
    }, [countryName, councilIds, delegate1, delegate2, delegate3, delegate4, login, speakerPoints]);


  const onSuccessCallback = () => {
      setErrorSubmit('')
      setCountryName('')
      setDelegate1('')
      setDelegate2('')
      setDelegate3('')
      setDelegate4('')
      setSpeakerPoints('0')
      setLogin('')
      setIsAddOpen(false)
      if (councilScopedId !=null) setCouncilIds([councilScopedId])
      else setCouncilIds([])
    }

  const onErrorCallback = (error) => {
    setErrorSubmit(error?.response ? (error.response.data?.detail || error.response.status) : error?.request ? "Server unreachable. Check your connection." : (error?.message || "Unexpected error"))
  }

  const handleToggleCouncil = (id, checked) => {
    setCouncilIds(prev => {
      if (checked) {
        return prev.includes(id) ? prev : [...prev, id] // helps with accidental double fire 
      }
      return prev.filter(x => x !== id)
    })
  }

  const mutation = useCreateCountry(onSuccessCallback, onErrorCallback)

  const countryNameValid = validateCharExists(countryName)
  const delegate1Valid = validateCharExists(delegate1)
  const loginValid = validateCharExists(login)
  const speakerPointsValid = validatePosInteger(speakerPoints)

  const onAddNew = () =>{
    if (countryNameValid && delegate1Valid && loginValid && speakerPointsValid){
    mutation.mutate({"assigned_country": countryName, delegate1, delegate2, delegate3, delegate4, "councils": councilIds, login, "speaker_points": parseInt(speakerPoints)})
    }
    // modifying via success in mutate will extend behaviour beyond the onsuccess callback in useMutation, so specializes it
    // try to use mutate to define behaviour for that one execution of a variant of the mutation
  }

  if (isCouncilError) {
      const status = councilsError?.response?.status
      if (status === 401){ 
          return <Unauthorized/>
      }
      return <FormModal open={isAddOpen} title={title}>{errorRetrievingCouncils}</FormModal>}
  if (isCouncilLoading) return <FormModal open={isAddOpen} title={title}>Loading councils…</FormModal>

    return (
    <FormModal open={isAddOpen} size={"xl"} onCancel={onCancel} title={title} description={description} onSubmit={onAddNew} footerSubmit={footerSubmit} isLoading={mutation.isPending}>
      <div className='flex flex-col gap-4'>

        <div className='flex flex-col gap-1'>
          <label htmlFor='country-name' className='flex items-center gap-5'>Country Name
            <input
              name="country-name"
              value={countryName}
              className={`flex-1 rounded border px-3 py-2 ${countryNameValid ? 'border-border' : 'border-red-500'}`}
              placeholder='Enter country name here'
              onChange={(e) => setCountryName(e.target.value)}
            />
          </label>
          {!countryNameValid && <p className='text-sm text-red-600'>Must enter a name</p>}
        </div>

        <div className='flex flex-col gap-1'>
          <label htmlFor='delegate1' className='flex items-center gap-5'>Delegate 1 Name
            <input
              name="delegate1"
              value={delegate1}
              className={`flex-1 rounded border px-3 py-2 ${delegate1Valid ? 'border-border' : 'border-red-500'}`}
              placeholder='Enter delegate 1 name here'
              onChange={(e) => setDelegate1(e.target.value)}
            />
          </label>
          {!delegate1Valid && <p className='text-sm text-red-600'>Must enter a name</p>}
        </div>

        <div className='flex flex-col gap-1'>
          <label htmlFor='delegate2' className='flex items-center gap-5'>Delegate 2 Name
            <input
              name="delegate2"
              value={delegate2}
              className='flex-1 rounded border border-border px-3 py-2'
              placeholder='Enter delegate 2 name here'
              onChange={(e) => setDelegate2(e.target.value)}
            />
          </label>
        </div>

        <div className='flex flex-col gap-1'>
          <label htmlFor='delegate3' className='flex items-center gap-5'>Delegate 3 Name
            <input
              name="delegate3"
              value={delegate3}
              className='flex-1 rounded border border-border px-3 py-2'
              placeholder='Enter delegate 3 name here'
              onChange={(e) => setDelegate3(e.target.value)}
            />
          </label>
        </div>

        <div className='flex flex-col gap-1'>
          <label htmlFor='delegate4' className='flex items-center gap-5'>Delegate 4 Name
            <input
              name="delegate4"
              value={delegate4}
              className='flex-1 rounded border border-border px-3 py-2'
              placeholder='Enter delegate 4 name here'
              onChange={(e) => setDelegate4(e.target.value)}
            />
          </label>
        </div>

        <div className='flex flex-col gap-2'>
          <label htmlFor='councils' className='font-medium'>Councils</label>
          <div className='grid grid-cols-1 gap-2 sm:grid-cols-2'>
            {councilsData.map((council) =>(
              !council.is_main && (
                <label key={council.council_id} className='flex items-center justify-between gap-3 rounded border border-border px-3 py-2'>
                  <span className='text-sm'>{council.name}</span>
                  <input
                    type="checkbox"
                    checked={councilIds.includes(council.council_id)}
                    value={council.council_id}
                    name='council-option'
                    onChange={(e) => handleToggleCouncil(council.council_id, e.target.checked)}
                    className='h-4 w-4'
                  />
                </label>
              )
            ))}
          </div>
        </div>
      <div className='flex flex-col gap-1'>
        <label htmlFor="speaker-points" className='flex items-center gap-5'>
          Speaker Points
          <div className='flex items-center gap-2 flex-1'>
            <input
              name='speaker-points'
              type='number'
              value={speakerPoints}
              className={`flex-1 rounded border px-3 py-2 ${speakerPointsValid ? 'border-border' : 'border-red-500'}`}
              placeholder='Enter new value'
              onChange={(e)=>setSpeakerPoints(e.target.value)}
            />

            <button
              type="button"
              onClick={() =>
                setSpeakerPoints(prev => {
                  const n = prev.trim() === "" ? 0 : Number(prev)
                  return String(n + 1)
                })
              }
              className="rounded border border-border px-3 py-2 font-semibold transition hover:bg-gray-100"
            >
              +1
            </button>
          </div>
        </label>

        {!speakerPointsValid && (
          <p className='text-sm text-red-600'>Must enter a positive number</p>
        )}
      </div>

        <div className='flex flex-col gap-1'>
          <label htmlFor='login' className='flex items-center gap-5'>Login Code
            <input
              name="login"
              value={login}
              className={`flex-1 rounded border px-3 py-2 ${loginValid ? 'border-border' : 'border-red-500'}`}
              placeholder='Enter login code here'
              onChange={(e) => setLogin(e.target.value)}
            />
          </label>
          {!loginValid && <p className='text-sm text-red-600'>Must enter a login</p>}
        </div>

        {errorSubmit && <p className='text-sm text-red-600'>{errorSubmit}</p>}

      </div>
    </FormModal>
    )

}

export default CreateCountryForm;

import { useState, useEffect } from 'react';
import FormModal from '../UI/FormModal';
import { useCreateCountry } from '../../hooks/useCountries';
import { useGetAllCouncils } from '../../hooks/useCouncils';
import { validatePosInteger, validateCharExists } from "../../utils/validators.js";

function CreateCountryForm({isAddOpen, setIsAddOpen, councilScopedId}){

  const {data: councilsData, isLoading: isCouncilLoading, isError: isCouncilError } = useGetAllCouncils()

  const [countryName, setCountryName] = useState('')
  const [delegate1, setDelegate1] = useState('')
  const [delegate2, setDelegate2] = useState('')
  const [delegate3, setDelegate3] = useState('')
  const [delegate4, setDelegate4] = useState('')
  const [councilIds, setCouncilIds] = useState([])

  
  const onCancel = () =>{
    setCountryName('')
    setDelegate1('')
    setDelegate2('')
    setDelegate3('')
    setDelegate4('')
    if (councilScopedId !=null) setCouncilIds([councilScopedId])
    setIsAddOpen(false)
  }

  useEffect(()=>{
    if (councilScopedId !=null) setCouncilIds([councilScopedId])
  }, [councilScopedId])

  const [speakerPoints, setSpeakerPoints] = useState('0')
  const [login, setLogin] = useState('')

  const [errorSubmit, setErrorSubmit] = useState('')
  useEffect(() => {
  if (errorSubmit) setErrorSubmit("");
}, [countryName, councilIds, delegate1, delegate2, delegate3, delegate4, login]);
  const onSuccessCallback = () => {
      setErrorSubmit('')
    }

  const onErrorCallback = (error) => {
      console.log("RAW ERROR:", error);
  console.log("error?.message:", error?.message);
  console.log("error?.name:", error?.name);
  console.log("error?.stack:", error?.stack);
  console.log("error?.response:", error?.response);
  console.log("error?.request:", error?.request); // axios puts this on network errors
  setErrorSubmit(!error?.response ? "No Server Response" : "Has Response");
    if (!error?.response) {
      setErrorSubmit("No Server Response");
    }
    else if (error?.response?.status === 404) {
      setErrorSubmit("Invalid Credentials")
    }
    else {
      setErrorSubmit(error.response?.data?.detail || "Creation Failed")
    }
  }

  const handleToggleCouncil = (id, checked) => {
    setCouncilIds((prev) =>
      checked ? [...prev, id] : prev.filter((x) => x !== id)
    )
  }
  const { mutate } = useCreateCountry(onSuccessCallback, onErrorCallback)

  const onAddNew = () =>{
    mutate({"assigned_country": countryName, delegate1, delegate2, delegate3, delegate4, "councils": councilIds, login, "speaker_points": parseInt(speakerPoints)})
    // modifying via success in mutate will extend behaviour beyond the onsuccess callback in useMutation, so specializes it
    // try to use mutate to define behaviour for that one execution of a variant of the mutation
  }

  const countryNameValid = validateCharExists(countryName)
  const delegate1Valid = validateCharExists(delegate1)
  const loginValid = validateCharExists(login)
  const speakerPointsValid = validatePosInteger(speakerPoints)

  if (isCouncilLoading) return <FormModal open={isAddOpen} setOpen={setIsAddOpen} title="Add New Country">Loading councils…</FormModal>
  if (isCouncilError) return <FormModal open={isAddOpen} setOpen={setIsAddOpen} title="Add New Country">Failed to load councils.</FormModal>

    return (
    <FormModal open={isAddOpen} size={"xl"} setOpen={setIsAddOpen} onCancel={onCancel} title={`Add New Country`} description={`Add a new country`} onSubmit={onAddNew} footerSubmit='Submit'>
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
              onClick={() => setSpeakerPoints((prev) =>
                prev === '' ? 1 : Number(prev) + 1
              )}
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
          {!loginValid && <p className='text-sm text-red-600'>Must enter a name</p>}
        </div>

        {errorSubmit && <p className='text-sm text-red-600'>{errorSubmit}</p>}

      </div>
    </FormModal>
    )

}

export default CreateCountryForm;

import { useState, useRef, useEffect } from "react";
import Select from "react-select";
import { useGetAllCountries } from "../../hooks/useCountries.js";
import { useGetAllCouncils } from "../../hooks/useCouncils.js";
import {
  validateCharMin,
  validatePosInteger,
  validateOptionSelected,
  validateFileExists
} from "../../utils/validators.js";
import { useCreateResolution } from "../../hooks/useResolutions.js";
import { makeOptions, customStyles } from "../../utils/helpers.js";

import FormModal from "../UI/FormModal.jsx";
import Unauthorized from "../../pages/public/Unauthorized.jsx";

const CreateResolutionForm = ({ isAddOpen, setIsAddOpen, councilScopedId, title= "Add resolution", description="Add resolution here", footerSubmit = "Submit"}) => {
  const { data: councilsData = [], isLoading: isCouncilsLoading, isError: isCouncilsError, error: councilsError } = useGetAllCouncils();
  const { data: countriesData = [], isLoading: isCountriesLoading, isError: isCountryError, error: countriesError } = useGetAllCountries();

  const errorRetrievingCouncils = councilsError?.response ? (councilsError.response.data?.detail || councilsError.response.status) : councilsError?.request ? "Server unreachable. Check your connection." : (councilsError?.message || "Unexpected error")
  const errorRetrievingCountries = countriesError?.response ? (countriesError.response.data?.detail ||countriesError.response.status) : countriesError?.request ? "Server unreachable. Check your connection." : (countriesError?.message || "Unexpected error");

  const fileInputRef = useRef();
  const [resNum, setNum] = useState(0);
  const [resTitle, setTitle] = useState("");
  const [council, setCouncil] = useState(0);
  const [clauses, setClauses] = useState(0);
  const [submitter, setSubmitter] = useState(0);
  const [seconder, setSeconder] = useState(0);
  const [negator, setNegator] = useState(0);
  const [file, setFile] = useState(null);
  const [fileName, setName] = useState(null);

useEffect(() => {
  if (!councilScopedId && councilsData.length > 0 && council === 0) {
    setCouncil(councilsData[0].council_id);
  }
  else{
    setCouncil(councilScopedId);
  }
}, [councilsData, councilScopedId]);

  const options = makeOptions(countriesData);
  console.log(options)
  const [errorSubmit, setErrorSubmit] = useState("");

  useEffect(() => {
  if (errorSubmit) setErrorSubmit("");
  }, [resNum, resTitle, council, clauses, submitter, seconder, negator, file, fileName]);

  const handleCancel = () =>{
    setNum(0)
    setTitle('')
    setCouncil(0)
    setClauses(0)
    setSubmitter(0)
    setSeconder(0)
    setNegator(0)
    setFile(null)
    setName('')
    setErrorSubmit('')
    if (councilScopedId) setCouncil(councilScopedId)
    else setCouncil(councilsData.length > 0 ? councilsData[0].council_id : 0)
    setIsAddOpen(false)
  }

  const onSuccessCallback = () => {
      setErrorSubmit('')
      setTitle('')
      setNum(0)
      setClauses(0)
      setSubmitter(0)
      setSeconder(0)
      setNegator(0)
      setFile(null)
      setName('')
      if (councilScopedId) setCouncil(councilScopedId)
      else setCouncil(councilsData.length > 0 ? councilsData[0].council_id : 0)
      setIsAddOpen(false)
    }

  const onErrorCallback = (error) => {
    setErrorSubmit(error?.response ? (error.response.data?.detail || error.response.status) : error?.request ? "Server unreachable. Check your connection." : (error?.message || "Unexpected error"))
  }

  const mutation = useCreateResolution(onSuccessCallback, onErrorCallback);

  const handleFileUpload = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    setFile(selectedFile);
    setName(selectedFile.name);
  };

  const handleFileClear = () => {
    setFile(null);
    setName(null)
    fileInputRef.current.value = null;
  };

  const validResolutionTitle = validateCharMin(resTitle)
  const validResolutionNumber = validatePosInteger(resNum)
  const validClause = validatePosInteger(clauses)
  const validSubmitter = validateOptionSelected(submitter)
  const validSeconder = validateOptionSelected(seconder)
  const validNegator = validateOptionSelected(negator)
  const validFile = validateFileExists(file)
  const validCouncil = validatePosInteger(council)

  const handleSubmit = () => {
    console.log('here')
    console.log(resTitle, resNum, council, clauses, submitter, seconder, negator, file)
    console.log(validResolutionTitle, validResolutionNumber, validCouncil, validClause, validSubmitter, validSeconder, validNegator, validFile)
    if (!validResolutionTitle || !validResolutionNumber || !validCouncil || !validClause || !validSubmitter || !validSeconder || !validNegator || !validFile) return

    const formData = new FormData();
    formData.append("title", resTitle);
    formData.append("clauses", clauses);
    formData.append("number", resNum);
    formData.append("council_id", council);
    formData.append("submitter", submitter);
    formData.append("seconder", seconder);
    formData.append("negator", negator);
    formData.append("file", file);
    
    console.log("submitting formdata", formData)
    mutation.mutate(formData);
  };

  if (isCountryError) {
        const status = countriesError?.response?.status
        if (status === 401){
            return <Unauthorized/>
        }
      return <FormModal open={isAddOpen} title={title} onCancel={handleCancel}>{errorRetrievingCountries}</FormModal>}
    if (isCountriesLoading) return <FormModal open={isAddOpen} title={title} onCancel={handleCancel}>Loading countries…</FormModal>

  if (isCouncilsError) {
      const status = councilsError?.response?.status
      if (status === 401){ 
          return <Unauthorized/>
      }
      return <FormModal open={isAddOpen} title={title} onCancel={handleCancel}>{errorRetrievingCouncils}</FormModal>}
  if (isCouncilsLoading) return <FormModal open={isAddOpen} title={title} onCancel={handleCancel}>Loading councils…</FormModal>

  return (
 <FormModal
  open={isAddOpen}
  size={"xl"}
  onCancel={handleCancel}
  title={title}
  description={description}
  onSubmit={handleSubmit}
  footerSubmit={footerSubmit}
  isLoading={mutation.isPending}
>
  <h2 className="text-xl font-semibold text-text-primary">Create Resolution</h2>

  <div className="mt-4 space-y-6">

    <div className="rounded-xl border border-border bg-surface p-4 shadow-sm">
      <label className="block text-sm font-medium text-text-primary mb-2">
        Resolution PDF
      </label>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary/30"
          onClick={() => fileInputRef.current.click()}
        >
          Choose File
        </button>

        <span className="text-sm text-text-secondary">
          {fileName || "No file selected"}
        </span>

        {file && (
          <button
            type="button"
            onClick={handleFileClear}
            className="text-sm font-medium text-primary underline underline-offset-2 hover:opacity-90"
          >
            Clear
          </button>
        )}
      </div>

      <input
        type="file"
        accept="application/pdf"
        ref={fileInputRef}
        onChange={handleFileUpload}
        className="hidden"
      />
    </div>

    <div className="space-y-2">
      <label className="block text-sm font-medium text-text-primary">
        Resolution Title
      </label>
      <input
        type="text"
        value={resTitle}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-text-primary shadow-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
      />
      {!validateCharMin(resTitle) && (
        <p className="text-sm text-system-error">Minimum 3 characters</p>
      )}
    </div>

    <div className="space-y-2">
      <label className="block text-sm font-medium text-text-primary">
        Council / Assembly
      </label>

      {!councilScopedId && (isCouncilsLoading ? (
        <p className="text-sm text-text-secondary">Loading councils...</p>
      ) : (
        <select
          value={council}
          onChange={(e) => { console.log(e.target.value); setCouncil(Number(e.target.value))}}
          disabled={councilScopedId}
          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-text-primary shadow-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
        >
          {councilsData.map((c) => (
            <option key={c.council_id} value={c.council_id}>
              {c.name}
            </option>
          ))}
        </select>
      ))}

      {councilScopedId && (
        <p className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-primary shadow-sm">
          {councilsData.find(item => item.council_id === councilScopedId)?.name ?? null}
        </p>
      )}
    </div>

    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-text-primary">
          Resolution #
        </label>
        <input
          type="number"
          value={resNum}
          onChange={(e) => setNum(+e.target.value)}
          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-text-primary shadow-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-text-primary">
          # of Clauses
        </label>
        <input
          type="number"
          value={clauses}
          onChange={(e) => setClauses(+e.target.value)}
          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-text-primary shadow-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
      </div>
    </div>

    <div className="space-y-2">
      <label className="block text-sm font-medium text-text-primary">
        Submitter
      </label>
      <div className="rounded-lg border border-border bg-background p-1 shadow-sm">
        <Select options={options} styles={customStyles} onChange={(o) => setSubmitter(o?.value)} />
      </div>
    </div>

    <div className="space-y-2">
      <label className="block text-sm font-medium text-text-primary">
        Seconder
      </label>
      <div className="rounded-lg border border-border bg-background p-1 shadow-sm">
        <Select options={options} styles={customStyles} onChange={(o) => setSeconder(o?.value)} />
      </div>
    </div>

    <div className="space-y-2">
      <label className="block text-sm font-medium text-text-primary">
        Negator
      </label>
      <div className="rounded-lg border border-border bg-background p-1 shadow-sm">
        <Select options={options} styles={customStyles} onChange={(o) => setNegator(o?.value)} />
      </div>
    </div>

    {/* Error */}
  {errorSubmit && (
    <p className="...">
      {typeof errorSubmit === "string" ? errorSubmit : JSON.stringify(errorSubmit)}
    </p>
  )}
  </div>
</FormModal>
  )}

export default CreateResolutionForm
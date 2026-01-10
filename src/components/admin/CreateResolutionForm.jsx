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

const CreateResolution = ({ isAddOpen, setIsAddOpen, councilScopedId }) => {
  const { data: councilsData, isLoading: isCouncilsLoading, isError: isCouncilsError } = useGetAllCouncils();
  const { data: countriesData, isLoading: isCountriesLoading, isError: isCountryError } = useGetAllCountries();

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
  const [errorSubmit, setErrorSubmit] = useState("");

  const options = makeOptions(countriesData);

  const onSuccessCallback = () => {
    setErrorSubmit("");
  };

  useEffect(()=>{
      if (councilScopedId !=null) setCouncil(councilScopedId)
    }, [councilScopedId])

  const onErrorCallback = (error) => {
    if (!error?.response) setErrorSubmit("No Server Response");
    else setErrorSubmit(error.response?.data?.detail || "Upload Failed");
  };

  const { mutate } = useCreateResolution(onSuccessCallback, onErrorCallback);

  const handleFileUpload = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    setFile(selectedFile);
    setName(selectedFile.name);
  };

  const handleFileClear = () => {
    setFile(null);
    fileInputRef.current.value = null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !validateCharMin(resTitle) ||
      !validatePosInteger(resNum) ||
      !validatePosInteger(clauses) ||
      !validateOptionSelected(submitter) ||
      !validateOptionSelected(seconder) ||
      !validateOptionSelected(negator) ||
      !validateFileExists(file)
    ) {
      setErrorSubmit("Please fix the errors above");
      return;
    }

    const formData = new FormData();
    formData.append("title", resTitle);
    formData.append("clauses", clauses);
    formData.append("council_id", council);
    formData.append("submitter", submitter);
    formData.append("seconder", seconder);
    formData.append("negator", negator);
    formData.append("file", file);

    mutate(formData);
  };

  const handleCancel = () =>{
    setNum('')
    setTitle('')
    setCouncil(0)
    setClauses(0)
    setSubmitter(0)
    setSeconder(0)
    setNegator(0)
    setFile(null)
    setName('')
    setErrorSubmit('')
    if (councilScopedId !=null) setCouncil(councilScopedId)
  }

  if (isCouncilsError || isCountryError) return <p>Error loading data</p>;

  return (
    <FormModal open={isAddOpen} size={"xl"} setOpen={setIsAddOpen} onCancel={handleCancel} title={`Add New Resolution`} description={`Add a new resolution`} onSubmit={handleSubmit} footerSubmit='Submit'>
      <h2>Create Resolution</h2>

      <div>
        <label className="block mb-1">Resolution PDF</label>
        <div className="flex items-center gap-4">
          <button
            type="button"
            className="btn-secondary"
            onClick={() => fileInputRef.current.click()}
          >
            Choose File
          </button>
          <span className="text-sm text-muted">
            {fileName || "No file selected"}
          </span>
          {file && (
            <button type="button" onClick={handleFileClear} className="text-sm underline">
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

      <div>
        <label>Resolution Title</label>
        <input
          type="text"
          value={resTitle}
          onChange={(e) => setTitle(e.target.value)}
        />
        {!validateCharMin(resTitle) && (
          <p className="text-sm text-system-error">Minimum 3 characters</p>
        )}
      </div>

      <div>
        <label>Council / Assembly</label>
        {isCouncilsLoading ? (
          <p>Loading councils...</p>
        ) : (
          <select value={council} onChange={(e) => setCouncil(Number(e.target.value))}>
            {councilsData.map((c) => (
              <option key={c.council_id} value={c.council_id}>
                {c.name}
              </option>
            ))}
          </select>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label>Resolution #</label>
          <input type="number" value={resNum} onChange={(e) => setNum(+e.target.value)} />
        </div>
        <div>
          <label># of Clauses</label>
          <input type="number" value={clauses} onChange={(e) => setClauses(+e.target.value)} />
        </div>
      </div>

      <div>
        <label>Submitter</label>
        <Select options={options} styles={customStyles} onChange={(o) => setSubmitter(o.value)} />
      </div>

      <div>
        <label>Seconder</label>
        <Select options={options} styles={customStyles} onChange={(o) => setSeconder(o.value)} />
      </div>

      <div>
        <label>Negator</label>
        <Select options={options} styles={customStyles} onChange={(o) => setNegator(o.value)} />
      </div>

      <button type="submit" className="btn-primary w-full">
        Upload Resolution
      </button>

      {errorSubmit && (
        <p className="text-center text-system-error text-sm">{errorSubmit}</p>
      )}
    </FormModal>
  );
};

export default CreateResolution;

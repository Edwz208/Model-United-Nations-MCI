import { useState, useRef } from "react";
import "./CreateResolution.css";
import Select from "react-select";
import useCountriesData from "../../hooks/useCountriesData.js";
import useCouncilsData from "../../hooks/useCouncilsData.js";
import { validateCharMin, validatePosInteger, validateOptionSelected, validateFileExists } from "../../utils/validators.js";
import { useCreateResolution } from "../../hooks/useCreateResolution.js";
import { Options, customStyles } from "../../utils/helpers.js";

const CreateResolution = (setCreateNewResolution) => {

  const { data: countriesData, isLoading: isCountriesLoading, isError: isCountryError } = useCountriesData();
  const { data: councilsData, isLoading: isCouncilsLoading, isError: isCouncilsError } = useCouncilsData()

  const fileInputRef = useRef();
  const [resNum, setNum] = useState(0);
  const [resTitle, setTitle] = useState("");
  const [council, setCouncil] = useState(1);
  const [clauses, setClauses] = useState(0);
  const [submitter, setSubmitter] = useState(0);
  const [seconder, setSeconder] = useState(0);
  const [negator, setNegator] = useState(0);
  const [file, setFile] = useState(null);
  const [fileName, setName] = useState(null);
  const options = countriesData ? Options(countriesData) : []
  const [errorSubmit, setErrorSubmit] = useState('');

    const onSuccessCallback = () => {
      setErrorSubmit('')
      setCreateNewResolution(false)
  }

  const onErrorCallback = (error) => {
    if (!error?.response) {
      setErrorSubmit("No Server Response");
    }
    else if (error?.response?.status === 404) {
      setErrorSubmit("Invalid Credentials")
    }
    else {
      setErrorSubmit(error.response?.data?.detail || "Login Failed")
    }
  }
  
  const { mutate } = useCreateResolution(onSuccessCallback, onErrorCallback);

  const handleFileUpload = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    setFile(selectedFile);
    const filename = selectedFile.name;
    setName(filename);
  };

  const handleFileClear = () => {
    setFile(null);
    fileInputRef.current.value = null;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateCharMin(resTitle) || validatePosInteger(resNum) || validatePosInteger(clauses) || validateOptionSelected(submitter) || validateOptionSelected(seconder) || validateOptionSelected(negator) || validateFileExists(file)) {
      setErrorSubmit(true)
      return
    }
    setErrorSubmit(false)
    const formData = new FormData();
    formData.append("title", resTitle);
    formData.append("number", resNum);
    formData.append("clauses", clauses);
    formData.append("council", council);
    formData.append("submitter", submitter);
    formData.append("seconder", seconder);
    formData.append("negator", negator);
    formData.append("file", file);
    mutate(formData)
  }

  return (
    <>
      <form className="form" onSubmit={handleSubmit}>
        <div style={{backgroundColor: "#414559", color: "white", borderRadius: "8px", display: "flex", gap: "1rem", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
          <label style={{ cursor: "pointer" }} htmlFor="pdf">Upload PDF</label>
          <input
            type="file"
            id="pdf"
            accept="application/pdf"
            onChange={handleFileUpload}
            style={{ display: "none" }}
            ref={fileInputRef}
          />
          {file ? (
            <>
              <p style={{ display: "inline", marginLeft: "2Rem" }}>{fileName}</p>
              <button type="button" onClick={handleFileClear}>
                Clear File
              </button>
            </>
          ): (
            <p style={{ display: "inline", marginLeft: "2Rem" }}>
              No File Selected
            </p>
          )}
        </div>
        <br />
        <label htmlFor="ResTitle">Resolution Title</label>
        <input
          className="textInput"
          type="text"
          id="ResTitle"
          name="Resolution Title"
          value={resTitle}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        {validateCharMin(resTitle) && <p className="errorMessage">Must be a minimum of 3 characters</p>}


        <label className="label" htmlFor="council">
          Council/Assembly
        </label>
        {isCouncilsLoading ? <p>Loading countries</p>
        : <select
          name="council"
          id="council"
          value={council}
          onChange={(e) => setCouncil(Number(e.target.value))}
          className="textInput"
        >
          {councilsData.map((council, i) => {
            return (
              <option value={i + 1} key={i}>
                {council.name}
              </option>
            );
          })}
        </select>}

        <label className="label" htmlFor="resNum">Resolution #</label>
        <input
          className="textInput"
          step="1"
          type="number"
          id="resNum"
          name="resNum"
          value={resNum}
          placeholder="Res #"
          onChange={(e) => {
            setNum(Number(e.target.value));
          }}
        />
        {validatePosInteger(resNum) && <p className="errorMessage">Must be a positive integer</p>}
        <label htmlFor="clauses" className="label"># of Clauses</label>
        <input
          type="number"
          className="textInput"
          id="clauses"
          value={clauses}
          name="clauses"
          step="1"
          onChange={(e) => {
            setClauses(Number(e.target.value));
          }}
        />
        {validatePosInteger(clauses) && <p className="errorMessage">Must be a positive integer</p>}
        <label htmlFor="submitter" className="label">Submitter</label>
        {isCountriesLoading ? <p>Loading countries...</p>
        : <Select
          options={options}
          styles={customStyles}
          onChange={(option) => {
            setSubmitter(option.value);
          }}
        />}
        {validateOptionSelected(submitter) && <p className="errorMessage">Please select an option</p>}
        <label htmlFor="seconder" className="label">Seconder</label>
        {
        isCountriesLoading ? <p>Loading countries...</p> :
        <Select
          options={options}
          styles={customStyles}
          onChange={(option) => {
            setSeconder(option.value);
          }}
        />}
        {validateOptionSelected(seconder) && <p className="errorMessage">Please select an option</p>}
        <label htmlFor="negator" className="label">Negator</label>
        {isCountriesLoading ? <p>Loading countries...</p>
        : <Select
          options={options}
          styles={customStyles}
          onChange={(option) => {
            setNegator(option.value);
          }}
        />}
        {validateOptionSelected(negator) && <p className="errorMessage">Please select an option</p>}
        <br />
        <button className="submit">Upload Resolution</button>
        {errorSubmit && <p className="errorMessage">{errorSubmit}</p>}
      </form>
    </>
  );
};

export default CreateResolution;
import React from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate.js";
import { useState, useRef } from "react";
import "./Resolutions.css";
import Select from "react-select";
import { useQuery } from '@tanstack/react-query'
import { useEffect, useMemo } from 'react'

const ResolutionsAdmin = () => {
  const axiosPrivate = useAxiosPrivate();
  const {data, isLoading} = useQuery({
    queryKey: ['countriesData'],
    staleTime: 2*60*1000,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    queryFn: async ()=>{
      const res = await axiosPrivate.get('/get-countries') //useQuery is asynchronous, but render is synchronous
      //When you write an async function, JavaScript pauses only inside that function at the await.
//React components themselves cannot be async in the render function. The function that React calls to render a component runs synchronously.
      console.log(res?.data)
      return res?.data
    }
  }) // queryFn returns an object that contains data as well
  const options = useMemo(()=>{
  if (!data) return [];
    return data.map(country => ({
    value: country.id,
    label: country.country,
    }));
    }, [data]);

  const customStyles = {
    control: (provided) => ({
      ...provided,
      padding: "12px 20px",
      backgroundColor: "#ffffff",
      borderRadius: "8px",
      border: "none",
      marginTop: "5px",
      marginBottom: "20px",
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: '#242424',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#414559' : '#242424',
      marginStart: '10px',
      marginEnd: '10px',
      color: '#ffffff',
    }),
  };

  const councilsList = [
    "General Assembly",
    "Security Council",
    "Economic Council",
    "Environmental Council",
  ];
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
  const [errorMsgs, setErrors] = useState([null, null, null, null,null,null, null]); // Upload File, Title, Council, Resolution #, # Clauses, submiter seconder negator

  const handleUpload = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    setFile(selectedFile);
    const filename = selectedFile.name;
    setName(filename);
  };

  const handleClear = () => {
    setFile(null);
    fileInputRef.current.value = null;
  };

  const charMin = (string, i, newErrors) => {
    if (string.length < 3) {
        newErrors[i] = "Must be a minimum of 3 characters";
      }
    else{
      newErrors[i] = ""
        }
  };
    

  const integerCheck = (integer, i, newErrors) => {
    if (integer < 0){
      newErrors[i] = "Must be greater than or equal to 0"
    } 
    else if (!Number.isInteger(integer)){
      newErrors[i] = "Must be an integer";
    }
    else{
      newErrors[i] = "";
    }
      }
    
  const handleSelector = (option, i, newErrors) => {
    if (!option){
      newErrors[i] = "Please select an option";
    }
    else{
      newErrors[i] = null;
    }
  };

  const handleSubmit = async (e) => {
    const newErrors=[null, null, null, null, null,null,null]
    e.preventDefault();
    
    const formData = new FormData();
    if (!file){
      newErrors[0] = "No file selectedj"
    }
    else{
      newErrors[0] = "";
    }
    charMin(resTitle, 1, newErrors);
    integerCheck(resNum, 2, newErrors);
    integerCheck(clauses, 3, newErrors);
    handleSelector(submitter, 4, newErrors)
    handleSelector(seconder, 5, newErrors)
    handleSelector(negator, 6, newErrors)
    
const hasErrors = newErrors.some((msg) => msg); 
    setErrors(newErrors)
    
if (hasErrors) return;
      console.log(submitter)
    formData.append("title", resTitle);
    formData.append("number", resNum);
    formData.append("clauses", clauses);
    formData.append("council", council);
    formData.append("submitter", submitter);
    formData.append("seconder", seconder);
    formData.append("negator", negator);
    formData.append("file", file);
    setErrors([null, null, null, null,null,null, null])
    console.log(resTitle, typeof resTitle)
    console.log(resNum, typeof resNum)
    console.log(clauses, typeof clauses)
    console.log(council, typeof council)
    console.log(submitter, typeof submitter)
    console.log(seconder, typeof seconder)
    console.log(negator, typeof negator)

        try {
          const response = await axiosPrivate.post("/upload-resolution", formData);
          console.log(response?.data)
        } catch (err) {
          console.log(err);
        }
  };
  return (
    <>
      <form className="form" onSubmit={handleSubmit}>
        <div style={{backgroundColor: "#414559", color: "white", borderRadius: "8px", display: "flex", gap: "1rem", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
          <label style={{ cursor: "pointer" }} htmlFor="pdf">Upload PDF</label>
          <input
            type="file"
            id="pdf"
            accept="application/pdf"
            onChange={handleUpload}
            style={{ display: "none" }}
            ref={fileInputRef}
          />
          {file ? (
            <>
              <p style={{ display: "inline", marginLeft: "2Rem" }}>{fileName}</p>
              <button type="button" onClick={handleClear}>
                Clear File
              </button>
            </>
          ) : errorMsgs[0] ? (
            <p style={{ display: "inline", marginLeft: "2Rem", color: "red" }}>
              No File Selected
            </p>
          ) : (
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
        <div style={{ height: errorMsgs[1] ? "auto" : "1rem" }}>
          {errorMsgs[1] ? <p style={{ margin: 0, color: "red" }}>{errorMsgs[1]}</p> : null}
        </div>

        <label className="label" htmlFor="council">
          Council/Assembly
        </label>
        <select
          name="council"
          id="council"
          value={council}
          onChange={(e) => setCouncil(Number(e.target.value))}
          className="textInput"
        >
          {councilsList.map((council, i) => {
            return (
              <option value={i + 1} key={i}>
                {council}
              </option>
            );
          })}
        </select>

        <label className="label" htmlFor="resNum">
          Resolution #
        </label>
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
        <div style={{ height: errorMsgs[2] ? "auto" : "1rem" }}>
          {errorMsgs[2] ?<p style={{ margin: 0, color:"red" }}>{errorMsgs[2]}</p> : null}
        </div>
        <label htmlFor="clauses" className="label">
          # of Clauses
        </label>
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
        <div style={{ height: errorMsgs[1] ? "auto" : "1rem" }}>
          {errorMsgs[3] ? <p style={{ margin: 0, color: "red"}}>{errorMsgs[3]}</p> : null}
        </div>
        <label htmlFor="submitter" className="label">Submitter</label>
        {isLoading ? <p>Loading countries...</p>
        : <Select
          options={options}
          styles={customStyles}
          onChange={(option) => {
            setSubmitter(option.value);
          }}
        />}
        <div style={{ height: errorMsgs[1] ? "auto" : "1rem" }}>
        {errorMsgs[4] ? <p style={{ margin: 0, color: "red"}}>{errorMsgs[4]}</p> : null}
        </div>
        <label htmlFor="seconder" className="label">Seconder</label>
        {
        isLoading ? <p>Loading countries...</p> :
        <Select
          options={options}
          styles={customStyles}
          onChange={(option) => {
            setSeconder(option.value);
          }}
        />}
        <div style={{ height: errorMsgs[5] ? "auto" : "1rem" }}>
        {errorMsgs[5] ? <p style={{ margin: 0, color: "red"}}>{errorMsgs[5]}</p> : null}
        </div>
        <label htmlFor="negator" className="label">Negator</label>
        {isLoading ? <p>Loading countries...</p>
        : <Select
          options={options}
          styles={customStyles}
          onChange={(option) => {
            setNegator(option.value);
          }}
        />}
        <div style={{ height: errorMsgs[6] ? "auto" : "1rem" }}>
        {errorMsgs[6] ? <p style={{ margin: 0, color: "red"}}>{errorMsgs[6]}</p> : null}
        </div>
        <br />
        <button className="submit">Upload Resolution</button>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "20px",
          }}
        >
        </div>
      </form>
    </>
  );
};

export default ResolutionsAdmin;
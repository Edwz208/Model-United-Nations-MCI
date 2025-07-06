import React from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate.js";
import { useState, useRef } from "react";
import "./Resolutions.css";

const ResolutionsAdmin = () => {
  const axiosPrivate = useAxiosPrivate();
  const fileInputRef = useRef();
  const [resNum, setNum] = useState(0);
  const [resTitle, setTitle] = useState("");
  const [council, setCouncil] = useState(1);
  const [clauses, setClauses] = useState(0);
  const [submitter, setSubmitter] = useState("");
  const [seconder, setSeconder] = useState("");
  const [negator, setNegator] = useState("");
  const [file, setFile] = useState(null);
  const [fileName, setName] = useState(null);

  // try{
  //   const response = await axiosPrivate.post('/new-resolution', formData,{
  //     "headers": {
  //       "Content-type": undefined
  //     },
  //   })
  // }
  // catch (err){
  //   console.log(err)
  // }
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (!file) {
      alert("Please upload a file first.");
      return;
    }
    formData.append("title", resTitle);
    formData.append("number", resNum);
    formData.append("clauses", clauses);
    formData.append("council", council);
    console.log(council);
    formData.append("submitter", submitter);
    formData.append("seconder", seconder);
    formData.append("negator", negator);
    formData.append("file", file);
  };
  return (
    <>
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="pdf">Upload PDF</label>
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
        ) : (
          <p style={{ display: "inline", marginLeft: "2Rem" }}>
            No File Selected
          </p>
        )}
        <br />
        <label htmlFor="ResTitle">Resolution Title</label>
        <input
          type="text"
          id="ResTitle"
          name="Resolution Title"
          value={resTitle}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <br />

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
          <option value={1}>General Assembly</option>
          <option value={2}>Economic Council</option>
          <option value={3}>Security Council</option>
          <option value={4}>Environmental Council</option>
        </select>

        <label className="label" htmlFor="resNum">
          Resolution #
        </label>
        <input
          className="textInput"
          step="1"
          type="number"
          id="resNum"
          min="1"
          name="resNum"
          value={resNum}
          placeholder="Res #"
          onChange={(e) => {
            setNum(e.target.value);
          }}
        />
        <label htmlFor="clauses" className="label"># of Clauses</label>
      <input type ="number" className="textInput" id = "clauses" value={clauses} name = "clauses" step="1" min="0" onChange={(e)=>{setClauses(e.target.value)}} required/>
      <br/>
        <label htmlFor="submitter">Submitter</label>
        <input
          placeholder="canada"
          className="textInput"
          type="text"
          value={submitter}
          id="submitter"
          name="submitter"
          onChange={(e) => {
            setSubmitter(e.target.value);
          }}
        />
        <label htmlFor="seconder">Seconder</label>
        <input
          placeholder="bangladesh"
          className="textInput"
          type="text"
          value={seconder}
          id="seconder"
          name="seconder"
          onChange={(e) => {
            setSeconder(e.target.value);
          }}
        />
        <label htmlFor="negator">Negator</label>
        <input
          placeholder="japan"
          className="textInput"
          type="text"
          value={negator}
          id="negator"
          name="negator"
          onChange={(e) => {
            setNegator(e.target.value);
          }}/>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "20px",
          }}
        >
          <button className="submit">Upload Amendment</button>
        </div>
      </form>
    </>
  );
};

export default ResolutionsAdmin;

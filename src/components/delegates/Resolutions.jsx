import React from 'react'
import useAxiosPrivate from '../../hooks/useAxiosPrivate.js'
import {useState, useRef} from 'react'

const Resolutions = () => {
  const fileInputRef = useRef();
  const axiosPrivate = useAxiosPrivate();
  const [resNum, setNum] = useState(0);
  const [resTitle, setTitle] = useState("");
  const [council, setCouncil] = useState(1)
  const [clauses, setClauses] = useState(0);
  const [submitter, setSubmitter] = useState("");
  const [seconder, setSeconder] = useState("");
  const [negator, setNegator] = useState("");
  const [file, setFile] = useState(null);
  const [fileName, setName] = useState(null)

const handleUpload = (e) => {
  const selectedFile = e.target.files[0];
  if (!selectedFile) return;
  setFile(selectedFile);
  const filename = selectedFile.name
  setName(filename)
};
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

  const handleClear = () => {
    setFile(null);
    fileInputRef.current.value = null;
  };
  const handleSubmit = async (e)=>{
    e.preventDefault();
    const formData = new FormData();
    if (!file){
      alert("Please upload a file first.")
      return
    }
    formData.append("title", resTitle)
    formData.append("number", resNum)
    formData.append("clauses", clauses)
    formData.append("council", council)
    console.log(council)
    formData.append("submitter", submitter)
    formData.append("seconder", seconder)
    formData.append("negator", negator)
    formData.append("file", file)

  }
  return (<>
    <h1>Resolution</h1>
    <form onSubmit ={handleSubmit}>
      <label htmlFor="pdf">Upload PDF</label>
      <input type="file" id = "pdf" accept="application/pdf" onChange={handleUpload} style={{"display": "none"}} ref={fileInputRef}/>
      {file ? (<><p style={{"display": "inline", "marginLeft": "2Rem"}}>{fileName}</p> <button type="button" onClick={handleClear}>Clear File</button></>) : <p style={{"display": "inline", "marginLeft": "2Rem"}}>No File Selected</p>}
      <br/>
      <label htmlFor = "ResTitle">Resolution Title</label>
      <input type='text' id="ResTitle" name= "Resolution Title" value={resTitle} onChange={(e)=>{setTitle(e.target.value)}} required/>
      <br/>
      <label htmlFor="resNum">Res #</label>
      <input type='number' id="resNum" name = "resNum" value={resNum} placeholder="Res #" onChange={(e)=>{setNum(e.target.value)}} required/>
      <label htmlFor="clauses">Clause #</label>
      <input type ="number" id = "clauses" value={clauses} name = "clauses" step="1" onChange={(e)=>{setClauses(e.target.value)}} required/>
      <br/>
      <fieldset>
        <legend>Council/Assembly</legend>
        <input type ="radio" checked={council ==1} name = "council" id = "council" defaultChecked={true}value={1} onChange={(e)=>{ setCouncil(e.target.value)}}/>
        <label htmlFor="council">General Assembly</label>
        <input type ="radio" checked={council==2}name = "council" id = "council" value={2} onChange={(e)=>{ setCouncil(e.target.value)}}/>
        <label htmlFor="council">Economic Council</label>
        <input type ="radio" checked={council==3} name = "council" id = "council" value={3} onChange={(e)=>{ setCouncil(e.target.value)}}/>
        <label htmlFor="council">Security Council</label>
        <input type ="radio" checked={council==4} name = "council" id = "council" value={4} onChange={(e)=>{ setCouncil(e.target.value)}}/>
        <label htmlFor="council">Environmental Council</label>
      </fieldset>
      <br/>
      <label htmlFor="submitter">Submitter</label>
      <input type='text' value = {submitter} id = "submitter"name = "submitter" onChange={(e)=>{setSubmitter(e.target.value)}} required/>
      <label htmlFor="seconder">Seconder</label>
      <input type='text' value={seconder} id="seconder" name = "seconder" onChange={(e)=>{setSeconder(e.target.value)}} required/>
      <br/>
      <label htmlFor="negator">Negator</label>
      <input type='text' value={negator} id="negator" name = "negator" onChange={(e)=>{setNegator(e.target.value)}} required/>
       <br/>
      <button>Upload Resolution</button>
    </form>
    </>
  )
}

export default Resolutions
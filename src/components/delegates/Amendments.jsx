import React from 'react'
import useAxiosPrivate from '../../hooks/useAxiosPrivate.js'
import { useState, useEffect } from 'react'
import './Amendments.css'

const Amendments = () => {
  const axiosPrivate = useAxiosPrivate();

  const councilsList = ["General Asssembly", "Security Council", "Environmental Council", "Economic Council"]
  const [resNum, setNum] = useState(1);
  const [council, setCouncil] = useState(1)
  const [submitter, setSubmitter] = useState("");
  const [seconder, setSeconder] = useState("");
  const [tertiary, setTertiary] = useState("");
  const [input, setInput] = useState("");
  const [data, setData] = useState([]);
  const [resolutionData, setResolutionData] = useState(null); // Changed to null
  const [showNewResolutions, showNewResolutionsData] = useState(false);

  const showExistingResolution = (title) => {
    const getResolution = async () => {
      try {
        const response = await axiosPrivate.get(`/select-resolution/${title}`);
        setResolutionData(response.data); // Remove JSON.stringify
      } catch (err) {
        console.error('Error fetching resolution:', err);
      }
    };
    getResolution();
  };

  useEffect(() => {
    const fetchResolutions = async () => {
      try {
        const response = await axiosPrivate.get('/resolutions');
        setData(response.data);
      } catch (err) {
        console.error('Error fetching resolutions:', err);
      }
    };
    fetchResolutions();
  }, []);

  const newResolution = () => {
    showNewResolutionsData(true);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", resTitle)
    formData.append("number", resNum)
    formData.append("clauses", clauses)
    formData.append("council", council)
    formData.append("submitter", submitter)
    formData.append("seconder", seconder)
    formData.append("negator", tertiary)
    formData.append("file", file)
  }

  const handleChange = (key, value) => {
    if(key == "submitter" || key == "seconder" || key == "negator" || key == "clauses" || key == "status" || key == "title") {
      return String(key).charAt(0).toUpperCase() + String(key).slice(1);
    } else if (key == "number") {
      return "Resolution #";
    } else if (key == "council_id") {
      return "Council";
    }
  }

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div style={{ width: "20%", height: "100vh", backgroundColor: "#41455994", borderRadius: "12px", display: "flex", marginLeft: "10px", marginBottom: "10px", marginTop: "10px", flexDirection: "column"}}>
        <button onClick={() => { newResolution() }} style={{ backgroundColor: "#04a5e5"}}className='resButton'>New Amendment</button>
        {data.map((resolution, i) => (
          <button 
            key={i} 
            onClick={() => { 
              showNewResolutionsData(false); 
              showExistingResolution(resolution.title); 
            }} 
            className='resButton'
          >
            {resolution.title}
          </button>
        ))}
      </div>

      {showNewResolutions ? 
      ( <div style={{ width: "80%", display: "flex"}}>
          <form className="form" onSubmit={handleSubmit}>
          <label className="label" htmlFor="council">Council/Assembly</label>
          <select
            name="council"
            id="council"
            value={council}
            onChange={(e) => setCouncil(Number(e.target.value))}
            className='textInput'
          >
            {councilsList.map((council, i) => {
              return <option value={i + 1}>{council}</option>
            })}
          </select>

          <label className="label" htmlFor="resNum">Affected Resolution #</label>
          <input className="textInput" type='number' id="resNum" min="1" name="resNum" value={resNum} placeholder="Res #" onChange={(e) => { setNum(e.target.value) }} required />
          <label className="label" htmlFor="input">Change</label>
          <textarea
            className="textInput"
            id="input"
            name="input"
            rows="6"
            cols="50"
            placeholder="Strike clause X because Y"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          ></textarea>

          <label htmlFor="submitter">Submitter</label>
          <input placeholder="canada" className="textInput" type='text' value={submitter} id="submitter" name="submitter" onChange={(e) => { setSubmitter(e.target.value) }} />
          <label htmlFor="seconder">Seconder (optional)</label>
          <input placeholder="bangladesh" className="textInput" type='text' value={seconder} id="seconder" name="seconder" onChange={(e) => { setSeconder(e.target.value) }} />
          <label htmlFor="tertiary">Tertiary (optional)</label>
          <input placeholder="japan" className="textInput" type='text' value={tertiary} id="tertiary" name="tertiary" onChange={(e) => { setTertiary(e.target.value) }} />
          <div style={{ "display": "flex", "justifyContent": "center", "alignItems": "center", marginTop: "20px" }}>
            <button className='submit'>Upload Amendment</button>
          </div>
        </form>        
    </div>
    )  : (
        <div style={{ width: '80%' }}>
          {resolutionData ? (
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'auto 1fr', 
              gap: '10px',
              padding: '20px',
              border: '3px solid #414559',
              borderRadius: '8px',
              marginLeft: '10px',
              marginRight: '10px',
              marginTop: '10px'
            }}>
              {Object.entries(resolutionData).map(([key, value]) => {
                if (key === 'url') {
                  return (
                    <React.Fragment key={key}>
                      <div style={{ fontWeight: 'bold' }}>Document:</div>
                      <div>
                        <a href={value} target="_blank" rel="noopener noreferrer">
                          View Resolution
                        </a>
                      </div>
                    </React.Fragment>
                  );
                }
                if(key === 'id') {
                  return
                } else if (key === 'number') {
                  value = "00" + value;
                } else if (key === 'council_id') {
                  const councils = ["General Asssembly", "Security", "Environmental", "Health", "Economic"]
                  value = councils[value];
                }    
                  
                const newKey = handleChange(key, value);
                return (
                  <React.Fragment key={newKey}>
                    <div style={{ fontWeight: 'bold', marginRight: '30px' }}>{newKey}:</div>
                    <div>{value}</div>
                  </React.Fragment>
                );
              })}
            </div>
          ) : (
            <div>Select a resolution to view details</div>
          )}
        </div>
      )}
    </div>
  )
}

export default Amendments
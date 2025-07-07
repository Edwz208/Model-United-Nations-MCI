import React from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate.js";
import { useState, useRef } from "react";
import "./Resolutions.css";
import useResData from "../../hooks/useResData.js";
import Select from "react-select";

const ResolutionsAdmin = () => {
  // const { countriesData, setCountries} = useResData();

  const createOptions = () => {
    return countriesData.map((country, i) => {
      value: country;
      label: country;
    });
  };
  const options = [
    { value: "chocolate", label: "white" },
    { value: "afghanistan", label: "afghanistan" },
  ];

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
    "General Asssembly",
    "Security Council",
    "Environmental Council",
    "Economic Council",
  ];
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
  const [errorMsgs, setErrors] = useState(["", "", "", "", null, null, null]); // Upload File, Title, Council, Resolution #, # Clauses, submiter seconder negator
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

  const charMin = (string, i) => {
    setErrors((prev) => {
      const errorItem = [...prev];
      if (string.length < 3) {
        errorItem[i] = "Must be a minimum of 3 characters";
      } else {
        errorItem[i] = "";
      }
      return errorItem;
    });
  };

  const integerCheck = (integer, i) => {
    console.log(typeof integer);
    setErrors((prev) => {
      const errorItem = [...prev];
      if (integer < 0) {
        errorItem[i] = "Must be greater than or equal to 0";
      } else if (!Number.isInteger(integer)) {
        errorItem[i] = "Must be an integer";
      } else {
        errorItem[i] = "";
      }
      return errorItem;
    });
  };

  const handleSelector = (option, i) => {
    setErrors((prev) => {
      const copy = [...prev];
      if (!option || !option.value) {
        copy[i] = "Please select an option";
      } else {
        copy[i] = "";
      }
      return copy;
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (!file) {
      setErrors((prev) => [...prev, (prev[0] = "No file selected")]);
    }
    charMin(resTitle, 1);
    integerCheck(resNum, 2);
    integerCheck(clauses, 3);
    handleSelector(submitter, 4);
    handleSelector(seconder, 5);
    handleSelector(negator, 6);

    formData.append("title", resTitle);
    formData.append("number", resNum);
    formData.append("clauses", clauses);
    formData.append("council", council);
    formData.append("submitter", submitter);
    formData.append("seconder", seconder);
    formData.append("negator", negator);
    formData.append("file", file);

    //     try {
    //       const response = await axiosPrivate.post("/new-resolution", formData, {
    //         headers: {
    //           "Content-type": undefined,
    //         },
    //       });
    //     } catch (err) {
    //       console.log(err);
    //     }
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
          {errorMsgs[1] ? (
            <p style={{ margin: 0, color: "red" }}>{errorMsgs[1]}</p>
          ) : null}
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
        <div style={{ height: errorMsgs[1] ? "auto" : "1rem" }}>
          {errorMsgs[2] ? (
            <p style={{ margin: 0, color: "red" }}>{errorMsgs[2]}</p>
          ) : null}
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
          {errorMsgs[3] ? (
            <p style={{ margin: 0, color: "red" }}>{errorMsgs[3]}</p>
          ) : null}
        </div>
        <label className="label" htmlFor="submitter">Submitter</label>
        <Select
          options={options}
          styles={customStyles}
          onChange={(option) => {
            setSubmitter(option);
          }}
        />
        <div style={{ height: errorMsgs[1] ? "auto" : "1rem" }}>
          {errorMsgs[4] ? (
            <p style={{ margin: 0, color: "red" }}>{errorMsgs[4]}</p>
          ) : null}
        </div>
        <label className="label" htmlFor="seconder">Seconder</label>
        <Select
          options={options}
          styles={customStyles}
          onChange={(option) => {
            setSeconder(option);
          }}
        />
        <div style={{ height: errorMsgs[5] ? "auto" : "1rem" }}>
          {errorMsgs[5] ? (
            <p style={{ margin: 0, color: "red" }}>{errorMsgs[5]}</p>
          ) : null}
        </div>
        <label className="label" htmlFor="negator">Negator</label>
        <Select
          options={options}
          styles={customStyles}
          onChange={(option) => {
            setNegator(option);
          }}
        />
        <div style={{ height: errorMsgs[6] ? "auto" : "1rem" }}>
          {errorMsgs[6] ? (
            <p style={{ margin: 0, color: "red" }}>{errorMsgs[6]}</p>
          ) : null}
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
        ></div>
      </form>
    </>
  );
};

export default ResolutionsAdmin;

import { useEffect, useState } from "react";
import "./Admin.css";
import { useQuery } from '@tanstack/react-query'

const GetCountries = () => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [addCountryNew, setAddCountryNew] = useState(false);
  const [inputValues, setInputValues] = useState([]);
  const {data, isLoading } = useQuery({
    queryKey: ['countriesData'],
    staleTime: 0,
    queryFn: async ()=>{
      const res = await axiosPrivate.get('/get-countries')
      return res?.data
    }
  })

  const goToNewCountry = async () => {
    console.log(inputValues);
    try {
      const response = await fetch("http://localhost:8000/single-country", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          assigned_country: inputValues[0],
          delegate1: inputValues[1],
          delegate2: inputValues[2],
          delegate3: inputValues[3],
          delegate4: inputValues[4],
          role: "member",
          councils: inputValues[5],
          login: inputValues[6], 
        }),
      });
    } catch (error) {
      console.error("Error adding country:", error);
    }
  }
  const addCountry = async (e) => {
    setSelectedCountry(null);
    setAddCountryNew(true);
    
};
  const onDeleteClicked = async (e) => {
    const countryName = e.target.innerHTML;

    try {
      const response = await fetch(`http://localhost:8000/select-country/${countryName}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        console.error(`Error deleting country: ${response.status}`);
        return;
      }

      console.log("Country deleted successfully");
      location.reload();
    } catch (error) {
      console.error("Delete error:", error);
    }
  };
  const onCountryClicked = async (countryName) => {

    setAddCountryNew(null);
    console.log("Clicked:", countryName);
    try {
      const response = await fetch(`http://localhost:8000/select-country/${countryName}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        console.error(`Error fetching details: ${response.status}`);
        return;
      }

      const countryDetails = await response.json();
      setSelectedCountry(countryDetails);
      console.log("Country details:", countryDetails);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  return (
    <>
      <div style={{ display: "flex", flexDirection: "row", gap: "20px"}}>
        <div style={{ width: "20%", display: "flex", flexDirection: "column", gap: "20px", height: "100vh", margin: "0", justifyContent: "start", alignContent: "start", overflowY: "scroll", backgroundColor: "#f0f0f0" }}>
          <h3 className="title">Country Name</h3>
          <button className="country" style={{ backgroundColor: "#04a5e5" }} onClick={addCountry}>Add Country</button>
          {[...data] 
          .filter((country) => country["country"].toLowerCase() !== "admin")
          .sort((a, b) => a.country.localeCompare(b.country)) 
          .map((country, i) => (
            <button className="country" onClick={()=> onCountryClicked(country["country"])} key={country["id"]}>
              {country["country"]}
            </button>
          ))}
        </div>
        <div style={{ width: "80%" }}>
          <h3 className="title">Country Info</h3>
          {selectedCountry ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <label><strong>Country:</strong> {selectedCountry.country}</label>
              <label><strong>Delegate 1:</strong> {selectedCountry.delegate1}</label>
              <label><strong>Delegate 2:</strong> {selectedCountry.delegate2}</label>
              <label><strong>Delegate 3:</strong> {selectedCountry.delegate3}</label>
              <label><strong>Delegate 4:</strong> {selectedCountry.delegate4}</label>
              <label><strong>Councils:</strong> {selectedCountry.councils}</label>
              <label><strong>Access Code:</strong> {selectedCountry.login}</label>
              <button style={{alignSelf: "center", backgroundColor: "red", border: "none", borderRadius: "5px", padding: "10px", color: "white", fontSize: "16px", cursor: "pointer"}}onClick={() => onDeleteClicked({target: {innerHTML: selectedCountry.country}})}>Delete Country</button>
            </div>
          ) : (
            <p>Select a country to view details.</p>
          )}
          {addCountryNew ? (
            <div style={{marginRight: "10px"}}>
              <input className="textInput" type="text" onChange={(e) => {const newValues = [...inputValues]; newValues[0] = e.target.value; setInputValues(newValues); }} placeholder="Country Name"/>
              <input className="textInput" type="text" onChange={(e) => {const newValues = [...inputValues]; newValues[1] = e.target.value; setInputValues(newValues); }} placeholder="Delegate 1"/>
              <input className="textInput" type="text" onChange={(e) => {const newValues = [...inputValues]; newValues[2] = e.target.value; setInputValues(newValues); }} placeholder="Delegate 2"/>
              <input className="textInput" type="text" onChange={(e) => {const newValues = [...inputValues]; newValues[3] = e.target.value; setInputValues(newValues); }} placeholder="Delegate 3"/>
              <input className="textInput" type="text" onChange={(e) => {const newValues = [...inputValues]; newValues[4] = e.target.value; setInputValues(newValues); }} placeholder="Delegate 4"/>
              <input className="textInput" type="text" onChange={(e) => {const newValues = [...inputValues]; newValues[5] = e.target.value; setInputValues(newValues); }}  placeholder="Councils, separated by spaces (e.g. security, health, environment, economic)"/>
              <input className="textInput" type="text" onChange={(e) => {const newValues = [...inputValues]; newValues[6] = e.target.value; setInputValues(newValues); }}  placeholder="Access Code"/>
              <button className="textInput" onClick={goToNewCountry}>Submit</button>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default GetCountries;
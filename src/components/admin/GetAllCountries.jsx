import { useEffect, useState } from "react";

const GetAllCountries = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchAll() {
      try {
        const response = await fetch("http://localhost:8000/get-countries", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          console.log(`HTTP error! status: ${response.status}`);
          return;
        }

        const jsonData = await response.json();
        setData(jsonData);
        console.log("have set")
        console.log(jsonData);
      } catch (error) {
        console.log("Error fetching countries: ", error);
      }
    }

    fetchAll();
  }, []);

  return <>
  <ul>
      {data.map((country,i)=>{
        return <li key = {i}>{country["country"]}</li>
  })};
  </ul>
  </>
};

export default GetAllCountries;
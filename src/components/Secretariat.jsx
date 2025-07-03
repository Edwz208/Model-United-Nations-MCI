import { useEffect, useState } from "react";
import './Secretariat.css';

const Secretariat = () => {
    const [data, setData] = useState([]);
    async function fetchAll() {
        try {
        const response = await fetch("http://localhost:8000/get-secretariat", {
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
        console.log(jsonData);
        } catch (error) {
        console.log("Error fetching info: ", error);
        }
    }

    useEffect(() => {
        fetchAll();
    }, []);
    return (
        <div style={{ height: "100vh", width: "100%", display: "flex", flexDirection: "column" }}>
            <div style={{ paddingTop: "10%"}}>
                <h1 style={{color: "white", fontSize: "32px", fontWeight: "500", marginBottom: "10px", textAlign: "center"}}>Secretariat</h1>
            </div>
            <div className="grid-container">
                {data.map((item, index) => (
                    <div className="grid-item" key={index}>
                    <h3>{item.name}</h3>
                    <p>{item.position}</p>
                    {}
                    </div>
                ))}
                
            </div>
        </div>
    );
}

export default Secretariat;
function Projection ({ paging, countries, resolution }) {
    return (
        <div style={{ height: "100vh", width: "100%", backgroundColor: "#282832", display: "flex", fontFamily: "Be Vietnam Pro", color: "white"}}>
            <style>
                @import
                url('https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Cabin:ital,wght@0,400..700;1,400..700&display=swap');
            </style>
            <div style={{marginLeft: "40px", width: "30%" , display: "flex", alignSelf: "start", justifyContent: "start", flexDirection: "column"}}>
                <div>
                    <h2 style={{ borderRadius: "14px", padding: "20px", textAlign: "center", backgroundColor: "#242424", marginTop: "40px"}}>Resolution: {resolution}</h2>
                    <h2 style={{ borderRadius: "14px", padding: "20px", textAlign: "center", backgroundColor: "#242424"}}>Paging: {paging ? "On" : "Off"}</h2>
                </div>
                <div style={{ marginTop: "40px", borderRadius: "14px", backgroundColor: "#242424" }}>
                    <h2 style={{ padding: "10px", textAlign: "center"}}>Speakers List</h2>
                    {countries.map((speaker, index) => (
                        <div key={speaker} style={{ flexDirection: "row"}}>
                            <h2 style={{ paddingLeft: "30px" }}>{index + 1}: {speaker}</h2>
                        </div>
                    ))}
                </div>
            </div>
            <div style={{ marginLeft: "40px", marginTop: "40px", marginRight: "40px", marginBottom: "40px", borderRadius: "14px", width: "70%", display: "flex", backgroundColor: "#242424"}}>
                <div style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                    <h1 style={{ textAlign: "center"}}>Amendment</h1>
                </div>
            </div>
        </div>
    )
}

export const DisplayMessage = ({message}) => {
    return (
        <div style={{ 
            backgroundColor: "#282832", 
            color: "white", 
            height: "100vh", 
            width: "100%", 
            display: "flex", 
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            }}
            >
            <style>
                @import
                url('https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Cabin:ital,wght@0,400..700;1,400..700&display=swap');
            </style>
            <h1 style={{ fontSize: "50px", fontFamily: "Be Vietnam Pro", fontWeight: "900"}}>{message}</h1>
        </div>
    )
}

export const DisplayTitle = () => {
    return (
        <div style={{ 
            height: "100vh", 
            width: "100%", 
            display: "flex", 
            flexDirection: "column", 
            alignItitletems: "center", 
            justifyContent: "center", 
            backgroundColor: "#61bcef",
            }}>
            <img src="/logo.png" alt="1" style={{ alignSelf: "center", width: "500px", height: "500px" }} />
        </div>
    );
}

export default Projection; 


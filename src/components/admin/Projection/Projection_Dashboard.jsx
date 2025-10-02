import { useEffect, useRef, useState } from "react";
import { createRoot } from 'react-dom/client';
import Projection, { DisplayMessage, DisplayTitle } from './Projection.jsx';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import "./Projection.css";

function Projection_Dashboard() {
    const [activeScreen, activeScreenData] = useState("title");
    const [paging, pagingData] = useState(false);
    const [message, messageData] = useState("");
    const [boxes, setBoxes] = useState(["Canada", "Bangladesh", "Algeria"]);
    const windowRef = useRef(null);
    const rootRef = useRef(null);

    const openProjectionWindow = () => {
        if (!windowRef.current || windowRef.current.closed) {
            const newWindow = window.open('', '_blank');
            newWindow.document.write(`
                <html>
                  <head>
                    <title>Projection</title>
                    <style>
                      html, body {
                        margin: 0;
                        padding: 0;
                        overflow: hidden;
                        background: black;
                      }
                      #root {
                        width: 100vw;
                        height: 100vh;
                      }
                    </style>
                  </head>
                  <body>
                    <div id="root"></div>
                  </body>
                </html>
            `);
            newWindow.document.close();
            windowRef.current = newWindow;

            const rootDiv = newWindow.document.getElementById('root');
            rootRef.current = createRoot(rootDiv);

            renderProjection(boxes);
        }
    };

    const renderProjection = (updatedBoxes) => {
        if (!rootRef.current) return;
        if (activeScreen === "message") {
            rootRef.current.render(<DisplayMessage message={message} />);
        } else if (activeScreen === "title") {
            rootRef.current.render(<DisplayTitle />);
        } else {
            rootRef.current.render(<Projection paging={paging} countries={updatedBoxes} />);
        }
    };

    useEffect(() => {
        renderProjection(boxes);
    }, [activeScreen, message, paging]);

    return (
        <div style={{ overflow: "hidden", marginBottom: "10px", display: "flex", flexDirection: "row" }}>
            <div style={{ height: "100%", alignItems: "center", paddingTop: "10%", width: "70%", display: "flex", flexDirection: "column" }}>
                <div className="container">
                    {boxes.map((label, index) => (
                        <div
                            key={index}
                            className="box"
                            draggable
                            onDragStart={(e) => e.dataTransfer.setData("dragIndex", index)}
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={(e) => {
                                const dragIndex = parseInt(e.dataTransfer.getData("dragIndex"));
                                if (dragIndex !== index) {
                                    const updatedBoxes = [...boxes];
                                    const [movedItem] = updatedBoxes.splice(dragIndex, 1);
                                    updatedBoxes.splice(index, 0, movedItem);
                                    setBoxes(updatedBoxes);
                                    renderProjection(updatedBoxes); 
                                    //the variable 'boxes' does not update right away so updatedBoxes is passed as an argument to re-render the right data 
                                }
                            }}
                        >
                            <input type="text" className="input" value={label} onChange={(e) => {setBoxes(boxes.map((box, i) => (i === index ? e.target.value : box))); renderProjection(boxes.map((box, i) => (i === index ? e.target.value : box)));} }>
                            </input>
                        </div>
                    ))}
                </div>
                <div>
                    <button style={{ marginTop: "30px" }} className="buttons" onClick={() => setBoxes([...boxes, "New Speaker"])}>
                        Add Speaker
                    </button>
                </div>
            </div>
            <div style={{ gap: "30px", color: "white", display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "10%" }}>
                <div>
                    <button className="buttons" onClick={openProjectionWindow}>
                        Open Dashboard (in new tab)
                    </button>
                </div>
                <div>
                    <p>Screens</p>
                    <ToggleButtonGroup
                        color="primary"
                        value={activeScreen}
                        exclusive
                        onChange={(_, value) => value && activeScreenData(value)}
                        sx={{
                            border: '1px solid white',
                            borderRadius: '10px',
                            '& .MuiToggleButton-root': {
                                color: 'white',
                                border: '1px solid white',
                                '&.Mui-selected': {
                                    backgroundColor: '#41455994',
                                    color: 'white',
                                },
                                '&:hover': {
                                    backgroundColor: '#414559',
                                    color: 'white',
                                },
                            }
                        }}
                    >
                        <ToggleButton value="title">Title</ToggleButton>
                        <ToggleButton value="conference">Conference</ToggleButton>
                        <ToggleButton value="message">Message</ToggleButton>
                    </ToggleButtonGroup>
                </div>
                <div>
                    <p>Paging</p>
                    <button className="buttons" onClick={() => pagingData(!paging)}>Paging: {paging ? "Open" : "Closed"}</button>
                </div>
                <div>
                    <input
                        id="message"
                        className="buttons"
                        style={{ height: "50px" }}
                        type="text"
                        placeholder="Enter message here"
                        onChange={(e) => messageData(e.target.value)}
                    />
                </div>
            </div>
        </div>
    );
}

export default Projection_Dashboard;

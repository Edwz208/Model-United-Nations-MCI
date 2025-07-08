import React from "react";
import { useState, useEffect, useRef } from "react";
import useAuth from '../hooks/useAuth.js'
const ProjectionWS = () => {
    const {auth} = useAuth();
  const [messages, setMessages] = useState([]);
  let timeoutId
  let ws
  useEffect(() => {
    const connect =()=>{
        const ws = new WebSocket("ws://localhost:8000");
        ws.onopen=()=>{
            ws.send({"accessToken": auth.accessToken});
        }
    }
    ws.onmessage = (e) => {
      console.log(JSON.parse(e.data));Q
      const received = JSON.parse(e.data);
      setMessages((prev) => {
        return [...prev, received];
      });
    };
    ws.onerror = (err) => {
      console.error("WebSocket error:", err);
    };

    ws.onclose = () => {
      console.log("WebSocket closed");
      timeoutId = setTimeout(connect, 1000);
    };
    connect();
    setWebsocket(ws);
    return () => {
        if (timeoutId) clearTimeout(timeoutId)
      if (ws) ws.close();
    };
  }, []);

  return (<>
  
  </>)
};

export default ProjectionWS;

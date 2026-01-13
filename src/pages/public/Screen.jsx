import useWebSocket from "../../hooks/useWebSocket.js";
import { useParams } from "react-router-dom";

function Screen(){
    const { councilId } = useParams()

    const { isOpen } = useWebSocket({councilId, onMessage: () => {
    }});

    if (!isOpen){
        return <div>Connecting to screen...</div>
    }
    return (
        <div className=''>Connected to council: {councilId}</div>
    )
}

export default Screen;
import useWebSocket from "../../hooks/useWebSocket";

function Screen(){
    const { isOpen } = useWebSocket({onMessage: () => {
    }});
    if (!isOpen){
        return <div>Connecting to screen...</div>
    }
    return (
        <div className=''>works</div>
    )
}

export default Screen;
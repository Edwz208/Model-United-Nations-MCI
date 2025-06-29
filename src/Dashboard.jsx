import { useState} from 'react';
import GetAllCountries from './getAllCountries.jsx'
const Dashboard = () => {
    const [buttonState, setButton]= useState(false);
    const handleSubmit = (e) =>{
        e.preventDefault()
        console.log("submitted")
        setButton((prev) => (!prev));
        console.log(!buttonState);
    }
  return (<>
  
    <form onSubmit={handleSubmit}>
        <button>Get Countries</button>
    </form>
    {buttonState ? <GetAllCountries/> : <h1>No countries to display</h1>}
  </>)
}

export default Dashboard
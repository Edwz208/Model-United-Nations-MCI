import "./App.css";
import Motions from "./components/Motions"

function App() {
const motionNumber = 1; // Example motion number, can be dynamic

  return (
    <>
      <Motions motion={{
        title: "Sample Motion",
        description: "This is a sample motion description.",
        url: "https://via.placeholder.com/150"
      }} /> 

    </>
  );
}



export default App;

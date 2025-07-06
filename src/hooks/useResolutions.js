import { useContext } from "react";
import ResContext from "../context/ResProvider.jsx";

const useRes = () => {
    return useContext(ResContext);
}

export default useRes;
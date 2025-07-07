import { createContext, useState } from "react";

const ResContext = createContext({});

export const ResolutionProvider = ({ children }) => {
    const [resolutions, setResolutions] = useState([]);
    const [countriesData, setCountries] = useState([])
    return (
        <ResContext.Provider value={{ resolutions, setResolutions, countriesData, setCountries }}>
            {children}
        </ResContext.Provider>
    )
}

export default ResContext;
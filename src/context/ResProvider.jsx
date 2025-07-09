import { createContext, useState } from "react";

const ResContext = createContext({});

export const ResolutionProvider = ({ children }) => {
    const [resolutions, setResolutions] = useState([]);
    const [countries, setCountries] = useState([]);

    return (
        <ResContext.Provider value={{ resolutions, setResolutions, countries, setCountries}}>
            {children}
        </ResContext.Provider>
    )
}

export default ResContext;
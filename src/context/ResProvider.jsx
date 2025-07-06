import { createContext, useState } from "react";

const ResContext = createContext({});

export const ResolutionProvider = ({ children }) => {
    const [resolutions, setResolutions] = useState([]);

    return (
        <ResContext.Provider value={{ resolutions, setResolutions }}>
            {children}
        </ResContext.Provider>
    )
}

export default ResContext;
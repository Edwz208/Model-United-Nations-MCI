import { createContext, useState, useEffect } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
    const [isLogged, setLogged] = useState(false)
    useEffect(()=>{
        const onStorage = ()=>{
            if (!localStorage.getItem("Logged")){
                setLogged(false)
                console.log("off bat no")

            }
            else if (localStorage.getItem("Logged")){
                setLogged(true)
                console.log("off bat yes")
            }
        }
        if (localStorage.getItem("Logged")){
            setLogged(true)
            console.log("yes there is logged")
        }
        else{
            "no there isnt"
        }
        window.addEventListener("storage", onStorage)
        return ()=>{window.removeEventListener("storage", onStorage)}
    }, []);

    return (
        <AuthContext.Provider value={{ auth, setAuth, isLogged, setLogged}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;
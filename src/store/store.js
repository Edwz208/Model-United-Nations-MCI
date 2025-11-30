import { create } from 'zustand';

 // good to go 
const useStore = create((set)=>{
    return{
        accessToken: null,
        setAccessToken: (value)=> (set({accessToken: value})),
        isLogged: false,
        setLogged: (bool) => (set({isLogged: bool})),
        role: null,
        setRole: (value) => (set(value)),
        country: null,
        setCountry: (value)=>(set({country: value})),
        id: null,
        setID: (value)=>(set({id: value})),
        clearAuth: ()=>{set({accessToken: null, isLogged: false, role: null, id: null, country: null})}
    }
})

export default useStore;
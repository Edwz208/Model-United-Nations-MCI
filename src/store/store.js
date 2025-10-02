import { create } from 'zustand';

 // good to go 
const useStore = create((set)=>{
    return{
        accessToken: null,
        setAccessToken: (value)=> (set({accessToken: value})),
        isLogged: false,
        setLogged: (bool) => (set({isLogged: bool})),
        roles: null,
        setRoles: (value) => (set({roles: value})),
        country: null,
        setCountry: (value)=>(set({country: value})),
        id: null,
        setID: (value)=>(set({id: value})),
        clearAuth: ()=>{set({accessToken: null, isLogged: false, roles: null, id: null, country: null})}
    }
})

export default useStore;
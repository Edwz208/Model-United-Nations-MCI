import { create } from 'zustand';

 // good to go 
const useStore = create((set)=>{
    return{
        accessToken: null,
        setAccessToken: (value)=> (set({accessToken: value})),
        isLogged: false,
        setLogged: (bool) =>{ 
            if (bool) {
                set({isLogged: true})
            }
            else {
                set({isLogged: false})
            }
        },
        role: null,
        setRole: (value) => (set({role: value})),
        country: null,
        setCountry: (value)=>(set({country: value})),
        country_id: null,
        setID: (value)=>(set({id: value})),
        clearAuth: ()=>{set({accessToken: null, isLogged: false, role: null, id: null, country: null})}
    }
})

export default useStore;
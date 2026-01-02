import { create } from 'zustand';

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
        name: null,
        setName: (value)=>(set({name: value})),
        countryId: null,
        setCountryId: (value)=>(set({countryId: value})),
        speakerPoints: null,
        setSpeakerPoints: (value)=>(set({speakerPoints: value})),
        clearAuth: ()=>{set({accessToken: null, isLogged: false, role: null, countryId: null, name: null, speakerPoints: null})}
    }
})

export default useStore;
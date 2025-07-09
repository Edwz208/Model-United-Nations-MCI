import useAuth from "./useAuth.js";
import { useNavigate } from "react-router-dom";
import axios from '../api/axios.js';

const useLogOut = () => {
    const navigate = useNavigate();
    const { setAuth, setLogged } = useAuth();

    const logOut = async () => {
        
        try {
            const response = await axios.post('/logout', {
            });
            console.log(response?.data);
        } catch (err) {
            console.error("Logout failed:", err);
        }
        console.log('logged out')
        setLogged(false);
        setAuth({ accessToken: null, country: null, roles: null });
        localStorage.clear();
        navigate("/Login");
    };

    return logOut;
};

export default useLogOut;

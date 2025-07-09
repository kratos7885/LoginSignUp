import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export const AppContent = createContext();

export const AppContextProvider = (props) => {
    axios.defaults.withCredentials = true;
    const backendUrl = process.env.REACT_APP_BACKEND_URL;

    const [isLoggedin, setIsLoggedin] = useState(false);
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();

    // Function to check the authentication state
    const getAuthState = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/auth/is-auth', {
                withCredentials: true
            });

            if (data.success) {
                setIsLoggedin(true);
                getUserData();
            }
        } catch (err) {
            console.log(err);
        }
    };

    // Function to get user data
    const getUserData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/user/data', {
                withCredentials: true
            });
            if (data.success) {
                setUserData(data.user);
                // Persist user data in localStorage
                localStorage.setItem('userData', JSON.stringify(data.user));
            } else {
                toast.error(data.message);
            }
        } catch (err) {
            toast.error(err.message);
        }
    };

    // Function to handle logout
    const logout = async () => {
        try {
            const { data } = await axios.post(`${backendUrl}/api/auth/logout`);
            if (data.success) {
                setIsLoggedin(false);
                setUserData(null);
                navigate('/');
                localStorage.removeItem('userData');
                toast.success('Logged out successfully!');
            } else {
                toast.error(data.message);
            }
        } catch (err) {
            toast.error(err.message);
        }
    };

    // Check for persisted user data in localStorage on app load
    useEffect(() => {
        const storedUserData = localStorage.getItem('userData');
        if (storedUserData) {
            setUserData(JSON.parse(storedUserData));
            setIsLoggedin(true);
        } else {
            // If no user data in localStorage, verify auth
            getAuthState();
        }
    }, []);

    const value = {
        backendUrl,
        isLoggedin,
        setIsLoggedin,
        userData,
        setUserData,
        getUserData,
        getAuthState,
        logout,  // Add logout to the context
    };

    return (
        <AppContent.Provider value={value}>
            {props.children}
        </AppContent.Provider>
    );
};

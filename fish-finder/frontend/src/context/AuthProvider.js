import {createContext, useEffect, useState} from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(JSON.parse(localStorage.getItem('auth')) || {});

    const logout = () => {
        localStorage.removeItem('auth');
        setAuth({});
    }

    useEffect(() => {
        localStorage.setItem('auth', JSON.stringify(auth));
    }, [auth]);

    return (
        <AuthContext.Provider value={{ auth, setAuth, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;

import React, { createContext, useContext, useState } from 'react';
import { User } from '../Interfaces/user';
import axios, { AxiosResponse } from 'axios';
import { url } from '../App';

interface AuthContextProps {
    isAuthenticated: boolean;
    loginUser: (username: string, password: string) => void;
    logoutUser: () => void;
    userInfo: User | undefined;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userInfo, setUserInfo] = useState<User | undefined>()

    //const [token, setToken] = useState(null); testtest

    const loginUser = (username: string, password: string) => {
        const data = { username: username, password: password }

        axios.post(`${url}/login`, data).then((resp: AxiosResponse) => {
            //const {userData, token} = resp.data
            setUserInfo(resp.data)
            setIsAuthenticated(true);
            //setToken(token);
        }).catch(e => console.log(e))
    };

    const logoutUser = () => {
        // Perform logout logic
        //setToken(undefined)
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, loginUser, logoutUser, userInfo }}>
            {children}
        </AuthContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = (): AuthContextProps => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
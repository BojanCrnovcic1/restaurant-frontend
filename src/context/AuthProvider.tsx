import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../types/User";
import axios from "axios";
import { ApiConfig } from "../config/api.config";
import { AuthContext } from "./AuthContext";

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
    const [role, setRole] = useState<string | null>(localStorage.getItem('role'));
    const [user, setUser] = useState<User | null>(null)
    const navigate = useNavigate();

   useEffect(() => {
        if (token && role === 'admin' && !window.location.pathname.startsWith('/admin/dashboard')) {
          navigate('/admin/dashboard');
        } 

      }, [token, role, navigate]);

    const login = async (email: string, password: string) => {
        try {
            const response = await axios.post(ApiConfig.API_URL + 'auth/login', {
                email,
                password
            })
            const { token, role, user } = response.data
            setToken(token);
            setRole(role);
            setUser(user);
            localStorage.setItem('token', token);
            localStorage.setItem('role', role);
            localStorage.setItem('user', user);

            console.log('login user: ', response.data);
        } catch (error) {
            console.error('Login failed:', error);
            throw new Error('Login failed. Please check your credentials.');
        }
    }

    const logout = () => {
        setToken(null);
        setRole(null);
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('user');
        navigate('/');
    }

    return (
        <AuthContext.Provider value={{token, role, user, login, logout}}>
            { children }
        </AuthContext.Provider>
    );
}

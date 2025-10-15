import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from './useAuthContext';
import api from '../api/apiConfig';

export function useLogin() {
    const [isLoading, setIsLoading] = useState(null);
    const [error, setError] = useState(null);
    
    const navigate = useNavigate();
    
    const { user, dispatch } = useAuthContext();

    const login = async (email, password) => {
        setError(null);
        setIsLoading(true);

        try {
            const response = await api.post('/users/login', { email, password }, { withCredentials: true });

            dispatch({ type: 'LOGIN', payload: response.data.user });

            // user && user.role==='admin' ? navigate('/adminDashboard') : navigate('/dashboard');
            console.log("Current user role: ",user.role)

            if(user.role==='admin')
                navigate('/adminDashboard');
            else
                navigate('/dashboard');

            setIsLoading(false);

        } catch (error) {
            setError(error?.response?.data?.error || error);
            setIsLoading(false);
        }

    }
    return { login, isLoading, error }
}
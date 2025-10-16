import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import api from '../api/apiConfig';

function useSignUp() {
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const signUp = async (userData) => {
        setIsLoading(true);
        setError('');
        try {
            const resp = await api.post('/users/signup', userData, { withcredentials: true });
            setMessage('Sign up successful.')
            setIsLoading(false);
            setTimeout(() => {
                navigate('/login', { replace: true });
            }, 2000);
        } catch (error) {
            console.error(error)
            setError(error?.response?.data?.error || 'User sign up request failed!');
            setIsLoading(false);
        }
    }
    return { signUp, isLoading, message, error }
}

export default useSignUp;
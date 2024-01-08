import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import api from '../api'; // Import the axios instance

export const useLogin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch } = useAuthContext();
 
    const login = async (email, password) => {
        setIsLoading(true);
        setError(null);
        
        try {
            const response = await api.post('/api/user/login', { email, password });

            if (response.status !== 200) {
                setIsLoading(false);
                setError(response.data.error);
            } else {
                // save the user to local storage
                localStorage.setItem('user', JSON.stringify(response.data));

                // update the auth context
                dispatch({type: 'LOGIN', payload: response.data});
                setIsLoading(false);
            }
        } catch (error) {
            setIsLoading(false);
            setError(response.data.error || error.message);
        }
    }

    return { login, error, isLoading }
}
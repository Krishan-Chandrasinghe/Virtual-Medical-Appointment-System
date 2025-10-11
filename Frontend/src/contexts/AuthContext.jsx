import { useEffect, createContext, useReducer } from "react"
import api from "../api/apiConfig";

export const AuthContext = createContext();

export const userReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                user: action.payload
            }

        case 'LOGOUT':
            return {
                user: null
            }

        default:
            return state
    }
}

export function AuthContextProvider({ children }) {

    const [state, dispatch] = useReducer(userReducer, {
        user: null,
    })

    useEffect(() => {
        async function checkUser() {
            try {
                const response = await api.get('/users/verify', { withCredentials: true });
                dispatch({ type: 'LOGIN', payload: response.data.user });
            } catch (error) {
                console.error('Error verifying user:', error);
            }
        }
        checkUser();
    }, []);


    console.log('AuthContext state: ', state);

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}
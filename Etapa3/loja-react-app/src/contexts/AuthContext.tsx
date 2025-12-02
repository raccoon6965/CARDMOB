import React, { createContext, useState, useEffect, useContext} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { getTokenData } from "../services/authService"; // novo.

type AuthContextType = {
    user: { token: string } | null;
    login: (token: string) => Promise<void>;
    logout: () => Promise<void>;
    loading: boolean;
    getUserDataFromToken: (token: string | null) => Promise<any[]>; // novo
    userData: Promise<any[]>; // novo
    userData: any[]; // correção
};
const AuthContext = createContext<AuthContextType>({} as AuthContextType);

@@ -24,36 +23,34 @@ export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children
            const token = await AsyncStorage.getItem('token');
            if (token) {
                setUser({ token });
                const tokenData = await getTokenData(token); // novo
                setUserData(tokenData); // novo
            }
            setLoading(false);
        };
        loadUser();
        getUserDataFromToken(); // novo
    }, []);

    const login = async (token: string) => {
        await AsyncStorage.setItem('token', token);
        setUser({token});
        const tokenData = await getTokenData(token); // novo
        setUserData(tokenData); // novo
    }

    const logout = async () => {
        await AsyncStorage.removeItem('token');
        setUser(null);
    }

    // novo callback.
    const getUserDataFromToken = async () => {
        const token = await AsyncStorage.getItem('token');
        const tokenData = getTokenData(token);
        setUserData(tokenData);
        setUserData([]);
    }

    return (
        <AuthContext 
        // correção
        <AuthContext.Provider
            value={{ user, login, logout, loading, userData }}
        >
        > 
            {children}
        </AuthContext>
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
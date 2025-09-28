// src/hooks/useAuth.js
import { useState, useEffect, useCallback } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";

export const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Clear user data from localStorage
    const clearUserData = useCallback(() => {
        const keysToRemove = [
            'studyMateUser',
            'tasks',
            // Add any other user-specific keys
        ];

        keysToRemove.forEach(key => {
            // Remove user-specific task keys
            Object.keys(localStorage).forEach(storageKey => {
                if (storageKey.startsWith('tasks_')) {
                    localStorage.removeItem(storageKey);
                }
            });
            localStorage.removeItem(key);
        });
    }, []);

    // Handle user data persistence
    const persistUserData = useCallback((firebaseUser, existingData = null) => {
        const userData = {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName || existingData?.username || existingData?.displayName || null,
            username: existingData?.username || firebaseUser.displayName || null,
            profilePicture: existingData?.profilePicture || null,
            preferences: existingData?.preferences || {},
            createdAt: existingData?.createdAt || new Date().toISOString(),
            lastLoginAt: new Date().toISOString(),
        };

        localStorage.setItem("studyMateUser", JSON.stringify(userData));
        return userData;
    }, []);

    // Logout handler
    const handleLogout = useCallback(async () => {
        try {
            setIsLoading(true);
            setError(null);

            // Clear data before signing out
            clearUserData();

            await signOut(auth);
        } catch (error) {
            console.error("Logout error:", error);
            setError(error);
        } finally {
            setIsLoading(false);
        }
    }, [clearUserData]);

    // Firebase auth state listener
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            try {
                setError(null);

                if (firebaseUser) {
                    // User is signed in
                    const storedUser = JSON.parse(localStorage.getItem("studyMateUser") || "null");
                    const userData = persistUserData(firebaseUser, storedUser);

                    setUser(userData);
                    setIsAuthenticated(true);
                } else {
                    // User is signed out
                    clearUserData();
                    setUser(null);
                    setIsAuthenticated(false);
                }
            } catch (error) {
                console.error("Auth state change error:", error);
                setError(error);
                setIsAuthenticated(false);
            } finally {
                setIsLoading(false);
            }
        });

        return () => unsubscribe();
    }, [clearUserData, persistUserData]);

    return {
        isAuthenticated,
        user,
        isLoading,
        error,
        handleLogout,
    };
};
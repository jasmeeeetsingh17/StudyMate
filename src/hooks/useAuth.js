// src/hooks/useAuth.js - KEEP DATA AFTER LOGOUT VERSION
import { useState, useEffect, useCallback } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";

export const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Clear ONLY user data, NOT tasks
    const clearUserData = useCallback(() => {
        console.log('Clearing user data from localStorage');

        const allKeys = Object.keys(localStorage);
        console.log('All localStorage keys before clearing:', allKeys);

        // ONLY remove user data
        localStorage.removeItem('studyMateUser');

        localStorage.removeItem('studyTasks');
        localStorage.removeItem('tasks');

        console.log('localStorage cleared. Remaining keys:', Object.keys(localStorage));
    }, []);

    // Handle user data persistence
    const persistUserData = useCallback((firebaseUser, existingData = null) => {
        const userData = {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName || existingData?.username || existingData?.displayName || null,
            username: existingData?.username || firebaseUser.displayName || null,
            name: firebaseUser.displayName || existingData?.username || 'User',
            profilePicture: existingData?.profilePicture || null,
            preferences: existingData?.preferences || {},
            createdAt: existingData?.createdAt || new Date().toISOString(),
            lastLoginAt: new Date().toISOString(),
        };

        localStorage.setItem("studyMateUser", JSON.stringify(userData));

        localStorage.getItem("studyMateUser");

        return userData;
    }, []);

    // Logout handler
    const handleLogout = useCallback(async () => {
        try {
            console.log('Starting logout process...');
            setIsLoading(true);
            setError(null);

            // Clear user data (but NOT tasks)
            clearUserData();

            // Sign out from Firebase
            await signOut(auth);

            console.log('Logout complete');
        } catch (error) {
            console.error("Logout error:", error);
            setError(error);
            clearUserData();
        } finally {
            setIsLoading(false);
        }
    }, [clearUserData]);

    // Firebase auth state listener
    useEffect(() => {
        console.log('Setting up auth state listener');

        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            console.log('Auth state changed:', firebaseUser ? 'User logged in' : 'User logged out');

            try {
                setError(null);

                if (firebaseUser) {

                    const storedUserStr = localStorage.getItem("studyMateUser");
                    const storedUser = storedUserStr ? JSON.parse(storedUserStr) : null;

                    const userData = persistUserData(firebaseUser, storedUser);

                    setUser(userData);
                    setIsAuthenticated(true);

                } else {
                    console.log('No Firebase user, clearing data');

                    // Clear user data (but NOT tasks)
                    clearUserData();
                    setUser(null);
                    setIsAuthenticated(false);
                }
            } catch (error) {
                console.error("Auth state change error:", error);
                setError(error);
                setIsAuthenticated(false);
                clearUserData();
            } finally {
                setIsLoading(false);
            }
        });

        return () => {
            console.log('Cleaning up auth state listener');
            unsubscribe();
        };
    }, [clearUserData, persistUserData]);

    return {
        isAuthenticated,
        user,
        isLoading,
        error,
        handleLogout,
    };
};
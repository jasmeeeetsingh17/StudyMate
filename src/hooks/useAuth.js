// src/hooks/useAuth.js - FIXED VERSION with proper cleanup
import { useState, useEffect, useCallback } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";

export const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Clear ALL user data from localStorage
    const clearUserData = useCallback(() => {
        console.log('Clearing user data from localStorage');

        // Get all keys before clearing
        const allKeys = Object.keys(localStorage);
        console.log('All localStorage keys before clearing:', allKeys);

        // Clear specific user data
        localStorage.removeItem('studyMateUser');

        // Clear all task keys (tasks_userId format)
        allKeys.forEach(key => {
            if (key.startsWith('tasks_')) {
                localStorage.removeItem(key);
                console.log('Removed key:', key);
            }
        });

        // Also clear old format keys if they exist
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

        console.log('Persisting user data:', userData);
        localStorage.setItem("studyMateUser", JSON.stringify(userData));

        // Verify it was saved
        const saved = localStorage.getItem("studyMateUser");
        console.log('Verified saved user data:', saved);

        return userData;
    }, []);

    // Logout handler
    const handleLogout = useCallback(async () => {
        try {
            console.log('Starting logout process...');
            setIsLoading(true);
            setError(null);

            // Clear data FIRST, before signing out
            clearUserData();

            // Then sign out from Firebase
            await signOut(auth);

            console.log('Logout complete');
        } catch (error) {
            console.error("Logout error:", error);
            setError(error);
            // Even if signOut fails, still clear local data
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
                    console.log('Firebase user:', {
                        uid: firebaseUser.uid,
                        email: firebaseUser.email,
                        displayName: firebaseUser.displayName
                    });

                    // User is signed in
                    const storedUserStr = localStorage.getItem("studyMateUser");
                    const storedUser = storedUserStr ? JSON.parse(storedUserStr) : null;

                    console.log('Stored user data:', storedUser);

                    const userData = persistUserData(firebaseUser, storedUser);

                    setUser(userData);
                    setIsAuthenticated(true);

                    console.log('User authenticated:', userData);
                } else {
                    console.log('No Firebase user, clearing data');

                    // User is signed out - clear everything
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
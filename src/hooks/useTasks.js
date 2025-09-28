// src/hooks/useTasks.js
import { useState, useEffect, useCallback, useMemo } from "react";

export const useTasks = (user) => {
    const [tasks, setTasks] = useState([]);
    const [taskToEdit, setTaskToEdit] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Get user-specific storage key
    const getUserTasksKey = useCallback((userId) => {
        return userId ? `tasks_${userId}` : null;
    }, []);

    // Load tasks for authenticated user
    useEffect(() => {
        if (user?.uid) {
            setIsLoading(true);
            setError(null);

            try {
                const userTasksKey = getUserTasksKey(user.uid);
                const storedTasks = localStorage.getItem(userTasksKey);

                if (storedTasks) {
                    const parsedTasks = JSON.parse(storedTasks);
                    setTasks(Array.isArray(parsedTasks) ? parsedTasks : []);
                } else {
                    setTasks([]);
                }
            } catch (err) {
                console.error("Error loading tasks:", err);
                setError(err);
                setTasks([]);
            } finally {
                setIsLoading(false);
            }
        } else {
            setTasks([]);
        }
    }, [user?.uid, getUserTasksKey]);

    // Save tasks to localStorage
    useEffect(() => {
        if (user?.uid && tasks.length >= 0) {
            try {
                const userTasksKey = getUserTasksKey(user.uid);
                localStorage.setItem(userTasksKey, JSON.stringify(tasks));
            } catch (err) {
                console.error("Error saving tasks:", err);
                setError(err);
            }
        }
    }, [tasks, user?.uid, getUserTasksKey]);

    // Add task handler
    const handleAddTask = useCallback((newTask) => {
        try {
            const taskWithId = {
                id: Date.now() + Math.random(), // More unique ID
                ...newTask,
                completed: false,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            };

            setTasks(prev => [...prev, taskWithId]);
            setError(null);
        } catch (err) {
            console.error("Error adding task:", err);
            setError(err);
        }
    }, []);

    // Delete task handler
    const handleDeleteTask = useCallback((id) => {
        try {
            setTasks(prev => prev.filter(task => task.id !== id));

            // Clear edit state if deleting the task being edited
            if (taskToEdit?.id === id) {
                setTaskToEdit(null);
            }

            setError(null);
        } catch (err) {
            console.error("Error deleting task:", err);
            setError(err);
        }
    }, [taskToEdit?.id]);

    // Update task handler
    const handleUpdateTask = useCallback((updatedTask) => {
        try {
            const taskWithTimestamp = {
                ...updatedTask,
                updatedAt: new Date().toISOString(),
            };

            setTasks(prev =>
                prev.map(task =>
                    task.id === updatedTask.id ? taskWithTimestamp : task
                )
            );
            setTaskToEdit(null);
            setError(null);
        } catch (err) {
            console.error("Error updating task:", err);
            setError(err);
        }
    }, []);

    // Toggle complete handler
    const handleToggleComplete = useCallback((id) => {
        try {
            setTasks(prev =>
                prev.map(task =>
                    task.id === id
                        ? {
                            ...task,
                            completed: !task.completed,
                            updatedAt: new Date().toISOString(),
                            completedAt: !task.completed ? new Date().toISOString() : null,
                        }
                        : task
                )
            );
            setError(null);
        } catch (err) {
            console.error("Error toggling task completion:", err);
            setError(err);
        }
    }, []);

    // Set task to edit handler
    const handleSetTaskToEdit = useCallback((task) => {
        setTaskToEdit(task);
    }, []);

    // Clear task to edit handler
    const handleClearTaskToEdit = useCallback(() => {
        setTaskToEdit(null);
    }, []);

    // Memoized computed values
    const incompleteTasks = useMemo(() =>
        tasks.filter(task => !task.completed),
        [tasks]
    );

    const completedTasks = useMemo(() =>
        tasks.filter(task => task.completed),
        [tasks]
    );

    const taskStats = useMemo(() => ({
        total: tasks.length,
        completed: completedTasks.length,
        incomplete: incompleteTasks.length,
        completionRate: tasks.length > 0 ? (completedTasks.length / tasks.length) * 100 : 0,
    }), [tasks.length, completedTasks.length, incompleteTasks.length]);

    return {
        tasks,
        taskToEdit,
        isLoading,
        error,
        incompleteTasks,
        completedTasks,
        taskStats,
        handleAddTask,
        handleDeleteTask,
        handleUpdateTask,
        handleToggleComplete,
        handleSetTaskToEdit,
        handleClearTaskToEdit,
    };
};
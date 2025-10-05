// src/hooks/useTasks.js - PRODUCTION VERSION (All console.log removed)
import { useState, useEffect, useCallback, useMemo } from "react";

export const useTasks = (user) => {
    const [tasks, setTasks] = useState([]);
    const [taskToEdit, setTaskToEdit] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error] = useState(null);
    const [initialized, setInitialized] = useState(false);

    const getStorageKey = useCallback(() => {
        if (!user?.uid) return null;
        return `tasks_${user.uid}`;
    }, [user?.uid]);

    const loadTasksFromStorage = useCallback(() => {
        const key = getStorageKey();
        if (!key) return [];

        try {
            const stored = localStorage.getItem(key);
            if (stored) {
                const parsed = JSON.parse(stored);
                return Array.isArray(parsed) ? parsed : [];
            }
            return [];
        } catch (e) {
            console.error('Error loading tasks:', e);
            return [];
        }
    }, [getStorageKey]);

    const saveTasksToStorage = useCallback((tasksToSave) => {
        const key = getStorageKey();
        if (!key) return false;

        try {
            const json = JSON.stringify(tasksToSave);
            localStorage.setItem(key, json);
            return true;
        } catch (e) {
            console.error('Error saving tasks:', e);
            return false;
        }
    }, [getStorageKey]);

    useEffect(() => {
        if (user === undefined && !initialized) return;

        if (!user?.uid) {
            setTasks([]);
            setIsLoading(false);
            setInitialized(true);
            return;
        }

        setIsLoading(true);
        const loadedTasks = loadTasksFromStorage();
        setTasks(loadedTasks);
        setIsLoading(false);
        setInitialized(true);

    }, [user, loadTasksFromStorage, initialized]);

    const handleAddTask = useCallback((taskData) => {
        if (!user?.uid) return;

        const newTask = {
            id: Date.now(),
            ...taskData,
            title: taskData.title || `${taskData.subject} - ${taskData.topic}`,
            category: taskData.category || taskData.subject,
            completed: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        setTasks(prevTasks => {
            const updated = [...prevTasks, newTask];
            saveTasksToStorage(updated);
            return updated;
        });

    }, [user?.uid, saveTasksToStorage]);

    const handleDeleteTask = useCallback((taskId) => {
        setTasks(prevTasks => {
            const updated = prevTasks.filter(task => task.id !== taskId);
            saveTasksToStorage(updated);
            return updated;
        });

        if (taskToEdit?.id === taskId) {
            setTaskToEdit(null);
        }
    }, [taskToEdit?.id, saveTasksToStorage]);

    const handleUpdateTask = useCallback((updatedTask) => {
        setTasks(prevTasks => {
            const updated = prevTasks.map(task =>
                task.id === updatedTask.id
                    ? { ...updatedTask, updatedAt: new Date().toISOString() }
                    : task
            );
            saveTasksToStorage(updated);
            return updated;
        });

        setTaskToEdit(null);
    }, [saveTasksToStorage]);

    const handleToggleComplete = useCallback((taskId) => {
        setTasks(prevTasks => {
            const updated = prevTasks.map(task =>
                task.id === taskId
                    ? {
                        ...task,
                        completed: !task.completed,
                        completedAt: !task.completed ? new Date().toISOString() : null,
                        updatedAt: new Date().toISOString(),
                    }
                    : task
            );
            saveTasksToStorage(updated);
            return updated;
        });
    }, [saveTasksToStorage]);

    const handleSetTaskToEdit = useCallback((task) => {
        setTaskToEdit(task);
    }, []);

    const handleClearTaskToEdit = useCallback(() => {
        setTaskToEdit(null);
    }, []);

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
        completionRate: tasks.length > 0
            ? Math.round((completedTasks.length / tasks.length) * 100)
            : 0,
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
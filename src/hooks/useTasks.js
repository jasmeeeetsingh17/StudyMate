// src/hooks/useTasks.js - FINAL FIX - No flicker version
import { useState, useEffect, useCallback, useMemo } from "react";

export const useTasks = (user) => {
    const [tasks, setTasks] = useState([]);
    const [taskToEdit, setTaskToEdit] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // Start as loading
    const [error] = useState(null);
    const [initialized, setInitialized] = useState(false);

    // Get the storage key for current user
    const getStorageKey = useCallback(() => {
        if (!user?.uid) return null;
        return `tasks_${user.uid}`;
    }, [user?.uid]);

    // Load tasks from localStorage
    const loadTasksFromStorage = useCallback(() => {
        const key = getStorageKey();
        if (!key) {
            return [];
        }

        try {
            const stored = localStorage.getItem(key);
            console.log(`📂 Loading from key: ${key}`);

            if (stored) {
                const parsed = JSON.parse(stored);
                console.log(`✅ Loaded ${parsed.length} tasks from localStorage`);
                return Array.isArray(parsed) ? parsed : [];
            } else {
                console.log(`📂 No data found for key: ${key}`);
                return [];
            }
        } catch (e) {
            console.error('❌ Error loading tasks:', e);
            return [];
        }
    }, [getStorageKey]);

    // Save tasks to localStorage
    const saveTasksToStorage = useCallback((tasksToSave) => {
        const key = getStorageKey();
        if (!key) {
            console.error('❌ Cannot save: No storage key');
            return false;
        }

        try {
            const json = JSON.stringify(tasksToSave);
            localStorage.setItem(key, json);
            console.log(`💾 SAVED ${tasksToSave.length} tasks to ${key}`);
            return true;
        } catch (e) {
            console.error('❌ Error saving tasks:', e);
            return false;
        }
    }, [getStorageKey]);

    // Load tasks when user is available
    useEffect(() => {
        // Don't clear tasks if user is undefined during initial load
        if (user === undefined && !initialized) {
            console.log('⏳ Waiting for user initialization...');
            return;
        }

        if (!user?.uid) {
            console.log('🔄 No user - clearing tasks');
            setTasks([]);
            setIsLoading(false);
            setInitialized(true);
            return;
        }

        console.log('🔄 useTasks: Loading for user', user.uid);
        setIsLoading(true);

        // Load tasks
        const loadedTasks = loadTasksFromStorage();
        console.log('📥 Setting tasks in state:', loadedTasks.length, 'tasks');
        setTasks(loadedTasks);
        setIsLoading(false);
        setInitialized(true);

    }, [user, loadTasksFromStorage, initialized]);

    // ADD TASK
    const handleAddTask = useCallback((taskData) => {
        console.log('\n➕ ADD TASK CALLED');
        console.log('   Input:', taskData);

        if (!user?.uid) {
            console.error('❌ Cannot add task: No user');
            return;
        }

        const newTask = {
            id: Date.now(),
            ...taskData,
            title: taskData.title || `${taskData.subject} - ${taskData.topic}`,
            category: taskData.category || taskData.subject,
            completed: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        console.log('   Created task:', newTask);

        setTasks(prevTasks => {
            const updated = [...prevTasks, newTask];
            console.log('   Total tasks after add:', updated.length);
            saveTasksToStorage(updated);
            console.log('✅ Task added successfully');
            return updated;
        });

    }, [user?.uid, saveTasksToStorage]);

    // DELETE TASK
    const handleDeleteTask = useCallback((taskId) => {
        console.log('\n🗑️ DELETE TASK:', taskId);

        setTasks(prevTasks => {
            const updated = prevTasks.filter(task => task.id !== taskId);
            console.log('   Remaining tasks:', updated.length);
            saveTasksToStorage(updated);
            return updated;
        });

        if (taskToEdit?.id === taskId) {
            setTaskToEdit(null);
        }
    }, [taskToEdit?.id, saveTasksToStorage]);

    // UPDATE TASK
    const handleUpdateTask = useCallback((updatedTask) => {
        console.log('\n✏️ UPDATE TASK:', updatedTask.id);

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

    // TOGGLE COMPLETE
    const handleToggleComplete = useCallback((taskId) => {
        console.log('\n✓ TOGGLE COMPLETE:', taskId);

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

    // SET TASK TO EDIT
    const handleSetTaskToEdit = useCallback((task) => {
        console.log('📝 Setting task to edit:', task?.id);
        setTaskToEdit(task);
    }, []);

    // CLEAR TASK TO EDIT
    const handleClearTaskToEdit = useCallback(() => {
        setTaskToEdit(null);
    }, []);

    // Computed values
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
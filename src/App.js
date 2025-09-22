// src/App.js
import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebase";

import Header from "./components/Header";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import HomePage from "./pages/HomePage";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import AccountPage from "./pages/AccountPage";

function App() {
  const [tasks, setTasks] = useState([]);

  const [taskToEdit, setTaskToEdit] = useState(null);

  // ✅ Start with null to indicate "checking auth state"
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [user, setUser] = useState(null);

  // ✅ Load tasks for the authenticated user
  useEffect(() => {
    if (isAuthenticated && user) {
      const userTasksKey = `tasks_${user.uid}`;
      const storedTasks = localStorage.getItem(userTasksKey);
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
    }
  }, [isAuthenticated, user]);

  // ✅ Save tasks to localStorage with user-specific key
  useEffect(() => {
    if (isAuthenticated && user) {
      const userTasksKey = `tasks_${user.uid}`;
      localStorage.setItem(userTasksKey, JSON.stringify(tasks));
    }
  }, [tasks, isAuthenticated, user]);

  // ✅ Firebase auth state listener - this handles page refresh and localStorage sync
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        // User is signed in - get additional data from localStorage or create new
        const storedUser = JSON.parse(localStorage.getItem("studyMateUser"));

        const userData = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName || storedUser?.username || storedUser?.displayName || null,
          username: storedUser?.username || firebaseUser.displayName || null,
          // Add any other user data you want to persist
          profilePicture: storedUser?.profilePicture || null,
          preferences: storedUser?.preferences || {},
          createdAt: storedUser?.createdAt || new Date().toISOString(),
        };

        // Always sync with localStorage
        localStorage.setItem("studyMateUser", JSON.stringify(userData));

        setUser(userData);
        setIsAuthenticated(true);
      } else {
        // User is signed out - clear everything
        localStorage.removeItem("studyMateUser");
        localStorage.removeItem("tasks"); // Clear tasks on logout for privacy
        setTasks([]); // Clear tasks from state
        setUser(null);
        setIsAuthenticated(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleAddTask = (newTask) => {
    setTasks((prev) => [
      ...prev,
      { id: Date.now(), ...newTask, completed: false },
    ]);
  };

  const handleDeleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const handleUpdateTask = (updatedTask) => {
    setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
    setTaskToEdit(null);
  };

  const handleToggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleSetTaskToEdit = (task) => setTaskToEdit(task);

  const handleLogin = (userData) => {
    // This is handled by the auth state listener now
    // But keeping for any custom logic you might need
    console.log("Login successful:", userData);
  };

  const handleLogout = async () => {
    try {
      // Clear tasks before signing out
      setTasks([]);
      await auth.signOut(); // This will trigger the auth state listener
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const incompleteTasks = tasks.filter((task) => !task.completed);

  // ✅ Show loading screen while checking auth (null means checking)
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Checking authentication...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Router>
        {isAuthenticated && (
          <Header isAuthenticated={isAuthenticated} user={user} onLogout={handleLogout} />
        )}

        <main className="max-w-5xl mx-auto p-4">
          <Routes>
            {!isAuthenticated ? (
              <>
                <Route path="/login" element={<Login onLogin={handleLogin} />} />
                <Route path="/signup" element={<SignUp onLogin={handleLogin} />} />
                <Route path="*" element={<Navigate to="/login" replace />} />
              </>
            ) : (
              <>
                <Route path="/" element={<HomePage tasks={tasks} />} />
                <Route
                  path="/tasks"
                  element={
                    <TaskList
                      tasks={incompleteTasks}
                      onDeleteTask={handleDeleteTask}
                      onEditTask={handleSetTaskToEdit}
                      onToggleComplete={handleToggleComplete}
                    />
                  }
                />
                <Route
                  path="/task-form"
                  element={
                    <TaskForm
                      onAddTask={handleAddTask}
                      onUpdateTask={handleUpdateTask}
                      existingTask={taskToEdit}
                    />
                  }
                />
                <Route path="/account" element={<AccountPage user={user} />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </>
            )}
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;
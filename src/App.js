// src/App.js
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from "./components/Header";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import HomePage from "./pages/HomePage";
import TaskList from "./components/TaskList";
import TaskForm from './components/TaskForm';
import CompletedTasksPage from './pages/CompletedTaskPage';
import AccountPage from './pages/AccountPage';

function App() {
  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks ? JSON.parse(storedTasks) : [];
  });

  const [taskToEdit, setTaskToEdit] = useState(null);

  // auth state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = (newTask) => {
    setTasks((prev) => [...prev, { id: Date.now(), ...newTask, completed: false }]);
  };

  const handleDeleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const handleUpdateTask = (updatedTask) => {
    setTasks(tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    ));
    setTaskToEdit(null);
  };

  const handleToggleComplete = (id) => {
    setTasks(tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleSetTaskToEdit = (task) => {
    setTaskToEdit(task);
  };

  // auth handlers
  const handleLogin = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  const incompleteTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Router>
        {/* Show Header only if logged in */}
        {isAuthenticated && (
          <Header
            isAuthenticated={isAuthenticated}
            user={user}
            onLogout={handleLogout}
          />
        )}

        <main className="max-w-5xl mx-auto p-4">
          <Routes>
            {/* If not authenticated, always go to Login */}
            {!isAuthenticated ? (
              <>
                <Route path="/login" element={<Login onLogin={handleLogin} />} />
                <Route path="/signup" element={<SignUp onLogin={handleLogin} />} />
                {/* default redirect to login */}
                <Route path="*" element={<Navigate to="/login" />} />
              </>
            ) : (
              <>
                <Route
                  path="/"
                  element={<HomePage tasks={tasks} />}
                />
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
                <Route
                  path="/completed"
                  element={
                    <CompletedTasksPage
                      tasks={completedTasks}
                      onDeleteTask={handleDeleteTask}
                      onToggleComplete={handleToggleComplete}
                    />
                  }
                />
                <Route path="/account" element={<AccountPage user={user} />} />
                {/* redirect any unknown route to home */}
                <Route path="*" element={<Navigate to="/" />} />
              </>
            )}
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;

// src/App.js
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from "./components/Header";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import HomePage from "./pages/HomePage";
import TaskList from "./components/TaskList";
import TaskForm from './components/TaskForm';
import CompletedTasksPage from './pages/CompletedTaskPage'; // Import the new page

function App() {
  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks ? JSON.parse(storedTasks) : [];
  });

  // State to keep track of the task being edited
  const [taskToEdit, setTaskToEdit] = useState(null);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = (newTask) => {
    setTasks((prev) => [...prev, { id: Date.now(), ...newTask, completed: false }]);
  };

  const handleDeleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  // --- NEW --- Function to update an existing task
  const handleUpdateTask = (updatedTask) => {
    setTasks(tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    ));
    setTaskToEdit(null); // Clear the editing state
  };

  // --- NEW --- Function to toggle a task's completion status
  const handleToggleComplete = (id) => {
    setTasks(tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  // --- NEW --- Function to set which task to edit
  const handleSetTaskToEdit = (task) => {
    setTaskToEdit(task);
  };

  // Filter tasks for different pages
  const incompleteTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Router>
        <Header />
        <main className="max-w-5xl mx-auto p-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/tasks"
              element={
                <TaskList
                  tasks={incompleteTasks}
                  onDeleteTask={handleDeleteTask}
                  onEditTask={handleSetTaskToEdit} // Pass the edit handler
                  onToggleComplete={handleToggleComplete} // Pass the complete handler
                />}
            />
            <Route
              path="/task-form"
              element={
                <TaskForm
                  onAddTask={handleAddTask}
                  onUpdateTask={handleUpdateTask} // Pass the update handler
                  existingTask={taskToEdit} // Pass the task to be edited
                />}
            />
            {/* --- NEW --- Route for completed tasks */}
            <Route
              path="/completed"
              element={
                <CompletedTasksPage
                  tasks={completedTasks}
                  onDeleteTask={handleDeleteTask}
                  onToggleComplete={handleToggleComplete}
                />}
            />
            <Route path="/Login" element={<Login />} />
            <Route path="/SignUp" element={<SignUp />} />
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;
// src/App.js - FIXED VERSION with proper localStorage integration
import { Suspense, lazy, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";

import { useAuth } from "./hooks/useAuth";
import { useTasks } from "./hooks/useTasks";
import Header from "./components/Header";
import LoadingScreen from "./components/LoadingScreen";
import ErrorFallback from "./components/ErrorFallback";

// Import debug utility (remove in production)
import StorageDebugger from "./utils/storageDebug";

// Lazy load components for better performance
const Login = lazy(() => import("./components/Login"));
const SignUp = lazy(() => import("./components/SignUp"));
const HomePage = lazy(() => import("./pages/HomePage"));
const TaskList = lazy(() => import("./components/TaskList"));
const TaskForm = lazy(() => import("./components/TaskForm"));
const AccountPage = lazy(() => import("./pages/AccountPage"));
const StatsPage = lazy(() => import("./pages/StatsPage"));

function App() {
  const { isAuthenticated, user, handleLogout, isLoading: authLoading, error: authError } = useAuth();
  const {
    tasks,
    taskToEdit,
    isLoading: tasksLoading,
    error: tasksError,
    handleAddTask,
    handleDeleteTask,
    handleUpdateTask,
    handleToggleComplete,
    handleSetTaskToEdit,
    incompleteTasks,
    completedTasks,
    taskStats,
  } = useTasks(user);

  // Debug: Log when user or tasks change (remove in production)
  useEffect(() => {
    console.log('App state changed:');
    console.log('  - isAuthenticated:', isAuthenticated);
    console.log('  - user:', user);
    console.log('  - tasks count:', tasks.length);

    // Make debugger available in console
    window.debugStorage = () => StorageDebugger.runDiagnostic();
    console.log('💡 Tip: Run window.debugStorage() in console to check localStorage');
  }, [isAuthenticated, user, tasks]);

  // Show loading screen while checking auth
  if (authLoading) {
    return <LoadingScreen message="Loading..." />;
  }

  // Show auth error if any
  if (authError) {
    return (
      <ErrorFallback
        error={authError}
        resetError={() => window.location.reload()}
      />
    );
  }

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
        <Router>
          {isAuthenticated && (
            <Header
              isAuthenticated={isAuthenticated}
              user={user}
              onLogout={handleLogout}
              taskStats={taskStats}
            />
          )}

          <main className="max-w-6xl mx-auto px-4 py-6">
            {tasksError && (
              <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-400 text-red-700 rounded-r-md dark:bg-red-900/20 dark:border-red-600 dark:text-red-400">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium">Something went wrong with your tasks</p>
                    <p className="text-sm">{tasksError.message}</p>
                  </div>
                </div>
              </div>
            )}

            <Suspense fallback={<LoadingScreen message="Loading page..." />}>
              <Routes>
                {!isAuthenticated ? (
                  <>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="*" element={<Navigate to="/login" replace />} />
                  </>
                ) : (
                  <>
                    <Route
                      path="/"
                      element={
                        <HomePage
                          tasks={tasks}
                          completedTasks={completedTasks}
                          incompleteTasks={incompleteTasks}
                          taskStats={taskStats}
                          isLoading={tasksLoading}
                          user={user}
                        />
                      }
                    />
                    <Route
                      path="/tasks"
                      element={
                        <TaskList
                          tasks={tasks}
                          onDeleteTask={handleDeleteTask}
                          onEditTask={handleSetTaskToEdit}
                          onToggleComplete={handleToggleComplete}
                          isLoading={tasksLoading}
                          title="My Study Tasks"
                        />
                      }
                    />

                    <Route
                      path="/add-task"
                      element={
                        <TaskForm
                          onAddTask={handleAddTask}
                          onUpdateTask={handleUpdateTask}
                          existingTask={taskToEdit}
                          isLoading={tasksLoading}
                          isEditing={false}
                        />
                      }
                    />
                    <Route
                      path="/edit-task/:id"
                      element={
                        <TaskForm
                          onAddTask={handleAddTask}
                          onUpdateTask={handleUpdateTask}
                          existingTask={taskToEdit}
                          isLoading={tasksLoading}
                          isEditing={true}
                        />
                      }
                    />
                    <Route
                      path="/stats"
                      element={
                        <StatsPage
                          tasks={tasks}
                          completedTasks={completedTasks}
                          taskStats={taskStats}
                        />
                      }
                    />
                    <Route path="/account" element={<AccountPage user={user} />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </>
                )}
              </Routes>
            </Suspense>
          </main>
        </Router>
      </div>
    </ErrorBoundary>
  );
}

export default App;
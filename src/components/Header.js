// src/components/Header.js
import { NavLink } from 'react-router-dom';

export default function Header({ isAuthenticated, user, onLogout }) {
    return (
        <nav className="bg-white shadow dark:bg-gray-800">
            <div className="container mx-auto flex items-center justify-between p-5">
                {/* Left */}
                <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                    StudyMate
                </h1>

                {/* Center nav links */}
                <div className="flex items-center space-x-10 text-gray-600 capitalize dark:text-gray-300">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive
                                ? 'text-gray-800 dark:text-gray-200 border-b-2 border-blue-500'
                                : 'border-b-2 border-transparent hover:text-gray-800 dark:hover:text-gray-200 hover:border-blue-500'
                        }
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/tasks"
                        className={({ isActive }) =>
                            isActive
                                ? 'text-gray-800 dark:text-gray-200 border-b-2 border-blue-500'
                                : 'border-b-2 border-transparent hover:text-gray-800 dark:hover:text-gray-200 hover:border-blue-500'
                        }
                    >
                        All Tasks
                    </NavLink>
                    <NavLink
                        to="/task-form"
                        className={({ isActive }) =>
                            isActive
                                ? 'text-gray-800 dark:text-gray-200 border-b-2 border-blue-500'
                                : 'border-b-2 border-transparent hover:text-gray-800 dark:hover:text-gray-200 hover:border-blue-500'
                        }
                    >
                        Create New Task
                    </NavLink>
                    <NavLink
                        to="/completed"
                        className={({ isActive }) =>
                            isActive
                                ? 'text-gray-800 dark:text-gray-200 border-b-2 border-blue-500'
                                : 'border-b-2 border-transparent hover:text-gray-800 dark:hover:text-gray-200 hover:border-blue-500'
                        }
                    >
                        Completed Task
                    </NavLink>
                </div>

                {/* Right */}
                <div className="flex items-center space-x-4">
                    {isAuthenticated ? (
                        <>
                            <span className="text-gray-800 dark:text-gray-200 font-medium">
                                {user?.name || 'My Account'}
                            </span>
                            <button
                                onClick={onLogout}
                                className="px-3 py-1 text-sm font-medium text-white bg-red-600 rounded hover:bg-red-700"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <NavLink
                                to="/login"
                                className="px-3 py-1 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700"
                            >
                                Login
                            </NavLink>
                            <NavLink
                                to="/SignUp"
                                className="px-3 py-1 text-sm font-medium text-blue-600 border border-blue-600 rounded hover:bg-blue-50 dark:hover:bg-gray-700"
                            >
                                Sign Up
                            </NavLink>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}

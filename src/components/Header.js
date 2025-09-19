import { NavLink } from 'react-router-dom';

export default function Header() {
    return (
        <nav className="bg-white shadow dark:bg-gray-800">
            <div className="container mx-auto flex items-center justify-between p-5">
                {/* Left */}
                <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                    StudyMate
                </h1>

                {/* Center */}
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
                </div>
            </div>
        </nav>
    );
}

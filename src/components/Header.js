import { NavLink } from 'react-router-dom';
import { useState } from 'react';

export default function Header({ isAuthenticated, user, onLogout }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <nav className="bg-gradient-to-r from-slate-900 via-gray-900 to-zinc-900 shadow-2xl border-b border-gray-800/50 backdrop-blur-sm">
            <div className="container mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo/Brand */}
                    <div className="flex items-center space-x-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                            <span className="text-white font-bold text-lg">S</span>
                        </div>
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                            StudyMate
                        </h1>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                `relative px-4 py-2 rounded-lg font-medium transition-all duration-300 ${isActive
                                    ? 'text-white bg-blue-600/20 shadow-lg shadow-blue-500/25'
                                    : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                                }`
                            }
                        >
                            Home
                            {({ isActive }) =>
                                isActive && (
                                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-500 rounded-full"></div>
                                )
                            }
                        </NavLink>

                        <NavLink
                            to="/tasks"
                            className={({ isActive }) =>
                                `relative px-4 py-2 rounded-lg font-medium transition-all duration-300 ${isActive
                                    ? 'text-white bg-blue-600/20 shadow-lg shadow-blue-500/25'
                                    : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                                }`
                            }
                        >
                            All Tasks
                        </NavLink>

                        <NavLink
                            to="/task-form"
                            className={({ isActive }) =>
                                `relative px-4 py-2 rounded-lg font-medium transition-all duration-300 ${isActive
                                    ? 'text-white bg-blue-600/20 shadow-lg shadow-blue-500/25'
                                    : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                                }`
                            }
                        >
                            Create Task
                        </NavLink>

                        <NavLink
                            to="/completed"
                            className={({ isActive }) =>
                                `relative px-4 py-2 rounded-lg font-medium transition-all duration-300 ${isActive
                                    ? 'text-white bg-blue-600/20 shadow-lg shadow-blue-500/25'
                                    : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                                }`
                            }
                        >
                            Completed
                        </NavLink>
                    </div>

                    {/* Desktop Auth Section */}
                    <div className="hidden md:flex items-center space-x-4">
                        {isAuthenticated ? (
                            <div className="flex items-center space-x-4">
                                <NavLink
                                    to="/account"
                                    className="flex items-center space-x-3 bg-gray-800/50 rounded-lg px-4 py-2 border border-gray-700/50 hover:bg-gray-700/50 transition-colors duration-200"
                                >
                                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                                        <span className="text-white text-sm font-semibold">
                                            {(user?.name || 'U').charAt(0).toUpperCase()}
                                        </span>
                                    </div>
                                    <span className="text-gray-200 font-medium">
                                        {user?.name || 'My Account'}
                                    </span>
                                </NavLink>

                                <button
                                    onClick={onLogout}
                                    className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white font-medium rounded-lg hover:from-red-700 hover:to-red-800 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-3">
                                <NavLink
                                    to="/login"
                                    className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                                >
                                    Login
                                </NavLink>
                                <NavLink
                                    to="/SignUp"
                                    className="px-6 py-2 bg-transparent text-blue-400 font-medium border-2 border-blue-500/50 rounded-lg hover:bg-blue-500/10 hover:border-blue-400 transform hover:scale-105 transition-all duration-300"
                                >
                                    Sign Up
                                </NavLink>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={toggleMobileMenu}
                        className="md:hidden flex flex-col space-y-1 p-2 rounded-lg hover:bg-gray-800/50 transition-colors duration-200"
                    >
                        <div className={`w-6 h-0.5 bg-gray-300 transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></div>
                        <div className={`w-6 h-0.5 bg-gray-300 transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></div>
                        <div className={`w-6 h-0.5 bg-gray-300 transition-transform duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></div>
                    </button>
                </div>

                {/* Mobile Menu */}
                <div className={`md:hidden overflow-hidden transition-all duration-300 ${isMobileMenuOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
                    <div className="bg-gray-800/30 rounded-xl backdrop-blur-sm border border-gray-700/50 p-4">
                        <div className="flex flex-col space-y-3">
                            <NavLink
                                to="/"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={({ isActive }) =>
                                    `px-4 py-3 rounded-lg font-medium transition-all duration-300 ${isActive
                                        ? 'text-white bg-blue-600/20 shadow-lg shadow-blue-500/25'
                                        : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                                    }`
                                }
                            >
                                Home
                            </NavLink>

                            <NavLink
                                to="/tasks"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={({ isActive }) =>
                                    `px-4 py-3 rounded-lg font-medium transition-all duration-300 ${isActive
                                        ? 'text-white bg-blue-600/20 shadow-lg shadow-blue-500/25'
                                        : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                                    }`
                                }
                            >
                                All Tasks
                            </NavLink>

                            <NavLink
                                to="/task-form"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={({ isActive }) =>
                                    `px-4 py-3 rounded-lg font-medium transition-all duration-300 ${isActive
                                        ? 'text-white bg-blue-600/20 shadow-lg shadow-blue-500/25'
                                        : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                                    }`
                                }
                            >
                                Create Task
                            </NavLink>

                            <NavLink
                                to="/completed"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={({ isActive }) =>
                                    `px-4 py-3 rounded-lg font-medium transition-all duration-300 ${isActive
                                        ? 'text-white bg-blue-600/20 shadow-lg shadow-blue-500/25'
                                        : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                                    }`
                                }
                            >
                                Completed
                            </NavLink>

                            <div className="border-t border-gray-700/50 pt-4 mt-4">
                                {isAuthenticated ? (
                                    <div className="space-y-3">
                                        <NavLink
                                            to="/account"
                                            className="flex items-center space-x-3 bg-gray-800/50 rounded-lg px-4 py-2 border border-gray-700/50 hover:bg-gray-700/50 transition-colors duration-200"
                                        >
                                            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                                                <span className="text-white text-sm font-semibold">
                                                    {(user?.name || 'U').charAt(0).toUpperCase()}
                                                </span>
                                            </div>
                                            <span className="text-gray-200 font-medium">
                                                {user?.name || 'My Account'}
                                            </span>
                                        </NavLink>


                                        <button
                                            onClick={() => {
                                                onLogout();
                                                setIsMobileMenuOpen(false);
                                            }}
                                            className="w-full px-4 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-medium rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-300"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        <NavLink
                                            to="/login"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="block w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium text-center rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300"
                                        >
                                            Login
                                        </NavLink>
                                        <NavLink
                                            to="/SignUp"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="block w-full px-4 py-3 bg-transparent text-blue-400 font-medium text-center border-2 border-blue-500/50 rounded-lg hover:bg-blue-500/10 hover:border-blue-400 transition-all duration-300"
                                        >
                                            Sign Up
                                        </NavLink>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
// src/components/SignUp.js
import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { Link } from 'react-router-dom';
import { EyeIcon, EyeOffIcon } from 'lucide-react';

export default function SignUp({ onLogin }) {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const validateForm = () => {
        const newErrors = {};
        if (!formData.email) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email))
            newErrors.email = 'Please enter a valid email';
        if (!formData.password) newErrors.password = 'Password is required';
        else if (formData.password.length < 6)
            newErrors.password = 'Password must be at least 6 characters';
        return newErrors;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }
        setIsLoading(true);
        setErrors({});
        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                formData.email,
                formData.password
            );
            console.log('User signed up:', userCredential.user);
            if (onLogin) onLogin(userCredential.user);
        } catch (error) {
            setErrors({ submit: error.message });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="h-screen flex justify-center items-center bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900">
            <form
                onSubmit={handleSubmit}
                className="bg-gray-800/90 backdrop-blur-lg border border-gray-700/50 px-8 py-6 w-full max-w-md rounded-2xl shadow-2xl shadow-black/50"
            >
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-100">
                    Sign Up
                </h2>

                {/* Email input */}
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-300 font-medium mb-2">
                        Email:
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your Email"
                        className={`w-full px-3 py-2 bg-gray-700/50 border rounded-lg focus:outline-none focus:ring-2 text-gray-100 placeholder-gray-400 ${errors.email
                                ? 'border-red-500 focus:ring-red-500'
                                : 'border-gray-600 focus:ring-blue-500'
                            }`}
                    />
                    {errors.email && (
                        <p className="mt-1 text-sm text-red-400">{errors.email}</p>
                    )}
                </div>

                {/* Password input with toggle */}
                <div className="mb-6 relative">
                    <label
                        htmlFor="password"
                        className="block text-gray-300 font-medium mb-2"
                    >
                        Password:
                    </label>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Create a Password"
                        className={`w-full px-3 py-2 bg-gray-700/50 border rounded-lg focus:outline-none focus:ring-2 text-gray-100 placeholder-gray-400 ${errors.password
                                ? 'border-red-500 focus:ring-red-500'
                                : 'border-gray-600 focus:ring-blue-500'
                            }`}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-10 text-gray-400 hover:text-gray-200"
                    >
                        {showPassword ? (
                            <EyeOffIcon className="w-5 h-5" />
                        ) : (
                            <EyeIcon className="w-5 h-5" />
                        )}
                    </button>
                    {errors.password && (
                        <p className="mt-1 text-sm text-red-400">{errors.password}</p>
                    )}
                </div>

                {errors.submit && (
                    <div className="mb-4 p-3 bg-red-900/50 border border-red-700 rounded-lg">
                        <p className="text-sm text-red-400">{errors.submit}</p>
                    </div>
                )}

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-2 rounded-lg hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50"
                >
                    {isLoading ? 'Creating Account...' : 'Sign Up'}
                </button>

                {/* 👇 Add login link */}
                <p className="mt-4 text-center text-gray-400 text-sm">
                    Already have an account?{' '}
                    <Link to="/login" className="text-blue-400 hover:underline">
                        Login
                    </Link>
                </p>
            </form>
        </div>
    );
}

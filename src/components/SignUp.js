import { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { Link } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

export default function SignUp() {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const validateForm = () => {
        const newErrors = {};
        if (!formData.username.trim()) newErrors.username = 'Username is required';
        else if (formData.username.length < 3) newErrors.username = 'Username must be at least 3 characters';
        if (!formData.email) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Please enter a valid email';
        if (!formData.password) newErrors.password = 'Password is required';
        else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
        return newErrors;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
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
            // ✅ Create user account
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                formData.email,
                formData.password
            );

            // ✅ Update the user's profile with the username
            await updateProfile(userCredential.user, {
                displayName: formData.username
            });

            // ✅ Save additional user data to localStorage (will be synced by auth listener)
            const userData = {
                uid: userCredential.user.uid,
                email: userCredential.user.email,
                username: formData.username,
                displayName: formData.username
            };
            localStorage.setItem('studyMateUser', JSON.stringify(userData));

            toast.success('Account created successfully!');

            // ✅ Let the Firebase auth state listener handle navigation
            // No need to manually call onLogin or navigate

        } catch (error) {
            let errorMessage = "Failed to create account. Please try again.";
            if (error.code === 'auth/email-already-in-use') {
                errorMessage = "This email is already registered. Please login instead.";
            } else if (error.code === 'auth/weak-password') {
                errorMessage = "Password is too weak. Please choose a stronger password.";
            } else if (error.code === 'auth/invalid-email') {
                errorMessage = "Invalid email address.";
            } else if (error.code === 'auth/operation-not-allowed') {
                errorMessage = "Account creation is currently disabled.";
            }
            setErrors({ submit: errorMessage });
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900 p-4">
            <Toaster
                position="top-center"
                toastOptions={{
                    style: {
                        background: '#334155',
                        color: '#f1f5f9',
                        border: '1px solid #475569'
                    }
                }}
            />
            <form
                onSubmit={handleSubmit}
                noValidate
                className="bg-gray-800/90 backdrop-blur-lg border border-gray-700/50 px-8 py-6 w-full max-w-md rounded-2xl shadow-2xl shadow-black/50"
            >
                <h2 className="text-3xl font-bold mb-6 text-center text-gray-100">Create Account</h2>

                <div className="mb-4">
                    <label htmlFor="username" className="block text-gray-300 font-medium mb-2">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        placeholder="Choose a username"
                        className={`w-full px-3 py-2 bg-gray-700/50 border rounded-lg focus:outline-none focus:ring-2 text-gray-100 placeholder-gray-400 ${errors.username ? 'border-red-500 focus:ring-red-500' : 'border-gray-600 focus:ring-blue-500'}`}
                    />
                    {errors.username && <p className="mt-1 text-sm text-red-400">{errors.username}</p>}
                </div>

                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-300 font-medium mb-2">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email"
                        className={`w-full px-3 py-2 bg-gray-700/50 border rounded-lg focus:outline-none focus:ring-2 text-gray-100 placeholder-gray-400 ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-600 focus:ring-blue-500'}`}
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
                </div>

                <div className="mb-6 relative">
                    <label htmlFor="password" className="block text-gray-300 font-medium mb-2">Password</label>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Create a password"
                        className={`w-full px-3 py-2 bg-gray-700/50 border rounded-lg focus:outline-none focus:ring-2 text-gray-100 placeholder-gray-400 ${errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-600 focus:ring-blue-500'}`}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-[38px] text-gray-400 hover:text-gray-200"
                    >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                    {errors.password && <p className="mt-1 text-sm text-red-400">{errors.password}</p>}
                </div>

                {errors.submit && (
                    <div className="mb-4 p-3 bg-red-900/50 border border-red-700 rounded-lg">
                        <p className="text-sm text-center text-red-400">{errors.submit}</p>
                    </div>
                )}

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
                >
                    {isLoading ? 'Creating Account...' : 'Sign Up'}
                </button>

                <p className="mt-6 text-center text-gray-400 text-sm">
                    Already have an account? <Link to="/login" className="font-medium text-blue-400 hover:underline">Log In</Link>
                </p>
            </form>
        </div>
    );
}
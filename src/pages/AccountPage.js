import { useEffect, useState } from "react";
import { User, Mail, LogOut } from "lucide-react";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";

export default function AccountPage() {
    const [user, setUser] = useState({ name: "", email: "" });
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
            if (firebaseUser) {
                setUser({
                    name: firebaseUser.displayName || "Guest User",
                    email: firebaseUser.email || "No email provided"
                });
            } else {
                setUser({ name: "Guest User", email: "No email provided" });
            }
        });

        return () => unsubscribe();
    }, []);

    const handleLogout = async () => {
        try {
            await auth.signOut();
            navigate("/login"); // redirect to login page after logout
        } catch (error) {
            console.error("Logout Error:", error);
        }
    };

    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900 flex items-center justify-center p-6">
            <div className="bg-gray-800/90 backdrop-blur-lg border border-gray-700/50 shadow-2xl shadow-black/50 rounded-3xl p-8 w-full max-w-2xl relative">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="relative mx-auto mb-6">
                        <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl">
                            <span className="text-white text-2xl font-bold">
                                {user.name.charAt(0).toUpperCase()}
                            </span>
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-500 rounded-full border-4 border-gray-800 flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                    </div>

                    <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                        My Account
                    </h1>
                    <p className="text-gray-400">
                        Manage your StudyMate profile and preferences
                    </p>
                </div>

                {/* Profile Info */}
                <div className="space-y-4 mb-8">
                    <div className="bg-gray-700/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-600/50">
                        <h3 className="text-lg font-semibold text-gray-200 mb-4 flex items-center gap-2">
                            <User size={20} className="text-blue-400" />
                            Personal Information
                        </h3>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-xl">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                                        <User size={18} className="text-blue-400" />
                                    </div>
                                    <div>
                                        <p className="text-gray-300 font-medium">Full Name</p>
                                        <p className="text-gray-400 text-sm">Your display name</p>
                                    </div>
                                </div>
                                <p className="text-gray-100 font-semibold">
                                    {user.name}
                                </p>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-xl">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                                        <Mail size={18} className="text-purple-400" />
                                    </div>
                                    <div>
                                        <p className="text-gray-300 font-medium">Email Address</p>
                                        <p className="text-gray-400 text-sm">Your account email</p>
                                    </div>
                                </div>
                                <p className="text-gray-100 font-semibold">
                                    {user.email}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Logout Button */}
                <div className="flex justify-center">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-medium rounded-xl hover:from-red-700 hover:to-red-800 transition-transform transform hover:scale-105 shadow-lg hover:shadow-xl"
                    >
                        <LogOut size={18} />
                        Logout
                    </button>
                </div>

                {/* Visual Enhancements */}
                <div className="absolute -top-1 -right-1 w-32 h-32 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-1 -left-1 w-32 h-32 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"></div>
            </div>
        </main>
    );
}

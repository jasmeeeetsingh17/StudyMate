import { User, Mail } from "lucide-react";

export default function AccountPage({ user = { name: 'John Doe', email: 'john@example.com' } }) {
    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900 flex items-center justify-center p-6">
            <div className="bg-gray-800/90 backdrop-blur-lg border border-gray-700/50 shadow-2xl shadow-black/50 rounded-3xl p-8 w-full max-w-2xl">
                {/* Header Section */}
                <div className="text-center mb-8">
                    <div className="relative mx-auto mb-6">
                        <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl">
                            <span className="text-white text-2xl font-bold">
                                {(user?.name || 'U').charAt(0).toUpperCase()}
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

                {/* Profile Information Cards */}
                <div className="space-y-4 mb-8">
                    {/* Personal Information Card */}
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
                                    {user?.name || 'Guest User'}
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
                                    {user?.email || 'No email provided'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                {/* <div className="flex flex-col sm:flex-row gap-4">
                    <button
                        onClick={onLogout}
                        className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white font-medium rounded-lg hover:from-red-700 hover:to-red-800 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                        Logout
                    </button>
                </div> */}

                {/* Visual Enhancement */}
                <div className="absolute -top-1 -right-1 w-32 h-32 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-1 -left-1 w-32 h-32 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"></div>
            </div>
        </main>
    );
}
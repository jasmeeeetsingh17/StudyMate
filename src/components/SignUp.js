export default function SignUp() {
    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle signup logic here
        console.log('Signup submitted');
    };

    return (
        // outer div = full screen dark theme background
        <div className="h-screen flex justify-center items-center bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900">
            {/* dark theme form with accent colors */}
            <div className="bg-gray-800/90 backdrop-blur-lg border border-gray-700/50 px-8 py-6 w-full max-w-md rounded-2xl shadow-2xl shadow-black/50">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-100">Sign Up</h2>

                <div className="mb-4">
                    <label htmlFor="fullName" className="block text-gray-300 font-medium mb-2">
                        Full Name:
                    </label>
                    <input
                        type="text"
                        id="fullName"
                        placeholder="Enter your Full Name"
                        required
                        className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-100 placeholder-gray-400"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-300 font-medium mb-2">
                        Email:
                    </label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Enter your Email"
                        required
                        className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-100 placeholder-gray-400"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-300 font-medium mb-2">
                        Password:
                    </label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Enter your Password"
                        required
                        className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-100 placeholder-gray-400"
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="confirmPassword" className="block text-gray-300 font-medium mb-2">
                        Confirm Password:
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        placeholder="Confirm your Password"
                        required
                        className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-100 placeholder-gray-400"
                    />
                </div>

                <button
                    onClick={handleSubmit}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-2 rounded-lg hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                    Sign Up
                </button>

                <div className="mt-4 text-center">
                    <p className="text-gray-400 text-sm">
                        Already have an account?{' '}
                        <a href="/Login" className="text-blue-400 hover:text-blue-300 transition-colors">
                            Login here
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
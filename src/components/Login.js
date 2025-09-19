export default function Login() {
    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle login logic here
        console.log('Login submitted');
    };

    return (
        // outer div = full screen dark theme background
        <div className="h-screen flex justify-center items-center bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900">
            {/* dark theme form with accent colors */}
            <div className="bg-gray-800/90 backdrop-blur-lg border border-gray-700/50 px-8 py-6 w-full max-w-md rounded-2xl shadow-2xl shadow-black/50">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-100">Login</h2>

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

                <div className="mb-6">
                    <label htmlFor="pass" className="block text-gray-300 font-medium mb-2">
                        Password:
                    </label>
                    <input
                        type="password"
                        id="pass"
                        placeholder="Enter your Password"
                        required
                        className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-100 placeholder-gray-400"
                    />
                </div>

                <button
                    onClick={handleSubmit}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-2 rounded-lg hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                    Submit
                </button>
            </div>
        </div>
    );
}
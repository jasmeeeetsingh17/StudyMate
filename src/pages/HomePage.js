// src/pages/HomePage.js

// This component is now very simple and doesn't need any props.
export default function HomePage() {
    return (
        <>
            <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 text-center px-4">
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 dark:text-gray-100 mb-6">
                    Welcome to <span className="text-blue-600 dark:text-blue-400">Study Mate</span>
                </h1>
                <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
                    Organize your tasks, track your progress, and achieve your goals more efficiently.
                </p>
            </main>
        </>
    );
}
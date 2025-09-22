// src/pages/HomePage.js
import { useState, useEffect } from 'react';

export default function HomePage() {
    const [tasks, setTasks] = useState([]);

    // Load tasks from local storage when the component mounts
    useEffect(() => {
        try {
            const storedTasks = localStorage.getItem('studyTasks');
            if (storedTasks) {
                setTasks(JSON.parse(storedTasks));
            }
        } catch (error) {
            console.error("Failed to load or parse tasks from local storage:", error);
            // In case of an error, default to an empty list
            setTasks([]);
        }
    }, []); // Empty dependency array ensures this runs only once on mount

    // Count tasks
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter((t) => t.completed).length;
    const percentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

    // Decide grade
    let grade = 'No tasks yet';
    if (totalTasks > 0) {
        if (percentage === 100) grade = 'A+ (Outstanding 🎉)';
        else if (percentage >= 80) grade = 'A (Excellent)';
        else if (percentage >= 60) grade = 'B (Good)';
        else if (percentage >= 40) grade = 'C (Average)';
        else grade = 'D (Needs Improvement)';
    }

    return (
        <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 text-center px-4">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 dark:text-gray-100 mb-6">
                Welcome to{' '}
                <span className="text-blue-600 dark:text-blue-400">Study Mate</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mb-10">
                Organize your tasks, track your progress, and achieve your goals more efficiently.
            </p>

            {/* Analytics Card */}
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 w-full max-w-lg">
                <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">
                    Your Task Analytics
                </h2>
                <div className="grid grid-cols-2 gap-4 text-gray-700 dark:text-gray-300">
                    <div className="p-4 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                        <p className="text-sm">Total Tasks</p>
                        <p className="text-3xl font-bold">{totalTasks}</p>
                    </div>
                    <div className="p-4 rounded-lg bg-green-100 dark:bg-green-900/30">
                        <p className="text-sm">Completed</p>
                        <p className="text-3xl font-bold">{completedTasks}</p>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-6">
                    <p className="text-sm mb-2">Completion Rate</p>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                        <div
                            className="bg-gradient-to-r from-green-400 to-green-600 h-4 rounded-full transition-all duration-500"
                            style={{ width: `${percentage}%` }}
                        ></div>
                    </div>
                    <p className="mt-2 text-sm">
                        {percentage.toFixed(0)}% completed
                    </p>
                </div>

                {/* Grade */}
                <div className="mt-6">
                    <p className="text-lg font-medium">
                        Your Grade: <span className="font-bold text-blue-500">{grade}</span>
                    </p>
                </div>
            </div>
        </main>
    );
}
// src/pages/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, Clock, AlertTriangle, TrendingUp, CheckCircle2 } from 'lucide-react';

const HomePage = ({
    tasks,
    completedTasks,
    incompleteTasks,
    taskStats,
    isLoading,
    user
}) => {
    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good morning';
        if (hour < 18) return 'Good afternoon';
        return 'Good evening';
    };

    // 🔹 NEW: pick the single task closest to due date
    const recentTasks = tasks
        .filter(t => !t.completed && t.dueDate) // only incomplete tasks with due date
        .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate)) // soonest due first
        .slice(0, 1); // take only 1

    const urgentTasks = incompleteTasks
        .filter(task => {
            if (!task.dueDate) return false;
            const dueDate = new Date(task.dueDate);
            const now = new Date();
            const timeDiff = dueDate.getTime() - now.getTime();
            const hoursDiff = timeDiff / (1000 * 3600);
            return hoursDiff <= 24 && hoursDiff > 0;
        })
        .slice(0, 3);

    if (isLoading) {
        return (
            <div className="space-y-6">
                <div className="animate-pulse">
                    <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="h-32 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl p-8 shadow-lg">
                <h1 className="text-3xl font-bold mb-2">
                    {getGreeting()}, {user?.displayName || user?.username || 'Student'}!
                </h1>
                <p className="text-blue-100 text-lg">
                    {taskStats.incomplete > 0
                        ? `You have ${taskStats.incomplete} task${taskStats.incomplete !== 1 ? 's' : ''} to complete`
                        : "All caught up! Great work! 🎉"
                    }
                </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                    title="Total Tasks"
                    value={taskStats.total}
                    icon={<CheckCircle2 className="h-6 w-6" />}
                    color="bg-blue-500"
                />
                <StatCard
                    title="Completed"
                    value={taskStats.completed}
                    icon={<TrendingUp className="h-6 w-6" />}
                    color="bg-green-500"
                />
                <StatCard
                    title="In Progress"
                    value={taskStats.incomplete}
                    icon={<Clock className="h-6 w-6" />}
                    color="bg-yellow-500"
                />
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-4">
                <Link
                    to="/add-task"
                    className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-md hover:shadow-lg"
                >
                    <Plus className="h-5 w-5 mr-2" />
                    Add New Task
                </Link>
                <Link
                    to="/stats"
                    className="inline-flex items-center px-6 py-3 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium transition-colors"
                >
                    <TrendingUp className="h-5 w-5 mr-2" />
                    View Progress
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Urgent Tasks */}
                {urgentTasks.length > 0 && (
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                        <div className="flex items-center mb-4">
                            <AlertTriangle className="h-5 w-5 text-orange-500 mr-2" />
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                                Due Soon
                            </h2>
                        </div>
                        <div className="space-y-3">
                            {urgentTasks.map(task => (
                                <TaskPreview key={task.id} task={task} urgent />
                            ))}
                        </div>
                        <Link
                            to="/tasks"
                            className="inline-block mt-4 text-blue-600 hover:text-blue-800 font-medium text-sm"
                        >
                            View all tasks →
                        </Link>
                    </div>
                )}

                {/* Recent Activity (now just 1 nearest-due task) */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                        Recent Activity
                    </h2>
                    {recentTasks.length > 0 ? (
                        <div className="space-y-3">
                            {recentTasks.map(task => (
                                <TaskPreview key={task.id} task={task} />
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                            No tasks yet. Create your first task to get started!
                        </p>
                    )}
                    <Link
                        to="/tasks"
                        className="inline-block mt-4 text-blue-600 hover:text-blue-800 font-medium text-sm"
                    >
                        View all tasks →
                    </Link>
                </div>
            </div>
        </div>
    );
};

const StatCard = ({ title, value, icon, color }) => (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between">
            <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{value}</p>
            </div>
            <div className={`${color} text-white p-3 rounded-lg`}>
                {icon}
            </div>
        </div>
    </div>
);

const TaskPreview = ({ task, urgent = false }) => {
    const formatDueDate = (dueDate) => {
        if (!dueDate) return null;
        const date = new Date(dueDate);
        const now = new Date();
        const diffTime = date.getTime() - now.getTime();
        const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));

        if (diffHours < 1) return "Due now";
        if (diffHours < 24) return `Due in ${diffHours}h`;
        const diffDays = Math.ceil(diffHours / 24);
        return `Due in ${diffDays}d`;
    };

    return (
        <div className={`p-3 rounded-lg border ${urgent
            ? 'border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-900/20'
            : 'border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-700/50'
            }`}>
            <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                    <p className={`font-medium truncate ${task.completed ? 'line-through text-gray-500' : 'text-gray-900 dark:text-gray-100'
                        }`}>
                        {task.title || task.subject || task.topic || 'Untitled Task'}
                    </p>
                    {task.category && (
                        <span className="inline-block mt-1 px-2 py-1 text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded">
                            {task.category}
                        </span>
                    )}
                </div>
                {task.dueDate && !task.completed && (
                    <span className={`text-xs font-medium ${urgent ? 'text-orange-600 dark:text-orange-400' : 'text-gray-500'
                        }`}>
                        {formatDueDate(task.dueDate)}
                    </span>
                )}
            </div>
        </div>
    );
};


export default HomePage;

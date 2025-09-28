// src/pages/StatsPage.js
import React, { useMemo } from 'react';
import { Calendar, Target, TrendingUp, CheckCircle } from 'lucide-react';

const StatsPage = ({ tasks, completedTasks, taskStats }) => {
    const weeklyData = useMemo(() => {
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const today = new Date();
        const weekData = [];

        for (let i = 6; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            const dateStr = date.toDateString();

            const completedOnDay = completedTasks.filter(task =>
                task.completedAt && new Date(task.completedAt).toDateString() === dateStr
            ).length;

            weekData.push({
                day: days[date.getDay()],
                date: date.getDate(),
                completed: completedOnDay
            });
        }

        return weekData;
    }, [completedTasks]);

    const categoryStats = useMemo(() => {
        const categories = {};
        tasks.forEach(task => {
            if (!task.category) return;
            if (!categories[task.category]) {
                categories[task.category] = { total: 0, completed: 0 };
            }
            categories[task.category].total++;
            if (task.completed) {
                categories[task.category].completed++;
            }
        });

        return Object.entries(categories).map(([name, stats]) => ({
            name,
            ...stats,
            percentage: Math.round((stats.completed / stats.total) * 100)
        }));
    }, [tasks]);


    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                    Your Progress
                </h1>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <MetricCard
                    title="Total Tasks"
                    value={taskStats.total}
                    icon={<Target className="h-6 w-6" />}
                    color="bg-blue-500"
                />
                <MetricCard
                    title="Completed"
                    value={taskStats.completed}
                    icon={<CheckCircle className="h-6 w-6" />}
                    color="bg-green-500"
                />
                <MetricCard
                    title="Success Rate"
                    value={`${taskStats.completionRate}%`}
                    icon={<TrendingUp className="h-6 w-6" />}
                    color="bg-purple-500"
                />

            </div>

            {/* Weekly Activity Chart */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6 flex items-center">
                    <Calendar className="h-5 w-5 mr-2" />
                    Weekly Activity
                </h2>
                <div className="flex justify-between items-end h-40 space-x-2">
                    {weeklyData.map((day, index) => (
                        <div key={index} className="flex flex-col items-center flex-1">
                            <div
                                className="w-full bg-blue-500 rounded-t-md transition-all duration-300 hover:bg-blue-600"
                                style={{
                                    height: `${Math.max((day.completed / Math.max(...weeklyData.map(d => d.completed), 1)) * 120, 4)}px`,
                                    minHeight: day.completed > 0 ? '8px' : '4px'
                                }}
                            ></div>
                            <div className="mt-2 text-xs text-center">
                                <div className="font-medium text-gray-900 dark:text-gray-100">{day.day}</div>
                                <div className="text-gray-500 dark:text-gray-400">{day.date}</div>
                                <div className="text-blue-600 dark:text-blue-400 font-semibold">{day.completed}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Category Breakdown */}
            {categoryStats.length > 0 && (
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
                        Progress by Category
                    </h2>
                    <div className="space-y-4">
                        {categoryStats.map((category) => (
                            <div key={category.name} className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="font-medium text-gray-900 dark:text-gray-100 capitalize">
                                        {category.name}
                                    </span>
                                    <span className="text-gray-500 dark:text-gray-400">
                                        {category.completed}/{category.total} ({category.percentage}%)
                                    </span>
                                </div>
                                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                    <div
                                        className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-300"
                                        style={{ width: `${category.percentage}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}


        </div>
    );
};

const MetricCard = ({ title, value, icon, color }) => (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between">
            <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">{title}</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{value}</p>
            </div>
            <div className={`${color} text-white p-3 rounded-lg shadow-md`}>
                {icon}
            </div>
        </div>
    </div>
);


export default StatsPage;
// src/components/LoadingSkeleton.js
import React from 'react';

export const TaskCardSkeleton = () => (
    <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-5 shadow-lg animate-pulse">
        <div className="flex items-start gap-3 mb-3">
            <div className="w-4 h-4 bg-gray-700 rounded mt-1"></div>
            <div className="flex-1">
                <div className="h-5 bg-gray-700 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-700 rounded w-1/2"></div>
            </div>
        </div>
        <div className="space-y-3 mb-4">
            <div className="flex items-center gap-2">
                <div className="h-3 w-12 bg-gray-700 rounded"></div>
            </div>
            <div className="h-3 w-24 bg-gray-700 rounded"></div>
        </div>
        <div className="flex gap-2">
            <div className="flex-1 h-8 bg-gray-700 rounded-lg"></div>
            <div className="flex-1 h-8 bg-gray-700 rounded-lg"></div>
            <div className="flex-1 h-8 bg-gray-700 rounded-lg"></div>
        </div>
    </div>
);

export const TaskListSkeleton = ({ count = 6 }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(count)].map((_, i) => (
            <TaskCardSkeleton key={i} />
        ))}
    </div>
);

export const StatCardSkeleton = () => (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 animate-pulse">
        <div className="flex items-center justify-between">
            <div className="flex-1">
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mb-2"></div>
                <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-1/3"></div>
            </div>
            <div className="w-12 h-12 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
        </div>
    </div>
);

export const FormSkeleton = () => (
    <div className="bg-gray-800/90 backdrop-blur-lg border border-gray-700/50 rounded-3xl p-8 w-full max-w-4xl animate-pulse">
        <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gray-700 rounded-2xl mx-auto mb-4"></div>
            <div className="h-8 bg-gray-700 rounded w-1/3 mx-auto mb-2"></div>
            <div className="h-4 bg-gray-700 rounded w-1/2 mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {[...Array(4)].map((_, i) => (
                <div key={i} className="space-y-2">
                    <div className="h-4 bg-gray-700 rounded w-1/4"></div>
                    <div className="h-12 bg-gray-700 rounded"></div>
                </div>
            ))}
        </div>
        <div className="space-y-2 mb-8">
            <div className="h-4 bg-gray-700 rounded w-1/4"></div>
            <div className="h-24 bg-gray-700 rounded"></div>
        </div>
        <div className="flex gap-4">
            <div className="flex-1 h-12 bg-gray-700 rounded-xl"></div>
            <div className="flex-1 h-12 bg-gray-700 rounded-xl"></div>
        </div>
    </div>
);
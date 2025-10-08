// src/components/EmptyState.js
import React from 'react';
import { BookOpen, Search, CheckCircle } from 'lucide-react';

export const NoTasksEmptyState = ({ onCreateTask }) => (
    <div className="text-center py-16">
        <div className="relative w-48 h-48 mx-auto mb-8">
            {/* Animated illustration */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                    {/* Floating book animation */}
                    <div className="w-32 h-32 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center animate-bounce">
                        <BookOpen size={64} className="text-blue-400" />
                    </div>
                    {/* Sparkle effects */}
                    <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full animate-ping"></div>
                    <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-purple-400 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
                </div>
            </div>
        </div>

        <h3 className="text-3xl font-bold text-white mb-3">
            Ready to Start Learning? 🚀
        </h3>
        <p className="text-gray-400 mb-8 text-lg max-w-md mx-auto">
            Your study journey begins here! Create your first task and take control of your learning schedule.
        </p>

        <button
            onClick={onCreateTask}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-xl hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
            Create Your First Task
        </button>

        {/* Tips section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto text-left">
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <div className="text-2xl mb-2">📚</div>
                <h4 className="text-white font-semibold mb-1">Organize Studies</h4>
                <p className="text-gray-400 text-sm">Keep track of all your subjects and topics in one place</p>
            </div>
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <div className="text-2xl mb-2">⏰</div>
                <h4 className="text-white font-semibold mb-1">Set Deadlines</h4>
                <p className="text-gray-400 text-sm">Never miss an assignment with due date reminders</p>
            </div>
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <div className="text-2xl mb-2">📈</div>
                <h4 className="text-white font-semibold mb-1">Track Progress</h4>
                <p className="text-gray-400 text-sm">Monitor your completion rate and study patterns</p>
            </div>
        </div>
    </div>
);

export const NoSearchResultsEmptyState = ({ searchTerm, onClearSearch }) => (
    <div className="text-center py-16">
        <div className="w-32 h-32 bg-gray-700/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <Search size={48} className="text-gray-500" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-3">
            No Results Found
        </h3>
        <p className="text-gray-400 mb-6 text-lg">
            We couldn't find any tasks matching "{searchTerm}"
        </p>
        <button
            onClick={onClearSearch}
            className="px-6 py-3 bg-gray-700/50 text-gray-300 font-medium rounded-xl hover:bg-gray-600/50 transition-colors"
        >
            Clear Search
        </button>
    </div>
);

export const AllCompletedEmptyState = () => (
    <div className="text-center py-16">
        <div className="relative w-48 h-48 mx-auto mb-8">
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                    {/* Success animation */}
                    <div className="w-32 h-32 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-full flex items-center justify-center animate-pulse">
                        <CheckCircle size={64} className="text-green-400" />
                    </div>
                    {/* Celebration sparkles */}
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 text-4xl animate-bounce">🎉</div>
                </div>
            </div>
        </div>

        <h3 className="text-3xl font-bold text-white mb-3">
            All Caught Up! 🎊
        </h3>
        <p className="text-gray-400 mb-8 text-lg max-w-md mx-auto">
            Fantastic work! You've completed all your tasks. Take a break or add new goals to keep the momentum going!
        </p>

        <div className="flex justify-center gap-4">
            <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all">
                Add New Task
            </button>
            <button className="px-6 py-3 bg-gray-700/50 text-gray-300 font-medium rounded-xl hover:bg-gray-600/50 transition-colors">
                View Statistics
            </button>
        </div>
    </div>
);
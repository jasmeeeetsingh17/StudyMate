// src/components/QuickAddBar.js
import { useState, useRef, useEffect } from 'react';
import { Plus, Zap } from 'lucide-react';
import toast from 'react-hot-toast';

export const QuickAddBar = ({ onAddTask }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [quickText, setQuickText] = useState('');
    const inputRef = useRef(null);

    useEffect(() => {
        if (isExpanded && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isExpanded]);

    const parseQuickAdd = (text) => {
        // Simple parsing: treat first word as subject, rest as topic
        const words = text.trim().split(' ');
        let subject = words[0] || 'General';
        let topic = words.slice(1).join(' ') || text;
        return {
            subject: subject.charAt(0).toUpperCase() + subject.slice(1),
            topic,
            title: `${subject}: ${topic}`,
            priority: 'Medium',
            dueDate: '',
            category: subject
        };
    };

    const handleQuickAdd = (e) => {
        e.preventDefault();

        if (!quickText.trim()) {
            toast.error('Please enter a task');
            return;
        }

        try {
            const taskData = parseQuickAdd(quickText);
            onAddTask(taskData);
            toast.success('Task added!');
            setQuickText('');
            setIsExpanded(false);
        } catch (error) {
            console.error('Failed to parse quick add:', error);
            toast.error('Could not parse task.');
        }
    };

    return (
        <div className="sticky top-0 z-40 mb-6">
            <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-lg rounded-2xl border border-blue-500/30 p-4 shadow-lg">
                {!isExpanded ? (
                    <button
                        onClick={() => setIsExpanded(true)}
                        className="w-full flex items-center justify-between px-4 py-3 bg-gray-800/50 rounded-xl hover:bg-gray-700/50 transition-colors group"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Zap className="text-white" size={20} />
                            </div>
                            <div className="text-left">
                                <p className="text-white font-medium">Quick Add Task</p>
                                <p className="text-gray-400 text-sm">Type naturally, we'll handle the rest</p>
                            </div>
                        </div>
                        <Plus className="text-gray-400 group-hover:text-white transition-colors" size={24} />
                    </button>
                ) : (
                    <div className="space-y-3">
                        <form onSubmit={handleQuickAdd} className="flex gap-2">
                            <input
                                ref={inputRef}
                                type="text"
                                value={quickText}
                                onChange={(e) => setQuickText(e.target.value)}
                                placeholder='Type your task here...'
                                className="flex-1 px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
                            />
                            <button
                                type="submit"
                                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all"
                            >
                                Add
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    setIsExpanded(false);
                                    setQuickText('');
                                }}
                                className="px-4 py-3 bg-gray-700/50 text-gray-300 rounded-xl hover:bg-gray-600/50 transition-colors"
                            >
                                Cancel
                            </button>
                        </form>

                        {/* Help text */}
                        <div className="text-xs text-gray-400 px-2">
                            <p>💡 Tips: Enter task details. Priority and dates will be optional.</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

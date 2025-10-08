// src/components/TaskItem.js - ENHANCED VERSION with colors and quick actions
import { CheckCircle2, Clock, Star, Edit2, Trash2, Copy, MoreVertical } from "lucide-react";
import { useState } from "react";

export default function TaskItem({ task, onDelete, onEdit, onToggleComplete, onDuplicate, isSelected, onSelect }) {
    const [showQuickActions, setShowQuickActions] = useState(false);

    const getPriorityStars = (priority) => {
        if (!priority) return 1;
        const p = priority.toLowerCase();
        if (p === "high") return 3;
        if (p === "medium") return 2;
        return 1;
    };

    const getPriorityColor = (priority) => {
        if (!priority) return "text-green-400";
        const p = priority.toLowerCase();
        if (p === "high") return "text-red-400";
        if (p === "medium") return "text-yellow-400";
        return "text-green-400";
    };

    const getPriorityBorder = (priority) => {
        if (!priority) return "border-l-green-500";
        const p = priority.toLowerCase();
        if (p === "high") return "border-l-red-500";
        if (p === "medium") return "border-l-yellow-500";
        return "border-l-green-500";
    };

    const getCategoryColor = (category) => {
        // Color-code by category
        const colors = {
            'mathematics': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
            'math': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
            'physics': 'bg-purple-500/20 text-purple-300 border-purple-500/30',
            'chemistry': 'bg-green-500/20 text-green-300 border-green-500/30',
            'biology': 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
            'english': 'bg-pink-500/20 text-pink-300 border-pink-500/30',
            'history': 'bg-orange-500/20 text-orange-300 border-orange-500/30',
            'computer': 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
            'programming': 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
            'art': 'bg-rose-500/20 text-rose-300 border-rose-500/30',
        };

        const lowerCategory = category?.toLowerCase() || '';
        for (const [key, value] of Object.entries(colors)) {
            if (lowerCategory.includes(key)) return value;
        }
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    };

    const formatDueDate = (dueDate) => {
        if (!dueDate) return null;
        try {
            const date = new Date(dueDate);
            const now = new Date();
            now.setHours(0, 0, 0, 0);
            date.setHours(0, 0, 0, 0);

            const diffTime = date.getTime() - now.getTime();
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            if (diffDays === 0) return "Due today";
            if (diffDays === 1) return "Due tomorrow";
            if (diffDays === -1) return "Due yesterday";
            if (diffDays < 0) return `${Math.abs(diffDays)} days overdue`;
            if (diffDays <= 7) return `Due in ${diffDays} days`;

            return date.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: date.getFullYear() !== new Date().getFullYear() ? "numeric" : undefined,
            });
        } catch (error) {
            return null;
        }
    };

    const getDueDateColor = (dueDate) => {
        if (!dueDate) return "text-gray-300";
        try {
            const date = new Date(dueDate);
            const now = new Date();
            now.setHours(0, 0, 0, 0);
            date.setHours(0, 0, 0, 0);

            const diffTime = date.getTime() - now.getTime();
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            if (diffDays < 0) return "text-red-400";
            if (diffDays <= 1) return "text-orange-400";
            if (diffDays <= 3) return "text-yellow-400";
            return "text-gray-300";
        } catch (error) {
            return "text-gray-300";
        }
    };

    const getTaskTitle = () => {
        if (task.title) return task.title;
        if (task.subject && task.topic) return `${task.subject} - ${task.topic}`;
        if (task.subject) return task.subject;
        if (task.topic) return task.topic;
        return "Untitled Task";
    };

    return (
        <div
            className={`bg-white/10 backdrop-blur-lg border-l-4 ${getPriorityBorder(task.priority)} border-r border-t border-b border-white/20 rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col group ${isSelected ? "ring-2 ring-blue-400" : ""
                } ${task.completed ? "opacity-75" : ""}`}
            onMouseEnter={() => setShowQuickActions(true)}
            onMouseLeave={() => setShowQuickActions(false)}
        >
            {/* Header with checkbox and title */}
            <div className="flex items-start gap-3 mb-3">
                <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={(e) => onSelect(task.id, e.target.checked)}
                    className="mt-1 w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 cursor-pointer"
                />
                <div className="flex-1 min-w-0">
                    <h3
                        className={`text-lg font-semibold text-white mb-2 line-clamp-2 leading-tight ${task.completed ? "line-through opacity-60" : ""
                            }`}
                    >
                        {getTaskTitle()}
                    </h3>
                </div>

                {/* Quick Actions Menu (shows on hover) */}
                <div className={`transition-opacity duration-200 ${showQuickActions ? 'opacity-100' : 'opacity-0'}`}>
                    <button
                        onClick={() => onDuplicate?.(task)}
                        className="p-1 hover:bg-white/10 rounded transition-colors"
                        title="Duplicate task"
                    >
                        <MoreVertical className="w-4 h-4 text-gray-400" />
                    </button>
                </div>
            </div>

            <div className="flex-1">
                {/* Priority */}
                <div className="flex items-center gap-1 mb-3">
                    {[...Array(getPriorityStars(task.priority))].map((_, i) => (
                        <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${getPriorityColor(task.priority)}`}
                            fill="currentColor"
                        />
                    ))}
                    <span className={`ml-2 text-xs font-medium capitalize ${getPriorityColor(task.priority)}`}>
                        {task.priority || "Low"}
                    </span>
                </div>

                {/* Due Date */}
                {task.dueDate && (
                    <div className={`flex items-center gap-2 mb-3 text-sm ${getDueDateColor(task.dueDate)}`}>
                        <Clock className="w-4 h-4 flex-shrink-0" />
                        <span className="font-medium">{formatDueDate(task.dueDate)}</span>
                    </div>
                )}

                {/* Category Badge with color */}
                {task.category && (
                    <div className={`inline-block px-2 py-1 rounded text-xs mb-3 capitalize border ${getCategoryColor(task.category)}`}>
                        {task.category}
                    </div>
                )}

                {/* Completed Badge */}
                {task.completed && (
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-green-500/20 text-green-300 rounded-full text-xs mb-3 ml-2">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Completed
                    </div>
                )}

                {/* Notes Preview */}
                {task.notes && !task.completed && (
                    <p className="text-xs text-gray-400 line-clamp-2 mt-2 italic">
                        "{task.notes}"
                    </p>
                )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-1.5 mt-4">
                <button
                    onClick={() => onToggleComplete(task.id)}
                    className={`flex-1 flex items-center justify-center gap-1.5 px-2 py-2 ${task.completed
                        ? "bg-gray-600/30 hover:bg-gray-600/50 text-gray-300"
                        : "bg-green-600/30 hover:bg-green-600/50 text-green-300"
                        } rounded-lg text-xs font-medium transition-colors duration-200`}
                    title={task.completed ? "Mark as incomplete" : "Mark as complete"}
                >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">{task.completed ? "Undo" : "Done"}</span>
                </button>

                {onDuplicate && (
                    <button
                        onClick={() => onDuplicate(task)}
                        className="flex-1 flex items-center justify-center gap-1.5 px-2 py-2 bg-purple-600/30 hover:bg-purple-600/50 text-purple-300 rounded-lg text-xs font-medium transition-colors duration-200"
                        title="Duplicate task"
                    >
                        <Copy className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Copy</span>
                    </button>
                )}

                <button
                    onClick={() => onEdit(task)}
                    className="flex-1 flex items-center justify-center gap-1.5 px-2 py-2 bg-blue-600/30 hover:bg-blue-600/50 text-blue-300 rounded-lg text-xs font-medium transition-colors duration-200"
                    title="Edit task"
                >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Edit</span>
                </button>

                <button
                    onClick={() => {
                        if (window.confirm("Are you sure you want to delete this task?")) {
                            onDelete(task.id);
                        }
                    }}
                    className="flex-1 flex items-center justify-center gap-1.5 px-2 py-2 bg-red-600/30 hover:bg-red-600/50 text-red-300 rounded-lg text-xs font-medium transition-colors duration-200"
                    title="Delete task"
                >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Delete</span>
                </button>
            </div>
        </div>
    );
}
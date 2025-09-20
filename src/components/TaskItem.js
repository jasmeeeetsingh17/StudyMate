import { Search, Filter, BookOpen, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { useState } from "react";

// Mock TaskItem component for demo
const TaskItem = ({ task, onDelete, onEdit, onToggleComplete }) => (
    <div className="bg-gray-800/90 backdrop-blur-lg border border-gray-700/50 rounded-2xl p-6 shadow-xl">
        <h3 className="text-xl font-bold text-gray-100 mb-2">
            {task.subject} – {task.topic}
        </h3>
        <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
            <span>📅 {task.dueDate || "No date"}</span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${task.priority === 'High' ? 'bg-red-500/20 text-red-400' :
                task.priority === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-green-500/20 text-green-400'
                }`}>
                {task.priority} Priority
            </span>
        </div>
        <div className="flex gap-2">
            <button onClick={() => onToggleComplete(task.id)} className="px-3 py-2 bg-green-600/20 text-green-400 rounded-lg text-sm">
                Complete
            </button>
            <button onClick={() => onEdit(task)} className="px-3 py-2 bg-blue-600/20 text-blue-400 rounded-lg text-sm">
                Edit
            </button>
            <button onClick={() => onDelete(task.id)} className="px-3 py-2 bg-red-600/20 text-red-400 rounded-lg text-sm">
                Delete
            </button>
        </div>
    </div>
);


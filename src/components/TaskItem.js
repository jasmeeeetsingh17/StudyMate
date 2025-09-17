import { CheckCircle, Trash2, Flag, Edit } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Now accepts onEdit and onToggleComplete
export default function TaskItem({ task, onDelete, onEdit, onToggleComplete }) {
    const navigate = useNavigate();

    const handleEditClick = () => {
        onEdit(task); // Set the task to be edited in App state
        navigate('/task-form'); // Navigate to the form
    };
    return (

        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 m-4 space-y-3 md:space-y-0 md:flex md:items-center md:justify-between">
            {/* Left: Task info */}
            <div className="space-y-2">
                <h3 className="font-bold text-xl text-gray-800 dark:text-gray-100">
                    {task.subject} – {task.topic}
                </h3>
                <div className="flex flex-wrap items-center gap-3 text-sm">
                    <span className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                        📅 {task.dueDate || "No date"}
                    </span>
                    <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 text-xs font-medium">
                        <Flag size={14} /> {task.priority} Priority
                    </span>
                </div>
            </div>

            {/* Right: Action buttons */}
            <div className="flex items-center gap-2 mt-3 md:mt-0">
                <button
                    onClick={() => onToggleComplete(task.id)}
                    className="flex items-center gap-1 text-green-600 ..."
                    title="Mark as done"
                >
                    <CheckCircle size={18} />
                </button>
                {/* --- NEW --- Edit button */}
                <button
                    onClick={handleEditClick}
                    className="flex items-center gap-1 text-blue-600 hover:bg-blue-50 ..."
                    title="Edit task"
                >
                    <Edit size={18} />
                </button>
                <button
                    onClick={onDelete}
                    className="flex items-center gap-1 text-red-600 hover:bg-red-50 ..."
                    title="Delete task"
                >
                    <Trash2 size={18} />
                </button>
            </div>
        </div>
    );
}

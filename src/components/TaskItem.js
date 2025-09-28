import { CheckCircle2, Clock, Star, Edit2, Trash2 } from "lucide-react";

export default function TaskItem({ task, onDelete, onEdit, onToggleComplete, isSelected, onSelect }) {
    const getPriorityStars = (priority) => {
        if (priority?.toLowerCase() === "high") return 3;
        if (priority?.toLowerCase() === "medium") return 2;
        return 1;
    };

    const formatDueDate = (dueDate) => {
        if (!dueDate) return null;
        const date = new Date(dueDate);
        const now = new Date();
        const diffDays = Math.ceil((date - now) / (1000 * 60 * 60 * 24));

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
    };

    const getDueDateColor = (dueDate) => {
        if (!dueDate) return "text-gray-300";
        const diffDays = Math.ceil((new Date(dueDate) - new Date()) / (1000 * 60 * 60 * 24));

        if (diffDays < 0) return "text-red-400";
        if (diffDays <= 1) return "text-orange-400";
        if (diffDays <= 3) return "text-yellow-400";
        return "text-gray-300";
    };

    return (
        <div className={`bg-white/10 backdrop-blur-lg border rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col ${isSelected ? "border-blue-400 ring-2 ring-blue-400/50" : "border-white/20"}`}>
            <div className="flex items-start gap-3 mb-3">
                <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={(e) => onSelect(task.id, e.target.checked)}
                    className="mt-1 w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                />
                <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2 leading-tight">
                        {task.title}
                    </h3>
                </div>
            </div>

            <div className="flex-1">
                <div className="flex items-center gap-1 mb-3">
                    {[...Array(getPriorityStars(task.priority))].map((_, i) => (
                        <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${task.priority?.toLowerCase() === "high" ? "text-red-400" : task.priority?.toLowerCase() === "medium" ? "text-yellow-400" : "text-green-400"}`}
                            fill="currentColor"
                        />
                    ))}
                    <span className={`ml-2 text-xs font-medium capitalize ${task.priority?.toLowerCase() === "high" ? "text-red-400" : task.priority?.toLowerCase() === "medium" ? "text-yellow-400" : "text-green-400"}`}>
                        {task.priority}
                    </span>
                </div>

                {task.dueDate && (
                    <div className={`flex items-center gap-2 mb-3 text-sm ${getDueDateColor(task.dueDate)}`}>
                        <Clock className="w-4 h-4 flex-shrink-0" />
                        <span>{formatDueDate(task.dueDate)}</span>
                    </div>
                )}

                {task.category && (
                    <div className="inline-block px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-xs mb-3 capitalize">
                        {task.category}
                    </div>
                )}

                {task.completed && (
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-green-500/20 text-green-300 rounded-full text-xs mb-3">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Completed
                    </div>
                )}
            </div>

            <div className="flex gap-1.5 mt-4">
                <button
                    onClick={() => onToggleComplete(task.id)}
                    className={`flex-1 flex items-center justify-center gap-1.5 px-2 py-2 ${task.completed ? "bg-gray-600/30 hover:bg-gray-600/50 text-gray-300" : "bg-green-600/30 hover:bg-green-600/50 text-green-300"} rounded-lg text-xs font-medium transition-colors duration-200`}
                >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">{task.completed ? "Undo" : "Done"}</span>
                </button>
                <button
                    onClick={() => onEdit(task)}
                    className="flex-1 flex items-center justify-center gap-1.5 px-2 py-2 bg-blue-600/30 hover:bg-blue-600/50 text-blue-300 rounded-lg text-xs font-medium transition-colors duration-200"
                >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Edit</span>
                </button>
                <button
                    onClick={() => onDelete(task.id)}
                    className="flex-1 flex items-center justify-center gap-1.5 px-2 py-2 bg-red-600/30 hover:bg-red-600/50 text-red-300 rounded-lg text-xs font-medium transition-colors duration-200"
                >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Delete</span>
                </button>
            </div>
        </div>
    );
}

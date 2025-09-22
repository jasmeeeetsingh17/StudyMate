import { useState } from "react";
import { BookOpen, Search, Plus, CheckCircle2, Clock, Star, Edit2, Trash2 } from "lucide-react";

// TaskItem component
const TaskItem = ({ task, onDelete, onEdit, onToggleComplete }) => {
    const getPriorityStars = (priority) => {
        if (priority === "High") return 3;
        if (priority === "Medium") return 2;
        return 1;
    };

    return (
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 min-h-[220px] flex flex-col justify-between">
            <div>
                <h3 className="text-xl font-semibold text-white mb-2">{task.subject} – {task.topic}</h3>

                <div className="flex items-center gap-1 mb-3">
                    {[...Array(getPriorityStars(task.priority))].map((_, i) => (
                        <Star
                            key={i}
                            className={`w-4 h-4 ${task.priority === "High"
                                ? "text-red-400"
                                : task.priority === "Medium"
                                    ? "text-yellow-400"
                                    : "text-green-400"
                                }`}
                            fill="currentColor"
                        />
                    ))}
                </div>

                {task.dueDate && (
                    <div className="flex items-center gap-2 mb-3 text-gray-300 text-sm">
                        <Clock className="w-5 h-5" />
                        <span>{task.dueDate}</span>
                    </div>
                )}

                {task.completed && (
                    <div className="inline-flex items-center gap-1 px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm mb-3">
                        <CheckCircle2 className="w-4 h-4" />
                        Completed
                    </div>
                )}
            </div>

            <div className="flex gap-2 mt-4">
                {!task.completed && (
                    <button
                        onClick={() => onToggleComplete(task.id)}
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-green-600/30 hover:bg-green-600/50 text-green-300 rounded-lg text-sm font-medium transition-colors duration-200"
                    >
                        <CheckCircle2 className="w-4 h-4" />
                        Complete
                    </button>
                )}
                <button
                    onClick={() => onEdit(task)}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-yellow-600/30 hover:bg-yellow-600/50 text-yellow-300 rounded-lg text-sm font-medium transition-colors duration-200"
                >
                    <Edit2 className="w-4 h-4" />
                    Edit
                </button>
                <button
                    onClick={() => onDelete(task.id)}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-600/30 hover:bg-red-600/50 text-red-300 rounded-lg text-sm font-medium transition-colors duration-200"
                >
                    <Trash2 className="w-4 h-4" />
                    Delete
                </button>
            </div>
        </div>
    );
};

export default function TaskList({
    tasks: initialTasks = [
        { id: 1, subject: "Mathematics", topic: "Algebra Practice", dueDate: "2025-01-15", priority: "High", completed: false },
        { id: 2, subject: "Science", topic: "Chapter 5 Reading", dueDate: "2025-01-20", priority: "Medium", completed: false },
        { id: 3, subject: "History", topic: "Essay Writing", dueDate: "2025-01-25", priority: "Low", completed: true },
        { id: 4, subject: "English", topic: "Grammar Exercises", dueDate: "2025-01-30", priority: "Medium", completed: false }
    ],
    onDeleteTask,
    onEditTask,
    onToggleComplete
}) {
    const [searchTerm, setSearchTerm] = useState("");
    const [tasks, setTasks] = useState(initialTasks);
    const [editingTask, setEditingTask] = useState(null);
    const [editForm, setEditForm] = useState({ subject: '', topic: '', dueDate: '', priority: 'Medium' });

    const stats = {
        total: tasks.length,
        completed: tasks.filter(t => t.completed).length,
        pending: tasks.filter(t => !t.completed).length
    };

    const handleToggleComplete = (taskId) => {
        setTasks(tasks.map(task =>
            task.id === taskId ? { ...task, completed: !task.completed } : task
        ));
        if (onToggleComplete) onToggleComplete(taskId);
    };

    const handleDeleteTask = (taskId) => {
        setTasks(tasks.filter(task => task.id !== taskId));
        if (onDeleteTask) onDeleteTask(taskId);
    };

    const handleEditTask = (task) => {
        setEditingTask(task.id);
        setEditForm({ subject: task.subject, topic: task.topic, dueDate: task.dueDate, priority: task.priority });
        if (onEditTask) onEditTask(task);
    };

    const handleSaveEdit = () => {
        setTasks(tasks.map(task => task.id === editingTask ? { ...task, ...editForm } : task));
        setEditingTask(null);
        setEditForm({ subject: '', topic: '', dueDate: '', priority: 'Medium' });
    };

    const handleCancelEdit = () => {
        setEditingTask(null);
        setEditForm({ subject: '', topic: '', dueDate: '', priority: 'Medium' });
    };

    // Filter tasks based on search term
    const displayedTasks = tasks.filter(task =>
        task.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.topic.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900 p-6">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-10">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <BookOpen className="text-white" size={24} />
                    </div>
                    <h1 className="text-4xl font-bold text-white mb-2">My Study Tasks</h1>
                    <p className="text-gray-400 text-lg">Keep track of your learning goals</p>
                </div>

                <div className="grid grid-cols-3 gap-6 mb-10">
                    <div className="bg-blue-500/20 backdrop-blur-lg rounded-2xl p-6 border border-blue-500/30 text-center">
                        <div className="w-12 h-12 bg-blue-500/30 rounded-xl flex items-center justify-center mx-auto mb-3">
                            <BookOpen size={24} className="text-blue-400" />
                        </div>
                        <div className="text-3xl font-bold text-white mb-1">{stats.total}</div>
                        <div className="text-blue-300 font-medium">Total Tasks</div>
                    </div>
                    <div className="bg-green-500/20 backdrop-blur-lg rounded-2xl p-6 border border-green-500/30 text-center">
                        <div className="w-12 h-12 bg-green-500/30 rounded-xl flex items-center justify-center mx-auto mb-3">
                            <CheckCircle2 size={24} className="text-green-400" />
                        </div>
                        <div className="text-3xl font-bold text-white mb-1">{stats.completed}</div>
                        <div className="text-green-300 font-medium">Completed</div>
                    </div>
                    <div className="bg-yellow-500/20 backdrop-blur-lg rounded-2xl p-6 border border-yellow-500/30 text-center">
                        <div className="w-12 h-12 bg-yellow-500/30 rounded-xl flex items-center justify-center mx-auto mb-3">
                            <Clock size={24} className="text-yellow-400" />
                        </div>
                        <div className="text-3xl font-bold text-white mb-1">{stats.pending}</div>
                        <div className="text-yellow-300 font-medium">Pending</div>
                    </div>
                </div>

                <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6 mb-8">
                    <div className="flex gap-4 items-center">
                        <div className="flex-1 relative">
                            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search your tasks..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
                            />
                        </div>
                        <button
                            onClick={() => console.log('Add new task')}
                            className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors duration-200"
                        >
                            <Plus size={20} />
                            Add Task
                        </button>
                    </div>
                </div>

                {editingTask && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                        <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-md border border-gray-700">
                            <h3 className="text-xl font-bold text-white mb-4">Edit Task</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-gray-300 text-sm font-medium mb-2">Subject</label>
                                    <input
                                        type="text"
                                        value={editForm.subject}
                                        onChange={(e) => setEditForm({ ...editForm, subject: e.target.value })}
                                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-300 text-sm font-medium mb-2">Topic</label>
                                    <input
                                        type="text"
                                        value={editForm.topic}
                                        onChange={(e) => setEditForm({ ...editForm, topic: e.target.value })}
                                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-300 text-sm font-medium mb-2">Due Date</label>
                                    <input
                                        type="date"
                                        value={editForm.dueDate}
                                        onChange={(e) => setEditForm({ ...editForm, dueDate: e.target.value })}
                                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-300 text-sm font-medium mb-2">Priority</label>
                                    <select
                                        value={editForm.priority}
                                        onChange={(e) => setEditForm({ ...editForm, priority: e.target.value })}
                                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="Low">Low</option>
                                        <option value="Medium">Medium</option>
                                        <option value="High">High</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex gap-3 mt-6">
                                <button
                                    onClick={handleSaveEdit}
                                    className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
                                >
                                    Save Changes
                                </button>
                                <button
                                    onClick={handleCancelEdit}
                                    className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors duration-200"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                <div className="mb-6">
                    <p className="text-gray-400 text-lg">
                        Showing {displayedTasks.length} of {tasks.length} tasks
                    </p>
                </div>

                {displayedTasks.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="w-20 h-20 bg-gray-700/50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <BookOpen size={32} className="text-gray-500" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-3">
                            {tasks.length === 0 ? "No tasks yet!" : "No tasks found"}
                        </h3>
                        <p className="text-gray-400 mb-6 text-lg">
                            {tasks.length === 0
                                ? "Create your first task to get started."
                                : "Try searching for something else."
                            }
                        </p>
                        {tasks.length === 0 && (
                            <button
                                onClick={() => console.log('Create first task')}
                                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors duration-200"
                            >
                                Create First Task
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {displayedTasks.map((task) => (
                            <TaskItem
                                key={task.id}
                                task={task}
                                onDelete={handleDeleteTask}
                                onEdit={handleEditTask}
                                onToggleComplete={handleToggleComplete}
                            />
                        ))}
                    </div>
                )}

                <div className="fixed -top-20 -right-20 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
                <div className="fixed -bottom-20 -left-20 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>
            </div>
        </div>
    );
}
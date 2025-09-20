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

export default function TaskList({
    tasks = [
        {
            id: 1,
            subject: "Mathematics",
            topic: "Integration",
            dueDate: "2024-12-25",
            priority: "High",
            completed: false
        },
        {
            id: 2,
            subject: "Physics",
            topic: "Quantum Mechanics",
            dueDate: "2024-12-28",
            priority: "Medium",
            completed: false
        },
        {
            id: 3,
            subject: "Chemistry",
            topic: "Organic Reactions",
            dueDate: "2024-12-30",
            priority: "Low",
            completed: true
        }
    ],
    onDeleteTask,
    onEditTask,
    onToggleComplete
}) {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterPriority, setFilterPriority] = useState("All");
    const [filterStatus, setFilterStatus] = useState("All");
    const [sortBy, setSortBy] = useState("dueDate");

    // Filter and sort tasks
    const filteredTasks = tasks.filter(task => {
        const matchesSearch = task.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
            task.topic.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesPriority = filterPriority === "All" || task.priority === filterPriority;
        const matchesStatus = filterStatus === "All" ||
            (filterStatus === "Completed" && task.completed) ||
            (filterStatus === "Pending" && !task.completed);

        return matchesSearch && matchesPriority && matchesStatus;
    }).sort((a, b) => {
        if (sortBy === "dueDate") {
            if (!a.dueDate) return 1;
            if (!b.dueDate) return -1;
            return new Date(a.dueDate) - new Date(b.dueDate);
        }
        if (sortBy === "priority") {
            const priorityOrder = { "High": 3, "Medium": 2, "Low": 1 };
            return priorityOrder[b.priority] - priorityOrder[a.priority];
        }
        return a.subject.localeCompare(b.subject);
    });

    const getStats = () => {
        const total = tasks.length;
        const completed = tasks.filter(t => t.completed).length;
        const pending = total - completed;
        const overdue = tasks.filter(t =>
            !t.completed && t.dueDate && new Date(t.dueDate) < new Date()
        ).length;

        return { total, completed, pending, overdue };
    };

    const stats = getStats();

    return (
        <section className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <BookOpen className="text-white" size={24} />
                    </div>
                    <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                        Your Study Tasks
                    </h2>
                    <p className="text-gray-400 text-lg">
                        Organize and track all your study tasks in one place
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-gradient-to-r from-blue-500/20 to-blue-600/20 backdrop-blur-lg rounded-2xl p-6 border border-blue-500/30">
                        <div className="flex items-center gap-3 mb-2">
                            <BookOpen size={20} className="text-blue-400" />
                            <span className="text-blue-400 font-medium">Total Tasks</span>
                        </div>
                        <div className="text-3xl font-bold text-white">{stats.total}</div>
                    </div>

                    <div className="bg-gradient-to-r from-green-500/20 to-green-600/20 backdrop-blur-lg rounded-2xl p-6 border border-green-500/30">
                        <div className="flex items-center gap-3 mb-2">
                            <CheckCircle2 size={20} className="text-green-400" />
                            <span className="text-green-400 font-medium">Completed</span>
                        </div>
                        <div className="text-3xl font-bold text-white">{stats.completed}</div>
                    </div>

                    <div className="bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 backdrop-blur-lg rounded-2xl p-6 border border-yellow-500/30">
                        <div className="flex items-center gap-3 mb-2">
                            <Clock size={20} className="text-yellow-400" />
                            <span className="text-yellow-400 font-medium">Pending</span>
                        </div>
                        <div className="text-3xl font-bold text-white">{stats.pending}</div>
                    </div>

                    <div className="bg-gradient-to-r from-red-500/20 to-red-600/20 backdrop-blur-lg rounded-2xl p-6 border border-red-500/30">
                        <div className="flex items-center gap-3 mb-2">
                            <AlertCircle size={20} className="text-red-400" />
                            <span className="text-red-400 font-medium">Overdue</span>
                        </div>
                        <div className="text-3xl font-bold text-white">{stats.overdue}</div>
                    </div>
                </div>

                {/* Filters and Search */}
                <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl border border-gray-700/50 p-6 mb-8">
                    <div className="flex flex-col lg:flex-row gap-4">
                        {/* Search */}
                        <div className="flex-1 relative">
                            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search tasks by subject or topic..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-100 placeholder-gray-400"
                            />
                        </div>

                        {/* Filters */}
                        <div className="flex gap-4">
                            <select
                                value={filterPriority}
                                onChange={(e) => setFilterPriority(e.target.value)}
                                className="px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100"
                            >
                                <option value="All">All Priorities</option>
                                <option value="High">High Priority</option>
                                <option value="Medium">Medium Priority</option>
                                <option value="Low">Low Priority</option>
                            </select>

                            <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                className="px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100"
                            >
                                <option value="All">All Status</option>
                                <option value="Pending">Pending</option>
                                <option value="Completed">Completed</option>
                            </select>

                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100"
                            >
                                <option value="dueDate">Sort by Due Date</option>
                                <option value="priority">Sort by Priority</option>
                                <option value="subject">Sort by Subject</option>
                            </select>
                        </div>
                    </div>

                    {/* Active Filters Display */}
                    {(searchTerm || filterPriority !== "All" || filterStatus !== "All") && (
                        <div className="mt-4 pt-4 border-t border-gray-700/50">
                            <div className="flex items-center gap-2 text-sm text-gray-400">
                                <Filter size={16} />
                                <span>Active filters:</span>
                                {searchTerm && (
                                    <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded">
                                        Search: "{searchTerm}"
                                    </span>
                                )}
                                {filterPriority !== "All" && (
                                    <span className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded">
                                        Priority: {filterPriority}
                                    </span>
                                )}
                                {filterStatus !== "All" && (
                                    <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded">
                                        Status: {filterStatus}
                                    </span>
                                )}
                                <button
                                    onClick={() => {
                                        setSearchTerm("");
                                        setFilterPriority("All");
                                        setFilterStatus("All");
                                    }}
                                    className="px-2 py-1 bg-gray-600/50 text-gray-300 hover:bg-gray-600 rounded text-xs transition-colors"
                                >
                                    Clear all
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Results Summary */}
                <div className="mb-6">
                    <p className="text-gray-400">
                        Showing {filteredTasks.length} of {tasks.length} tasks
                    </p>
                </div>

                {/* Tasks Grid */}
                {filteredTasks.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="w-24 h-24 bg-gray-700/50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <BookOpen size={32} className="text-gray-500" />
                        </div>
                        <h3 className="text-2xl font-semibold text-gray-300 mb-2">
                            {tasks.length === 0 ? "No tasks yet" : "No tasks found"}
                        </h3>
                        <p className="text-gray-500 mb-6 max-w-md mx-auto">
                            {tasks.length === 0
                                ? "Create your first study task to get started on your learning journey."
                                : "Try adjusting your search or filter criteria to find what you're looking for."
                            }
                        </p>
                        {tasks.length === 0 && (
                            <button
                                onClick={() => console.log('Navigate to create task')}
                                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-xl hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                            >
                                Create Your First Task
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                        {filteredTasks.map((task) => (
                            <TaskItem
                                key={task.id}
                                task={task}
                                onDelete={() => onDeleteTask?.(task.id)}
                                onEdit={onEditTask}
                                onToggleComplete={onToggleComplete}
                            />
                        ))}
                    </div>
                )}

                {/* Visual Enhancement */}
                <div className="absolute -top-1 -right-1 w-32 h-32 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-1 -left-1 w-32 h-32 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"></div>
            </div>
        </section>
    );
}
// src/components/TaskList.js - FIXED to use tasks from props, not localStorage
import { useState, useEffect } from "react";
import { BookOpen, Search, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import TaskItem from "./TaskItem";

export default function TaskList({ tasks = [], onDeleteTask, onEditTask, onToggleComplete, isLoading }) {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState("all");
    const [sortBy, setSortBy] = useState("dueDate");
    const [selectedTasks, setSelectedTasks] = useState(new Set());
    const [showBulkActions, setShowBulkActions] = useState(false);

    // Log when tasks prop changes (for debugging)
    useEffect(() => {
        console.log('TaskList received tasks:', tasks);
        console.log('Tasks count:', tasks.length);
    }, [tasks]);

    // Handlers - use callbacks passed from parent
    const handleDelete = (taskId) => {
        console.log('TaskList: Deleting task', taskId);
        onDeleteTask?.(taskId);
    };

    const handleToggleComplete = (taskId) => {
        console.log('TaskList: Toggling completion for task', taskId);
        onToggleComplete?.(taskId);
    };

    const handleEdit = (task) => {
        console.log('TaskList: Editing task', task);
        navigate(`/edit-task/${task.id}`);
        onEditTask?.(task);
    };

    // Bulk actions
    const handleSelectTask = (taskId, isSelected) => {
        const newSelected = new Set(selectedTasks);
        if (isSelected) newSelected.add(taskId);
        else newSelected.delete(taskId);
        setSelectedTasks(newSelected);
        setShowBulkActions(newSelected.size > 0);
    };

    const handleSelectAll = () => {
        if (selectedTasks.size === displayedTasks.length && displayedTasks.length > 0) {
            setSelectedTasks(new Set());
            setShowBulkActions(false);
        } else {
            setSelectedTasks(new Set(displayedTasks.map(t => t.id)));
            setShowBulkActions(true);
        }
    };

    const handleBulkComplete = () => {
        console.log('Bulk completing tasks:', Array.from(selectedTasks));
        selectedTasks.forEach(id => {
            onToggleComplete?.(id);
        });
        setSelectedTasks(new Set());
        setShowBulkActions(false);
    };

    const handleBulkDelete = () => {
        if (window.confirm(`Delete ${selectedTasks.size} selected task(s)?`)) {
            console.log('Bulk deleting tasks:', Array.from(selectedTasks));
            selectedTasks.forEach(id => {
                onDeleteTask?.(id);
            });
            setSelectedTasks(new Set());
            setShowBulkActions(false);
        }
    };

    // Filter tasks
    const filteredTasks = tasks.filter(task => {
        if (filter === "all") return true;
        if (filter === "completed") return task.completed;
        if (filter === "pending") return !task.completed;
        return true;
    });

    // Sort tasks
    const sortedTasks = [...filteredTasks].sort((a, b) => {
        switch (sortBy) {
            case "dueDate":
                if (!a.dueDate && !b.dueDate) return 0;
                if (!a.dueDate) return 1;
                if (!b.dueDate) return -1;
                return new Date(a.dueDate) - new Date(b.dueDate);
            case "priority":
                const order = { High: 3, Medium: 2, Low: 1 };
                return (order[b.priority] || 1) - (order[a.priority] || 1);
            case "title":
                const titleA = a.title || a.subject || "";
                const titleB = b.title || b.subject || "";
                return titleA.localeCompare(titleB);
            case "created":
                return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
            default:
                return 0;
        }
    });

    // Search within sorted tasks
    const displayedTasks = sortedTasks.filter(task => {
        const searchLower = searchTerm.toLowerCase();
        const title = (task.title || task.subject || "").toLowerCase();
        const topic = (task.topic || "").toLowerCase();
        const category = (task.category || "").toLowerCase();
        return title.includes(searchLower) || topic.includes(searchLower) || category.includes(searchLower);
    });

    const taskCounts = {
        all: tasks.length,
        pending: tasks.filter(t => !t.completed).length,
        completed: tasks.filter(t => t.completed).length
    };

    // Show loading state
    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900 p-6 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-400">Loading tasks...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900 p-6">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-10">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <BookOpen className="text-white" size={24} />
                    </div>
                    <h1 className="text-4xl font-bold text-white mb-2">My Study Tasks</h1>
                    <p className="text-gray-400 text-lg">Keep track of your learning goals</p>
                </div>

                {/* Search + Sort + Add */}
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6 mb-4 flex flex-col md:flex-row gap-4 items-center">
                    <div className="flex-1 relative w-full">
                        <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search tasks..."
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
                        />
                    </div>
                    <div className="flex gap-3 w-full md:w-auto">
                        <select
                            value={sortBy}
                            onChange={e => setSortBy(e.target.value)}
                            className="flex-1 md:flex-none px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                        >
                            <option value="dueDate">Sort by Due Date</option>
                            <option value="priority">Sort by Priority</option>
                            <option value="title">Sort by Title</option>
                            <option value="created">Sort by Created</option>
                        </select>
                        <button
                            onClick={() => navigate("/add-task")}
                            className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors duration-200 shadow-lg hover:shadow-xl whitespace-nowrap"
                        >
                            <Plus size={20} /> Add Task
                        </button>
                    </div>
                </div>

                {/* Bulk actions */}
                {showBulkActions && (
                    <div className="bg-blue-600/20 backdrop-blur-lg rounded-2xl border border-blue-500/30 p-4 mb-4 flex flex-col sm:flex-row justify-between items-center gap-3">
                        <span className="text-white font-medium">{selectedTasks.size} task{selectedTasks.size !== 1 ? "s" : ""} selected</span>
                        <div className="flex gap-2 flex-wrap justify-center">
                            <button onClick={handleBulkComplete} className="px-4 py-2 bg-green-600/30 hover:bg-green-600/50 text-green-300 rounded-lg text-sm font-medium transition-colors">Mark Complete</button>
                            <button onClick={handleBulkDelete} className="px-4 py-2 bg-red-600/30 hover:bg-red-600/50 text-red-300 rounded-lg text-sm font-medium transition-colors">Delete Selected</button>
                            <button onClick={() => { setSelectedTasks(new Set()); setShowBulkActions(false); }} className="px-4 py-2 bg-gray-600/30 hover:bg-gray-600/50 text-gray-300 rounded-lg text-sm font-medium transition-colors">Clear Selection</button>
                        </div>
                    </div>
                )}

                {/* Filter Tabs */}
                <div className="flex justify-center items-center mb-6 space-x-4 flex-wrap gap-2">
                    {displayedTasks.length > 0 && (
                        <>
                            <button onClick={handleSelectAll} className="px-3 py-2 text-sm text-gray-300 hover:text-white transition-colors">
                                {selectedTasks.size === displayedTasks.length ? "Deselect All" : "Select All"}
                            </button>
                            <div className="h-4 w-px bg-gray-600"></div>
                        </>
                    )}
                    {["all", "pending", "completed"].map(key => {
                        const label = key.charAt(0).toUpperCase() + key.slice(1);
                        const count = taskCounts[key];
                        return (
                            <button
                                key={key}
                                onClick={() => {
                                    setFilter(key);
                                    setSelectedTasks(new Set());
                                    setShowBulkActions(false);
                                }}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === key
                                    ? "bg-blue-600 text-white shadow-lg"
                                    : "bg-gray-700/50 text-gray-300 hover:bg-gray-600/50"
                                    }`}
                            >
                                {label} ({count})
                            </button>
                        );
                    })}
                </div>

                {/* Task Grid */}
                {displayedTasks.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="w-20 h-20 bg-gray-700/50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <BookOpen size={32} className="text-gray-500" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-3">
                            {tasks.length === 0 ? "No tasks yet!" : `No ${filter} tasks found`}
                        </h3>
                        <p className="text-gray-400 mb-6 text-lg">
                            {tasks.length === 0
                                ? "Create your first task to get started."
                                : searchTerm
                                    ? "Try a different search term."
                                    : `No ${filter} tasks to show.`}
                        </p>
                        {tasks.length === 0 && (
                            <button
                                onClick={() => navigate("/add-task")}
                                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors duration-200 shadow-lg hover:shadow-xl"
                            >
                                Create First Task
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {displayedTasks.map(task => (
                            <TaskItem
                                key={task.id}
                                task={task}
                                onDelete={handleDelete}
                                onEdit={handleEdit}
                                onToggleComplete={handleToggleComplete}
                                isSelected={selectedTasks.has(task.id)}
                                onSelect={handleSelectTask}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
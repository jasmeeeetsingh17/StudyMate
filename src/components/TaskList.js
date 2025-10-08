import { useState, useMemo, useRef } from "react";
import { BookOpen, Search, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import TaskItem from "./TaskItem";
import { TaskListSkeleton } from "./LoadingSkeletons";
import { QuickAddBar } from "./QuickAddBar";
import { useKeyboardShortcuts } from "../hooks/useKeyboardShortcuts";

export default function TaskList({ tasks = [], onDeleteTask, onEditTask, onToggleComplete, onAddTask, isLoading }) {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState("all");
    const [sortBy, setSortBy] = useState("dueDate");
    const [selectedTasks, setSelectedTasks] = useState(new Set());
    const [setShowShortcuts] = useState(false);
    const searchInputRef = useRef(null);

    // Keyboard shortcuts
    useKeyboardShortcuts({
        onNewTask: () => navigate("/add-task"),
        onSearch: () => searchInputRef.current?.focus(),
    });

    // Filter tasks
    const filteredTasks = useMemo(() => {
        return tasks.filter(task => {
            if (filter === "completed") return task.completed;
            if (filter === "pending") return !task.completed;
            return true;
        });
    }, [tasks, filter]);

    // Sort tasks
    const sortedTasks = useMemo(() => {
        return [...filteredTasks].sort((a, b) => {
            switch (sortBy) {
                case "dueDate":
                    if (!a.dueDate && !b.dueDate) return 0;
                    if (!a.dueDate) return 1;
                    if (!b.dueDate) return -1;
                    return new Date(a.dueDate) - new Date(b.dueDate);
                case "priority":
                    const order = { high: 3, medium: 2, low: 1 };
                    return (order[b.priority?.toLowerCase()] || 1) - (order[a.priority?.toLowerCase()] || 1);
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
    }, [filteredTasks, sortBy]);

    // Search tasks
    const displayedTasks = useMemo(() => {
        if (!searchTerm) return sortedTasks;
        return sortedTasks.filter(task => {
            const searchLower = searchTerm.toLowerCase();
            const title = (task.title || task.subject || task.topic || "").toLowerCase();
            const category = (task.category || "").toLowerCase();
            const topic = (task.topic || "").toLowerCase();
            return title.includes(searchLower) || category.includes(searchLower) || topic.includes(searchLower);
        });
    }, [sortedTasks, searchTerm]);

    // Task counts
    const taskCounts = useMemo(() => ({
        all: tasks.length,
        pending: tasks.filter(t => !t.completed).length,
        completed: tasks.filter(t => t.completed).length,
    }), [tasks]);

    // Bulk selection
    const handleSelectTask = (taskId, isSelected) => {
        const newSelected = new Set(selectedTasks);
        if (isSelected) newSelected.add(taskId);
        else newSelected.delete(taskId);
        setSelectedTasks(newSelected);
    };

    const handleSelectAll = () => {
        if (selectedTasks.size === displayedTasks.length) {
            setSelectedTasks(new Set());
        } else {
            setSelectedTasks(new Set(displayedTasks.map(t => t.id)));
        }
    };

    const handleBulkComplete = () => {
        selectedTasks.forEach(id => onToggleComplete(id));
        setSelectedTasks(new Set());
    };

    const handleBulkDelete = () => {
        if (window.confirm(`Delete ${selectedTasks.size} selected tasks?`)) {
            selectedTasks.forEach(id => onDeleteTask(id));
            setSelectedTasks(new Set());
        }
    };

    // Loading skeleton
    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900 p-6">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-10">
                        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse">
                            <BookOpen className="text-white" size={24} />
                        </div>
                        <div className="h-8 bg-gray-700 rounded w-48 mx-auto mb-2"></div>
                        <div className="h-4 bg-gray-700 rounded w-64 mx-auto"></div>
                    </div>
                    <TaskListSkeleton />
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
                    <button
                        onClick={() => setShowShortcuts(true)}
                        className="mt-2 text-sm text-gray-500 hover:text-gray-300 transition-colors"
                    >
                        Press Ctrl+/ for shortcuts
                    </button>
                </div>

                {/* Quick Add Bar */}
                <QuickAddBar onAddTask={onAddTask} existingTasks={tasks} />

                {/* Search + Sort + Add */}
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6 mb-4 flex flex-col md:flex-row gap-4 items-center">
                    <div className="flex-1 relative w-full">
                        <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            ref={searchInputRef}
                            type="text"
                            placeholder="Search tasks... (Ctrl+K)"
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
                            className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors duration-200 shadow-lg hover:shadow-xl"
                        >
                            <Plus size={20} /> <span className="hidden sm:inline">Add Task</span>
                        </button>
                    </div>
                </div>

                {/* Bulk actions */}
                {selectedTasks.size > 0 && (
                    <div className="bg-blue-600/20 backdrop-blur-lg rounded-2xl border border-blue-500/30 p-4 mb-4 flex flex-col md:flex-row justify-between items-center gap-4">
                        <span className="text-white font-medium">
                            {selectedTasks.size} task{selectedTasks.size !== 1 ? "s" : ""} selected
                        </span>
                        <div className="flex gap-2 flex-wrap">
                            <button
                                onClick={handleBulkComplete}
                                className="px-4 py-2 bg-green-600/30 hover:bg-green-600/50 text-green-300 rounded-lg text-sm font-medium transition-colors"
                            >
                                Mark Complete
                            </button>
                            <button
                                onClick={handleBulkDelete}
                                className="px-4 py-2 bg-red-600/30 hover:bg-red-600/50 text-red-300 rounded-lg text-sm font-medium transition-colors"
                            >
                                Delete Selected
                            </button>
                            <button
                                onClick={() => setSelectedTasks(new Set())}
                                className="px-4 py-2 bg-gray-600/30 hover:bg-gray-600/50 text-gray-300 rounded-lg text-sm font-medium transition-colors"
                            >
                                Clear Selection
                            </button>
                        </div>
                    </div>
                )}

                {/* Filter Tabs */}
                <div className="flex justify-center items-center mb-6 space-x-4 flex-wrap gap-2">
                    {displayedTasks.length > 0 && (
                        <>
                            <button
                                onClick={handleSelectAll}
                                className="px-3 py-2 text-sm text-gray-300 hover:text-white transition-colors"
                            >
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
                                onDelete={onDeleteTask}
                                onEdit={onEditTask}
                                onToggleComplete={onToggleComplete}
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

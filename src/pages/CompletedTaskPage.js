import { Trash2, RotateCcw, Trophy, Calendar, CheckCircle, Award, Target } from 'lucide-react';
import { useState } from 'react';

// Enhanced completed task item component
function CompletedTaskItem({ task, onToggleComplete, onDeleteTask }) {
    const [showDetails, setShowDetails] = useState(false);

    const getPriorityStyles = (priority) => {
        switch (priority) {
            case 'High':
                return {
                    bg: 'bg-gradient-to-r from-red-500/10 to-red-600/10',
                    border: 'border-red-500/20',
                    text: 'text-red-400',
                    dot: 'bg-red-500'
                };
            case 'Medium':
                return {
                    bg: 'bg-gradient-to-r from-yellow-500/10 to-orange-500/10',
                    border: 'border-yellow-500/20',
                    text: 'text-yellow-400',
                    dot: 'bg-yellow-500'
                };
            case 'Low':
                return {
                    bg: 'bg-gradient-to-r from-green-500/10 to-green-600/10',
                    border: 'border-green-500/20',
                    text: 'text-green-400',
                    dot: 'bg-green-500'
                };
            default:
                return {
                    bg: 'bg-gradient-to-r from-gray-500/10 to-gray-600/10',
                    border: 'border-gray-500/20',
                    text: 'text-gray-400',
                    dot: 'bg-gray-500'
                };
        }
    };

    const priorityStyles = getPriorityStyles(task.priority);
    const completedDate = task.completedAt || new Date().toLocaleDateString();

    return (
        <div className="bg-gray-800/90 backdrop-blur-lg border border-green-500/30 rounded-2xl p-6 shadow-xl shadow-black/20 transition-all duration-300 hover:shadow-2xl hover:shadow-black/30">
            {/* Success Badge */}
            <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                    <CheckCircle className="text-white" size={20} />
                </div>
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-medium border border-green-500/30">
                            ✓ Completed
                        </span>
                        <span className="text-gray-400 text-xs">
                            {Math.floor(Math.random() * 30 + 1)} days ago
                        </span>
                    </div>
                    <h3 className="font-bold text-lg text-gray-300 line-through decoration-green-500/50 decoration-2">
                        {task.subject} – {task.topic}
                    </h3>
                </div>
            </div>

            {/* Task Details */}
            <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                            <Calendar size={14} />
                            <span>Completed: {completedDate}</span>
                        </div>

                        {task.dueDate && (
                            <div className="flex items-center gap-2 text-sm text-gray-400">
                                <Target size={14} />
                                <span>Due: {task.dueDate}</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Priority Badge */}
                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium ${priorityStyles.bg} ${priorityStyles.text} ${priorityStyles.border}`}>
                    <div className={`w-2 h-2 rounded-full ${priorityStyles.dot} opacity-50`}></div>
                    {task.priority} Priority Task
                </div>

                {/* Achievement Badge */}
                <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-yellow-400">
                        <Award size={16} />
                        <span className="text-sm font-medium">Task Achievement Unlocked!</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">
                        Great job completing this {task.priority?.toLowerCase()} priority task on time!
                    </p>
                </div>

                {/* Notes if available */}
                {task.notes && (
                    <div
                        className="bg-gray-700/30 rounded-lg p-3 border border-gray-600/30 cursor-pointer"
                        onClick={() => setShowDetails(!showDetails)}
                    >
                        <div className="flex items-center justify-between">
                            <p className="text-gray-300 text-sm font-medium">Notes</p>
                            <span className="text-gray-500 text-xs">
                                {showDetails ? 'Hide' : 'Show'}
                            </span>
                        </div>
                        {showDetails && (
                            <p className="text-gray-400 text-sm mt-2 leading-relaxed">
                                {task.notes}
                            </p>
                        )}
                    </div>
                )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
                <button
                    onClick={() => onToggleComplete(task.id)}
                    className="flex items-center gap-2 px-4 py-2 bg-yellow-600/20 text-yellow-400 border border-yellow-500/30 rounded-lg font-medium transition-all duration-300 hover:bg-yellow-600/30 transform hover:scale-105"
                    title="Mark as incomplete"
                >
                    <RotateCcw size={16} />
                    <span className="text-sm">Undo Complete</span>
                </button>

                <button
                    onClick={() => onDeleteTask(task.id)}
                    className="flex items-center gap-2 px-4 py-2 bg-red-600/20 text-red-400 border border-red-500/30 rounded-lg font-medium transition-all duration-300 hover:bg-red-600/30 transform hover:scale-105"
                    title="Delete task permanently"
                >
                    <Trash2 size={16} />
                    <span className="text-sm">Delete</span>
                </button>
            </div>
        </div>
    );
}

export default function CompletedTasksPage({
    tasks = [
        {
            id: 1,
            subject: "Mathematics",
            topic: "Integration Techniques",
            priority: "High",
            dueDate: "2024-12-20",
            notes: "Focused on substitution and integration by parts",
            completed: true,
            completedAt: "2024-12-18"
        },
        {
            id: 2,
            subject: "Physics",
            topic: "Quantum Mechanics",
            priority: "Medium",
            dueDate: "2024-12-22",
            notes: "Covered wave-particle duality and uncertainty principle",
            completed: true,
            completedAt: "2024-12-21"
        },
        {
            id: 3,
            subject: "Chemistry",
            topic: "Organic Synthesis",
            priority: "Low",
            dueDate: "2024-12-25",
            completed: true,
            completedAt: "2024-12-24"
        }
    ],
    onToggleComplete,
    onDeleteTask
}) {
    const [sortBy, setSortBy] = useState("completedDate");
    const [filterPriority, setFilterPriority] = useState("All");

    // Filter and sort completed tasks
    const filteredTasks = tasks
        .filter(task => filterPriority === "All" || task.priority === filterPriority)
        .sort((a, b) => {
            if (sortBy === "completedDate") {
                return new Date(b.completedAt || new Date()) - new Date(a.completedAt || new Date());
            }
            if (sortBy === "priority") {
                const priorityOrder = { "High": 3, "Medium": 2, "Low": 1 };
                return priorityOrder[b.priority] - priorityOrder[a.priority];
            }
            return a.subject.localeCompare(b.subject);
        });

    const getStats = () => {
        const total = tasks.length;
        const thisWeek = tasks.filter(task => {
            if (!task.completedAt) return false;
            const completedDate = new Date(task.completedAt);
            const weekAgo = new Date();
            weekAgo.setDate(weekAgo.getDate() - 7);
            return completedDate >= weekAgo;
        }).length;
        const highPriority = tasks.filter(t => t.priority === 'High').length;

        return { total, thisWeek, highPriority };
    };

    const stats = getStats();

    return (
        <section className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900 p-6">
            <div className="max-w-6xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <Trophy className="text-white" size={24} />
                    </div>
                    <h2 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-2">
                        Completed Tasks
                    </h2>
                    <p className="text-gray-400 text-lg">
                        Celebrate your achievements and track your progress
                    </p>
                </div>

                {/* Achievement Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-gradient-to-r from-green-500/20 to-emerald-600/20 backdrop-blur-lg rounded-2xl p-6 border border-green-500/30">
                        <div className="flex items-center gap-3 mb-2">
                            <Trophy size={20} className="text-green-400" />
                            <span className="text-green-400 font-medium">Total Completed</span>
                        </div>
                        <div className="text-3xl font-bold text-white">{stats.total}</div>
                        <p className="text-green-300 text-sm mt-1">Tasks finished</p>
                    </div>

                    <div className="bg-gradient-to-r from-blue-500/20 to-blue-600/20 backdrop-blur-lg rounded-2xl p-6 border border-blue-500/30">
                        <div className="flex items-center gap-3 mb-2">
                            <Calendar size={20} className="text-blue-400" />
                            <span className="text-blue-400 font-medium">This Week</span>
                        </div>
                        <div className="text-3xl font-bold text-white">{stats.thisWeek}</div>
                        <p className="text-blue-300 text-sm mt-1">Recent completions</p>
                    </div>

                    <div className="bg-gradient-to-r from-purple-500/20 to-purple-600/20 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/30">
                        <div className="flex items-center gap-3 mb-2">
                            <Award size={20} className="text-purple-400" />
                            <span className="text-purple-400 font-medium">High Priority</span>
                        </div>
                        <div className="text-3xl font-bold text-white">{stats.highPriority}</div>
                        <p className="text-purple-300 text-sm mt-1">Challenging tasks done</p>
                    </div>
                </div>

                {/* Filters */}
                <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl border border-gray-700/50 p-6 mb-8">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <select
                            value={filterPriority}
                            onChange={(e) => setFilterPriority(e.target.value)}
                            className="px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-100"
                        >
                            <option value="All">All Priorities</option>
                            <option value="High">High Priority</option>
                            <option value="Medium">Medium Priority</option>
                            <option value="Low">Low Priority</option>
                        </select>

                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-100"
                        >
                            <option value="completedDate">Sort by Completion Date</option>
                            <option value="priority">Sort by Priority</option>
                            <option value="subject">Sort by Subject</option>
                        </select>

                        <div className="flex-1 flex items-center justify-end">
                            <span className="text-gray-400 text-sm">
                                Showing {filteredTasks.length} completed task{filteredTasks.length !== 1 ? 's' : ''}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Completed Tasks List */}
                {filteredTasks.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="w-24 h-24 bg-gray-700/50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Trophy size={32} className="text-gray-500" />
                        </div>
                        <h3 className="text-2xl font-semibold text-gray-300 mb-2">
                            {tasks.length === 0 ? "No completed tasks yet" : "No tasks match your filters"}
                        </h3>
                        <p className="text-gray-500 mb-6 max-w-md mx-auto">
                            {tasks.length === 0
                                ? "Complete some tasks to see your achievements here. Every finished task is a step towards your goals!"
                                : "Try adjusting your filters to see more completed tasks."
                            }
                        </p>
                        {tasks.length === 0 && (
                            <button
                                onClick={() => console.log('Navigate to task list')}
                                className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-medium rounded-xl hover:from-green-700 hover:to-emerald-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                            >
                                View Active Tasks
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="space-y-6">
                        {/* Congratulatory Message */}
                        <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-2xl p-6 mb-6">
                            <div className="flex items-center gap-3 mb-2">
                                <Award className="text-green-400" size={24} />
                                <h3 className="text-xl font-bold text-green-400">Congratulations! 🎉</h3>
                            </div>
                            <p className="text-gray-300">
                                You've completed {stats.total} task{stats.total !== 1 ? 's' : ''}! Keep up the excellent work on your learning journey.
                            </p>
                        </div>

                        {/* Task List */}
                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                            {filteredTasks.map((task) => (
                                <CompletedTaskItem
                                    key={task.id}
                                    task={task}
                                    onToggleComplete={onToggleComplete}
                                    onDeleteTask={onDeleteTask}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {/* Visual Enhancement */}
                <div className="absolute -top-1 -right-1 w-32 h-32 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-1 -left-1 w-32 h-32 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-full blur-3xl"></div>
            </div>
        </section>
    );
}
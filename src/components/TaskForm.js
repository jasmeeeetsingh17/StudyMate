import { useState, useEffect } from "react";
import { Calendar, Flag, BookOpen, FileText, Save, Plus } from "lucide-react";
import toast, { Toaster } from 'react-hot-toast';

// Mock navigate function for demo
const useNavigate = () => {
    return (path) => console.log(`Navigating to ${path}`);
};

export default function TaskForm({ onAddTask, onUpdateTask, existingTask }) {
    const [subject, setSubject] = useState("");
    const [topic, setTopic] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [priority, setPriority] = useState("Medium");
    const [notes, setNotes] = useState("");
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        if (existingTask) {
            setSubject(existingTask.subject || "");
            setTopic(existingTask.topic || "");
            setDueDate(existingTask.dueDate || "");
            setPriority(existingTask.priority || "Medium");
            setNotes(existingTask.notes || "");
        } else {
            // Ensure form is reset when switching from edit to create mode
            resetForm();
        }
    }, [existingTask]);

    // NEW: Function to reset all form fields and errors
    const resetForm = () => {
        setSubject("");
        setTopic("");
        setDueDate("");
        setPriority("Medium");
        setNotes("");
        setErrors({});
    };

    const validateForm = () => {
        const newErrors = {};
        if (!subject.trim()) newErrors.subject = 'Subject is required';
        if (!topic.trim()) newErrors.topic = 'Topic is required';
        return newErrors;
    };

    const handleInputChange = (field, value) => {
        switch (field) {
            case 'subject': setSubject(value); break;
            case 'topic': setTopic(value); break;
            case 'dueDate': setDueDate(value); break;
            case 'priority': setPriority(value); break;
            case 'notes': setNotes(value); break;
            default: console.warn(`Unhandled field: ${field}`);
        }
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            toast.error('Please fill in all required fields.');
            return;
        }

        const taskData = { subject, topic, dueDate, priority, notes };

        try {
            const allTasks = JSON.parse(localStorage.getItem('studyTasks')) || [];

            if (existingTask) {
                // UPDATE existing task
                const updatedTask = { ...taskData, id: existingTask.id, completed: existingTask.completed || false };
                const taskIndex = allTasks.findIndex(task => task.id === existingTask.id);

                if (taskIndex > -1) {
                    allTasks[taskIndex] = updatedTask;
                } else {
                    allTasks.push(updatedTask);
                }

                localStorage.setItem('studyTasks', JSON.stringify(allTasks));
                toast.success('Task updated successfully!');
                onUpdateTask?.(updatedTask);
                navigate('/tasks'); // Navigate away after updating

            } else {
                // ADD new task
                const newTask = { ...taskData, id: Date.now(), completed: false };
                allTasks.push(newTask);

                localStorage.setItem('studyTasks', JSON.stringify(allTasks));
                toast.success('Task created and saved!');
                onAddTask?.(newTask);
                resetForm(); // UPDATED: Reset form fields after successful creation
            }

        } catch (error) {
            console.error("Failed to save tasks to local storage:", error);
            toast.error('Could not save task. See console for details.');
        }
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'High': return 'from-red-500 to-red-600';
            case 'Medium': return 'from-yellow-500 to-orange-500';
            case 'Low': return 'from-green-500 to-green-600';
            default: return 'from-gray-500 to-gray-600';
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900 p-6 flex items-center justify-center">
            {/* Toaster component for displaying notifications */}
            <Toaster
                position="top-center"
                reverseOrder={false}
                toastOptions={{
                    style: {
                        background: '#334155', // slate-700
                        color: '#f1f5f9',     // slate-100
                    },
                }}
            />
            <div className="bg-gray-800/90 backdrop-blur-lg border border-gray-700/50 rounded-3xl shadow-2xl shadow-black/50 p-8 w-full max-w-4xl">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                        {existingTask ? <Save className="text-white" size={24} /> : <Plus className="text-white" size={24} />}
                    </div>
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                        {existingTask ? "Edit Task" : "Create New Task"}
                    </h2>
                    <p className="text-gray-400">
                        {existingTask ? "Update your study task details" : "Add a new study task to your schedule"}
                    </p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        {/* Subject Field */}
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-gray-300 font-medium">
                                <BookOpen size={16} />
                                Subject
                            </label>
                            <input
                                value={subject}
                                onChange={(e) => handleInputChange('subject', e.target.value)}
                                placeholder="e.g. Mathematics, Physics, Chemistry"
                                className={`w-full px-4 py-3 bg-gray-700/50 border rounded-xl focus:outline-none focus:ring-2 text-gray-100 placeholder-gray-400 transition-all duration-200 ${errors.subject
                                    ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                                    : 'border-gray-600 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-500'
                                    }`}
                            />
                            {errors.subject && (
                                <p className="text-red-400 text-sm flex items-center gap-1">
                                    <span className="w-1 h-1 bg-red-400 rounded-full"></span>
                                    {errors.subject}
                                </p>
                            )}
                        </div>

                        {/* Topic Field */}
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-gray-300 font-medium">
                                <FileText size={16} />
                                Topic
                            </label>
                            <input
                                value={topic}
                                onChange={(e) => handleInputChange('topic', e.target.value)}
                                placeholder="e.g. Integration Chapter 5, Newton's Laws"
                                className={`w-full px-4 py-3 bg-gray-700/50 border rounded-xl focus:outline-none focus:ring-2 text-gray-100 placeholder-gray-400 transition-all duration-200 ${errors.topic
                                    ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                                    : 'border-gray-600 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-500'
                                    }`}
                            />
                            {errors.topic && (
                                <p className="text-red-400 text-sm flex items-center gap-1">
                                    <span className="w-1 h-1 bg-red-400 rounded-full"></span>
                                    {errors.topic}
                                </p>
                            )}
                        </div>

                        {/* Due Date Field */}
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-gray-300 font-medium">
                                <Calendar size={16} />
                                Due Date
                            </label>
                            <input
                                type="date"
                                value={dueDate}
                                onChange={(e) => handleInputChange('dueDate', e.target.value)}
                                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-100 transition-all duration-200 hover:border-gray-500"
                            />
                        </div>

                        {/* Priority Field */}
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-gray-300 font-medium">
                                <Flag size={16} />
                                Priority Level
                            </label>
                            <div className="relative">
                                <select
                                    value={priority}
                                    onChange={(e) => handleInputChange('priority', e.target.value)}
                                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-100 transition-all duration-200 hover:border-gray-500 appearance-none cursor-pointer"
                                >
                                    <option value="High">🔴 High Priority</option>
                                    <option value="Medium">🟡 Medium Priority</option>
                                    <option value="Low">🟢 Low Priority</option>
                                </select>
                                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                                    <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${getPriorityColor(priority)} shadow-lg`}></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Notes Field */}
                    <div className="space-y-2 mb-8">
                        <label className="flex items-center gap-2 text-gray-300 font-medium">
                            <FileText size={16} />
                            Additional Notes
                            <span className="text-gray-500 text-sm">(Optional)</span>
                        </label>
                        <textarea
                            rows="4"
                            value={notes}
                            onChange={(e) => handleInputChange('notes', e.target.value)}
                            placeholder="Add any extra information, reminders, or study materials needed..."
                            className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-100 placeholder-gray-400 transition-all duration-200 hover:border-gray-500 resize-none"
                        />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <button
                            type="button"
                            onClick={() => navigate('/tasks')}
                            className="flex-1 px-6 py-3 bg-gray-700/50 text-gray-300 font-medium rounded-xl border border-gray-600 hover:bg-gray-600/50 hover:text-white transition-all duration-300 flex items-center justify-center gap-2"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-xl hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                        >
                            {existingTask ? (
                                <>
                                    <Save size={18} />
                                    Save Changes
                                </>
                            ) : (
                                <>
                                    <Plus size={18} />
                                    Create Task
                                </>
                            )}
                        </button>
                    </div>
                </form>

                {/* Visual Enhancement */}
                <div className="absolute -top-1 -right-1 w-32 h-32 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-1 -left-1 w-32 h-32 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"></div>
            </div>
        </div>
    );
}
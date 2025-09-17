import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, Flag } from "lucide-react";

// The form now accepts onUpdateTask and existingTask props
export default function TaskForm({ onAddTask, onUpdateTask, existingTask }) {
    const [subject, setSubject] = useState("");
    const [topic, setTopic] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [priority, setPriority] = useState("Medium");
    const [notes, setNotes] = useState("");

    const navigate = useNavigate();

    // --- NEW --- If an existingTask is passed, populate the form fields
    useEffect(() => {
        if (existingTask) {
            setSubject(existingTask.subject);
            setTopic(existingTask.topic);
            setDueDate(existingTask.dueDate);
            setPriority(existingTask.priority);
            setNotes(existingTask.notes);
        }
    }, [existingTask]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!subject || !topic) return;

        const taskData = { subject, topic, dueDate, priority, notes };

        // --- NEW --- If we are editing, call onUpdateTask. Otherwise, call onAddTask.
        if (existingTask) {
            onUpdateTask({ ...taskData, id: existingTask.id, completed: existingTask.completed });
        } else {
            onAddTask(taskData);
        }

        navigate('/tasks');
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg m-4 space-y-5">
            {/* Change the title dynamically */}
            <h2 className="text-2xl font-bold">{existingTask ? "Edit Task" : "Add a New Task"}</h2>

            <form className="grid grid-cols-1 md:grid-cols-2 gap-5" onSubmit={handleSubmit}>
                <div className="flex flex-col">
                    <label className="text-sm font-medium mb-1">Subject</label>
                    <input
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="e.g. Mathematics"
                        className="p-3 rounded-lg border dark:border-gray-700 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium mb-1">Topic</label>
                    <input
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        placeholder="e.g. Integration Chapter 5"
                        className="p-3 rounded-lg border dark:border-gray-700 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium mb-1 flex items-center gap-1">
                        <Calendar size={14} /> Due Date
                    </label>
                    <input
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        className="p-3 rounded-lg border dark:border-gray-700 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium mb-1 flex items-center gap-1">
                        <Flag size={14} /> Priority
                    </label>
                    <select
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                        className="p-3 rounded-lg border dark:border-gray-700 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        <option>High</option>
                        <option>Medium</option>
                        <option>Low</option>
                    </select>
                </div>

                <div className="md:col-span-2 flex flex-col">
                    <label className="text-sm font-medium mb-1">Additional Notes</label>
                    <textarea
                        rows="3"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Add any extra info (optional)"
                        className="p-3 rounded-lg border dark:border-gray-700 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div className="md:col-span-2">
                    <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 ...">
                        {/* Change button text dynamically */}
                        {existingTask ? "💾 Save Changes" : "➕ Add Task"}
                    </button>
                </div>
            </form>
        </div>
    );
}

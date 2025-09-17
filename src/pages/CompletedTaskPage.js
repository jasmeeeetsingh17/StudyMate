// src/pages/CompletedTasksPage.js
import { Trash2 } from 'lucide-react';

// A simpler item for the completed list
function CompletedTaskItem({ task, onToggleComplete, onDeleteTask }) {
    return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow flex justify-between items-center">
            <div>
                <h3 className="font-bold text-lg line-through text-gray-500 dark:text-gray-400">
                    {task.subject} – {task.topic}
                </h3>
                <p className="text-sm text-gray-400">Completed on: {new Date().toLocaleDateString()}</p>
            </div>
            <div className="flex gap-2">
                <button
                    onClick={() => onToggleComplete(task.id)}
                    className="text-yellow-500 hover:text-yellow-700"
                    title="Mark as Incomplete"
                >
                    Undo
                </button>
                <button
                    onClick={() => onDeleteTask(task.id)}
                    className="text-red-500 hover:text-red-700"
                    title="Delete task"
                >
                    <Trash2 size={18} />
                </button>
            </div>
        </div>
    );
}


export default function CompletedTasksPage({ tasks, onToggleComplete, onDeleteTask }) {
    return (
        <section>
            <h2 className="text-3xl font-bold mb-4">Completed Tasks ✅</h2>
            {tasks.length === 0 ? (
                <p className="text-gray-500">No completed tasks yet.</p>
            ) : (
                <div className="space-y-4">
                    {tasks.map((task) => (
                        <CompletedTaskItem
                            key={task.id}
                            task={task}
                            onToggleComplete={onToggleComplete}
                            onDeleteTask={onDeleteTask}
                        />
                    ))}
                </div>
            )}
        </section>
    );
}
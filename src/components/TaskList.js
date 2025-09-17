import TaskItem from "./TaskItem";

export default function TaskList({ tasks = [], onDeleteTask, onEditTask, onToggleComplete }) {
    return (
        <section className="m-4">
            <div className="mb-4">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                    Your Tasks
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    All your upcoming study tasks at a glance.
                </p>
            </div>

            {tasks.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400 italic">
                    No tasks yet. Add your first task above.
                </p>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {tasks.map((task) => (
                        <TaskItem
                            key={task.id}
                            task={task}
                            onDelete={() => onDeleteTask(task.id)}
                            onEdit={onEditTask} // Pass it down
                            onToggleComplete={onToggleComplete} // Pass it down
                        />
                    ))}
                </div>
            )}
        </section>
    );
}

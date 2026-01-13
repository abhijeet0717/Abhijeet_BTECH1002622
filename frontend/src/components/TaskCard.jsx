import { Draggable } from '@hello-pangea/dnd';

const TaskCard = ({ task, index, onEdit, onDelete }) => {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const isOverdue = () => {
        const dueDate = new Date(task.due_date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return dueDate < today && task.status !== 'completed';
    };

    return (
        <Draggable draggableId={task._id} index={index}>
            {(provided, snapshot) => (
                <div
                    className={`task-card ${snapshot.isDragging ? 'dragging' : ''} ${isOverdue() ? 'overdue' : ''}`}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <div className="task-card-header">
                        <h3 className="task-title">{task.title}</h3>
                        <div className="task-actions">
                            <button
                                className="btn-icon"
                                onClick={() => onEdit(task)}
                                title="Edit task"
                            >
                                ✏️
                            </button>
                            <button
                                className="btn-icon"
                                onClick={() => onDelete(task._id)}
                                title="Delete task"
                            >
                                🗑️
                            </button>
                        </div>
                    </div>
                    {task.description && (
                        <p className="task-description">{task.description}</p>
                    )}
                    <div className="task-footer">
                        <span className={`task-due-date ${isOverdue() ? 'overdue' : ''}`}>
                            📅 {formatDate(task.due_date)}
                        </span>
                    </div>
                </div>
            )}
        </Draggable>
    );
};

export default TaskCard;
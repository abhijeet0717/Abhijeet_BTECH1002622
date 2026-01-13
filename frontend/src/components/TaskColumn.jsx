import TaskCard from './TaskCard';

const TaskColumn = ({ column, tasks, provided, snapshot, onEditTask, onDeleteTask }) => {
    return (
        <div
            className={`kanban-column ${snapshot.isDraggingOver ? 'dragging-over' : ''}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
        >
            <div className="column-header" style={{ borderColor: column.color }}>
                <h2>{column.title}</h2>
                <span className="task-count">{tasks.length}</span>
            </div>
            <div className="column-content">
                {tasks.map((task, index) => (
                    <TaskCard
                        key={task._id}
                        task={task}
                        index={index}
                        onEdit={onEditTask}
                        onDelete={onDeleteTask}
                    />
                ))}
                {provided.placeholder}
            </div>
        </div>
    );
};

export default TaskColumn;
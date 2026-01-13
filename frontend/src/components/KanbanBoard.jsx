import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import TaskColumn from './TaskColumn';

const COLUMNS = [
    { id: 'pending', title: 'Pending', color: '#f59e0b' },
    { id: 'in-progress', title: 'In Progress', color: '#3b82f6' },
    { id: 'completed', title: 'Completed', color: '#10b981' }
];

const KanbanBoard = ({ tasks, onStatusChange, onEditTask, onDeleteTask }) => {
    const getTasksByStatus = (status) => {
        return tasks.filter(task => task.status === status);
    };

    const handleDragEnd = (result) => {
        const { destination, source, draggableId } = result;

        // Dropped outside of any droppable
        if (!destination) return;

        // Dropped in the same position
        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        // Update task status if dropped in a different column
        if (destination.droppableId !== source.droppableId) {
            onStatusChange(draggableId, destination.droppableId);
        }
    };

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <div className="kanban-board">
                {COLUMNS.map(column => (
                    <Droppable key={column.id} droppableId={column.id}>
                        {(provided, snapshot) => (
                            <TaskColumn
                                column={column}
                                tasks={getTasksByStatus(column.id)}
                                provided={provided}
                                snapshot={snapshot}
                                onEditTask={onEditTask}
                                onDeleteTask={onDeleteTask}
                            />
                        )}
                    </Droppable>
                ))}
            </div>
        </DragDropContext>
    );
};

export default KanbanBoard;
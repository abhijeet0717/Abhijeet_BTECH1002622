import { useState, useEffect } from 'react';
import KanbanBoard from '../components/KanbanBoard';
import TaskModal from '../components/TaskModal';
import Navbar from '../components/Navbar';
import { tasksAPI } from '../services/api';

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState(null);

    const fetchTasks = async () => {
        try {
            setLoading(true);
            const response = await tasksAPI.getAll();
            setTasks(response.data.data);
            setError('');
        } catch (err) {
            setError('Failed to fetch tasks');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleCreateTask = () => {
        setEditingTask(null);
        setIsModalOpen(true);
    };

    const handleEditTask = (task) => {
        setEditingTask(task);
        setIsModalOpen(true);
    };

    const handleSaveTask = async (taskData) => {
        try {
            if (editingTask) {
                const response = await tasksAPI.update(editingTask._id, taskData);
                setTasks(tasks.map(t => t._id === editingTask._id ? response.data.data : t));
            } else {
                const response = await tasksAPI.create(taskData);
                setTasks([response.data.data, ...tasks]);
            }
            setIsModalOpen(false);
            setEditingTask(null);
        } catch (err) {
            throw err;
        }
    };

    const handleDeleteTask = async (taskId) => {
        try {
            await tasksAPI.delete(taskId);
            setTasks(tasks.filter(t => t._id !== taskId));
        } catch (err) {
            console.error('Failed to delete task:', err);
        }
    };

    const handleStatusChange = async (taskId, newStatus) => {
        try {
            const response = await tasksAPI.update(taskId, { status: newStatus });
            setTasks(tasks.map(t => t._id === taskId ? response.data.data : t));
        } catch (err) {
            console.error('Failed to update task status:', err);
            fetchTasks(); // Refresh to get correct state
        }
    };

    return (
        <div className="dashboard">
            <Navbar />
            <div className="dashboard-content">
                <div className="dashboard-header">
                    <h1>Task Board</h1>
                    <button className="btn btn-primary" onClick={handleCreateTask}>
                        + Add Task
                    </button>
                </div>

                {error && <div className="error-message">{error}</div>}

                {loading ? (
                    <div className="loading">Loading tasks...</div>
                ) : (
                    <KanbanBoard
                        tasks={tasks}
                        onStatusChange={handleStatusChange}
                        onEditTask={handleEditTask}
                        onDeleteTask={handleDeleteTask}
                    />
                )}

                {isModalOpen && (
                    <TaskModal
                        task={editingTask}
                        onSave={handleSaveTask}
                        onClose={() => {
                            setIsModalOpen(false);
                            setEditingTask(null);
                        }}
                    />
                )}
            </div>
        </div>
    );
};

export default Dashboard;
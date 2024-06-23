import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskForm from './TaskForm';
import './TaskList.css';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [editingTask, setEditingTask] = useState(null);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        const response = await axios.get('http://localhost:8090/api/tasks');
        setTasks(response.data);
    };

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:8090/api/tasks/${id}`);
        fetchTasks();
    };

    const handleComplete = async (task) => {
        task.completed = !task.completed;
        await axios.put(`http://localhost:8090/api/tasks/${task.id}`, task);
        fetchTasks();
    };

    const handleEdit = (task) => {
        setEditingTask(task);
    };

    const handleCancelEdit = () => {
        setEditingTask(null);
    };

    return (
        <div>
            <TaskForm fetchTasks={fetchTasks} editingTask={editingTask} onCancelEdit={handleCancelEdit} />
            <ul className="task-list">
    {tasks.map(task => (
        <li key={task.id}>
            <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                {task.title}
            </span>
            <button onClick={() => handleComplete(task)} className="task-list-button">
                <i className={`fas ${task.completed ? 'fa-undo' : 'fa-check'}`}></i>
            </button>
            <button onClick={() => handleEdit(task)} className="task-list-button"><i className="fas fa-edit"></i></button>
            <button onClick={() => handleDelete(task.id)} className="task-list-button"><i className="fas fa-trash"></i></button>
        </li>
    ))}
</ul>

        </div>
    );
};

export default TaskList;

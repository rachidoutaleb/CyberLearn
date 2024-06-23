import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TaskForm.css';

const TaskForm = ({ fetchTasks, editingTask, onCancelEdit }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (editingTask) {
            setTitle(editingTask.title);
            setDescription(editingTask.description);
        } else {
            setTitle('');
            setDescription('');
        }
    }, [editingTask]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (editingTask) {
            await axios.put(`http://localhost:8090/api/tasks/${editingTask.id}`, { title, description, completed: editingTask.completed });
            onCancelEdit();
        } else {
            await axios.post('http://localhost:8090/api/tasks', { title, description, completed: false });
        }
        setTitle('');
        setDescription('');
        fetchTasks();
    };

    return (
        <form onSubmit={handleSubmit} className="task-form-container">
            <input
                type="text"
                placeholder="Add a todo"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="task-form-input"
            />
            <button type="submit" className="task-form-button">
                <i className="fas fa-plus"></i>
            </button>
            {editingTask && <button type="button" onClick={onCancelEdit} className="task-form-button"><i className="fas fa-times"></i></button>}
        </form>
    );
};

export default TaskForm;

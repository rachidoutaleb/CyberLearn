import React from 'react';
import './todo.css';
import TaskList from './TaskList';

function todo() {
    return (
        <div className="todo-app">
            <div className="App">
                <header className="App-header">
                    <h1>Todo List</h1>
                </header>
                <TaskList />
            </div>
        </div>
    );
}

export default todo;

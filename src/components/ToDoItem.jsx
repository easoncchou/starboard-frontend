import { useState, useEffect } from 'react'

export default function ToDoItem({id, task, done, dateToComplete, handleToggleDone, handleDelete}) {

    return (
        <div className="to-do-item">
            <input type="checkbox" checked={done} onChange={() => handleToggleDone(id)}/>
            <div><b>{task}</b></div>
            <div>{dateToComplete}</div>
            <button onClick={() => handleDelete(id)}>🗑️</button>
        </div>
    )
}
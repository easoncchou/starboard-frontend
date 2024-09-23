import { useState, useEffect } from 'react'
import ToDoItem from './ToDoItem'
import toDoItemsData from '../mockToDoData.json'

export default function ToDo() {

    const getCurrentDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const [toDoItems, setToDoItems] = useState(toDoItemsData.sort((a, b) => new Date(a.dateToComplete) - new Date(b.dateToComplete)))

    const [taskInput, setTaskInput] = useState("")

    const [dateInput, setDateInput] = useState(getCurrentDate)

    useEffect(() => {}, [])

    function handleTaskChange(event) {
        setTaskInput(event.target.value)
    }

    function handleDateChange(event) {
        setDateInput(event.target.value)
    }

    function handleDelete(id) {
        setToDoItems(toDoItems.filter((item) => item.id !== id))
    }

    function handleToggleDone(id) {
        setToDoItems(toDoItems.map(item => {
            if (item.id === id) {
                return {...item, done: !item.done}
            }
            return item
        }))
    }

    function handleSubmit(event) {
        event.preventDefault()
        if (taskInput.length > 0) {
            setToDoItems(prevToDoItems => {
                const newToDoItems = [...prevToDoItems, {task: taskInput, done: false, dateToComplete: dateInput}]
                newToDoItems.sort((a, b) => new Date(a.dateToComplete) - new Date(b.dateToComplete))
                return newToDoItems
            })
            setTaskInput('')
            setDateInput(getCurrentDate())
        }
    }

    return (
        <div className="container widget-container">
            <h1>To-Do List📝</h1>
            <h6>Let's get stuff done!</h6>
            <form onSubmit={handleSubmit}>
            <input name="taskName" type="text" placeholder="Enter task" value={taskInput} onChange={handleTaskChange}/>
                <div className="grid">
                    <input name="date" type="date" value={dateInput} onChange={handleDateChange}/>
                    <input type="submit" value="Add" />
                </div>
            </form>
            <div className="item-list">
                {toDoItems.map((item, index) => {
                    return (
                        <ToDoItem key={item.id} id={item.id} task={item.task} done={item.done} dateToComplete={item.dateToComplete} handleToggleDone={handleToggleDone} handleDelete={handleDelete}/>
                    )
                })}
            </div>
        </div>
        
    )
}
import React, { useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Medium");

  const addTask = () => {
    if (input.trim() === "") {
      alert("Please enter a task!");
      return;
    }
    const newTask = {
      id: Date.now(),
      text: input,
      completed: false,
      dueDate: dueDate || "No due date",
      priority,
    };
    setTasks([...tasks, newTask]);
    setInput("");
    setDueDate("");
    setPriority("Medium");
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const completedCount = tasks.filter((t) => t.completed).length;

  const sortedTasks = [...tasks].sort((a, b) => {
    const order = { High: 1, Medium: 2, Low: 3 };
    return order[a.priority] - order[b.priority];
  });

  const isOverdue = (date) => {
    if (date === "No due date") return false;
    const today = new Date().toISOString().split("T")[0];
    return date < today;
  };

  return (
    <div className="app">
      <h1>📅 Smart To-Do List</h1>

      {/* Task input + Add button */}
      <div className="row input-row">
        <input
          type="text"
          placeholder="Enter task..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={addTask}>Add Task</button>
      </div>

      {/* Due date + Priority */}
      <div className="row">
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>
      </div>

      {/* Status tracker */}
      <div className="row status">
        <p>
          Total: <strong>{tasks.length}</strong> | Completed:{" "}
          <strong>{completedCount}</strong> | Pending:{" "}
          <strong>{tasks.length - completedCount}</strong>
        </p>
      </div>

      {/* Task list */}
      <ul className="task-list">
        {sortedTasks.length === 0 ? (
          <p className="no-task">No tasks added yet.</p>
        ) : (
          sortedTasks.map((task) => (
            <li
              key={task.id}
              className={`${task.completed ? "completed" : ""} ${
                isOverdue(task.dueDate) && !task.completed ? "overdue" : ""
              }`}
            >
              {/* All task info in single line */}
              <span className="task-text">{task.text}</span>
              <span className="task-due">{task.dueDate}</span>
              <span className={`priority ${task.priority.toLowerCase()}`}>
                {task.priority}
              </span>
              {!task.completed && (
                <button
                  className="complete-btn"
                  onClick={() => toggleTask(task.id)}
                >
                  ✅Completed
                </button>
              )}
              <button
                className="delete-btn"
                onClick={() => deleteTask(task.id)}
              >
                ❌Delete
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default App;

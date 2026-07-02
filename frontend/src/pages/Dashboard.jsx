import { useEffect, useState } from "react";
import api from "../api";

import Navbar from "../components/Navbar";
import TaskItem from "../components/TaskItem";

function Dashboard() {

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("Pending");

  const userInfo = JSON.parse(
    localStorage.getItem("userInfo")
  );

  const config = {
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
    },
  };

  const fetchTasks = async () => {
    try {
      const { data } = await api.get(
        "/api/tasks",
        config
      );
      setTasks(data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async () => {
    if (!title) return;

    try {
      await api.post(
        "/api/tasks",
        {
          title,
          completed: status === "Completed"
        },
        config
      );
      setTitle("");
      fetchTasks();
    } catch (err) {
      console.error("Error adding task:", err);
      alert(err.response?.data?.message || err.message || "Failed to add task");
    }
  };

  const completeTask = async (id) => {
    try {
      await api.put(
        `/api/tasks/${id}`,
        {},
        config
      );
      fetchTasks();
    } catch (err) {
      console.error("Error updating task:", err);
      alert(err.response?.data?.message || err.message || "Failed to update task");
    }
  };

  const deleteTask = async (id) => {
    try {
      await api.delete(
        `/api/tasks/${id}`,
        config
      );
      fetchTasks();
    } catch (err) {
      console.error("Error deleting task:", err);
      alert(err.response?.data?.message || err.message || "Failed to delete task");
    }
  };

  return (
    <div className="dashboard">

      <Navbar />

      <h1 className="heading">
        Task Manager Dashboard
      </h1>

      <div className="task-input-section">

        <input
          type="text"
          placeholder="Enter task"
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
        />

        <select
          value={status}
          onChange={(e)=>setStatus(e.target.value)}
        >
          <option>Pending</option>
          <option>Completed</option>
        </select>

        <button onClick={addTask}>
          Add Task
        </button>

      </div>

      <div className="tasks-container">

        {
          tasks.length === 0
          ? <p className="no-task">No tasks found</p>
          : tasks.map((task)=>(
              <TaskItem
                key={task._id}
                task={task}
                completeTask={completeTask}
                deleteTask={deleteTask}
              />
            ))
        }

      </div>

    </div>
  );
}

export default Dashboard;
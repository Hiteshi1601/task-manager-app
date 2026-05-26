import { useState } from "react";

function TaskForm({ addTask }) {

  const [title, setTitle] = useState("");

  const submitHandler = (e) => {

    e.preventDefault();

    if (!title) return;

    addTask(title);

    setTitle("");
  };

  return (
    <form onSubmit={submitHandler}>

      <input
        type="text"
        placeholder="Enter Task"
        value={title}
        onChange={(e)=>setTitle(e.target.value)}
      />

      <button type="submit">
        Add Task
      </button>

    </form>
  );
}

export default TaskForm;
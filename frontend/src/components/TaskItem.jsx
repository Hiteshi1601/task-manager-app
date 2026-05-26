function TaskItem({
  task,
  completeTask,
  deleteTask,
}) {

  return (

    <div className="task-card">

      <h3>{task.title}</h3>

      <p>
        Status:
        <span
          className={
            task.completed
            ? "completed"
            : "pending"
          }
        >
          {task.completed
            ? " Completed"
            : " Pending"}
        </span>
      </p>

      <div className="btn-group">

        <button
          className="edit-btn"
          onClick={() => completeTask(task._id)}
        >
          Edit
        </button>

        <button
          className="delete-btn"
          onClick={() => deleteTask(task._id)}
        >
          Delete
        </button>

      </div>

    </div>
  );
}

export default TaskItem;
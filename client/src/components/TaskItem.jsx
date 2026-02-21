import API from "../api/axios";

function TaskItem({ task, fetchTasks }) {
  const toggleComplete = async () => {
    await API.put(`/tasks/${task._id}`, {
      completed: !task.completed
    });
    fetchTasks();
  };

  const deleteTask = async () => {
    await API.delete(`/tasks/${task._id}`);
    fetchTasks();
  };

  return (
    <div className="bg-white p-3 rounded shadow mb-2 flex justify-between">
      <span
        onClick={toggleComplete}
        className={`cursor-pointer ${task.completed ? "line-through text-gray-400" : ""}`}
      >
        {task.title}
      </span>
      <button onClick={deleteTask} className="text-red-500">
        Delete
      </button>
    </div>
  );
}

export default TaskItem;
import { useState } from "react";
import API from "../api/axios";

function TaskForm({ fetchTasks }) {
  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post("/tasks", { title });
    setTitle("");
    fetchTasks();
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={title}
        placeholder="Add task..."
        className="flex-1 p-2 border rounded"
        onChange={(e) => setTitle(e.target.value)}
      />
      <button className="bg-blue-500 text-white px-4 rounded">
        Add
      </button>
    </form>
  );
}

export default TaskForm;
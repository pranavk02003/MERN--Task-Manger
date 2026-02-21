import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [editingId, setEditingId] = useState(null);

  const token = localStorage.getItem("token");

  const fetchTasks = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/tasks",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTasks(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await axios.put(
          `http://localhost:5000/api/tasks/${editingId}`,
          { title },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setEditingId(null);
      } else {
        await axios.post(
          "http://localhost:5000/api/tasks",
          { title },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      setTitle("");
      fetchTasks();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/tasks/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchTasks();
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = (task) => {
    setTitle(task.title);
    setEditingId(task._id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-8">
      <h2 className="text-3xl font-bold mb-6 text-purple-400">
        Your Tasks
      </h2>

      <form onSubmit={handleSubmit} className="flex gap-3 mb-6">
        <input
          type="text"
          placeholder="Write a task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="flex-1 p-3 rounded-lg bg-gray-800 border border-gray-600"
        />

        <button
          type="submit"
          className="bg-purple-600 px-6 rounded-lg hover:bg-purple-700 transition"
        >
          {editingId ? "Update" : "Add"}
        </button>
      </form>

      <div className="space-y-4">
        {tasks.map((task) => (
          <div
            key={task._id}
            className="bg-gray-800 p-4 rounded-xl flex justify-between items-center border border-gray-700"
          >
            <span>{task.title}</span>

            <div className="flex gap-3">
              <button
                onClick={() => handleEdit(task)}
                className="bg-yellow-500 px-3 py-1 rounded hover:bg-yellow-600"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(task._id)}
                className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
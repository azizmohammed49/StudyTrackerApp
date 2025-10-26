import { useState, useEffect } from "react";
import API from "../services/api.jsx";
import TaskForm from "./TaskForm.jsx";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const res = await API.get("/tasks");
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const deleteTask = async (id) => {
    await API.delete(`/tasks/${id}`);
    setTasks(tasks.filter((task) => task._id !== id));
  };

  return (
    <div className="p-8">
      <h1 className="text-xl mb-4">Your Study Tasks</h1>
      <TaskForm refresh={fetchTasks} />
      <ul>
        {tasks.map((t) => (
          <li key={t._id} className="border p-2 mt-2 flex justify-between">
            <span>
              {t.taskName} - {t.status}
            </span>
            <button onClick={() => deleteTask(t._id)} className="text-red-500">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;

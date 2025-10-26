import { useState } from "react";
import API from "../services/api.jsx";

const TaskForm = ({ refresh }) => {
  const [taskData, setTaskData] = useState({
    taskName: "",
    subject: "",
    estimatedTime: "",
    priority: "Medium",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post("/tasks", taskData);
    setTaskData({
      taskName: "",
      subject: "",
      estimatedTime: "",
      priority: "Medium",
    });
    refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        value={taskData.taskName}
        onChange={(e) => setTaskData({ ...taskData, taskName: e.target.value })}
        placeholder="Task Name"
        className="border p-2 mr-2"
      />
      <input
        value={taskData.subject}
        onChange={(e) => setTaskData({ ...taskData, subject: e.target.value })}
        placeholder="Subject"
        className="border p-2 mr-2"
      />
      <input
        value={taskData.estimatedTime}
        onChange={(e) =>
          setTaskData({ ...taskData, estimatedTime: e.target.value })
        }
        placeholder="Time (min)"
        className="border p-2 mr-2"
      />
      <button className="bg-green-600 text-white p-2 rounded">Add</button>
    </form>
  );
};

export default TaskForm;

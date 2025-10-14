import { Plus, Check, Trash, Calendar, ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/api";

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [dueDate, setDueDate] = useState("");

  const navigate = useNavigate();

  const fetchTasks = async () => {
    try {
      const res = await API.get("tasks/");
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Add Task
  const handleAddTask = async () => {
    if (!newTask.trim()) return;
    try {
      await API.post("tasks/", {
        title: newTask,
        due_date: dueDate || null,
      });
      setNewTask("");
      setDueDate("");
      fetchTasks();
    } catch (err) {
      console.error("Error adding task:", err.response?.data || err.message);
    }
  };

  const handleToggle = async (taskId, completed) => {
    try {
      await API.patch(`tasks/${taskId}/`, { completed: !completed });
      fetchTasks();
    } catch (err) {
      console.error("Error updating task:", err.response?.data || err.message);
    }
  };

  // Delete Task
  const handleDelete = async (taskId) => {
    try {
      await API.delete(`tasks/${taskId}/`);
      fetchTasks();
    } catch (err) {
      console.error("Error deleting task:", err.response?.data || err.message);
    }
  };

  return (
    <div className=" min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100 justify-center py-8 mb-4">

        <header className="flex justify-between items-center mr-3 mb-6">
        <h1 class="text-5xl ml-4 font-extrabold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
      StudyHub
    </h1>          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 rounded-lg bg-purple-500 px-3 py-2 text-sm font-medium text-white hover:bg-purple-600 transition"
          >
            <ArrowLeft size={16} /> Back
          </button>
        </header>


      <div className="flex justify-center">
        <div className="w-full  items-center max-w-5xl bg-white shadow-lg rounded-2xl p-6">
          <h2 className="text-xl font-bold text-gray-700 mb-4"> To-Do List</h2>
          <div className="flex flex-col md:flex-row gap-3 mb-6">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Add a new task..."
              className="flex-1 border rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="border rounded-lg px-3 py-2 text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <button
              onClick={handleAddTask}
              className="flex items-center gap-1 bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition"
            >
              <Plus size={18} /> Add
            </button>
          </div>
          <ul className="space-y-3">
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <li
                  key={task.id}
                  className="flex items-center justify-between bg-gray-50 px-4 py-3 rounded-lg hover:shadow-sm transition"
                >
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleToggle(task.id, task.completed)}
                      className={`h-6 w-6 flex items-center justify-center rounded-full border transition ${
                        task.completed
                          ? "bg-green-500 border-green-500 text-white"
                          : "border-gray-400 text-gray-400 hover:border-gray-500"
                      }`}
                    >
                      {task.completed && <Check size={16} />}
                    </button>
                    {/* Task Title + Due Date */}
                    <div>
                      <span
                        className={`block text-gray-800 ${
                          task.completed ? "line-through text-gray-500" : ""
                        }`}
                      >
                        {task.title}
                      </span>
                      {task.due_date && (
                        <span className="flex items-center gap-1 text-sm text-gray-500">
                          <Calendar size={14} /> {task.due_date}
                        </span>
                      )}
                    </div>
                  </div>
                  {/* Delete */}
                  <button
                    onClick={() => handleDelete(task.id)}
                    className="text-red-500 hover:text-red-700 transition"
                  >
                    <Trash size={18} />
                  </button>
                </li>
              ))
            ) : (
              <p className="text-gray-500 text-center">No tasks yet.</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TodoList;

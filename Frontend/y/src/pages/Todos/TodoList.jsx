import { Plus, Check, Trash, Calendar, ArrowLeft, CheckCircle2, Circle } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import API from "../../api/api";

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [filter, setFilter] = useState("all"); // all, active, completed
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await API.get("tasks/");
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Add Task
  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    try {
      await API.post("tasks/", {
        title: newTask,
        due_date: dueDate || null,
      });
      setNewTask("");
      setDueDate("");
      await fetchTasks();
    } catch (err) {
      console.error("Error adding task:", err.response?.data || err.message);
    }
  };

  const handleToggle = async (taskId, completed) => {
    try {
      await API.patch(`tasks/${taskId}/`, { completed: !completed });
      await fetchTasks();
    } catch (err) {
      console.error("Error updating task:", err.response?.data || err.message);
    }
  };

  // Delete Task
  const handleDelete = async (taskId) => {
    try {
      await API.delete(`tasks/${taskId}/`);
      await fetchTasks();
    } catch (err) {
      console.error("Error deleting task:", err.response?.data || err.message);
    }
  };

  // Filter tasks
  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  const completedCount = tasks.filter((t) => t.completed).length;
  const progress = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 pb-32 overflow-x-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-between items-center px-6 md:px-8 mb-16 max-w-6xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            StudyHub
          </h1>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 px-6 py-3 text-white hover:from-purple-600 hover:to-indigo-600 transition-all duration-300 shadow-lg font-semibold"
          >
            <ArrowLeft size={20} /> Back
          </motion.button>
        </motion.header>

        {/* Main Container */}
        <div className="flex justify-center px-6 md:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="w-full max-w-5xl"
          >
            {/* Title and Stats */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">My Tasks</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div 
                  whileHover={{ y: -4, boxShadow: "0 12px 24px rgba(0, 0, 0, 0.08)" }}
                  className="bg-white rounded-2xl px-8 py-6 shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300"
                >
                  <p className="text-gray-600 text-sm font-semibold uppercase tracking-wide mb-3">Total Tasks</p>
                  <p className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">{tasks.length}</p>
                </motion.div>
                <motion.div 
                  whileHover={{ y: -4, boxShadow: "0 12px 24px rgba(0, 0, 0, 0.08)" }}
                  className="bg-white rounded-2xl px-8 py-6 shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300"
                >
                  <p className="text-gray-600 text-sm font-semibold uppercase tracking-wide mb-3">Completed</p>
                  <p className="text-5xl font-bold text-green-600">{completedCount}</p>
                </motion.div>
                <motion.div 
                  whileHover={{ y: -4, boxShadow: "0 12px 24px rgba(0, 0, 0, 0.08)" }}
                  className="bg-white rounded-2xl px-8 py-6 shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300"
                >
                  <p className="text-gray-600 text-sm font-semibold uppercase tracking-wide mb-3">Progress</p>
                  <p className="text-5xl font-bold text-indigo-600">{progress}%</p>
                </motion.div>
              </div>
            </motion.div>

            {/* Add Task Form */}
            <motion.form 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              onSubmit={handleAddTask}
              className="bg-white rounded-3xl p-8 shadow-lg mb-10 border border-gray-100"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">✨ Add New Task</h3>
              <div className="flex flex-col md:flex-row gap-4">
                <input
                  type="text"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  placeholder="What do you need to do?"
                  className="flex-1 border border-gray-300 rounded-xl px-5 py-4 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition bg-white font-medium"
                />
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="border border-gray-300 rounded-xl px-5 py-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition bg-white font-medium"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-8 py-4 rounded-xl hover:from-purple-600 hover:to-indigo-600 transition-all duration-300 shadow-lg font-bold whitespace-nowrap hover:shadow-xl"
                >
                  <Plus size={22} /> Add
                </motion.button>
              </div>
            </motion.form>

            {/* Filter Tabs */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="flex gap-4 mb-10"
            >
              {["all", "active", "completed"].map((f) => (
                <motion.button
                  key={f}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setFilter(f)}
                  className={`px-7 py-3 rounded-xl font-bold transition-all duration-300 border-2 text-base ${
                    filter === f
                      ? "bg-gradient-to-r from-purple-500 to-indigo-500 text-white border-purple-500 shadow-lg"
                      : "bg-white text-gray-700 border-gray-200 hover:border-purple-300 hover:text-purple-600"
                  }`}
                >
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </motion.button>
              ))}
            </motion.div>

            {/* Tasks List */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden"
            >
              <ul className="divide-y divide-gray-200">
                {loading ? (
                  <li className="px-8 py-12 text-center text-gray-500">
                    <div className="animate-pulse">
                      <div className="h-6 bg-gray-200 rounded w-24 mx-auto mb-2"></div>
                      <p className="text-base font-medium">Loading your tasks...</p>
                    </div>
                  </li>
                ) : filteredTasks.length > 0 ? (
                  filteredTasks.map((task, idx) => (
                    <motion.li
                      key={task.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="flex items-center justify-between px-8 py-6 hover:bg-purple-50/40 transition duration-200 group border-0"
                    >
                      <div className="flex items-center gap-5 flex-1 min-w-0">
                        <motion.button
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleToggle(task.id, task.completed)}
                          className="flex-shrink-0 transition-all"
                        >
                          {task.completed ? (
                            <CheckCircle2 className="w-7 h-7 text-green-500 flex-shrink-0" />
                          ) : (
                            <Circle className="w-7 h-7 text-gray-400 group-hover:text-purple-400 flex-shrink-0" />
                          )}
                        </motion.button>
                        
                        <div className="flex-1 min-w-0">
                          <span
                            className={`block text-lg text-gray-900 font-semibold transition-all ${
                              task.completed ? "line-through text-gray-400" : ""
                            }`}
                          >
                            {task.title}
                          </span>
                          {task.due_date && (
                            <span className="flex items-center gap-2 text-base text-gray-500 mt-2">
                              <Calendar size={16} /> {new Date(task.due_date).toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <motion.button
                        whileHover={{ scale: 1.2, rotate: 10 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleDelete(task.id)}
                        className="text-red-400 hover:text-red-600 transition-all ml-6 flex-shrink-0 opacity-0 group-hover:opacity-100"
                      >
                        <Trash size={22} />
                      </motion.button>
                    </motion.li>
                  ))
                ) : (
                  <li className="px-8 py-16 text-center">
                    <p className="text-gray-500 font-semibold text-xl">
                      {filter === "completed" && "🎯 No completed tasks yet."}
                      {filter === "active" && "🎉 All tasks completed! Amazing work!"}
                      {filter === "all" && "📝 No tasks yet. Create one to get started!"}
                    </p>
                  </li>
                )}
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default TodoList;

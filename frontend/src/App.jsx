import { useEffect, useState } from "react";
import API from "./services/api";
import TaskItem from "./components/TaskItem";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await API.get("/tasks");
      setTasks(res.data || []);
    } catch (err) {
      console.log(err);
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async () => {
    if (!title.trim()) return alert("Enter task");

    try {
      await API.post("/tasks", { title });
      setTitle("");
      fetchTasks();
    } catch {
      alert("Error adding task");
    }
  };

  const toggleTask = async (id) => {
    try {
      await API.patch(`/tasks/${id}`);
      fetchTasks();
    } catch {
      alert("Error updating task");
    }
  };

  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      fetchTasks();
    } catch {
      alert("Error deleting task");
    }
  };

  const editTask = async (id, newTitle) => {
    try {
      await API.patch(`/tasks/${id}`, { title: newTitle });
      fetchTasks();
    } catch (err) {
      console.log(err);
      alert("Error editing task");
    }
  };

  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  }

  return (
    <div className="container">
      <h1>Task Manager</h1>

      <div className="input-row">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task"
        />
        <button onClick={addTask}>Add</button>
      </div>

      {!tasks || tasks.length === 0 ? (
        <p>No tasks found</p>
      ) : (
        <div>
          {tasks.map((task) => (
            <TaskItem
              key={task._id}
              task={task}
              toggleTask={toggleTask}
              deleteTask={deleteTask}
              editTask={editTask}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
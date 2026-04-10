
// import { useEffect, useState } from "react";
// import API from "./services/api";
// import TaskForm from "./components/TaskForm";
// import TaskList from "./components/TaskList";
// import "./App.css";

// function App() {
//   const [tasks, setTasks] = useState([]);
//   const [error, setError] = useState("");

//   const fetchTasks = async () => {
//     try {
//       const res = await API.get("/");
//       setTasks(res.data);
//     } catch {
//       setError("Failed to load tasks");
//     }
//   };

//   useEffect(() => {
//     fetchTasks();
//   }, []);

//   const addTask = async (title) => {
//     try {
//       const res = await API.post("/", { title });
//       setTasks(prev => [res.data, ...prev]);
//     } catch {
//       setError("Error adding task");
//     }
//   };

//   const toggleTask = async (id) => {
//     try {
//       const res = await API.patch(`/${id}`);
//       setTasks(prev =>
//         prev.map(t => (t._id === id ? res.data : t))
//       );
//     } catch {
//       setError("Error updating task");
//     }
//   };

//   const deleteTask = async (id) => {
//     try {
//       await API.delete(`/${id}`);
//       setTasks(prev =>
//         prev.filter(t => t._id !== id)
//       );
//     } catch {
//       setError("Error deleting task");
//     }
//   };

//   const editTask = async (id, title) => {
//     try {
//       const res = await API.patch(`/${id}`, { title });
//       setTasks(prev =>
//         prev.map(t => (t._id === id ? res.data : t))
//       );
//     } catch {
//       setError("Error updating task");
//     }
//   };

//   return (
//     <div className="container">
//       <h1>Task Manager</h1>

//       <TaskForm addTask={addTask} />

//       {error && <p className="error">{error}</p>}

//       <TaskList
//         tasks={tasks}
//         toggleTask={toggleTask}
//         deleteTask={deleteTask}
//         editTask={editTask}
//       />
//     </div>
//   );
// }

// export default App;



import { useEffect, useState } from "react";
import API from "./services/api";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      alert("Error fetching tasks");
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
    await API.patch(`/tasks/${id}`);
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await API.delete(`/tasks/${id}`);
    fetchTasks();
  };

  return (
    <div style={{ maxWidth: "500px", margin: "auto", padding: "20px" }}>
      <h1>Task Manager</h1>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter task"
      />
      <button onClick={addTask}>Add</button>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task._id}>
              <span
                onClick={() => toggleTask(task._id)}
                style={{
                  cursor: "pointer",
                  textDecoration: task.completed ? "line-through" : "none"
                }}
              >
                {task.title}
              </span>

              <button onClick={() => deleteTask(task._id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
// import { useEffect, useState } from "react";
// import API from "./services/api";
// import TaskForm from "./components/TaskForm";
// import TaskList from "./components/TaskList";
// import "./App.css";

// function App() {
//   const [tasks, setTasks] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const fetchTasks = async () => {
//     try {
//       setLoading(true);
//       const res = await API.get("/");
//       setTasks(res.data);
//     } catch (err) {
//       setError("Failed to load tasks");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchTasks();
//   }, []);

//   const addTask = async (title) => {
//     try {
//       const res = await API.post("/", { title });
//       setTasks([res.data, ...tasks]);
//     } catch {
//       setError("Error adding task");
//     }
//   };

//   const toggleTask = async (id) => {
//     try {
//       const res = await API.patch(`/${id}`);
//       setTasks(tasks.map(t => t._id === id ? res.data : t));
//     } catch {
//       setError("Error updating task");
//     }
//   };

//   const deleteTask = async (id) => {
//     try {
//       await API.delete(`/${id}`);
//       setTasks(tasks.filter(t => t._id !== id));
//     } catch {
//       setError("Error deleting task");
//     }
//   };

//   return (
//     <div className="container">
//       <h1>Task Manager</h1>

//       <TaskForm addTask={addTask} />

//       {loading && <p>Loading...</p>}
//       {error && <p className="error">{error}</p>}

//       <TaskList 
//         tasks={tasks} 
//         toggleTask={toggleTask} 
//         deleteTask={deleteTask} 
//       />
//     </div>
//   );
// }

// export default App;

import { useEffect, useState } from "react";
import API from "./services/api";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");

  const fetchTasks = async () => {
    try {
      const res = await API.get("/");
      setTasks(res.data);
    } catch {
      setError("Failed to load tasks");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async (title) => {
    try {
      const res = await API.post("/", { title });
      setTasks(prev => [res.data, ...prev]);
    } catch {
      setError("Error adding task");
    }
  };

  const toggleTask = async (id) => {
    try {
      const res = await API.patch(`/${id}`);
      setTasks(prev =>
        prev.map(t => (t._id === id ? res.data : t))
      );
    } catch {
      setError("Error updating task");
    }
  };

  const deleteTask = async (id) => {
    try {
      await API.delete(`/${id}`);
      setTasks(prev =>
        prev.filter(t => t._id !== id)
      );
    } catch {
      setError("Error deleting task");
    }
  };

  const editTask = async (id, title) => {
    try {
      const res = await API.patch(`/${id}`, { title });
      setTasks(prev =>
        prev.map(t => (t._id === id ? res.data : t))
      );
    } catch {
      setError("Error updating task");
    }
  };

  return (
    <div className="container">
      <h1>Task Manager</h1>

      <TaskForm addTask={addTask} />

      {error && <p className="error">{error}</p>}

      <TaskList
        tasks={tasks}
        toggleTask={toggleTask}
        deleteTask={deleteTask}
        editTask={editTask}
      />
    </div>
  );
}

export default App;
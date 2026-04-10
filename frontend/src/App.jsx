


// import { useEffect, useState } from "react";
// import API from "./services/api";

// function App() {
//      return <h1>Working Perfect</h1>;
//   const [tasks, setTasks] = useState([]);
//   const [title, setTitle] = useState("");
//   const [loading, setLoading] = useState(false);

//   const fetchTasks = async () => {
//     try {
//       setLoading(true);
//       const res = await API.get("/tasks");
//       setTasks(res.data || []); // safe
//     } catch (err) {
//       console.log(err);
//       setTasks([]); // fallback
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchTasks();
//   }, []);

//   const addTask = async () => {
//     if (!title.trim()) return alert("Enter task");

//     try {
//       await API.post("/tasks", { title });
//       setTitle("");
//       fetchTasks();
//     } catch {
//       alert("Error adding task");
//     }
//   };

//   const toggleTask = async (id) => {
//     try {
//       await API.patch(`/tasks/${id}`);
//       fetchTasks();
//     } catch {
//       alert("Error updating task");
//     }
//   };

//   const deleteTask = async (id) => {
//     try {
//       await API.delete(`/tasks/${id}`);
//       fetchTasks();
//     } catch {
//       alert("Error deleting task");
//     }
//   };

//   //  loading UI (IMPORTANT)
//   if (loading) {
//     return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
//   }

//   return (
     
//     <div style={{ maxWidth: "500px", margin: "auto", padding: "20px" }}>
//       <h1>Task Manager</h1>

//       <input
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         placeholder="Enter task"
//       />
//       <button onClick={addTask}>Add</button>

//       {/*  empty state */}
//       {tasks.length === 0 ? (
//         <p>No tasks found</p>
//       ) : (
//         <ul>
//           {tasks.map((task) => (
//             <li key={task._id}>
//               <span
//                 onClick={() => toggleTask(task._id)}
//                 style={{
//                   cursor: "pointer",
//                   textDecoration: task.completed ? "line-through" : "none"
//                 }}
//               >
//                 {task.title}
//               </span>

//               <button onClick={() => deleteTask(task._id)}>
//                 Delete
//               </button>
//             </li>
//           ))}
//         </ul>
//       )}
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

  // ✅ loading UI
  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  }

  return (
    <div style={{ maxWidth: "500px", margin: "auto", padding: "20px" }}>
      <h1>Task Manager</h1>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter task"
      />
      <button onClick={addTask}>Add</button>

      {tasks.length === 0 ? (
        <p>No tasks found</p>
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
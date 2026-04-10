

import { FaTrash, FaEdit } from "react-icons/fa";
import { useState } from "react";

const TaskItem = ({ task, toggleTask, deleteTask, editTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);

  const handleEdit = (e) => {
    e.stopPropagation(); //  IMPORTANT

    if (!newTitle.trim()) {
      setIsEditing(false);
      return;
    }

    editTask(task._id, newTitle.trim());
    setIsEditing(false);
  };

  return (
    <div className="task">
      {isEditing ? (
        <>
          <input
            value={newTitle}
            onClick={(e) => e.stopPropagation()} // 
            onChange={(e) => setNewTitle(e.target.value)}
          />

          <button onClick={handleEdit}>Save</button>
        </>
      ) : (
        <>
          <span
            onClick={() => toggleTask(task._id)} //  
            style={{
              textDecoration: task.completed ? "line-through" : "none",
              cursor: "pointer"
            }}
          >
            {task.title}
          </span>

          <div>
            <button
              onClick={(e) => {
                e.stopPropagation(); 
                setIsEditing(true);
              }}
            >
              <FaEdit />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation(); 
                deleteTask(task._id);
              }}
            >
              <FaTrash />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TaskItem;
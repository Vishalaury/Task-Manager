// import TaskItem from "./TaskItem";

// const TaskList = ({ tasks, toggleTask, deleteTask }) => {
//   if (tasks.length === 0) return <p>No tasks found</p>;

//   return (
//     <div>
//       {tasks.map(task => (
//         <TaskItem 
//           key={task._id}
//           task={task}
//           toggleTask={toggleTask}
//           deleteTask={deleteTask}
//         />
//       ))}
//     </div>
//   );
// };

// export default TaskList;

import TaskItem from "./TaskItem";

const TaskList = ({ tasks, toggleTask, deleteTask, editTask }) => {
  if (tasks.length === 0) return <p>No tasks found</p>;

  return (
    <div>
      {tasks.map(task => (
        <TaskItem
          key={task._id}
          task={task}
          toggleTask={toggleTask}
          deleteTask={deleteTask}
          editTask={editTask}
        />
      ))}
    </div>
  );
};

export default TaskList;
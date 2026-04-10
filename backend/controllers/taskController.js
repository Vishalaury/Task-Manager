// const Task = require("../models/Task");

// exports.getTasks = async (req, res) => {
//   try {
//     const tasks = await Task.find().sort({ createdAt: -1 });
//     res.json(tasks);
//   } catch (err) {
//     res.status(500).json({ error: "Server error" });
//   }
// };

// exports.createTask = async (req, res) => {
//   try {
//     const { title } = req.body;

//     if (!title) {
//       return res.status(400).json({ error: "Title is required" });
//     }

//     const task = await Task.create({ title });
//     res.status(201).json(task);
//   } catch (err) {
//     res.status(500).json({ error: "Server error" });
//   }
// };

// exports.updateTask = async (req, res) => {
//   try {
//     const task = await Task.findById(req.params.id);

//     if (!task) {
//       return res.status(404).json({ error: "Task not found" });
//     }

//     task.completed = !task.completed;
//     await task.save();

//     res.json(task);
//   } catch (err) {
//     res.status(500).json({ error: "Server error" });
//   }
// };

// exports.deleteTask = async (req, res) => {
//   try {
//     const task = await Task.findById(req.params.id);

//     if (!task) {
//       return res.status(404).json({ error: "Task not found" });
//     }

//     await task.deleteOne();

//     res.json({ message: "Task deleted" });
//   } catch (err) {
//     res.status(500).json({ error: "Server error" });
//   }
// };


// const Task = require("../models/Task");

// exports.getTasks = async (req, res) => {
//   try {
//     const tasks = await Task.find().sort({ createdAt: -1 });
//     res.json(tasks);
//   } catch (err) {
//     res.status(500).json({ error: "Server error" });
//   }
// };

// exports.createTask = async (req, res) => {
//   try {
//     const { title } = req.body;

//     if (!title) {
//       return res.status(400).json({ error: "Title is required" });
//     }

//     const task = await Task.create({ title });
//     res.status(201).json(task);
//   } catch (err) {
//     res.status(500).json({ error: "Server error" });
//   }
// };

// exports.updateTask = async (req, res) => {
//   try {
//     const task = await Task.findById(req.params.id);

//     if (!task) {
//       return res.status(404).json({ error: "Task not found" });
//     }

//     task.completed = !task.completed;
//     await task.save();

//     res.json(task);
//   } catch (err) {
//     res.status(500).json({ error: "Server error" });
//   }
// };

// exports.deleteTask = async (req, res) => {
//   try {
//     const task = await Task.findById(req.params.id);

//     if (!task) {
//       return res.status(404).json({ error: "Task not found" });
//     }

//     await task.deleteOne();

//     res.json({ message: "Task deleted" });
//   } catch (err) {
//     res.status(500).json({ error: "Server error" });
//   }
// };


const Task = require("../models/Task");

// ✅ GET ALL TASKS
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// ✅ CREATE TASK
exports.createTask = async (req, res) => {
  try {
    const { title } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ error: "Title is required" });
    }

    const task = await Task.create({ title: title.trim() });
    res.status(201).json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// ✅ UPDATE (EDIT + TOGGLE)
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    const title = req.body?.title;

    // ✅ EDIT (only if valid title comes)
    if (typeof title === "string") {
      const trimmed = title.trim();

      if (trimmed.length === 0) {
        return res.status(400).json({ error: "Invalid title" });
      }

      task.title = trimmed;
    } 
    // ✅ TOGGLE (no title)
    else {
      task.completed = !task.completed;
    }

    await task.save();
    res.json(task);

  } catch (err) {
    console.error("🔥 FINAL ERROR:", err);
    res.status(500).json({ error: "Server error" });
  }
};
// ✅ DELETE TASK
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    await task.deleteOne();
    res.json({ message: "Task deleted" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
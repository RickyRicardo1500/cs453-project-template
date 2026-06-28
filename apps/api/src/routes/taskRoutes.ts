import express from "express";
import {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} from "../services/taskServices";

const router = express.Router();

function isValidTask(body: any) {
  return (
    body &&
    typeof body.title === "string" &&
    body.title.trim() !== "" &&
    typeof body.status === "number"
  );
}

router.get("/", async (_req, res) => {
  try {
    const tasks = await getAllTasks();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

router.post("/", async (req, res) => {
  try {
    if (!isValidTask(req.body)) {
      return res
        .status(400)
        .json({ error: "Missing required fields or contains invalid data" });
    }

    const task = await createTask(req.body.title, req.body.status);
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: "Failed to create task" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const task = await getTaskById(Number(req.params.id));

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch task" });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    if (!isValidTask(req.body)) {
      return res
        .status(400)
        .json({ error: "Missing required fields or contains invalid data" });
    }

    const task = await updateTask(
      Number(req.params.id),
      req.body.title,
      req.body.status
    );

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ error: "Failed to update task" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deleted = await deleteTask(Number(req.params.id));

    if (!deleted) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete task" });
  }
});

export default router;
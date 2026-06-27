import express from "express";
import { env } from "./config/env";
import { pool } from "./db/pool";

function isValidItem(body) { 
    return (
      body &&
      typeof body.title === "string" &&
      body.title.trim() !== "" &&
      typeof body.status === "number" &&
      body.status >= 0
    );
}

const app = express();

app.use(express.json());

app.get("/health", (_req, res) => {
	res.json({
		status: "ok",
		service: "cs453-api",
	});
});

app.get("/db-health", async (_req, res) => {
	try {
		const result = await pool.query("SELECT NOW() AS current_time");
		res.json({
			status: "ok",
			database: "connected",
			currentTime: result.rows[0].current_time,
		});
	} catch (error) {
		console.error("Database health check failed:", error);
		res.status(500).json({
			status: "error",
			database: "disconnected",
		});
	}
});

app.get("/tasks", async (_req, res) => {
	try {
		const result = await pool.query(
			`SELECT id,
                    title,
                    description,
                    status,
                    created_at AS "createdAt",
                    updated_at AS "updatedAt"
             FROM tasks
             ORDER BY id `,
		);

		res.json(result.rows);
	} catch (error) {
		console.error("Failed to fetch tasks:", error);
		res.status(500).json({
			status: "error",
			message: "Failed to fetch tasks",
		});
	}
});

app.post("/tasks", async (_req, res) => {
	if (!isValidItem(req.body)) {
      return res.status(400).json({ error: "Missing required fields or contains invalid data" });
    }

    const newItem = {
      id: nextId++,
      title: _req.body.title,
      status: _req.body.status
    };

    items.push(newItem);
    res.status(201).json(newItem);

});

app.get("/tasks/:id", async (_req, res) => {
	try {
		const result = await pool.query(
			`SELECT id,
                    title,
                    description,
                    status,
                    created_at AS "createdAt",
                    updated_at AS "updatedAt"
             FROM tasks
             ORDER BY id `,
		);

		res.json(result.rows);
	} catch (error) {
		console.error("Failed to fetch tasks:", error);
		res.status(500).json({
			status: "error",
			message: "Failed to fetch tasks",
		});
	}
});

app.patch("/tasks/:id", async (_req, res) => {
	try {
		const result = await pool.query(
			`SELECT id,
                    title,
                    description,
                    status,
                    created_at AS "createdAt",
                    updated_at AS "updatedAt"
             FROM tasks
             ORDER BY id `,
		);

		res.json(result.rows);
	} catch (error) {
		console.error("Failed to fetch tasks:", error);
		res.status(500).json({
			status: "error",
			message: "Failed to fetch tasks",
		});
	}
});

app.delete("/tasks/:id", async (_req, res) => {
	try {
		const result = await pool.query(
			`SELECT id,
                    title,
                    description,
                    status,
                    created_at AS "createdAt",
                    updated_at AS "updatedAt"
             FROM tasks
             ORDER BY id `,
		);

		res.json(result.rows);
	} catch (error) {
		console.error("Failed to fetch tasks:", error);
		res.status(500).json({
			status: "error",
			message: "Failed to fetch tasks",
		});
	}
});

app.listen(env.port, () => {
	console.log(`Server running at http://localhost:${env.port}`);
});

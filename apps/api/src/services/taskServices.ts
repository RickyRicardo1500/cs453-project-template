import { pool } from "../db/pool";

export async function getAllTasks() {
  const result = await pool.query(`
    SELECT id, title, description, status,
           created_at AS "createdAt",
           updated_at AS "updatedAt"
    FROM tasks
    ORDER BY id
  `);

  return result.rows;
}

export async function getTaskById(id: number) {
  const result = await pool.query(
    `
    SELECT id, title, description, status,
           created_at AS "createdAt",
           updated_at AS "updatedAt"
    FROM tasks
    WHERE id = $1
  `,
    [id]
  );

  return result.rows[0];
}

export async function createTask(title: string, status: number) {
  const result = await pool.query(
    `
    INSERT INTO tasks (title, status)
    VALUES ($1, $2)
    RETURNING id, title, status
  `,
    [title, status]
  );

  return result.rows[0];
}

export async function updateTask(id: number, title: string, status: number) {
  const result = await pool.query(
    `
    UPDATE tasks
    SET title = $1,
        status = $2,
        updated_at = NOW()
    WHERE id = $3
    RETURNING id, title, status
  `,
    [title, status, id]
  );

  return result.rows[0];
}

export async function deleteTask(id: number) {
  const result = await pool.query(
    `DELETE FROM tasks WHERE id = $1 RETURNING id`,
    [id]
  );

  return result.rows[0];
}
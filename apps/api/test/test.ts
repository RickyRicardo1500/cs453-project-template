import request from "supertest";
import app from "../src/server";

let createdTaskId;

describe("Task API Tests", () => {
  test("GET /tasks returns a list", async () => {
    const res = await request(app).get("/tasks");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("POST /tasks creates a task", async () => {
    const res = await request(app)
      .post("/tasks")
      .send({
        title: "Finish checkpoint",
        status: 0
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe("Finish checkpoint");
    createdTaskId = res.body.id;
  });

  test("POST /tasks without title returns 400", async () => {
    const res = await request(app)
      .post("/tasks")
      .send({
        status: 0
      });

    expect(res.statusCode).toBe(400);
  });

  test("GET /tasks/:id returns one task", async () => {
    const res = await request(app).get(`/tasks/${createdTaskId}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(createdTaskId);
  });

  test("GET missing task returns 404", async () => {
    const res = await request(app).get("/tasks/999999");

    expect(res.statusCode).toBe(404);
  });

  test("PATCH /tasks/:id updates task", async () => {
    const res = await request(app)
      .patch(`/tasks/${createdTaskId}`)
      .send({
        title: "Updated task",
        status: 1
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe("Updated task");
    expect(res.body.status).toBe(1);
  });

  test("DELETE /tasks/:id deletes task", async () => {
    const res = await request(app).delete(`/tasks/${createdTaskId}`);

    expect(res.statusCode).toBe(204);
  });

  test("Deleted task returns 404", async () => {
    const res = await request(app).get(`/tasks/${createdTaskId}`);

    expect(res.statusCode).toBe(404);
  });
});
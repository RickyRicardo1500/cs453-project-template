Core API Structure

Source Directory structure

src/
├── openapi.yaml
├── server.ts
├── routes/
│   └── taskRoutes.ts
├── services/
│   └── taskService.ts
└── db/
    └── pool.ts


Run Automated Testing

```bash
npm install -D jest ts-jest @types/jest supertest @types/supertest
npx ts-jest config:init
npm test
```


Testing using curl

Start the server with
```bash
npm run dev
```

Open up another terminal and run the commands below to test


health
--------------
```bash
curl -X GET http://localhost:3000/health
```
Result
{"status":"ok","service":"cs453-api"}

db-health
--------------
```bash
curl -X GET http://localhost:3000/db-health
```
Result
{"status":"ok","database":"connected","currentTime":"2026-06-28T18:28:16.367Z"}


post task
--------------
```bash
curl -X POST http://localhost:3000/tasks -H "Content-Type: application/json" -d '{"title":"monitor", "status":0}'
```
Result
{"id":1,"title":"monitor","status":0}


get tasks
--------------
```bash
curl -X GET http://localhost:3000/tasks
```
Result
[{"id":1,"title":"monitor","description":null,"status":0,"createdAt":"2026-06-28T23:25:17.712Z","updatedAt":"2026-06-28T23:25:17.712Z"},{"id":2,"title":"monitor","description":null,"status":0,"createdAt":"2026-06-28T23:28:51.292Z","updatedAt":"2026-06-28T23:28:51.292Z"}]


get tasks by id
--------------
```bash
curl -X GET http://localhost:3000/tasks/1
```
Result
{"id":1,"title":"monitor","description":null,"status":0,"createdAt":"2026-06-28T23:25:17.712Z","updatedAt":"2026-06-28T23:25:17.712Z"}


patch task by id
--------------

```bash
curl -X PATCH http://localhost:3000/tasks/1 -H "Content-Type: application/json" -d '{"title":"updated", "status":5}'
```
Result
{"id":1,"title":"updated","status":5}


delete task by id
--------------
```bash
curl -X DELETE http://localhost:3000/tasks/1
```
Result checked with ```curl -X GET http://localhost:3000/tasks```
[{"id":2,"title":"monitor","description":null,"status":0,"createdAt":"2026-06-28T23:28:51.292Z","updatedAt":"2026-06-28T23:28:51.292Z"}]
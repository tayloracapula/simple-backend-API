## assignment

# To install dependencies:

```bash
bun install
```

To run:

```bash
bun run src/index.ts
```
# API concepts and examples of requests and responses.
I am going to be using the Hono framework it has many modern features such as async await and other cool stuff
https://hono.dev/docs/api/hono

for data storage Sqlite will be used, why? cus its awesome it is light, fast and really good
```bash
bun add sqlite3
```
https://dextrop.medium.com/how-to-build-a-fast-and-lightweight-api-with-node-js-and-sqlite-676cbbec1b6a <-- article on sqlite and typescript

Login is necessary to see API endpoints
JSON web tokes will be used for authentication these will have the JWT as 
https://medium.com/@maison.moa/using-jwt-json-web-tokens-to-authorize-users-and-protect-api-routes-3e04a1453c3e  <-- JWT tut i referenced
https://github.com/panva/jose <-- repo for the JWT module  
```bash
bun add jose
```
only the login will be accessible all other routes are protected until the JWT is aquired



API sample data.
Sample request: POST /api/leave-requests
```JSON
{
    "employee_id": 123, 
    "start_date": "2025-02-01", 
    "end_date": "2025-02-05" 
}
```
Sample response:
```JSON
{
  "message": "Leave request has been submitted for review",
  "data": {
    "id": 456,
    "employee_id": 123,
    "start_date": "2025-02-01",
    "end_date": "2025-02-05",
    "status": "Pending"
  }
}
```

This project was created using `bun init` in bun v1.2.1. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.

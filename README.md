# Prerequisites
This project is built on the bun javascript/typecript runtime. 

it needs you to have bun installed as it uses some of Bun's native API's to improve performances
https://bun.sh/ <- follow the install procedure here.


# To install dependencies:

```bash
bun install
```

To run:

```bash
bun run start
```
(if you want debug logging)

```bash
bun run debug
```

this project requires a .env file to store it's port and some other secret variables. change the .env.example to a .env and input the port that you want.

# API concepts and examples of requests and responses.
I am going to be using the Hono framework it has many modern features such as async await and other cool stuff
https://hono.dev/docs/api/hono

for data storage Sqlite will be used, why? cus its awesome it is light, fast and really good and its already built in to bun.

the database design can be viewed here https://bit.ly/3XzLByj

Login is necessary to see API endpoints
JSON web tokes will be used for authentication these will have the JWT as 
https://medium.com/@maison.moa/using-jwt-json-web-tokens-to-authorize-users-and-protect-api-routes-3e04a1453c3e  <-- JWT tut i referenced
https://github.com/panva/jose <-- repo for the JWT module  

only the login will be accessible all other routes are protected until the JWT is aquired



API sample data.
Sample request: POST /api/user/new-leave-request
```JSON
{
  "user_id": 123, 
  "start_date": "2025-02-01", 
  "end_date": "2025-02-05",
  "booking_type": "Annual_Leave" 
}
```
Sample response:
```JSON
{
  "success": true,
  "message": "Leave request has been submitted for review",
  "data": {
    "id": 456,
    "user_id": 123,
    "start_date": "2025-02-01",
    "end_date": "2025-02-05",
    "status": "Pending"
  }
}
```

Sample Admin request: POST /api/admin/new-user
```JSON
{
  "first_name":"Bob",
  "last_name": "Smith",
  "email": "bobsmith@company.example.com",
  "password": "V3ry$ecur3PW",
  "role": "User",
  "department": "Energy",
  "managerID": 254 //Optional Field: if omitted and role is "Manager" then the user will be marked to manage themselves otherwise it will return an error
}

```
Sample response
```JSON
{
  "success": true,
  "message": "User Created Successfully",
  "data":{
    "user_id": 257,
    "role": "user",
    "managerID": 254
  }
}
```
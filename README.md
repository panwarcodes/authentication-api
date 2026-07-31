# Authentication API

A simple authentication API built with Express.js to understand backend authentication fundamentals.

This project implements user registration, login using JWT, and route protection through authentication middleware. User data is currently stored in a local JSON file and is intended to be replaced with a real database in future versions.

## Features

* User registration
* Password hashing using bcrypt
* User login
* JWT generation
* Protected routes
* Authentication middleware
* Environment variable support with dotenv
* Modular Express project structure

## Tech Stack

* Node.js
* Express.js
* bcrypt
* JSON Web Token (JWT)
* cookie-parser
* dotenv

## Project Structure

```text
.
├── app.js
├── package.json
├── controllers/
│   ├── loginController.js
│   ├── profileController.js
│   └── registerController.js
├── middleware/
│   └── auth.js
├── routes/
│   ├── login.js
│   ├── profile.js
│   └── register.js
├── data/
│   └── db.json
└── roughSketch.txt
```

## Version History

* v1.0.0 — Initial authentication API with JSON file storage, bcrypt password hashing, and JWT-based authentication.
* v1.1.0 (planned) — Replace JSON storage with PostgreSQL/MongoDB, add httpOnly cookies, and improve security and validation.

## Installation

Clone the repository.

```bash
git clone https://github.com/panwarcodes/authentication-api.git
cd Authentication-API
```

Install dependencies.

```bash
npm install
```

Create a `.env` file.

```env
JWT_SECRET=your_super_secret_key
```

Rename `.env.example` to `.env` and update it with your own environment variables if the file is provided in the repository.

Start the server.

```bash
node app.js
```

The server runs on:

```text
http://localhost:3000
```

## API Endpoints

### Register

**POST**

```text
/register
```

Request body

```json
{
  "username": "john",
  "password": "password123"
}
```

Response

```text
User registered, now you can login at '/login'
```

---

### Login

**POST**

```text
/login
```

Request body

```json
{
  "username": "john",
  "password": "password123"
}
```

Successful response

```text
Access Token: <JWT_TOKEN>
```

---

### Profile

**POST**

```text
/profile
```

Headers

```http
Authorization: Bearer <JWT_TOKEN>
```

Successful response

```json
{
  "sub": "1",
  "role": "john",
  "iat": 123456789,
  "exp": 123456999
}
```

If the token is missing

```http
401 Unauthorized
```

If the token is invalid or expired

```http
403 Forbidden
```

## Authentication Flow

```text
Register
    ↓
Hash password using bcrypt
    ↓
Store hashed password

Login
    ↓
Verify password
    ↓
Generate JWT
    ↓
Return JWT

Protected Route
    ↓
Client sends JWT in Authorization header
    ↓
Middleware verifies JWT
    ↓
Controller returns protected data
```

## Current Limitations

* User data is stored in a local JSON file.
* Duplicate usernames are not prevented.
* IDs are generated using array length.
* Synchronous filesystem operations are used.
* JWT is returned in the response body instead of an httpOnly cookie.
* No refresh token implementation.
* Minimal input validation.
* No automated tests.

## Planned Improvements

* Migrate to PostgreSQL or MongoDB
* Store JWT in httpOnly cookies
* Refresh token support
* Input validation
* Async filesystem or database operations
* Better error handling
* Request logging
* TypeScript migration
* Docker support
* Rate limiting
* Unit and integration testing

## Purpose

This project was built to understand the core concepts behind authentication in Express rather than relying on boilerplate or external templates.

The long-term goal is to evolve this repository into a reusable backend starter template that can be cloned as the foundation for future Express applications.

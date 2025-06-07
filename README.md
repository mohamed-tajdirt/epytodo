
# EPYTODO API

EPYTODO is a RESTful API built with Node.js and Express that allows users to manage tasks ("todos"). The API includes features like user authentication, todo management, and full Swagger documentation for easy testing and integration.

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/mohamed-tajdirt/epytodo.git
cd epytodo
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure your environment

Create a `.env` file in the root directory and fill it with the following content:

```env
PORT=3000                         # Port your server will run on
MYSQL_DATABASE=your_database     # Your MySQL database name
MYSQL_HOST=localhost             # Your MySQL host (usually localhost)
MYSQL_USER=your_user             # Your MySQL username
MYSQL_ROOT_PASSWORD=your_pass    # Your MySQL root password
SECRET=your_jwt_secret_key       # Secret key used to sign JWT tokens
```

### 4. Set up the MySQL database

Create the necessary tables by running the SQL file.

#### 👉 If you're on **Linux/macOS**:
```bash
mysql -u root -p < epytodo.sql
```

#### 👉 If you're on **If you're on Windows (in Command Prompt or PowerShell)**:
```bash
type epytodo.sql | mysql -u root -p
```
Make sure you are in the same directory as the epytodo.sql file when running these commands.


## 🧪 Run the server

```bash
npm start
```

The server will start on `http://localhost:3000`

## 📘 API Documentation

Swagger UI is available at:

```
http://localhost:3000/api-docs
```

Use it to explore and test endpoints easily. For protected routes, click "Authorize" and paste your JWT token as:

```
Bearer <your_token>
```

## 🔐 Authentication

- Register and login to get a token
- Use the token in the `Authorization` header for protected routes:

```
Authorization: Bearer <your_token>
```

## 📁 Project Structure

```
src/
├── config/           # Database config
├── middleware/       # Authentication and validation middlewares
├── routes/           # Route handlers (auth, user, todos)
├── utils/            # Utility functions
└── index.js          # App entry point
```

# Task Management System (Kanban Board)

A full-stack Task Management application with user authentication and Kanban-style task board built using the MERN stack (MongoDB, Express.js, React, Node.js).

## Features

- **User Authentication**: Sign up, login, logout functionality
- **Profile Management**: View, update, and delete user profile
- **Task Management**: Full CRUD operations for tasks
- **Kanban Board**: Three-column layout (Pending, In Progress, Completed)
- **Drag & Drop**: Move tasks between columns with automatic status updates
- **Mobile Responsive**: Works on all device sizes
- **Input Validation**: Both client and server-side validation
- **Error Handling**: Meaningful error messages and HTTP status codes

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB (Atlas)
- Mongoose ODM
- JWT Authentication
- bcryptjs for password hashing
- express-validator

### Frontend
- React 18
- Vite
- React Router DOM
- @hello-pangea/dnd (Drag and Drop)
- Axios
- CSS (Vanilla)

## Project Structure

```
├── backend/
│   ├── config/
│   │   └── db.js               # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js   # Auth logic
│   │   └── taskController.js   # Task CRUD logic
│   ├── middleware/
│   │   ├── authMiddleware.js   # JWT verification
│   │   └── errorMiddleware.js  # Error handling
│   ├── models/
│   │   ├── User.js             # User schema
│   │   └── Task.js             # Task schema
│   ├── routes/
│   │   ├── authRoutes.js       # Auth endpoints
│   │   └── taskRoutes.js       # Task endpoints
│   ├── utils/
│   │   └── validators.js       # Input validation
│   ├── server.js               # Entry point
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── KanbanBoard.jsx
│   │   │   ├── TaskCard.jsx
│   │   │   ├── TaskColumn.jsx
│   │   │   ├── TaskModal.jsx
│   │   │   └── Navbar.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Profile.jsx
│   │   │   └── Signup.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   └── .env.example
├── README.md
└── .gitignore
```

## Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- npm
- MongoDB Atlas account (or local MongoDB)

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file by copying `.env.example`:
   ```bash
   cp .env.example .env
   ```

4. Update the `.env` file with your MongoDB URI and JWT secret:
   ```env
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster.xxxxx.mongodb.net/taskmanager
   JWT_SECRET=your_super_secret_jwt_key_here
   PORT=5000
   NODE_ENV=development
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file by copying `.env.example`:
   ```bash
   cp .env.example .env
   ```

4. Update the `.env` file (default values should work for local development):
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

The frontend will run on `http://localhost:5173`

## API Documentation

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/signup` | Register new user | No |
| POST | `/api/auth/login` | Login user | No |
| POST | `/api/auth/logout` | Logout user | Yes |
| GET | `/api/auth/profile` | Get user profile | Yes |
| PUT | `/api/auth/profile` | Update profile | Yes |
| DELETE | `/api/auth/profile` | Delete account | Yes |

### Task Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/tasks` | Get all tasks | Yes |
| GET | `/api/tasks?status=pending` | Filter by status | Yes |
| POST | `/api/tasks` | Create task | Yes |
| GET | `/api/tasks/:id` | Get single task | Yes |
| PUT | `/api/tasks/:id` | Update task | Yes |
| DELETE | `/api/tasks/:id` | Delete task | Yes |

### Request/Response Examples

#### Create Task
```json
POST /api/tasks
{
  "title": "Complete documentation",
  "description": "Write README file",
  "status": "pending",
  "due_date": "2026-01-20"
}
```

#### Response
```json
{
  "success": true,
  "message": "Task created successfully",
  "data": {
    "_id": "...",
    "title": "Complete documentation",
    "description": "Write README file",
    "status": "pending",
    "due_date": "2026-01-20T00:00:00.000Z",
    "created_at": "2026-01-13T11:00:00.000Z",
    "user": "..."
  }
}
```

## Environment Variables

### Backend (.env)
| Variable | Description | Example |
|----------|-------------|---------|
| MONGODB_URI | MongoDB connection string | `mongodb+srv://...` |
| JWT_SECRET | Secret key for JWT tokens | `your_secret_key` |
| PORT | Server port | `5000` |
| NODE_ENV | Environment | `development` |

### Frontend (.env)
| Variable | Description | Example |
|----------|-------------|---------|
| VITE_API_URL | Backend API URL | `http://localhost:5000/api` |

## Usage

1. **Sign Up**: Create a new account with name, email, and password
2. **Login**: Access your account with email and password
3. **Dashboard**: View your tasks organized in a Kanban board
4. **Add Task**: Click "Add Task" to create a new task
5. **Edit Task**: Click the edit icon on any task card
6. **Drag & Drop**: Drag tasks between columns to update status
7. **Delete Task**: Click the delete icon on any task card
8. **Profile**: Click your name in the navbar to view/edit profile
9. **Logout**: Click the Logout button in the navbar

## Author

Abhijeet

## License

MIT
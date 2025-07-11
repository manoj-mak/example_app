# Todo Server

A Node.js Express server for managing todos with a RESTful API.

## Features

- RESTful API endpoints for CRUD operations on todos
- CORS enabled for frontend communication
- Security middleware (Helmet)
- Request logging (Morgan)
- Error handling middleware
- In-memory data storage (easily replaceable with database)

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the server directory:
```bash
PORT=3001
NODE_ENV=development
```

3. Start the server:
```bash
# Development mode (with auto-restart)
npm run dev

# Production mode
npm start
```

The server will run on `http://localhost:3001`

## API Endpoints

### Todos

- `GET /api/todos` - Get all todos
- `GET /api/todos/:id` - Get a specific todo
- `POST /api/todos` - Create a new todo
- `PUT /api/todos/:id` - Update a todo
- `PATCH /api/todos/:id/toggle` - Toggle todo completion status
- `DELETE /api/todos/:id` - Delete a todo

### Health Check

- `GET /health` - Server health status

## Request/Response Examples

### Get All Todos
```bash
GET /api/todos
```

Response:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "text": "Learn React",
      "completed": false,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "count": 1
}
```

### Create Todo
```bash
POST /api/todos
Content-Type: application/json

{
  "text": "New todo item"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "id": 2,
    "text": "New todo item",
    "completed": false,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### Toggle Todo
```bash
PATCH /api/todos/1/toggle
```

Response:
```json
{
  "success": true,
  "data": {
    "id": 1,
    "text": "Learn React",
    "completed": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

## Project Structure

```
server/
├── src/
│   ├── server.js          # Main server file
│   ├── controllers/       # Request handlers
│   │   └── todoController.js
│   ├── routes/           # Route definitions
│   │   └── todoRoutes.js
│   ├── models/           # Data models
│   │   └── Todo.js
│   └── data/             # Data storage
│       └── todoStore.js
├── package.json
└── README.md
```

## Environment Variables

- `PORT` - Server port (default: 3001)
- `NODE_ENV` - Environment (development/production)

## CORS Configuration

The server is configured to accept requests from:
- Development: `http://localhost:5173`, `http://127.0.0.1:5173`
- Production: Update the CORS origin in `server.js` 
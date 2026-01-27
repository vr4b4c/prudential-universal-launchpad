# Universal Launch Pad

A full-stack application with NestJS backend and React frontend.

## Project Structure

```
universal-launch-pad/
├── backend/          # NestJS backend API
│   ├── src/          # Backend source code
│   └── package.json  # Backend dependencies
├── frontend/         # React frontend application
│   ├── src/          # Frontend source code
│   └── package.json  # Frontend dependencies
└── pnpm-workspace.yaml  # Monorepo workspace configuration
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- pnpm

### Install All Dependencies

From the root directory, install dependencies for both backend and frontend:
```bash
pnpm install
```

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Start the development server:
```bash
pnpm start:dev
```

The backend API will be available at `http://localhost:3000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Start the development server:
```bash
pnpm dev
```

The frontend will be available at `http://localhost:5173`

## Running Both Services

You'll need to run both the backend and frontend in separate terminal windows:

**Terminal 1 - Backend:**
```bash
cd backend
pnpm start:dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
pnpm dev
```

## API Endpoints

- `GET /` - Returns a greeting message

## Development

- Backend: NestJS with TypeScript
- Frontend: React + Vite + TypeScript
- CORS is enabled on the backend to allow frontend requests

## Next Steps

This is a simple starter setup. You can now:
- Add more API endpoints in the backend
- Create additional React components in the frontend
- Add state management (Redux, Zustand, etc.) if needed
- Add routing (React Router) for multiple pages
- Add authentication and authorization
- Connect to a database

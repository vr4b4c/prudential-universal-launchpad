# Universal Launch Pad - Frontend

A simple React frontend application built with Vite and TypeScript, connected to the NestJS backend API.

## Setup

1. Install dependencies:
```bash
pnpm install
```

2. Start the development server:
```bash
pnpm dev
```

The frontend will be available at `http://localhost:5173`

## Development

- The frontend is configured to proxy API requests to `http://localhost:3000` (the NestJS backend)
- Make sure the backend is running before starting the frontend
- The app will automatically fetch data from the API on load

## Build

To build for production:
```bash
pnpm build
```

The built files will be in the `dist` directory.

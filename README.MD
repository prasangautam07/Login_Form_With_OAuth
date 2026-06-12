# OAuth Project

This repository contains a fullstack OAuth-enabled authentication project with a Node.js/Express backend and a React frontend.

## Project structure

- `backend/` - Express API server with JWT auth, Google OAuth, GitHub OAuth, and user session management.
- `frontend/` - React app built with Vite, handling login, signup, protected UI, and API calls.

---

## Backend

### Setup

1. Open a terminal in `backend/`
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with required values.
4. Start the backend server:
   ```bash
   npm run dev
   ```

### Expected environment variables

- `PORT` - server port (default: `8000`)
- `MONGO_URI` - MongoDB connection string
- `ACCESS_TOKEN_SECRET` - JWT access token secret
- `REFRESH_TOKEN_SECRET` - JWT refresh token secret
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `GOOGLE_OAUTH_REDIRECT_URI`
- `GITHUB_CLIENT_ID`
- `GITHUB_CLIENT_SECRET`
- `GITHUB_OAUTH_REDIRECT_URI`

### Backend routes

All API routes are mounted under `/api/users`.

#### Public routes

- `POST /api/users/register`
  - Register a new user.
  - Request body: `fullname`, `email`, `username`, `password`

- `POST /api/users/login`
  - Log in an existing user.
  - Request body: `username`, `password`
  - Sets `accessToken` and `refreshToken` cookies.

- `GET /api/users/google/login`
  - Redirects the browser to Google OAuth consent page.

- `GET /api/users/google/callback`
  - OAuth callback for Google.
  - Exchanges code for tokens, creates or updates the user, sets auth cookies, and redirects to the frontend.

- `GET /api/users/github/login`
  - Redirects the browser to GitHub OAuth consent page.

- `GET /api/users/github/callback`
  - OAuth callback for GitHub.
  - Exchanges code for tokens, creates or updates the user, sets auth cookies, and redirects to the frontend.

#### Protected routes

These routes require valid JWT access token cookies and use `verifyUser` middleware.

- `POST /api/users/logout`
  - Logs out the current user.
  - Clears auth cookies and removes the refresh token from the database.

- `GET /api/users/session`
  - Returns the current authenticated user session.
  - Response includes user details and `loggedIn: true`.

---

## Frontend

### Setup

1. Open a terminal in `frontend/`
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the React app:
   ```bash
   npm run dev
   ```

The frontend runs on `http://localhost:5173` by default.

### Notes

- The frontend API client uses `http://localhost:8000/api/users` as the backend base URL.
- Authentication requests include cookies via `withCredentials: true`.
- OAuth login links are expected to hit the backend routes:
  - `/api/users/google/login`
  - `/api/users/github/login`

### Common commands

- Start backend: `cd backend && npm run dev`
- Start frontend: `cd frontend && npm run dev`

---

## How it works

- Local signup/login uses username and password.
- OAuth login flows use Google or GitHub to authenticate and create the user automatically.
- The backend stores JWT tokens in cookies and validates requests with middleware.
- The frontend reads session state from `/api/users/session`.

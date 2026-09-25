# Frontend Hiring Assignment – ResultPrep Task Tracker & User Management Web Application

A modern, responsive React + TypeScript single-page application built with **Vite**, **Material UI (MUI)**, **Redux Toolkit**, **Zod**, and **Vitest**. Includes complete JWT authentication workflows, role-based view controls (`admin` vs `user`), and an interactive Kanban Task Management board.

---

## Tech Stack
- **Framework**: React 18 & TypeScript (Vite bundler)
- **UI System**: Material UI (`@mui/material`), `@emotion/react`, Framer Motion
- **State Management**: Redux Toolkit & `redux-persist` (survives page refresh via `localStorage`)
- **Forms & Validation**: React Hook Form & Zod (`@hookform/resolvers/zod`)
- **API Integration**: Axios HTTP Client (`makeNetworkCall` with automatic `Authorization: Bearer <token>` attachment)
- **Testing**: Vitest & React Testing Library (`@testing-library/react`, `jsdom`)

---

## Project Structure

```text
hosman-frontend/
├── src/
├── src/auth/            # Auth guards & hooks
├── src/components/      # Reusable UI components
├── src/guard/           # AuthGuard & Permission guards
├── src/layouts/         # Dashboard & Auth layout wrappers
├── src/network/         # Axios network client & API endpoint constants
├── src/pages/           # Page view routes
├── src/routes/          # React Router route definitions
├── src/sections/
│   ├── auth/            # Sign In & Sign Up view components with Zod validation
│   └── tasks/           # Kanban board, task dialogs & task cards
├── src/services/        # authService & taskService API wrappers
├── src/store/           # Redux Toolkit store, appReducer & appThunk
├── src/types/           # TypeScript interfaces (ITask, IRealPrepUser)
├── tests/               # Vitest component & integration test suite
│   ├── AuthForm.test.tsx
│   ├── TaskCard.test.tsx
│   ├── TaskIntegration.test.tsx
│   └── setup.ts
├── .env.example         # Environment variables template
├── vite.config.ts       # Vite & Vitest configuration
└── README.md
```

---

## Setup & Installation

### 1. Prerequisites
- Node.js (v18+)
- npm or yarn

### 2. Environment Configuration
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Ensure your `.env` contains valid environment configuration:
```env
VITE_API_URL=http://localhost:5001
```

### 3. Install Dependencies
```bash
npm install --legacy-peer-deps
```

---

## Running the Application

### Development Mode
Start the Vite development server:
```bash
npm run dev
```
The application will be accessible at `http://localhost:5173`.

### Production Build & Preview
```bash
npm run build
npm run preview
```

---

## Running Tests

Execute the automated component and integration test suites using Vitest:

```bash
npm test
```
or
```bash
npx vitest run
```

### Covered Test Specs:
- **`AuthForm.test.tsx`**: Verifies `SignUpView` component field rendering and Zod client-side validation errors when submitted empty.
- **`TaskCard.test.tsx`**: Verifies `TaskCard` rendering (title, description, status chip) and status toggle button callback execution.
- **`TaskIntegration.test.tsx`**: Verifies user registration, JWT token storage, and full task CRUD lifecycle (Create, Read, Update, Delete).

---

## API Configuration & Authentication Flow

1. **API Base URL**: Configured dynamically in `src/config-global.ts` reading `import.meta.env.VITE_API_URL`.
2. **Network Calls**: `makeNetworkCall` in `src/network/networkcall.ts` wraps Axios and automatically injects `Authorization: Bearer <accessToken>` header on protected requests.
3. **Session Persistence**: Redux state persists the JWT token to `localStorage` via `redux-persist`.
4. **Token Expiration / Logout**: On `401 Unauthorized` responses or user sign out, `requestSignOut` purges persisted state and redirects to `/auth/sign-in`.

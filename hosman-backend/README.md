# Backend Hiring Assignment – User Management & Task Tracker API

A production-ready, modular NestJS backend system implementing **User Management & Task Tracker API** with JWT Authentication, Role-Based Access Control (RBAC), Prisma ORM, DTO validation, and automated Jest unit & E2E integration tests.

---

## Tech Stack
- **Framework**: Node.js & NestJS (TypeScript)
- **Database & ORM**: PostgreSQL / SQLite via **Prisma ORM**
- **Authentication**: JWT (`jsonwebtoken` / `@nestjs/jwt`) & `bcryptjs` password hashing
- **Validation**: `class-validator` & `class-transformer`
- **Testing**: Jest & Supertest

---

## Architectural Pattern

The codebase adheres strictly to a **Modular, Clean Architecture** pattern:

```text
hosman-backend/
├── src/
│   ├── config/               # Global JWT and environment configurations
│   ├── decorators/           # Custom route metadata decorators (e.g. @Roles('admin'))
│   ├── guards/               # SessionAuthGuard (JWT) & RolesGuard (RBAC)
│   ├── prisma/               # PrismaService database client wrapper
│   ├── utils/                # Standardized handleError execution wrapper
│   ├── modules/              # Self-contained feature modules
│   │   ├── auth/             # Authentication Feature
│   │   │   ├── auth.config.ts
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.module.ts
│   │   │   ├── dto/
│   │   │   └── services/
│   │   ├── users/            # User Management & RBAC Feature
│   │   │   ├── users.config.ts
│   │   │   ├── users.controller.ts
│   │   │   ├── users.module.ts
│   │   │   └── services/
│   │   └── tasks/            # Task Tracker CRUD Feature
│   │       ├── task.config.ts
│   │       ├── task.controller.ts
│   │       ├── task.module.ts
│   │       ├── dto/
│   │       └── services/
│   ├── app.controller.ts     # Health check endpoint (GET /)
│   ├── app.module.ts         # Root module assembly
│   └── main.ts               # Application bootstrap & ValidationPipe configuration
├── test/                     # End-to-End (E2E) integration tests
│   ├── app.e2e-spec.ts
│   └── jest-e2e.json
├── .env.example              # Environment variables template
└── README.md
```

### Architectural Highlights & Defensive Rules
1. **Feature Modularization (`src/modules/<feature>/`)**: Every domain (auth, users, tasks) is self-contained with its own DTOs, controllers, services, config constants, and spec files.
2. **Declarative Route Configuration (`*.config.ts`)**: Route paths and summaries are centralized in configuration objects rather than hardcoded string literals in decorators.
3. **Function Argument Limit**: Service functions take a **maximum of 3 direct arguments**, using typed options objects or single DTOs for additional data.
4. **Standardized Error Handling**: `handleError` wraps service calls to catch runtime errors and return uniform HTTP status responses.
5. **Data Protection**: Sensitive properties like passwords are never returned in response DTOs.

---

## Setup & Installation

### 1. Prerequisites
- Node.js (v18+)
- npm or yarn
- PostgreSQL (or local SQLite) database instance

### 2. Environment Configuration
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Ensure your `.env` contains valid credentials:
```env
PORT=5001
DATABASE_URL="postgresql://username:password@localhost:5432/hosman_db?schema=public"
JWT_SECRET="your-super-secret-jwt-key"
NODE_ENV="development"
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Database Schema Sync
Generate Prisma client and push database schema:
```bash
npm run prisma:generate
npm run prisma:push
```

---

## Running the Server

### Development Mode
```bash
npm run start:dev
```
The server starts at `http://localhost:5001`.

### Production Build & Run
```bash
npm run build
npm run start:prod
```

---

## Running Tests

### Unit Tests
Executes 7 isolated unit tests for `AuthService` and `TaskService`:
```bash
npm test
```

### End-to-End (E2E) Integration Tests
Executes 4 supertest API security and endpoint validation tests:
```bash
npm run test:e2e
```

---

## Sample API Requests & Usage

### 1. Authentication

#### **POST /auth/register** - Register User
- **Headers**: `Content-Type: application/json`
- **Request Body**:
```json
{
  "userName": "John Doe",
  "userEmail": "john@example.com",
  "password": "password123",
  "role": "user"
}
```
- **Response** (`201 Created`):
```json
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "id": "c1f7b764-1234-4b5c-a81d-8422472912ef",
    "userName": "John Doe",
    "userEmail": "john@example.com",
    "role": "user",
    "createdAt": "2026-09-25T14:20:00.000Z"
  }
}
```

#### **POST /auth/login** - Login User
- **Headers**: `Content-Type: application/json`
- **Request Body**:
```json
{
  "userEmail": "john@example.com",
  "password": "password123"
}
```
- **Response** (`200 OK`):
```json
{
  "success": true,
  "message": "Login successful",
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "c1f7b764-1234-4b5c-a81d-8422472912ef",
    "userName": "John Doe",
    "userEmail": "john@example.com",
    "role": "user"
  }
}
```

---

### 2. User Management (RBAC Protected)

#### **GET /users/me** - View Current User Profile
- **Headers**: `Authorization: Bearer <TOKEN>`
- **Response** (`200 OK`):
```json
{
  "success": true,
  "user": {
    "id": "c1f7b764-1234-4b5c-a81d-8422472912ef",
    "userName": "John Doe",
    "userEmail": "john@example.com",
    "role": "user",
    "createdAt": "2026-09-25T14:20:00.000Z"
  }
}
```

#### **GET /users** - View All Users (Admin Only)
- **Headers**: `Authorization: Bearer <ADMIN_TOKEN>`
- **Response** (`200 OK`):
```json
{
  "success": true,
  "count": 2,
  "users": [
    {
      "id": "c1f7b764-1234-4b5c-a81d-8422472912ef",
      "userName": "John Doe",
      "userEmail": "john@example.com",
      "role": "user"
    },
    {
      "id": "a908b612-5678-4c12-b98d-998877665544",
      "userName": "Admin User",
      "userEmail": "admin@example.com",
      "role": "admin"
    }
  ]
}
```

#### **DELETE /users/:id** - Delete User (Admin Only)
- **Headers**: `Authorization: Bearer <ADMIN_TOKEN>`
- **Response** (`200 OK`):
```json
{
  "success": true,
  "message": "User c1f7b764-1234-4b5c-a81d-8422472912ef deleted successfully"
}
```

---

### 3. Task Management (CRUD)

#### **POST /tasks** - Create Task
- **Headers**: `Authorization: Bearer <TOKEN>`, `Content-Type: application/json`
- **Request Body**:
```json
{
  "title": "Complete Backend Hiring Assignment",
  "description": "Implement NestJS API with JWT Auth, DTO validation, and Jest unit tests",
  "status": "pending"
}
```
- **Response** (`201 Created`):
```json
{
  "success": true,
  "message": "Task created successfully",
  "task": {
    "id": "e88b9912-3456-7890-abcd-ef1234567890",
    "title": "Complete Backend Hiring Assignment",
    "description": "Implement NestJS API with JWT Auth, DTO validation, and Jest unit tests",
    "status": "pending",
    "userId": "c1f7b764-1234-4b5c-a81d-8422472912ef",
    "created_at": "2026-09-25T14:25:00.000Z"
  }
}
```

#### **GET /tasks** - List Tasks
- *User sees ONLY their own tasks; Admin sees ALL tasks.*
- **Headers**: `Authorization: Bearer <TOKEN>`
- **Response** (`200 OK`):
```json
{
  "success": true,
  "count": 1,
  "tasks": [
    {
      "id": "e88b9912-3456-7890-abcd-ef1234567890",
      "title": "Complete Backend Hiring Assignment",
      "description": "Implement NestJS API with JWT Auth, DTO validation, and Jest unit tests",
      "status": "pending",
      "userId": "c1f7b764-1234-4b5c-a81d-8422472912ef",
      "created_at": "2026-09-25T14:25:00.000Z"
    }
  ]
}
```

#### **PUT /tasks/:id** - Update Task
- **Headers**: `Authorization: Bearer <TOKEN>`, `Content-Type: application/json`
- **Request Body**:
```json
{
  "status": "completed"
}
```
- **Response** (`200 OK`):
```json
{
  "success": true,
  "message": "Task updated successfully",
  "task": {
    "id": "e88b9912-3456-7890-abcd-ef1234567890",
    "title": "Complete Backend Hiring Assignment",
    "status": "completed"
  }
}
```

#### **DELETE /tasks/:id** - Delete Task
- **Headers**: `Authorization: Bearer <TOKEN>`
- **Response** (`200 OK`):
```json
{
  "success": true,
  "message": "Task deleted successfully"
}
```

---

## Security Audit & Compliance Summary
- [x] **No Plaintext Passwords**: Passwords hashed using `bcryptjs` salt factor 10.
- [x] **No Hardcoded Secrets**: Secrets loaded strictly via `.env` / `ConfigModule`.
- [x] **Role-Based Access Control**: `admin` and `user` privileges enforced via `@Roles()` decorator and `RolesGuard`.
- [x] **Ownership Scoping**: Users strictly isolated to their own tasks.
- [x] **Input Validation**: `ValidationPipe` with strict DTO whitelist rules.
- [x] **Automated Tests**: Unit & E2E integration test suites configured and verified passing.

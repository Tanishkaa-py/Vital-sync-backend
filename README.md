# 🏥 VitalSync - Auth Backend

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![Render](https://img.shields.io/badge/Deployed_on-Render-46E3B7?style=for-the-badge)

**Live API:** [https://week-14-vital-sync.onrender.com  ](https://week-14-vital-sync.onrender.com)
**Frontend Repo:** [https://github.com/Tanishkaa-py/vitalsync-frontend ](https://github.com/Tanishkaa-py/week-14-vitalsync-frontend) 
**Track:** Fullstack | **Intern:** Tanishka Jain | **Week:** 14 ProDesk Internship

---

## 📋 Project Description

This is the **secure Node.js + Express backend** for VitalSync, a healthcare patient dashboard application. It handles all authentication logic including user registration, login, JWT generation, and route protection via middleware.

Built as part of the Week 14 Capstone milestone — the goal was to implement a production-grade auth system that the React frontend connects to in real time.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **Node.js** | JavaScript runtime |
| **Express.js** | Web framework and routing |
| **MongoDB Atlas** | Cloud database |
| **Mongoose** | MongoDB object modeling |
| **bcryptjs** | Password hashing (never store plain text) |
| **jsonwebtoken** | JWT generation and verification |
| **dotenv** | Environment variable management |
| **cors** | Cross-origin request handling |
| **nodemon** | Auto-restart during development |
| **Render** | Production deployment |

---

## ✨ Features Built

### Milestone 1 — Backend Foundation
- **User Model** — Mongoose schema with name, email, hashed password, and role fields
- **Password Security** — bcryptjs pre-save hook hashes every password with salt rounds of 12 before it touches the database

### Milestone 2 — JWT Auth Routes
- **POST `/api/auth/register`** — Creates new user, hashes password, returns JWT
- **POST `/api/auth/login`** — Validates credentials against bcrypt hash, returns JWT
- **GET `/api/auth/me`** — Returns current logged-in user from token

### Milestone 3 — Auth Middleware & Protected Routes
- **`middleware/auth.js`** — Verifies JWT from Authorization header on every protected request
- **GET `/api/patients`** — Protected route, only accessible with valid JWT
- Role-based access control via `authorize()` middleware

---

## 🗂️ Project Structure

```
vitalsync-backend/
├── src/
│   ├── index.js              # Server entry point, DB connection
│   ├── models/
│   │   └── User.js           # Mongoose User schema + bcrypt hook
│   ├── routes/
│   │   ├── auth.js           # /api/auth/register + /api/auth/login
│   │   └── patients.js       # Protected /api/patients route
│   └── middleware/
│       └── auth.js           # JWT verification middleware
├── .env.example              # Environment variable template
├── .gitignore
└── package.json
```

---

## 📌 API Endpoints

| Method | Endpoint | Auth Required | Description |
|---|---|---|---|
| GET | `/` | No | Health check |
| POST | `/api/auth/register` | No | Register new user |
| POST | `/api/auth/login` | No | Login + get JWT |
| GET | `/api/auth/me` | Yes | Get current user |
| GET | `/api/patients` | Yes | Protected patient data |

### Request/Response Examples

**Register:**
```json
POST /api/auth/register
{
  "name": "Tanishka Jain",
  "email": "tanishka@vitalsync.com",
  "password": "Vitalsync123",
  "role": "patient"
}

Response:
{
  "message": "Account created successfully",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": { "id": "...", "name": "Tanishka Jain", "role": "patient" }
}
```

**Login:**
```json
POST /api/auth/login
{
  "email": "tanishka@vitalsync.com",
  "password": "Vitalsync123"
}

Response:
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": { "id": "...", "name": "Tanishka Jain", "role": "patient" }
}
```

**Protected Route:**
```
GET /api/patients
Headers: { Authorization: "Bearer eyJhbGciOiJIUzI1NiIs..." }

Response: { "message": "Protected route working", "patients": [...] }
```

---

## 🚀 Local Setup

```bash
# 1. Clone the repo
git clone https://github.com/Tanishkaa-py/vitalsync-backend.git
cd vitalsync-backend

# 2. Install dependencies
npm install

# 3. Create .env file
# Copy .env.example to .env and fill in your values
PORT=5000
MONGODB_URI=mongodb+srv://USERNAME:PASSWORD@cluster0.mongodb.net/vitalsync
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:5173

# 4. Run development server
npm run dev
```

---

## ☁️ Deployment

**Deployed on Render:**
- Build Command: `npm install`
- Start Command: `node src/index.js`
- All environment variables set in Render dashboard

**Live URL:** [https://week-14-vital-sync.onrender.com](https://week-14-vital-sync.onrender.com)

> Note: Render free tier spins down after 15 mins of inactivity. First request may take 30 seconds to wake up.

---

## 🔐 Security Decisions

- Passwords are **never stored in plain text** — bcrypt with 12 salt rounds
- JWT tokens expire in **7 days**
- Password field has `select: false` — never returned in any query by default
- CORS restricted to the frontend URL only
- Environment variables used for all secrets — never hardcoded

---

<div align="center">
Built as part of the <strong>ProDesk Internship Capstone:Week 14</strong>
</div>

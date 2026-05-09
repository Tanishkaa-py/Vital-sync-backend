# 🩺 VitalSync: Fullstack Healthcare Management Platform

VitalSync is a modern fullstack healthcare dashboard built with the MERN stack. The platform enables patients to manage appointments, prescriptions, healthcare records, AI-assisted wellness queries, and premium healthcare features through a secure and responsive interface.

This project was developed as part of a Fullstack Development milestone project involving:

* Protected REST APIs
* CRUD operations with MongoDB
* JWT authentication
* React state management
* Stripe payment integration
* AI-powered healthcare assistant using Google Gemini
* Deployment using Render and Vercel

---

# 🚀 Live Demo

[Vital Sync.](https://vitalsync-frontend-eight.vercel.app/login)

---

# ✨ Features

## 🔐 Authentication & Authorization

* User Registration & Login
* JWT-based Authentication
* Protected API Routes
* Secure Password Hashing using bcrypt
* Role-based access (Patient / Doctor)
* Persistent authentication using localStorage

---

# 📅 Appointment Management (Full CRUD)

Patients can:

* Create appointments
* View appointments
* Edit appointments
* Cancel/Delete appointments

### Backend Features

* REST API routes using Express
* MongoDB data persistence
* Ownership protection using JWT
* Users can only modify their own data

### Frontend Features

* Real-time UI updates
* Optimistic state management
* No page reloads during CRUD operations

---

# 💊 Prescription Management

Patients can:

* View prescriptions
* Manage healthcare records
* Track treatment-related information

---

# 🤖 AI Health Assistant

Integrated with Google Gemini AI.

### Features

* Ask general health-related questions
* Medication guidance
* Wellness suggestions
* Appointment preparation tips
* Symptom-related educational assistance

### Safety Features

* Does not diagnose diseases
* Does not prescribe medication
* Encourages professional medical consultation
* Context-aware prompts for safer healthcare responses

### Tech Used

* Google Gemini API
* Backend-secured AI requests
* Rate limiting for AI endpoints

---

# 💳 Stripe Payment Gateway Integration

Integrated Stripe Checkout in Test Mode.

### Features

* Upgrade to VitalSync Pro
* Secure Stripe Checkout Session
* Payment Success & Cancel Pages
* Backend-generated Stripe sessions
* Test card support

### Test Card

```txt
4242 4242 4242 4242
```

Use:

* Any future expiry date
* Any CVV
* Any ZIP code

---

# 🛡️ Security Features

* JWT Authentication
* Password hashing with bcrypt
* Protected backend routes
* Ownership validation
* Rate limiting middleware
* Environment variable protection
* AI endpoint throttling

---

# ⚡ Optimistic UI Updates

VitalSync uses React state management to instantly reflect changes in the UI while backend API requests run asynchronously.

Examples:

* Appointment creation appears instantly
* Edited data updates immediately
* Deleted items disappear without reload

---

# 🗄️ Database

MongoDB Atlas is used for cloud database storage.

### Collections

* Users
* Appointments
* Prescriptions
* Payments

---

# 🧱 Tech Stack

## Frontend

* React.js
* React Router DOM
* Axios
* Context API
* Vite

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcryptjs
* express-rate-limit

## AI

* Google Gemini API
* @google/generative-ai

## Payment

* Stripe Checkout

## Deployment

* Vercel (Frontend)
* Render (Backend)
* MongoDB Atlas (Database)

---

# 📂 Project Structure

## Frontend

```bash
frontend/
├── src/
│   ├── components/
│   ├── context/
│   ├── pages/
│   ├── services/
│   ├── App.jsx
│   └── main.jsx
```

## Backend

```bash
backend/
├── src/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── validators/
│   ├── utils/
│   └── index.js
```

---

# 🔌 API Endpoints

## Auth Routes

```http
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me
```

## Appointment Routes

```http
GET    /api/appointments
POST   /api/appointments
PUT    /api/appointments/:id
DELETE /api/appointments/:id
```

## Prescription Routes

```http
GET /api/prescriptions
```

## Payment Routes

```http
POST /api/payments/create-checkout-session
```

## AI Routes

```http
POST /api/ai/suggest
```

---

# ⚙️ Environment Variables

## Backend `.env`

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
CLIENT_URL=your_frontend_url
GEMINI_API_KEY=your_gemini_api_key
```

---

# 🖥️ Local Setup

## Clone Repository

```bash
git clone <repository-url>
```

---

## Backend Setup

```bash
cd backend
npm install
npm run dev
```

---

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

# 🌐 Deployment

## Frontend Deployment

* Vercel

## Backend Deployment

* Render

## Database

* MongoDB Atlas

---

# 🎯 Key Learning Outcomes

This project demonstrates:

* Fullstack MERN development
* REST API architecture
* Authentication & authorization
* Secure backend development
* MongoDB integration
* React state management
* Payment gateway integration
* AI API integration
* Deployment workflows
* Environment variable management
* Production debugging

---

# 📸 Core Modules

✅ Authentication System

✅ Patient Dashboard

✅ Appointment CRUD System

✅ Prescription Tracking

✅ Stripe Payment Integration

✅ AI Healthcare Assistant

✅ MongoDB Integration

✅ Protected Routes

✅ Responsive UI

---

# 👩‍💻 Author

Tanishka Jain

Fullstack Developer | MERN Stack Enthusiast

---

# 📄 License

This project is developed for educational and portfolio purposes.

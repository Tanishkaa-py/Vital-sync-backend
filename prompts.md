# 🤖 AI Prompts Log : VitalSync Backend

This file documents every AI prompt used during the development of the VitalSync auth backend. Maintained for transparency, learning, and internship evaluation purposes.

---

## Purpose

This project was built with AI assistance as a learning tool. Every significant prompt is logged here to show the thought process, what was asked, why it was asked, and what was learned from the output.

---

## Prompt Log

---

### Prompt 1 — Project Architecture Planning

**Tool:** Claude (Anthropic)  
**Week:** 13 — Planning Phase  
**Prompt:**
```
Design a MongoDB schema for a healthcare app with Doctor/Patient roles,
appointments, medical history, and prescriptions. Show collection names,
fields, and relationships.
```
**What it helped with:** Designing the ERD and understanding how to model
role-based users in MongoDB with a single Users collection and a role field
instead of separate collections.

**What I learned:** The difference between embedding vs referencing in MongoDB,
and why referencing via ObjectId is better for this use case.

---

### Prompt 2 — User Model with bcrypt

**Tool:** Claude (Anthropic)  
**Week:** 14 — Milestone 1  
**Prompt:**
```
Create a Mongoose User schema for a healthcare app. It needs name, email,
password (hashed with bcrypt, never plain text), and a role field that is
either doctor or patient. Use a pre-save hook to hash the password automatically.
```
**What it helped with:** Writing the pre-save middleware and the `matchPassword`
instance method on the schema.

**What I learned:** How Mongoose middleware works, the difference between
`pre('save')` and manual hashing, and why `select: false` on the password
field is a security best practice.

---

### Prompt 3 — JWT Auth Routes

**Tool:** Claude (Anthropic)  
**Week:** 14 — Milestone 2  
**Prompt:**
```
Build /api/auth/register and /api/auth/login routes in Express for a
healthcare app. On register: validate input, check for existing email,
create user, hash password via pre-save hook, return JWT. On login:
find user, compare bcrypt hash, return JWT. Include proper error handling.
```
**What it helped with:** The structure of the register and login route handlers,
especially the `select('+password')` pattern for login since password has
`select: false` by default.

**What I learned:** Why you need `select('+password')` only on the login query,
and how JWT payload should only contain non-sensitive data like userId and role.

---

### Prompt 4 — Auth Middleware

**Tool:** Claude (Anthropic)  
**Week:** 14 — Milestone 3  
**Prompt:**
```
Create an Express middleware function that checks for a valid JWT in the
Authorization header (Bearer token format). If valid, attach the user to
req.user. If missing or expired, return 401. Also create an authorize()
function for role-based access control.
```
**What it helped with:** Writing the `protect` middleware and understanding
how to chain middleware in Express routes.

**What I learned:** How Express middleware chaining works with `next()`,
the difference between authentication (who are you) and authorization
(what can you do), and how to handle TokenExpiredError specifically.

---

### Prompt 5 — CORS Configuration

**Tool:** Claude (Anthropic)  
**Week:** 14 — Deployment  
**Prompt:**
```
My Express backend deployed on Render is getting CORS errors from my
React frontend on Vercel. The error says Access-Control-Allow-Origin
header value does not match. How do I fix the CORS configuration?
```
**What it helped with:** Understanding that CORS origin must exactly match
the frontend URL including protocol and no trailing slash.

**What I learned:** How CORS works at the HTTP level, what preflight requests
are, and why environment variables for FRONTEND_URL must be updated on every
deployment platform separately.

---

### Prompt 6 — Debugging MongoDB Connection

**Tool:** Claude (Anthropic)  
**Week:** 14 — Setup  
**Prompt:**
```
My Node.js app gets querySrv ECONNREFUSED when connecting to MongoDB Atlas.
The connection string looks correct. What are the possible causes and fixes?
```
**What it helped with:** Diagnosing that the issue was DNS resolution
(nslookup returning UnKnown server) caused by network/ISP blocking.

**What I learned:** How MongoDB SRV connection strings work, what DNS
resolution means in practice, and how to change DNS settings on Windows
to use Google's 8.8.8.8.

---

## Summary

| Prompt | Purpose | Milestone |
|---|---|---|
| 1 | MongoDB schema design | Planning |
| 2 | User model + bcrypt | Milestone 1 |
| 3 | JWT auth routes | Milestone 2 |
| 4 | Auth middleware | Milestone 3 |
| 5 | CORS fix | Deployment |
| 6 | MongoDB debug | Setup |

---

*All code was reviewed, understood, and manually typed/modified — not blindly copied.*

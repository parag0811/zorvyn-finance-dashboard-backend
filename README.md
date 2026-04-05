# 🚀 Zorvyn Finance Dashboard Backend

A scalable backend system for managing financial data, user roles, and analytics in a multi-tenant SaaS environment.

Built as part of a fintech backend assignment to demonstrate API design, system architecture, access control, and data processing.

---

## 📌 Overview

This project simulates a **finance dashboard platform** where organizations can:

- Track income and expenses
- Manage users with different roles
- Enforce access control
- Generate real-time financial insights

The system is designed with **clean architecture, modular structure, and production-level practices**.

---

## 🧠 Key Features

### 👤 User & Role Management

- Admin creates and manages users
- Role-based access:
  - **Admin** → full control
  - **Analyst** → records + analytics
  - **Viewer** → read-only access

- User status (ACTIVE / INACTIVE)

---

### 💸 Financial Records Management

- Create, update, delete records
- Fields:
  - amount
  - type (income / expense)
  - category
  - date
  - notes

- Filtering:
  - by type
  - by category
  - by date range

- Pagination & search support
- Soft delete implemented

---

### 📊 Dashboard Analytics

- Total income
- Total expenses
- Net balance
- Category-wise breakdown
- Recent transactions
- Monthly trends

---

### 🔐 Access Control

- Middleware-based role enforcement
- Company-level data isolation (multi-tenant)
- JWT authentication

---

### ⚙️ Validation & Error Handling

- Input validation using `express-validator`
- Centralized error handling
- Consistent API responses

---

## 🏗️ Backend Architecture

```bash
src/
├── modules/
│   ├── auth/
│   ├── user/
│   ├── record/
│   ├── dashboard/
│   ├── company/
│
├── middlewares/
│   ├── auth.middleware.ts
│   ├── role.middleware.ts
│   ├── error.middleware.ts
│   ├── validate.middleware.ts
│
├── utils/
│   ├── appError.ts
│
├── config/
│   └── db.ts
```

### Design Principles:

- Separation of concerns (Controller → Service → Model)
- Modular structure
- Reusable middleware
- Clean and readable code

---

## 🗄️ Data Modeling

### User

- name
- email
- password (hashed)
- role
- status
- companyId

### Company

- name
- ownerId

### Record

- amount
- type
- category
- date
- notes
- companyId
- createdBy
- isDeleted

---

## 🔄 System Flow

1. User registers → creates company → becomes Admin
2. Admin creates users (Analyst / Viewer)
3. Users login using credentials
4. Analysts/Admins manage financial records
5. Dashboard APIs provide insights

---

## 🔗 API Endpoints

### Auth

- `POST /api/auth/register`
- `POST /api/auth/login`

---

### Users (Admin only)

- `POST /api/users`
- `GET /api/users`
- `PATCH /api/users/:id`

---

### Records

- `POST /api/records`
- `GET /api/records`
- `PATCH /api/records/:id`
- `DELETE /api/records/:id`

---

### Dashboard

- `GET /api/dashboard/summary`
- `GET /api/dashboard/categories`
- `GET /api/dashboard/recent`
- `GET /api/dashboard/trends`

---

## 📦 Query Support

### Pagination

```
GET /records?page=1&limit=10
```

### Search

```
GET /records?search=aws
```

### Filters

```
GET /records?type=expense&category=infra
```

### Trends

```
GET /dashboard/trends?year=2026
```

---

## 📡 Response Format

```json
{
  "success": true,
  "data": {},
  "message": "..."
}
```

---

## ⚠️ Assumptions

- Each user belongs to a single company
- Admin manages all users within a company
- No public user registration beyond initial admin
- Financial records are manually entered (not external APIs)

---

## ⚖️ Trade-offs

- Invitation system not implemented (kept simple)
- No frontend included
- No multi-company user support (can be extended)

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- TypeScript
- MongoDB (Mongoose)
- JWT Authentication
- express-validator

---

## 🚀 Setup Instructions

```bash
git clone https://github.com/parag0811/zorvyn-finance-dashboard-backend
cd backend
npm install
```

### Create `.env`

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
```

### Run

```bash
npm run dev
```

---

## 🔥 Additional Highlights

- Clean API design
- Role-based access control
- Aggregation pipelines for analytics
- Pagination & filtering
- Scalable architecture

---

## 📬 Submission Notes

This project focuses on:

- clarity over complexity
- real-world backend practices
- maintainable and scalable design

---

## 👨‍💻 Author

Built by [Parag Rangankar]

---

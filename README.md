# Staff Management System - Backend

A REST API built with Node.js, Express, and MongoDB for managing staff and attendance records.

## 🚀 Live API
https://staff-backend-production-f69f.up.railway.app

## 🛠️ Tech Stack
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Multer (file uploads)

## 📁 Project Structure
staff-backend/
├── models/
│   ├── Staffs.js
│   └── Attendance.js
├── routes/
│   ├── authRoutes.js
│   ├── staffRoutes.js
│   └── attendanceRoutes.js
├── middleware/
│   └── authMiddleware.js
├── .env
└── server.js

## 🔧 Installation

1. Clone the repository
```bash
git clone https://github.com/m-sinan/staff-backend.git
cd staff-backend
```

2. Install dependencies
```bash
npm install
```

3. Create `.env` file
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
OWNER_EMAIL=your_email
OWNER_PASSWORD=your_password
JWT_SECRET=your_jwt_secret
```

4. Run the server
```bash
npm run dev
```

## 📌 API Endpoints

### Auth
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | /api/auth/login | Owner login | Public |

### Staffs
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | /api/staffs | Get all staffs | Protected |
| GET | /api/staffs/:id | Get single staff | Protected |
| POST | /api/staffs | Create staff | Protected |
| PUT | /api/staffs/:id | Update staff | Protected |
| DELETE | /api/staffs/:id | Delete staff | Protected |

### Attendance
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | /api/attendance | Get all attendance | Protected |
| GET | /api/attendance/staff/:id | Filter by staff ID | Protected |
| GET | /api/attendance/location/:location | Filter by location | Protected |
| POST | /api/attendance | Submit attendance | Public |

## 🔐 Authentication
Protected routes require a Bearer token in the Authorization header:

Authorization: Bearer your_jwt_token

## 👨‍💻 Developer
- **Muhamed Sinan K**
- GitHub: [@m-sinan](https://github.com/m-sinan)
- 

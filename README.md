# 🛡️ FastAPI + React Authentication System  
**JWT Authentication | Email OTP Verification | MongoDB**

A secure and modern **full-stack authentication system** with:  
✅ **User Registration & Login**  
✅ **Email OTP Verification**  
✅ **JWT-based Authentication**  
✅ **MongoDB Integration**  
✅ **React Frontend with TailwindCSS**

---

## 🚀 Features

- **Register** with name, email, and password
- **Verify email** with OTP before logging in
- **Login** with JWT-based authentication
- **Protected API routes** accessible only with valid JWT
- **MongoDB Atlas** for persistent storage
- **Responsive React frontend** with TailwindCSS

---

## 🛠 Tech Stack

**Backend**
- [FastAPI](https://fastapi.tiangolo.com/) - Web framework
- [PyMongo](https://pymongo.readthedocs.io/) - MongoDB driver
- [PyJWT](https://pyjwt.readthedocs.io/) - JWT token management
- [smtplib](https://docs.python.org/3/library/smtplib.html) - Email OTP sending

**Frontend**
- [React](https://reactjs.org/) - UI library
- [React Router](https://reactrouter.com/) - Routing
- [Axios](https://axios-http.com/) - API requests
- [TailwindCSS](https://tailwindcss.com/) - Styling

**Database**
- [MongoDB Atlas](https://www.mongodb.com/atlas) - Cloud database

---

## 📂 Project Structure

```text
auth-system/
│
├── backend/
│   ├── app/
│   │   ├── main.py          # Entry point for FastAPI app
│   │   ├── auth/            # Authentication routes & logic
│   │   ├── database.py      # MongoDB connection
│   │   ├── models.py        # Pydantic models
│   │   ├── utils.py         # Utility functions (OTP, JWT)
│   │   └── config.py        # Environment variables & config
│   ├── requirements.txt     # Backend dependencies
│
├── frontend/
│   ├── src/
│   │   ├── api.js           # Axios instance
│   │   ├── pages/           # React pages (Register, Login, Verify)
│   │   ├── App.js           # App entry point
│   │   └── index.js         # React DOM entry point
│   ├── package.json         # Frontend dependencies
│
└── README.md
```

----

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/<your-username>/<repo-name>.git
cd auth-system
```
----

### 2️⃣ Backend Setup

```bash
cd backend
pip install -r requirements.txt

Create a .env file in backend/app/ and add:

MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/auth_db
JWT_SECRET=your_jwt_secret
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@example.com
EMAIL_PASSWORD=your_email_password
```

### Run the backend:
```bash
uvicorn app.main:app --reload
```

----
### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

----

### 🛠️ Tech Stack
```bash
Backend: FastAPI, MongoDB, PyJWT, Pydantic
Frontend: React, Axios, TailwindCSS
Database: MongoDB Atlas
```

----

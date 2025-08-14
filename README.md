# FastAPI Authentication System (JWT + Email OTP + MongoDB)

A secure authentication backend built with **FastAPI**, featuring:

- **User registration & login**
- **JWT-based authentication**
- **Email OTP verification**
- **MongoDB integration** for persistent storage
- **Modular and production-ready architecture**

---

## 🚀 Features

- **Register** with name, email, and password
- **Verify email** with OTP before login
- **Login** using email & password (JWT issued on success)
- **Token-based authentication** for protected routes
- **MongoDB Atlas** integration for cloud-based storage
- **Environment-based configuration** for easy deployment

---

## 🛠 Tech Stack

**Backend**
- [FastAPI](https://fastapi.tiangolo.com/) - Web framework
- [PyMongo](https://pymongo.readthedocs.io/) - MongoDB driver
- [JWT (PyJWT)](https://pyjwt.readthedocs.io/) - Token generation
- [smtplib](https://docs.python.org/3/library/smtplib.html) - Email sending for OTP

**Database**
- [MongoDB Atlas](https://www.mongodb.com/atlas) - Cloud database

---

## 📂 Project Structure

backend/
│
├── app/
│ ├── main.py # Entry point for FastAPI app
│ ├── auth/ # Authentication routes & logic
│ ├── database.py # MongoDB connection
│ ├── models.py # Pydantic models
│ ├── utils.py # Utility functions (OTP, JWT)
│ └── config.py # Environment variables & config
│
├── requirements.txt # Python dependencies
└── README.md

# 🛡️ Node.js User Management API with JWT & MySQL

This project is a secure and modular **User Management REST API** built using **Node.js**, **Express**, **MySQL**, and **JWT Authentication**. It allows user registration, login, profile management, and protected routes.

---

## 📁 Project Folder Structure

<pre>
node_modules/       ← (excluded from Git)
src/
├── config/         ← Database connection setup
│   └── db.js
├── controllers/    ← Business logic (CRUD operations)
│   └── userController.js
├── data/           ← SQL schema and seed scripts
│   ├── createUserTable.js
│   └── data.sql
├── middlewares/    ← Custom middlewares
│   ├── authMiddleware.js
│   ├── errorHandler.js
│   └── userValidation.js
├── models/         ← Database queries (Model layer)
│   └── userModel.js
├── routes/         ← API endpoints
│   ├── userRoutes.js
│   └── index.js
.env                ← (excluded from Git, create manually)
.gitignore
package-lock.json
package.json
README.md
</pre>

---

## 🚀 Features

- ✅ User Registration with validation
- ✅ User Login with JWT token generation
- ✅ JWT-protected routes for authorized access
- ✅ Secure password hashing with bcrypt
- ✅ Input validation using Joi
- ✅ Centralized error handling
- ✅ MySQL database integration

---

## 🧰 Tech Stack

- **Node.js**
- **Express.js**
- **MySQL**
- **JWT (jsonwebtoken)**
- **Joi** – input validation
- **bcryptjs** – password hashing
- **dotenv** – environment variable management

---

## ⚙️ Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name

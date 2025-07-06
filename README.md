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
git clone https://github.com/swainsubhrajit98/User-Management-REST-API.git
cd User-Management-REST-API
```
### 2. Install dependencies
   ```
   npm install
   npm run dev
```
### 3. Create a .env file in the root directory
```bash
-**PORT=3000**
-DB_HOST=localhost
-DB_USER=your_mysql_username
-DB_PASSWORD=your_mysql_password
-DB_NAME=your_database_name
-JWT_SECRET=your_jwt_secret

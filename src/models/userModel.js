import connection from "../config/db.js";
import bcrypt from "bcrypt";
// Get all users with pagination
export const getAllUsersService = async (limit, offset) => {
  const [rows] = await connection.query(
    "SELECT * FROM myusertable LIMIT ? OFFSET ?",
    [limit, offset]
  );
  return rows;
};

// Optional: Get total count of users
export const getUserCountService = async () => {
  const [rows] = await connection.query(
    "SELECT COUNT(*) as count FROM myusertable"
  );
  return rows[0].count;
};

// Get user by ID
export const getUserIdService = async (id) => {
  const [rows] = await connection.query(
    "SELECT * FROM myusertable WHERE id = ?",
    [id]
  );
  return rows[0]; // return single user
};

// Create a new user
export const createUserService = async (
  firstName,
  lastName,
  email,
  phone,
  image,
  password
) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const [result] = await connection.query(
    "INSERT INTO myusertable (firstName, lastName, email, phone, image,password ) VALUES (?, ?, ?, ?, ?,?)",
    [firstName, lastName, email, phone, image,hashedPassword ]
  );
  return {
    id: result.insertId,
    firstName,
    lastName,
    email,
    phone,
    image,
  };
};

// Update user
export const updateUserService = async (
  id,
  firstName,
  lastName,
  email,
  phone,
  image,
  password
) => {
  let hashedPassword = password;
  if (password) {
    hashedPassword = await bcrypt.hash(password, 10);
  }
  const [result] = await connection.query(
    `UPDATE myusertable SET 
      firstName = COALESCE(?, firstName),
      lastName = COALESCE(?, lastName),
      email = COALESCE(?, email),
      phone = COALESCE(?, phone),
      image = COALESCE(?, image),
      password  = COALESCE(?, password)
    WHERE id = ?`,
    [firstName, lastName, email, phone, image, hashedPassword, id]
  );
  return result;
};

// Delete user
export const deleteUserService = async (id) => {
  const [result] = await connection.query(
    "DELETE FROM myusertable WHERE id = ?",
    [id]
  );
  return result;
};

//Get user by Email
export const getUserByEmailService = async (email) => {
  const [rows] = await connection.query(
    "SELECT * FROM myusertable WHERE email = ?",
    [email]
  );
  return rows[0];
};

//Get user by phone No.
export const getUserByPhoneService = async (phone) => {
  const [rows] = await connection.query(
    "SELECT * FROM myusertable WHERE phone = ?",
    [phone]
  );
  return rows[0];
};

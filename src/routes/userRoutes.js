import express from "express";
const router = express.Router();
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  loginUser,
} from "../controllers/userController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

router.post("/register/", createUser);
router.post("/login", loginUser);
router.get("/users", verifyToken, getAllUsers);
router.get("/users/:id", verifyToken, getUserById);
router.put("/users/:id", verifyToken, updateUser);
router.delete("/users/:id", verifyToken, deleteUser);

export default router;

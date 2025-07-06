import {
  getAllUsersService,
  getUserIdService,
  createUserService,
  updateUserService,
  deleteUserService,
  getUserByEmailService,
  getUserByPhoneService,
} from "../models/userModel.js";
import { getUserCountService } from "../models/userModel.js";
import { userSchema, userUpdateSchema } from "../middlewares/userValidation.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

const handleResponse = (res, status, message, data = null) => {
  res.status(status).json({
    status,
    message,
    data,
  });
};

//create user
export const createUser = async (req, res, next) => {
  const { firstName, lastName, email, phone, image, password } = req.body;
  try {
    const { error } = userSchema.validate(req.body);
    if (error) {
      return res
        .status(400)
        .json({ status: 400, message: error.details[0].message });
    }

    const existingEmail = await getUserByEmailService(email);
    if (existingEmail) {
      return res
        .status(409)
        .json({ status: 409, message: "Email already exists" });
    }

    const existingPhone = await getUserByPhoneService(phone);
    if (existingPhone) {
      return res
        .status(409)
        .json({ status: 409, message: "Phone number already in use" });
    }
    const newUser = await createUserService(
      firstName,
      lastName,
      email,
      phone,
      image,
      password 
    );
    handleResponse(res, 201, "User created successfully!", newUser);
  } catch (err) {
    next(err);
  }
};

//All users
export const getAllUsers = async (req, res, next) => {
  try {
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 3;
    const offset = (page - 1) * limit;

    const users = await getAllUsersService(limit, offset);
    const totalUsers = await getUserCountService();

    handleResponse(res, 200, "Users fetched successfully", {
      users,
      currentPage: page,
      totalPages: Math.ceil(totalUsers / limit),
      totalUsers,
    });
  } catch (err) {
    next(err);
  }
};

//User by id

export const getUserById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await getUserIdService(id);

    if (!user) {
      return handleResponse(res, 404, "User not found");
    }

    handleResponse(res, 200, "User fetched successfully", user);
  } catch (err) {
    next(err);
  }
};

//update user

export const updateUser = async (req, res, next) => {
  const id = req.params.id;
  const { firstName, lastName, email, phone, image, password } = req.body;

  try {
    const { error } = userUpdateSchema.validate(req.body);
    if (error) {
      return res
        .status(400)
        .json({ status: 400, message: error.details[0].message });
    }

    if (email) {
      const userWithEmail = await getUserByEmailService(email);
      if (userWithEmail && userWithEmail.id !== id) {
        return res
          .status(409)
          .json({ status: 409, message: "Email already in use" });
      }
    }

    if (phone) {
      const userWithPhone = await getUserByPhoneService(phone);
      if (userWithPhone && userWithPhone.id !== id) {
        return res
          .status(409)
          .json({ status: 409, message: "Phone number already in use" });
      }
    }
    
    const result = await updateUserService(
      id,
      firstName,
      lastName,
      email,
      phone,
      image,
      password 
    );
    if (result.affectedRows === 0) {
      return handleResponse(res, 404, "User not found");
    }
    const updatedUser = await getUserIdService(id);
    handleResponse(res, 200, "User updated successfully", updatedUser);
  } catch (err) {
    next(err);
  }
};

//Delete user

export const deleteUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await deleteUserService(id);

    if (result.affectedRows === 0) {
      return handleResponse(res, 404, "User not found");
    }

    handleResponse(res, 200, "User deleted successfully", { id });
  } catch (err) {
    next(err);
  }
};




//Login user
export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await getUserByEmailService(email);
    if (!user) {
      return res.status(401).json({ status: 401, message: "Invalid email or password" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ status: 401, message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      status: 200,
      message: "Login successful",
      data: {
        token,
        user: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone,
          image: user.image,
        },
      },
    });
  } catch (err) {
    next(err);
  }
};
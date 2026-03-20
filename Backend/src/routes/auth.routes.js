import { Router } from "express";
import { registerValidator, loginValidator } from "../validators/auth.validator.js";
import { register, verifyEmail, login, getMe } from "../controllers/auth.controller.js";
import { authUser } from "../middleware/auth.middleware.js";

const authRouter = Router()

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user
 * @access  Public
 * @body    { username, email, password }
 */

authRouter.post("/register", registerValidator, register)

/**
 * @route   POST /api/auth/login
 * @desc    Login a user and return JWT token
 * @access  Public
 *  
 */
authRouter.post("/login",loginValidator, login)

/**
 * @route GET /api/auth/get-me
 * @desc Get current logged in user's details
 * @access Private
 */

authRouter.get("/get-me", authUser, getMe)  



/**
 * @route   GET /api/auth/verify-email
 * @desc    Verify email
 * @access  Public
 * */
authRouter.get("/verify-email", verifyEmail)

export default authRouter

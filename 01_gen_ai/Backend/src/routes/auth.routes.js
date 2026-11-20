import express from 'express';
import { getMeController, loginUserController, logoutUserController, registerUserController } from '../controllers/auth.controller.js';
import { authUser } from '../middlewares/auth.middleware.js';

const router = express.Router();

/**
 * @route post: /api/auth/register
 * @description register a new user
 * @access public
 */
router.post("/register", registerUserController);

/**
 * @route post: /api/auth/login
 * @description login user with email and password
 * @access public
 */
router.post("/login", loginUserController);

/**
 * @route post: /api/auth/logout
 * @description clear token from user cookie and add the token in blacklist
 * @access public
 */
router.post("/logout", logoutUserController);

/**
 * @route get: /api/auth/get-me
 * @description get the current logged in user details
 * @access private
 */
router.get("/get-me", authUser, getMeController);

export default router;
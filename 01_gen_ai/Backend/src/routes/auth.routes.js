import express from 'express';
import { getMeController, loginUserController, logoutUserController, registerUserController } from '../controllers/auth.controller.js';
import { authUser } from '../middlewares/auth.middleware.js';

const router = express.Router();

// post: /api/auth/register
router.post("/register", registerUserController);
// post: /api/auth/login
router.post("/login", loginUserController);
// post: /api/auth/logout
router.post("/logout", logoutUserController);

// get: /api/auth/get-me
router.get("/get-me", authUser, getMeController);

export default router;
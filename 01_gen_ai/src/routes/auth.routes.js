import express from 'express';
import { loginUserController, registerUserController } from '../controllers/auth.controller.js';

const router = express.Router();

// post: /api/auth
router.post("/register", registerUserController);
router.post("/login", loginUserController);
// router.post("/logout", logoutUserController);

export default router;
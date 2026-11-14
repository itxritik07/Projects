import express from 'express';
import { getMeController, loginUserController, logoutUserController, registerUserController } from '../controllers/auth.controller.js';
import { authUser } from '../middlewares/auth.middleware.js';

const router = express.Router();

// post: /api/auth
router.post("/register", registerUserController);
router.post("/login", loginUserController);
router.post("/logout", logoutUserController);

// get: /api/auth
router.get("/get-me", authUser, getMeController);



export default router;
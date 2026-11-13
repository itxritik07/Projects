import express from 'express';
import { authUser } from '../middlewares/auth.middleware.js';

const interviewRouter = express.Router();

interviewRouter.post("/", authUser);

export default interviewRouter;
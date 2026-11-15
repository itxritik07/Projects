import express from 'express';
import { authUser } from '../middlewares/auth.middleware.js';
import upload from '../middlewares/file.middleware.js';
import { generateInterviewReportController, generateInterviewReportIdController, getAllInterviewReportsController } from '../controllers/interview.controller.js';

const interviewRouter = express.Router();

// post: /api/interview
interviewRouter.post("/", authUser, upload.single("resume"), generateInterviewReportController);

// get: /api/interview/report/:interviewId
interviewRouter.get("/report/:interviewId", authUser, generateInterviewReportIdController);

// get: /api/interview
interviewRouter.get("/", authUser, getAllInterviewReportsController);


export default interviewRouter;
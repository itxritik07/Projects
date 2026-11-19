import express from 'express';
import { authUser } from '../middlewares/auth.middleware.js';
import upload from '../middlewares/file.middleware.js';
import { generateInterviewReportController, generateResumePdfController, getAllInterviewReportsController, getInterviewReportIdController } from '../controllers/interview.controller.js';

const interviewRouter = express.Router();

// post: /api/interview
interviewRouter.post("/", authUser, upload.single("resume"), generateInterviewReportController);

// get: /api/interview/report/:interviewId
interviewRouter.get("/report/:interviewId", authUser, getInterviewReportIdController);

// get: /api/interview
interviewRouter.get("/", authUser, getAllInterviewReportsController);

// post: /api/interview/resume/pdf
interviewRouter.post("/resume/pdf/:interviewReportId", authUser, generateResumePdfController);


export default interviewRouter;
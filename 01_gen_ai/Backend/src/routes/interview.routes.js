import express from 'express';
import { authUser } from '../middlewares/auth.middleware.js';
import upload from '../middlewares/file.middleware.js';
import { generateInterviewReportController, generateResumePdfController, getAllInterviewReportsController, getInterviewReportIdController } from '../controllers/interview.controller.js';

const interviewRouter = express.Router();

/**
 * @route post: /api/interview/
 * @description generate new interview report on the basis of user self description,resume pdf and job description.
 * @access private
 */
interviewRouter.post("/", authUser, upload.single("resume"), generateInterviewReportController);

/**
 * @route get: /api/interview/report/:interviewId
 * @description get interview report by interviewId.
 * @access private
 */
interviewRouter.get("/report/:interviewId", authUser, getInterviewReportIdController);

/**
 * @route get: /api/interview/
 * @description get all interview reports of logged in user.
 * @access private
 */
interviewRouter.get("/", authUser, getAllInterviewReportsController);

/**
 * @route get: /api/interview/resume/pdf
 * @description generate resume pdf on the basis of user self description, resume content and job description.
 * @access private
 */
interviewRouter.post("/resume/pdf/:interviewReportId", authUser, generateResumePdfController);


export default interviewRouter;
import { PDFParse } from "pdf-parse";
import { generateInterviewReport } from "../services/ai.service.js";
import interviewReportModel from "../models/interviewReport.model.js";


export const generateInterviewReportController = async (req, res) => {
    
    const resumeContent = await (new PDFParse(Uint8Array.from(req.file.buffer))).getText();
    const { selfDescription, jobDescription } = req.body;

    const interviewReportByAi = await generateInterviewReport({
        resume: resumeContent.text,
        selfDescription,
        jobDescription
    });

    // create an interview report
    const interviewReport = await interviewReportModel.create({
        user: req.user.id,
        resume: resumeContent.text,
        selfDescription,
        jobDescription,
        ...interviewReportByAi // all Questions spread here 
    });

    res.status(201).json({
        message: "Interview report generated successfully",
        interviewReport
    })
};
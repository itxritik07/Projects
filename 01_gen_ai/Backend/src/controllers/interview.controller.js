import { PDFParse } from "pdf-parse";
import { generateInterviewReport } from "../services/ai.service.js";
import interviewReportModel from "../models/interviewReport.model.js";


// post: api/interview
// export const generateInterviewReportController = async (req, res) => {

//     const resumeContent = await (new PDFParse(Uint8Array.from(req.file.buffer))).getText()
//     const { selfDescription, jobDescription } = req.body;

//     const interviewReportByAi = await generateInterviewReport({
//         resume: resumeContent.text,
//         selfDescription,
//         jobDescription
//     });

//     // create an interview report
//     const interviewReport = await interviewReportModel.create({
//         user: req.user.id,
//         resume: resumeContent.text,
//         selfDescription,
//         jobDescription,
//         ...interviewReportByAi // all Questions spread here 
//     });

//     res.status(201).json({
//         message: "Interview report generated successfully",
//         interviewReport
//     })
// };


// Claude version
export const generateInterviewReportController = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "Resume PDF is required" });
        }

        const { selfDescription, jobDescription } = req.body;
        if (!selfDescription?.trim() || !jobDescription?.trim()) {
            return res.status(400).json({ message: "selfDescription and jobDescription are required" });
        }

        const parser = new PDFParse({ data: req.file.buffer });
        let resumeText;
        try {
            resumeText = (await parser.getText()).text;
        } finally {
            await parser.destroy();
        }

        const interviewReportByAi = await generateInterviewReport({
            resume: resumeText,
            selfDescription,
            jobDescription
        });

        const interviewReport = await interviewReportModel.create({
            user: req.user.id,
            resume: resumeText,
            selfDescription,
            jobDescription,
            ...interviewReportByAi
        });

        res.status(201).json({
            message: "Interview report generated successfully",
            interviewReport
        });
    } catch (error) {
        console.error("generateInterviewReport error:", error);
        res.status(500).json({ message: "Failed to generate interview report" });
    }
};

// get: /api/interview/report/interviewId
export const getInterviewReportIdController = async (req, res) => {
    const { interviewId } = req.params;

    const interviewReport = await interviewReportModel.findOne({
        _id: interviewId,
        user: req.user.id
    });

    if (!interviewReport) {
        return res.status(404).json({
            message: "Interview report not found"
        })
    }

    res.status(200).json({
        message: "Interview report fetched successfully",
        interviewReport
    })
};

// get: /api/interview
export const getAllInterviewReportsController = async (req, res) => {
    const interviewReports = await interviewReportModel
        .find({ user: req.user.id })
        .sort({ createdAt: -1 })
        .select("-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan")

    res.status(200).json({
        message: "Interview report fetched successfully",
        interviewReports
    })
};
import { useContext, useEffect } from "react";
import { generateInterviewReport, generateResumePdf, getAllInterviewReports, getInterviewReportId } from "../services/interview.api.js";
import { InterviewContext } from "../context/InterviewContext.jsx";
import { useParams } from 'react-router';


export const useInterview = () => {
    const context = useContext(InterviewContext);
    if (!context) {
        throw new Error("useInterview must be used within an InterviewProvider")
    }
    const { interviewId } = useParams();
    const { loading, setLoading, report, setReport, reports, setReports } = context;


    const generateReport = async ({ selfDescription, jobDescription, resumeFile }) => {
        setLoading(true);

        let response = null
        try {
            response = await generateInterviewReport({ selfDescription, jobDescription, resumeFile })
            setReport(response.interviewReport) // interviewReport: postman API
        }
        catch (error) {
            console.log(`generateReport error: ${error}`)
        }
        finally {
            setLoading(false)
        }
        return response.interviewReport
    };

    const getReportById = async ({ interviewId }) => {
        setLoading(true)

        let response = null
        try {
            response = await getInterviewReportId({ interviewId })
            setReport(response.interviewReport)
        }
        catch (error) {
            console.log(`getReportById error: ${error}`)
        }
        finally {
            setLoading(false)
        }

        return response.interviewReport
    };

    const getReports = async () => {
        setLoading(true);

        let response = null;
        try {
            response = await getAllInterviewReports();
            setReports(response.interviewReports);
        }
        catch (error) {
            console.log(`getReports error: ${error}`)
        }
        finally {
            setLoading(false)
        }

        return response.interviewReports;
    };

    const getResumePdf = async (interviewReportId) => {
        setLoading(true);

        let response = null;
        try {
            response = await generateResumePdf({ interviewReportId })
            const url = window.URL.createObjectURL(new Blob([response], { type: "application/pdf" }))
            const link = document.createElement("a")
            link.href = url
            link.setAttribute("download", `resume_${interviewReportId}.pdf`)
            document.body.appendChild(link)
            link.click()
        }
        catch (error) {
            console.log(`getResumePdf error: ${error}`)
        }
        finally {
            setLoading(false)
        }
    };

    // for re-hydration
    useEffect(() => {
        if (interviewId) {
            getReportById({ interviewId })
        }
        else {
            getReports()
        }
    }, [interviewId])

    return { loading, report, reports, generateReport, getReportById, getReports, getResumePdf, setLoading}
};
import { useContext, useEffect } from "react";
import { generateInterviewReport, getAllInterviewReports, getInterviewReportId } from "../services/interview.api.js";
import { InterviewContext } from "../context/InterviewContext";
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
            console.log(`generateReport ${error}`)
        }
        finally {
            setLoading(false)
        }
        return response.interviewReport
    };

    const getReportById = async ({ interviewId }) => {
        setLoading(true);

        let response = null;
        try {
            response = await getInterviewReportId({ interviewId })
            setReport(response.interviewReports)
        }
        catch (error) {
            console.log(`getReportById ${error}`)
        }
        finally {
            setLoading(false)
        }
        return response.interviewReports;
    };

    const getReports = async () => {
        setLoading(true);

        let response = null;
        try {
            response = await getAllInterviewReports();
            setReport(response.interviewReports);
        }
        catch (error) {
            console.log(`getReports ${error}`)
        }
        finally {
            setLoading(false)
        }

        return response.interviewReports;
    };

    // for re-hydration
    useEffect(() => {
        if (interviewId) {
            getReportById(interviewId)
        }
        else {
            getReports()
        }
    }, [interviewId])

    return { loading, report, reports, generateReport, getReportById, getReports }
};  
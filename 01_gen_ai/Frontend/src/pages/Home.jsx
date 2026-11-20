import { useRef, useState } from 'react';
import { useInterview } from '../hooks/useInterview.js';
import { useNavigate } from 'react-router';
import { LogoutButton } from '../components/LogoutButton.jsx';


export const Home = () => {
  const { loading, generateReport, reports, setLoading } = useInterview();
  const [jobDescription, setJobDescription] = useState("");
  const [selfDescription, setSelfDescription] = useState("");
  const resumeInputRef = useRef();
  const navigate = useNavigate();

  const handleGenerateReport = async () => {
    setLoading(true);

    try {
      const resumeFile = resumeInputRef.current?.files?.[0];
      const data = await generateReport({ jobDescription, selfDescription, resumeFile });

      if (data?._id) {
        navigate(`/interview/${data._id}`);
      }
    }
    catch (error) {
      console.error(`handleGenerateReport error: ${error}`);
    }
    finally {
      setLoading(false);
    }
  };


  return (
    <main className="min-h-screen bg-gray-100 px-4 py-3 md:px-6 md:py-4">

      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="relative mb-5">
          {/* Logout Button */}
          <div className="items-center flex justify-end mb-3">
            <LogoutButton />
          </div>

          {/* Page Heading */}
          <div className="text-center">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">
              Create Your Custom Interview Plan
            </h1>
            {/* para */}
            <p className="text-xs md:text-sm text-gray-500 max-w-xl mx-auto">
              Let our AI analyze the job requirements and your unique profile
              to build a winning strategy.
            </p>
          </div>
        </div>

        {/* Main Form */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 p-5">
            {/* Left Section */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label
                  htmlFor="jobDescription"
                  className="text-base font-semibold text-gray-800"
                >
                  Target Job Description
                </label>

                <span className="text-xs text-red-500 font-medium">
                  Required
                </span>
              </div>

              {/* Job Description */}
              <textarea
                className="w-full h-[min(42vh,320px)] min-h-55 p-3 text-sm border border-gray-300 rounded-lg outline-none resize-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                name="jobDescription"
                id="jobDescription"
                maxLength={5000}
                placeholder="Paste the full job description here..."
                onChange={(e) => setJobDescription(e.target.value)}
              />

              <p className="text-right text-xs text-gray-400 mt-1">
                0 / 5000 chars
              </p>
            </div>

            {/* Right Section */}
            <div className="space-y-4">
              <h2 className="text-base font-semibold text-gray-800 border-b border-gray-200 pb-2">
                Your Profile
              </h2>

              {/* Resume Upload */}
              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-2"
                  htmlFor="resume"
                >
                  Upload Resume
                  <span className="text-xs text-blue-600 ml-2">
                    (Best Results)
                  </span>
                </label>

                <label
                  className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-blue-50 hover:border-blue-400 transition duration-200"
                  htmlFor="resume"
                >
                  <span className="text-2xl text-blue-600 mb-1">
                    ↑
                  </span>

                  <span className="text-sm font-semibold text-gray-700">
                    Click to upload or drag & drop
                  </span>

                  <span className="text-xs text-gray-400 mt-1">
                    PDF or DOCX (Max 5MB)
                  </span>

                  <input
                    className="hidden"
                    type="file"
                    name="resume"
                    id="resume"
                    accept=".pdf"
                    ref={resumeInputRef}
                  />
                </label>
              </div>

              {/* OR Divider */}
              <div className="flex items-center gap-4">
                <div className="flex-1 h-px bg-gray-200"></div>
                <span className="text-xs text-gray-400">OR</span>
                <div className="flex-1 h-px bg-gray-200"></div>
              </div>

              {/* Self Description */}
              <div>
                <label
                  htmlFor="selfDescription"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Quick Self-Description
                </label>

                <textarea
                  className="w-full h-28 p-3 text-sm border border-gray-300 rounded-lg outline-none resize-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                  name="selfDescription"
                  id="selfDescription"
                  placeholder="Briefly describe your experience, key skills, and years of experience..."
                  onChange={(e) => setSelfDescription(e.target.value)}
                />
              </div>

              {/* Information Message */}
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-3">
                <p className="text-xs text-blue-800">
                  <span className="font-bold">Note:</span> Either a Resume
                  or a Self Description is required to generate a
                  personalized interview plan.
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 bg-gray-50 px-5 py-3 flex flex-col sm:flex-row items-center justify-between gap-3">

            <p className="text-xs text-gray-500">
              AI-Powered Strategy Generation • Approx 30s
            </p>

            {/* <button
              className="w-full sm:w-auto px-7 py-3 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 active:scale-95 transition-all duration-200 ease-in-out cursor-pointer"
              type="button"
              onClick={handleGenerateReport}
            >
              Generate My Interview Strategy
            </button> */}

            <button
              className={`w-full sm:w-auto px-7 py-3 bg-black text-white rounded-4xl text-sm font-semibold transition-all duration-200 ease-in-out flex items-center justify-center gap-2 ${loading
                ? "opacity-75 cursor-not-allowed"
                : "hover:bg-gray-700-700 active:scale-95 cursor-pointer"
                }`}
              type="button"
              onClick={handleGenerateReport}
              disabled={loading}
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <span>Generating...</span>
                </>
              ) : (
                "Generate My Interview Strategy"
              )}
            </button>

          </div>
        </div>

      </div>

      {/* Recent reports list */}
      {reports.length > 0 && (
        <section className="max-w-7xl mx-auto mt-8">
          {/* Section Header */}
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-xl font-bold text-gray-800">
                My Recent Interview Plans
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                View your previously generated interview strategies.
              </p>
            </div>

            <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-3 py-2 rounded-lg">
              {reports.length} Reports
            </span>
          </div>

          {/* Reports Grid */}
          <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">

            {reports.map((report) => (
              <li
                className="group bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md hover:border-blue-300 transition-all duration-200 cursor-pointer hover:-translate-y-1"
                key={report._id}
                onClick={() => navigate(`/interview/${report._id}`)}
              >

                {/* Card Header */}
                <div className="flex items-start justify-between gap-3 mb-4">

                  <div className="min-w-0">
                    <h3 className="text-base font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-200 truncate">
                      {report.title || 'Untitled Position'}
                    </h3>

                    <p className="text-xs text-gray-400 mt-1">
                      Generated on {new Date(report.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <span className="shrink-0 w-9 h-9 flex items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <path d="M14 2v6h6" />
                      <path d="M8 13h8" />
                      <path d="M8 17h8" />
                    </svg>
                  </span>

                </div>

                {/* Divider */}
                <div className="border-t border-gray-100 my-4"></div>

                {/* Match Score */}
                <div className="flex items-center justify-between">

                  <span className="text-sm text-gray-500 font-medium">
                    Match Score
                  </span>

                  <span
                    className={`text-sm font-bold px-3 py-1.5 rounded-lg ${report.matchScore >= 80
                      ? 'bg-green-50 text-green-700'
                      : report.matchScore >= 60
                        ? 'bg-amber-50 text-amber-700'
                        : 'bg-red-50 text-red-700'
                      }`}
                  >
                    {report.matchScore}%
                  </span>

                </div>

                {/* View Report */}
                <div className="flex items-center justify-between mt-5 pt-3 border-t border-gray-100">

                  <span className="text-xs font-semibold text-blue-600">
                    View Interview Plan
                  </span>

                  <span className="text-blue-600 group-hover:translate-x-1 transition-transform duration-200">
                    →
                  </span>

                </div>

              </li>
            ))}

          </ul>
        </section>
      )}

    </main>
  )
};
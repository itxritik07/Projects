import React from 'react'

const Home = () => {
  return (
    <main className="min-h-screen bg-gray-100 px-4 py-3 md:px-6 md:py-4">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-5">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">
            Create Your Custom Interview Plan
          </h1>

          <p className="text-xs md:text-sm text-gray-500 max-w-xl mx-auto">
            Let our AI analyze the job requirements and your unique profile
            to build a winning strategy.
          </p>
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

              <textarea
                className="w-full h-[min(42vh,320px)] min-h-55 p-3 text-sm border border-gray-300 rounded-lg outline-none resize-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                name="jobDescription"
                id="jobDescription"
                maxLength={5000}
                placeholder="Paste the full job description here..."
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
                    type="file"
                    name="resume"
                    id="resume"
                    accept=".pdf,.docx"
                    className="hidden"
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
                  name="selfDescription"
                  id="selfDescription"
                  placeholder="Briefly describe your experience, key skills, and years of experience..."
                  className="w-full h-28 p-3 text-sm border border-gray-300 rounded-lg outline-none resize-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
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

            <button
              type="button"
              className="w-full sm:w-auto px-7 py-3 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 active:scale-95 transition-all duration-200 ease-in-out cursor-pointer"
            >
              Generate My Interview Strategy
            </button>

          </div>

        </div>
      </div>
    </main>
  )
};

export default Home;
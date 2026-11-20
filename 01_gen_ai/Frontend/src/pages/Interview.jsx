import { useState, useEffect } from 'react';
import { useInterview } from '../hooks/useInterview.js';
import { useParams } from 'react-router';
import { LogoutButton } from '../components/LogoutButton.jsx';
import Loader from '../components/Loader.jsx';


const NAV_ITEMS = [
  { id: 'technical', label: 'Technical Questions', icon: (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>) },
  { id: 'behavioral', label: 'Behavioral Questions', icon: (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>) },
  { id: 'roadmap', label: 'Road Map', icon: (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11" /></svg>) },
];

// sub-components 
const QuestionCard = ({ item, index }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">

      <div
        className="flex items-center gap-4 p-4 cursor-pointer hover:bg-gray-50 transition-colors duration-200"
        onClick={() => setOpen(o => !o)}
      >
        <span className="shrink-0 w-10 h-10 flex items-center justify-center rounded-lg bg-blue-50 text-blue-600 font-semibold text-sm">
          Q{index + 1}
        </span>

        <p className="flex-1 text-sm md:text-base font-medium text-gray-800 leading-relaxed">
          {item.question}
        </p>

        <span className={`shrink-0 text-gray-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
        </span>
      </div>

      {open && (
        <div className="border-t border-gray-100 bg-gray-50/70 p-4 md:p-5 space-y-5">

          <div className="space-y-2">
            <span className="inline-block text-xs font-semibold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-md">
              Intention
            </span>
            <p className="text-sm text-gray-600 leading-7">
              {item.intention}
            </p>
          </div>

          <div className="space-y-2">
            <span className="inline-block text-xs font-semibold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-md">
              Model Answer
            </span>
            <p className="text-sm text-gray-700 leading-7 whitespace-pre-line">
              {item.answer}
            </p>
          </div>

        </div>
      )}
    </div>
  )
};

const RoadMapDay = ({ day }) => (
  <div className="relative bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow duration-200">

    <div className="flex items-center gap-3 mb-4">
      <span className="shrink-0 bg-blue-600 text-white text-xs font-semibold px-3 py-2 rounded-lg">
        Day {day.day}
      </span>

      <h3 className="text-base font-semibold text-gray-800">
        {day.focus}
      </h3>
    </div>

    <ul className="space-y-3">
      {day.tasks.map((task, i) => (
        <li key={i} className="flex items-start gap-3 text-sm text-gray-600 leading-relaxed">
          <span className="shrink-0 w-2 h-2 rounded-full bg-blue-500 mt-1.5" />
          {task}
        </li>
      ))}
    </ul>

  </div>
);


// main component
export const Interview = () => {
  const [activeNav, setActiveNav] = useState('technical');
  const { report, getReportById, loading, getResumePdf } = useInterview();
  const { interviewId } = useParams();

  // for re-hydration
  useEffect(() => {
    if (interviewId) {
      getReportById({ interviewId })
    }
  }, [interviewId])

  if (loading || !report) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-2xl font-semibold text-blue-600 animate-pulse">
          <Loader />
        </div>
      </main>
    );
  }

  const scoreColor = report.matchScore >= 80
    ? 'border-emerald-500 text-emerald-600 bg-emerald-50'
    : report.matchScore >= 60
      ? 'border-amber-500 text-amber-600 bg-amber-50'
      : 'border-red-500 text-red-600 bg-red-50'
    ;


  return (
    <div className="min-h-screen bg-gray-50 p-3 md:p-6">

      {/* Logout Button */}
      <div className="items-center flex justify-end mb-3">
        <LogoutButton />
      </div>

      <div className="max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[220px_minmax(0,1fr)] xl:grid-cols-[220px_minmax(0,1fr)_260px] gap-5 items-start">

          {/* ── Left Nav ── */}
          <nav className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm lg:sticky lg:top-6">
            <div className="nav-content">
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4 px-2">
                Sections
              </p>

              <div className="flex flex-row flex-wrap lg:flex-col gap-2">
                {NAV_ITEMS.map(item => (
                  <button
                    key={item.id}
                    className={`flex items-center gap-3 w-full text-left px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${activeNav === item.id
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-blue-600'
                      }`}
                    onClick={() => setActiveNav(item.id)}
                  >
                    <span className="shrink-0">
                      {item.icon}
                    </span>

                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="border-t border-gray-100 mt-5 pt-5">
              <button
                className="w-full flex items-center justify-center bg-black text-white text-sm font-semibold py-3 px-4 rounded-4xl hover:bg-gray-700 active:scale-95 transition-all duration-200 cursor-pointer"
                onClick={() => getResumePdf(interviewId)}
              >
                <svg height={"0.8rem"} style={{ marginRight: "0.8rem" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M10.6144 17.7956 11.492 15.7854C12.2731 13.9966 13.6789 12.5726 15.4325 11.7942L17.8482 10.7219C18.6162 10.381 18.6162 9.26368 17.8482 8.92277L15.5079 7.88394C13.7092 7.08552 12.2782 5.60881 11.5105 3.75894L10.6215 1.61673C10.2916.821765 9.19319.821767 8.8633 1.61673L7.97427 3.75892C7.20657 5.60881 5.77553 7.08552 3.97685 7.88394L1.63658 8.92277C.868537 9.26368.868536 10.381 1.63658 10.7219L4.0523 11.7942C5.80589 12.5726 7.21171 13.9966 7.99275 15.7854L8.8704 17.7956C9.20776 18.5682 10.277 18.5682 10.6144 17.7956ZM19.4014 22.6899 19.6482 22.1242C20.0882 21.1156 20.8807 20.3125 21.8695 19.8732L22.6299 19.5353C23.0412 19.3526 23.0412 18.7549 22.6299 18.5722L21.9121 18.2532C20.8978 17.8026 20.0911 16.9698 19.6586 15.9269L19.4052 15.3156C19.2285 14.8896 18.6395 14.8896 18.4628 15.3156L18.2094 15.9269C17.777 16.9698 16.9703 17.8026 15.956 18.2532L15.2381 18.5722C14.8269 18.3526 14.8269 19.3526 15.2381 18.5722L15.9985 19.8732C16.9867 20.3125 18.2198 22.1242 18.2198 22.1242Z"></path></svg>
                Download Resume
              </button>
            </div>
          </nav>

          {/* ── Center Content ── */}
          <main className="min-w-0">
            {activeNav === 'technical' && (
              <section>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
                  <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                    Technical Questions
                  </h2>

                  <span className="text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-100 px-3 py-2 rounded-lg w-fit">
                    {report.technicalQuestions.length} questions
                  </span>
                </div>

                <div className="space-y-3">
                  {report.technicalQuestions.map((q, i) => (
                    <QuestionCard key={i} item={q} index={i} />
                  ))}
                </div>

              </section>
            )}

            {activeNav === 'behavioral' && (
              <section>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
                  <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                    Behavioral Questions
                  </h2>

                  <span className="text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-100 px-3 py-2 rounded-lg w-fit">
                    {report.behavioralQuestions.length} questions
                  </span>
                </div>

                <div className="space-y-3">
                  {report.behavioralQuestions.map((q, i) => (
                    <QuestionCard key={i} item={q} index={i} />
                  ))}
                </div>

              </section>
            )}

            {activeNav === 'roadmap' && (
              <section>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
                  <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                    Preparation Road Map
                  </h2>

                  <span className="text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-100 px-3 py-2 rounded-lg w-fit">
                    {report.preparationPlan.length}-day plan
                  </span>
                </div>

                <div className="space-y-4">
                  {report.preparationPlan.map((day) => (
                    <RoadMapDay key={day.day} day={day} />
                  ))}
                </div>

              </section>
            )}
          </main>

          {/* ── Right Sidebar ── */}
          <aside className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm xl:sticky xl:top-6 space-y-6">
            {/* Match Score */}
            <div className="match-score text-center">
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-5">
                Match Score
              </p>

              <div className={`w-32 h-32 mx-auto rounded-full border-8 flex flex-col items-center justify-center ${scoreColor}`}>
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold tracking-tight">
                    {report.matchScore}
                  </span>

                  <span className="text-lg font-semibold">
                    %
                  </span>
                </div>
              </div>

              <p className="text-sm font-medium text-gray-600 mt-4">
                Strong match for this role
              </p>
            </div>

            <div className="border-t border-gray-100" />

            {/* Skill Gaps */}
            <div className="skill-gaps">
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">
                Skill Gaps
              </p>

              <div className="flex flex-wrap gap-2">
                {report.skillGaps.map((gap, i) => (
                  <span
                    key={i}
                    className={`text-xs font-semibold px-3 py-2 rounded-lg border ${gap.severity === 'high'
                      ? 'bg-red-50 text-red-700 border-red-100'
                      : gap.severity === 'medium'
                        ? 'bg-amber-50 text-amber-700 border-amber-100'
                        : 'bg-green-50 text-green-700 border-green-100'
                      }`}
                  >
                    {gap.skill}
                  </span>
                ))}
              </div>
            </div>



          </aside>

        </div>
      </div>
    </div>
  )
};
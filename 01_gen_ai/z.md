# Backend
### MongoDb Connection:
- email: alphagem47@gmail.com
- Project: Project-gen-ai


### Authentication:
1. registerUserController() 
- get username, email, password from req.body
- Check: if user already exists
- bcryptjs: hash password
- register a new user
- JWT token: create JWT token   
- cookies: set token in cookie and read token from cookie
```
localhost:3000/api/auth/register
```

2. loginUserController() 
- get email, password from req.body
- Check: if user already exists with this email
- compare password
- JWT token: create JWT token  
- cookies: set token in cookie and read token from cookie
```
localhost:3000/api/auth/login
```

3. logoutUserController()
- get token from req.cookies.token
- clearCookies
```
localhost:3000/api/auth/logout
```

### Middleware: 
- token verification for authUser
- get token from cookies
- verify token

4. getMeController()
- get the current logged in user details



# Differentiate Frontend & Backend 
- Backend (Node, Express)
- Frontend (React + Vite)


### 4 Layers Architecture in Frontend:
1. UI: designing part
- component
- pages

2. API: for communication with backend
- services
- auth.api.js

3. State: data store
- auth.context.jsx
- ai.context.jsx

4. Hook: for managing state and API layers
- hooks

------------------------

### UI includes navigation (routes)
- login page
- register page

### Services
- auth API's - (interact frontend with backend)
- using base URL for shorten code

### Context
- AuthContext

### Hooks
- useAuth.js - (managing two layers: services and context layer)
- handleRegister()
- handleLogin()
- handleLogout()
- getAndSetUser as getMe()

### cors installation in Backend
- **Note:** backend and frontend origin should be same(localhost:5173)

### 2 way binding
- username, email, password

### Protected Route
- protect homepage using protected routes
- without login or register user can't see homepage, redirects to login page
- it takes hooks(useAuth.js) & navigate


### Note:
- if we login, it redirects us to homepage
- then reload it redirects to login page again
- setLoading should be (true)

# Main Feature (using AI Model Gemini) (Backend)
### New Schema: interviewReportSchema
- technicalQuestionSchema: [question, intention, answer]
- behavioralQuestionSchema: [question, intention, answer]
- skillGapSchema: [skill, severity]
- preparationPlanSchema: [day, focus, tasks]

- **interviewReportSchema**


### Services
- ai.service.js
- **Google AI Studio**

- for testing: 
- tempSample.js file 
- invokeGeminiAi(): [resume, selfDescription, jobDescription]

- remember **Structure Outputs**
1. Interaction API
2. Generate Context Api ✅

- The AI will generate the data in whatever structure you want.

**zod and zod-to-json-schema pkg installation**

- interviewReportSchema(): this schema is for AI in **Services**
- generateInterviewReport(): [resume, selfDescription, jobDescription]

- testing this function in **app.js**
- then clean up **tempSample.js**

### Generate API demands: 
1. PDF of Resume
2. Self Description in text format
3. Job Description in text format
- this **Generates the AI Interview Report**

### Routes
2. interview.routes.js
- interviewRouter.post("/", authUser, generateInterviewReportController);

### app.js


### homepage
```
{/* Recent reports list */}
{/* {reports.length > 0 && (
  <section className=''>
  <h2>My Recent Interview Plans</h2>
      <ul>
        {reports.map((report) => (
          <li
            className=''
            key={report._id}
            onClick={() => navigate(`/interview/${report._id}`)}
          >
            <h3>{report.title || 'Untitled Position'}</h3>
            <p className='report-meta'>Generated on {new Date(report.createdAt).toLocaleDateString()}</p>
           <p className={`match-score ${report.matchScore >= 80 ? 'score--high' : report.matchScore >= 60 ? 'score--mid' : 'score--low'}`}>Match Score: {report.matchScore}%</p>
          </li>
      ))}
     </ul>
  </section>
)} */}
```
### backend services
```
test:
export const invokeGeminiAi = async () => {
    const response = await ai.models.generateContent({
        model: "gemini-3.5-flash-lite",
        contents: "Hello Gemini! Explain what is interview?"
    });
    console.log(response.text)
}
```
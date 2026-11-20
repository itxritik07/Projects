# AI Interview Preparation Platform

A full-stack MERN and Gemini AI application that creates a personalized interview strategy from a job description and candidate profile.

The application supports:

- User registration, login, logout, and session verification
- PDF resume upload and text extraction
- AI-generated match score
- Technical and behavioral interview questions
- Interview answer guidance
- Skill-gap detection
- Day-by-day preparation roadmap
- ATS-friendly tailored resume PDF generation
- History of previously generated interview reports

## Technology Stack

### Frontend

- React 19
- Vite 8
- React Router 8
- Axios
- Tailwind CSS 4
- Styled Components
- Sass
- ESLint

### Backend

- Node.js
- Express 5
- MongoDB
- Mongoose
- JWT authentication
- bcrypt password hashing
- Google Gemini API through `@google/genai`
- Zod for AI response schemas
- Multer for PDF uploads
- `pdf-parse` for extracting text from resumes
- Puppeteer for converting generated HTML resumes to PDF

## Project Structure

```text
01_gen_ai/
|-- Backend/
|   |-- server.js
|   |-- package.json
|   `-- src/
|       |-- app.js
|       |-- config/
|       |   `-- db.js
|       |-- controllers/
|       |   |-- auth.controller.js
|       |   `-- interview.controller.js
|       |-- middlewares/
|       |   |-- auth.middleware.js
|       |   `-- file.middleware.js
|       |-- models/
|       |   |-- blacklist.model.js
|       |   |-- interviewReport.model.js
|       |   `-- user.model.js
|       |-- routes/
|       |   |-- auth.routes.js
|       |   `-- interview.routes.js
|       `-- services/
|           `-- ai.service.js
`-- Frontend/
    |-- package.json
    |-- vite.config.js
    |-- index.html
    `-- src/
        |-- App.jsx
        |-- components/
        |-- context/
        |-- hooks/
        |-- pages/
        |-- routes/
        `-- services/
```

## Backend Setup

### 1. Enter the backend directory

```bash
cd Backend
```

### 2. Initialize dependencies

The project already contains a `package.json`. Install all declared backend packages with:

```bash
npm install
```

If dependencies need to be installed manually, use:

```bash
npm install express mongoose dotenv cors cookie-parser jsonwebtoken bcryptjs multer pdf-parse puppeteer @google/genai zod zod-to-json-schema
```

### Backend Package Guide

| Package | Purpose |
|---|---|
| `express` | Creates the HTTP server, routes, middleware, and JSON API |
| `mongoose` | Connects to MongoDB and defines models and validation |
| `dotenv` | Loads environment variables from `.env` |
| `cors` | Allows the React frontend to call the backend |
| `cookie-parser` | Reads the JWT stored in browser cookies |
| `jsonwebtoken` | Creates and verifies seven-day authentication tokens |
| `bcryptjs` | Hashes passwords before storage and compares login passwords |
| `multer` | Accepts the resume upload and keeps the file in memory |
| `pdf-parse` | Converts resume PDF content into searchable text |
| `puppeteer` | Opens generated resume HTML in Chromium and exports it as PDF |
| `@google/genai` | Sends prompts to Google Gemini |
| `zod` | Defines and validates structured AI response types |
| `zod-to-json-schema` | Converts Zod schemas into JSON schemas for Gemini responses |

### 3. Create `Backend/.env`

```env
MONGO_URI=mongodb_connection_string
JWT_SECRET=long_random_secret
GOOGLE_GENAI_API_KEY=google_gemini_api_key
```

Environment variable details:

- `MONGO_URI`: MongoDB database connection string
- `JWT_SECRET`: Secret used to sign and verify JWT cookies
- `GOOGLE_GENAI_API_KEY`: API key for Google Gemini

Do not commit real secrets. If credentials have already been committed, revoke and replace them immediately.

### 4. Start MongoDB and the backend

```bash
node server.js
```

The backend runs at:

```text
http://localhost:3000
```

The server connects to MongoDB and then starts Express on port `3000`.

## Frontend Setup

### 1. Enter the frontend directory

```bash
cd Frontend
```

### 2. Install frontend dependencies

```bash
npm install
```

If dependencies need to be installed manually, use:

```bash
npm install react react-dom react-router axios
npm install tailwindcss @tailwindcss/vite sass styled-components
npm install -D vite @vitejs/plugin-react eslint @eslint/js eslint-plugin-react-hooks eslint-plugin-react-refresh globals @types/react @types/react-dom
```

### Frontend Package Guide

| Package | Purpose |
|---|---|
| `react` / `react-dom` | Builds the component-based user interface |
| `react-router` | Handles login, registration, home, and report routes |
| `axios` | Sends HTTP requests and supports credentialed cookie requests |
| `tailwindcss` / `@tailwindcss/vite` | Provides utility CSS and Vite integration |
| `sass` | Provides Sass support for project styles |
| `styled-components` | Creates component-scoped styles, used by the logout button |
| `vite` | Runs the development server and creates the production build |
| `@vitejs/plugin-react` | Enables React JSX and Fast Refresh |
| `eslint` and plugins | Checks JavaScript/React code for errors and issues |

### 3. Start the frontend

```bash
npm run dev
```

The Vite development server normally runs at:

```text
http://localhost:5173
```

### 4. Production build

```bash
npm run build
npm run preview
```

## How the Backend Works

### Application Entry Flow

```text
Frontend
  -> Axios request
  -> Express app
  -> Route
  -> Authentication/upload middleware
  -> Controller
  -> Mongoose model or Gemini/Puppeteer service
  -> JSON or PDF response
  -> Frontend context and page
```

`server.js` loads environment variables, connects MongoDB, imports `app.js`, and listens on port `3000`.

`src/app.js` configures:

- JSON request parsing
- Cookie parsing
- CORS for `http://localhost:5173`
- Credentialed requests
- `/api/auth` routes
- `/api/interview` routes

## Database Models

### User Model

Stores:

- Unique username
- Unique email
- Hashed password

The plain password is never stored. The auth controller creates a bcrypt hash before calling `User.create()`.

### Blacklist Model

Stores JWT values after logout.

The authentication middleware checks this collection before accepting a request. A logged-out token cannot be reused until it expires or is removed.

### Interview Report Model

Stores one report for a specific user:

- Owning user ID
- Resume text
- Self description
- Job description
- Job title
- Match score
- Technical questions
- Behavioral questions
- Skill gaps
- Day-by-day preparation plan
- Creation and update timestamps

Question objects contain a question, the interviewer's intention, and a model answer. Preparation-plan objects contain a day number, focus area, and task list.

## Authentication Controllers

The auth controllers are in `src/controllers/auth.controller.js`.

### `registerUserController`

Responsibilities:

1. Read `username`, `email`, and `password`.
2. Reject missing fields.
3. Check whether the username or email already exists.
4. Hash the password with bcrypt using 10 salt rounds.
5. Create the user in MongoDB.
6. Create a JWT containing the user ID and username.
7. Store the JWT in the `token` cookie.
8. Return the public user details.

### `loginUserController`

Responsibilities:

1. Read `email` and `password`.
2. Find the user by email.
3. Compare the submitted password with the stored bcrypt hash.
4. Create and set a seven-day JWT cookie for valid credentials.
5. Return the public user details.

### `logoutUserController`

Responsibilities:

1. Read the JWT from the request cookie.
2. Add it to the blacklist model.
3. Clear the browser's `token` cookie.
4. Return a logout success response.

### `getMeController`

Responsibilities:

1. Read `req.user.id`, set by `authUser`.
2. Load the current user from MongoDB.
3. Return the username, email, and user ID.

## Authentication Middleware

`src/middlewares/auth.middleware.js` exports `authUser`.

Its work is:

1. Read the `token` cookie.
2. Return `401` when no token exists.
3. Check the MongoDB blacklist.
4. Return `401` for a blacklisted token.
5. Verify the JWT signature and expiry.
6. Attach the decoded user data to `req.user`.
7. Continue to the controller.

## Interview Controllers

The interview controllers are in `src/controllers/interview.controller.js`.

### `generateInterviewReportController`

Responsibilities:

1. Confirm that a resume file is present.
2. Confirm that both self description and job description are present.
3. Parse the PDF with `PDFParse`.
4. Extract resume text.
5. Send the resume, self description, and job description to `generateInterviewReport()`.
6. Create an interview-report document owned by `req.user.id`.
7. Store the AI result, extracted resume text, and original inputs.
8. Return status `201` and the complete report.

The current Multer middleware accepts up to 3 MB. The frontend currently displays 5 MB; the backend-enforced 3 MB limit is authoritative.

### `getInterviewReportIdController`

Responsibilities:

1. Read `interviewId` from the URL.
2. Search for a report with both that ID and the logged-in user ID.
3. Return `404` when no authorized report exists.
4. Return `200` and the complete report for valid requests.

This user-ID filter prevents one user from reading another user's report.

### `getAllInterviewReportsController`

Responsibilities:

1. Find all reports belonging to `req.user.id`.
2. Sort newest reports first.
3. Exclude large or detailed fields that are not needed for cards.
4. Return the report ID, title, match score, and timestamps.

### `generateResumePdfController`

Responsibilities:

1. Read `interviewReportId`.
2. Find the report.
3. Read its stored resume text, self description, and job description.
4. Call `generateResumePdf()`.
5. Set PDF response headers.
6. Send the generated PDF as a downloadable attachment.

## AI Service

`src/services/ai.service.js` contains two main functions.

### `generateInterviewReport`

1. Builds a Gemini prompt from the resume, self description, and job description.
2. Uses model `gemini-3.5-flash-lite`.
3. Applies a Zod-generated JSON response schema.
4. Requires the model to return JSON.
5. Parses and returns:
   - Match score
   - Technical questions
   - Behavioral questions
   - Skill gaps
   - Preparation plan
   - Job title

### `generateResumePdf`

1. Sends the candidate and job data to Gemini.
2. Requests ATS-friendly, professional HTML for a concise resume.
3. Parses the returned JSON.
4. Opens the HTML in Puppeteer.
5. Converts the HTML to an A4 PDF.
6. Adds standard margins.
7. Returns a PDF buffer to the controller.

## API Routes

### Authentication

| Method | Endpoint | Access | Work |
|---|---|---|---|
| `POST` | `/api/auth/register` | Public | Create account and set auth cookie |
| `POST` | `/api/auth/login` | Public | Verify credentials and set auth cookie |
| `POST` | `/api/auth/logout` | Public | Blacklist token and clear cookie |
| `GET` | `/api/auth/get-me` | Private | Return logged-in user |

### Interview

| Method | Endpoint | Access | Work |
|---|---|---|---|
| `POST` | `/api/interview` | Private | Upload resume and generate report |
| `GET` | `/api/interview/report/:interviewId` | Private | Fetch one complete report owned by the user |
| `GET` | `/api/interview` | Private | Fetch all report summaries for the user |
| `POST` | `/api/interview/resume/pdf/:interviewReportId` | Private | Generate and download a tailored resume PDF |

## Frontend Architecture

### Providers and Context

`AuthContext` stores:

- Current user
- Authentication loading state

`InterviewContext` stores:

- Current report
- Report list
- Interview loading state

Both providers wrap the React application in `App.jsx`.

### Custom Hooks

`useAuth` provides:

- `handleRegister`
- `handleLogin`
- `handleLogout`
- Current user and loading state
- Initial session check through `get-me`

`useInterview` provides:

- Report generation
- Fetch by report ID
- Fetch all reports
- Tailored resume PDF download
- Report and loading state

### API Services

`auth.api.js` contains the register, login, logout, and session-check Axios calls.

`interview.api.js` contains report creation, report retrieval, report history, and PDF download calls.

Both Axios instances use:

- Base URL `http://localhost:3000`
- `withCredentials: true`

### Routes

- `/login`: Login page
- `/register`: Registration page
- `/`: Protected home/dashboard page
- `/interview/:interviewId`: Protected interview report page

`ProtectedRoutes` waits for the authentication check, redirects unauthenticated users to `/login`, and renders protected pages only for authenticated users.

## Frontend-to-Backend Request Flow

### Registration

```text
Register page
  -> useAuth.handleRegister()
  -> auth.api.register()
  -> POST /api/auth/register
  -> registerUserController
  -> User model
  -> JWT cookie
  -> Navigate to /
```

### Login

```text
Login page
  -> useAuth.handleLogin()
  -> auth.api.login()
  -> POST /api/auth/login
  -> loginUserController
  -> bcrypt password comparison
  -> JWT cookie
  -> Navigate to /
```

### Report Generation

```text
Home form
  -> Select resume PDF
  -> Enter job description and/or self description
  -> useInterview.generateReport()
  -> interview.api.generateInterviewReport()
  -> POST /api/interview with multipart/form-data
  -> authUser middleware
  -> file middleware
  -> generateInterviewReportController
  -> PDF text extraction
  -> Gemini interview-report generation
  -> InterviewReport model
  -> Navigate to /interview/:interviewId
```

### Report View

```text
Interview route
  -> useInterview reads route ID
  -> GET /api/interview/report/:interviewId
  -> authUser middleware
  -> getInterviewReportIdController
  -> Render match score, skill gaps, questions, answers, and roadmap
```

### Resume Download

```text
Download Resume button
  -> useInterview.getResumePdf()
  -> POST /api/interview/resume/pdf/:interviewReportId
  -> Gemini HTML generation
  -> Puppeteer PDF generation
  -> Blob response
  -> Browser download
```

## Frontend Pages and Components

### `Home.jsx`

- Collects job description
- Collects an optional self description
- Accepts resume PDF input
- Generates a report
- Lists previous report summaries
- Opens a selected report
- Displays loading state

### `Login.jsx`

- Collects email and password
- Calls login
- Provides navigation to registration

### `Register.jsx`

- Collects username, email, and password
- Calls registration
- Provides navigation to login

### `Interview.jsx`

- Displays match score
- Displays technical questions and model answers
- Displays behavioral questions and model answers
- Displays skill gaps
- Displays the day-by-day roadmap
- Downloads the tailored resume PDF

### Shared Components

- `Loader.jsx`: Loading indicator
- `LogoutButton.jsx`: Styled logout control

## Usage Guide

1. Start MongoDB and create `Backend/.env`.
2. Start the backend on port `3000`.
3. Start the frontend on port `5173`.
4. Open `http://localhost:5173/register`.
5. Create an account.
6. Enter a target job description.
7. Upload a PDF resume or enter a self description.
8. Generate the interview strategy.
9. Open technical questions, behavioral questions, and the roadmap.
10. Download the AI-tailored resume PDF.
11. Return to the home page to see previous reports.

## Validation and Commands

Backend:

```bash
cd Backend
node server.js
```

Frontend:

```bash
cd Frontend
npm run dev
npm run lint
npm run build
npm run preview
```

## Important Implementation Notes

- The JWT is stored in a cookie and Axios must use credentials.
- CORS currently allows only `http://localhost:5173`.
- Backend PDF upload size is limited to 3 MB.
- Resume upload uses `.pdf` in the frontend.
- AI output structure is controlled by Zod schemas.
- Reports are isolated by the logged-in user ID.
- Logout invalidates the token through the blacklist collection.
- The token, database, and Gemini secrets must be kept in environment variables and never committed.

import 'dotenv/config';
import app from "./src/app.js";
import connectDB from './src/config/db.js';
// import { invokeGeminiAi } from './src/services/ai.service.js';
import { jobDescription, resume, selfDescription } from './src/services/tempSample.js';
import { generateInterviewReport } from './src/services/ai.service.js';


connectDB();
// invokeGeminiAi();
generateInterviewReport({resume, selfDescription, jobDescription});


app.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});




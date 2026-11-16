import "./App.css";
import { RouterProvider } from "react-router";
import { AppRoutes } from "./routes/AppRoutes.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { InterviewProvider } from "./context/InterviewContext.jsx";


const App = () => {
  return (
    <>
      <AuthProvider>
        <InterviewProvider >
          <RouterProvider router={AppRoutes} />
        </InterviewProvider>
      </AuthProvider>
    </>
  )
};

export default App;
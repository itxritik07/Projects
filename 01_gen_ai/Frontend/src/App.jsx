import "./App.css";
import { RouterProvider } from "react-router";
import { AppRoutes } from "./routes/AppRoutes.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";


const App = () => {
  return (
    <>
      <AuthProvider>
        <RouterProvider router={AppRoutes} />
      </AuthProvider>
    </>
  )
};

export default App;
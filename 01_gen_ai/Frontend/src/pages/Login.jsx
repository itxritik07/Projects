import "../App.css";
import { useAuth } from "../hooks/useAuth.js"
import { useState } from "react";
import { useNavigate, Link } from "react-router";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { loading, handleLogin } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleLogin({ email, password });
    navigate("/");
  };

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-100">
        <h1 className="text-2xl font-semibold text-blue-600 animate-pulse">
          Loading...
        </h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Login</h1>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* email */}
          <div className="flex flex-col gap-2">
            <label
              className="text-sm font-medium text-gray-700"
              htmlFor="email"
            >
              Email
            </label>

            <input
              className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              type="email"
              id="email"
              name="email"
              placeholder="Enter email address"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* password */}
          <div className="flex flex-col gap-2">
            <label
              className="text-sm font-medium text-gray-700"
              htmlFor="password"
            >
              Password
            </label>

            <input
              className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              type="password"
              id="password"
              name="password"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* button login */}
          <button
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 active:scale-95 transition-all duration-200 ease-in-out cursor-pointer"
            type="submit"
          >
            Login
          </button>

        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          {/* {" "} is used in JSX to add a single space between two elements or text expressions. */}
          Don't have an account?{" "}
          <Link
            className="font-semibold text-blue-600 hover:text-blue-700 hover:underline transition-colors duration-200"
            to="/register"
          >
            Register
          </Link>
        </p>

      </div>
    </main>
  )
};

export default Login;
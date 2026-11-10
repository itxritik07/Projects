import { useNavigate, Link } from "react-router"
const Register = () => {

  const handleSubmit = (e) => {
    e.preventDefault();

  };

  const navigate = useNavigate();

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Register</h1>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* username */}
          <div className="flex flex-col gap-2">
            <label
              className="text-sm font-medium text-gray-700"
              htmlFor="username"
            >
              Username
            </label>

            <input
              className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              type="username"
              id="username"
              name="username"
              placeholder="Enter username"
            />
          </div>

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
            />
          </div>

          {/* button register */}
          <button
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 active:scale-95 transition-all duration-200 ease-in-out cursor-pointer"
            type="submit"
          >
            Register
          </button>

        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <Link
            className="font-semibold text-blue-600 hover:text-blue-700 hover:underline transition-colors duration-200"
            to="/login"
          >
            Login
          </Link>
        </p>

      </div>
    </main>
  )
};

export default Register;
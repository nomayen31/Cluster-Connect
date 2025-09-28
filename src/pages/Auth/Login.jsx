import React, { useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { FaGithub } from "react-icons/fa";
import { AuthContext } from "../../Provider/AuthProvider";


const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const {
    signInUser,
    setUser,
    signInWithGithub,
    signInWithGoogle,
  } = useContext(AuthContext);

  const location = useLocation();
  const navigate = useNavigate();

  // Email-password login
  const handleLogin = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = form.get("email")?.trim();
    const password = form.get("password");

    signInUser(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setUser(user);
        alert("Login successful!");
        navigate(location.state ? location.state : "/");
      })
      .catch((err) => setError(err.code));
  };

  // Google Login
  const handleGoogleLogin = () => {
    signInWithGoogle()
      .then((result) => {
        setUser(result.user);
        alert("Google login successful!");
        navigate(location.state ? location.state : "/");
      })
      .catch((err) => setError(err.code));
  };

  // GitHub Login
  const handleGithubLogin = () => {
    signInWithGithub()
      .then((result) => {
        setUser(result.user);
        alert("GitHub login successful!");
        navigate(location.state ? location.state : "/");
      })
      .catch((err) => setError(err.code));
  };

  return (
    <div className="bg-gray-50 font-sans min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl overflow-hidden max-w-5xl w-full mx-auto my-8">
        <div className="lg:flex">
          {/* Left Panel */}
          <div className="lg:w-1/2 p-12 lg:min-h-full hidden lg:flex flex-col items-center justify-center bg-gradient-to-br from-sky-100 to-blue-200 text-primary-blue">
            <img
              src="https://plus.unsplash.com/premium_photo-1675404521313-a0fdc626f5b3?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Secure illustration"
              className="w-full h-full object-cover rounded-lg shadow-lg"
            />
          </div>

          {/* Right Panel */}
          <div className="lg:w-1/2 p-8 sm:p-12">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-primary-blue mb-8 text-center sm:text-left">
              Welcome, to <span className="text-green-700">Cluster Connect</span>
            </h1>
            <p className="m-4 text-black">
              Work with talented people at the most affordable price to get the
              most out of your time and cost.
            </p>

            {/* Social Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <button
                onClick={handleGoogleLogin}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:shadow-md transition duration-150 w-full sm:w-auto justify-center"
              >
                <FcGoogle className="text-2xl" />
                <span className="text-gray-700 font-medium">
                  Login with Google
                </span>
              </button>

              <button
                onClick={handleGithubLogin}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:shadow-md transition duration-150 w-full sm:w-auto justify-center"
              >
                <FaGithub className="text-xl text-gray-700" />
                <span className="text-gray-700 font-medium">
                  Login with GitHub
                </span>
              </button>
            </div>

            {/* Error */}
            {error && (
              <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
            )}

            {/* Form */}
            <form onSubmit={handleLogin}>
              <div className="space-y-6">
                {/* Email Input */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs font-semibold text-gray-500 mb-1"
                  >
                    Email
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect width="20" height="16" x="2" y="4" rx="2" />
                        <path d="m22 7-10 7L2 7" />
                      </svg>
                    </span>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="you@example.com"
                      required
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-primary-blue transition duration-150"
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div>
                  <label
                    htmlFor="password"
                    className="block text-xs font-semibold text-gray-500 mb-1"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                      {/* Lock Icon */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect
                          width="18"
                          height="11"
                          x="3"
                          y="11"
                          rx="2"
                          ry="2"
                        />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                    </span>

                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      id="password"
                      placeholder="Password"
                      required
                      className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-primary-blue transition duration-150"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-primary-blue"
                      aria-label="Toggle password visibility"
                    >
                      {showPassword ? (
                        <HiOutlineEyeOff className="h-5 w-5" />
                      ) : (
                        <HiOutlineEye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Forgot Password */}
              <div className="flex justify-start mt-2">
                <a
                  href="#"
                  className="text-xs text-primary-blue hover:text-blue-700 transition duration-150 font-semibold"
                >
                  Forgot password?
                </a>
              </div>

              {/* Buttons */}
              <div className="flex space-x-4 mt-8">
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-blue-700 text-white font-semibold text-lg rounded-lg shadow-md hover:bg-blue-900 transition duration-150 focus:outline-none focus:ring-2 focus:ring-primary-blue focus:ring-opacity-50"
                >
                  Login
                </button>
                <Link
                  to="/auth/register"
                  type="button"
                  className="flex-1 px-6 py-3 text-center bg-white text-primary-blue border-2 border-primary-blue font-semibold text-lg rounded-lg hover:bg-blue-50 transition duration-150 focus:outline-none focus:ring-2 focus:ring-primary-blue focus:ring-opacity-50"
                >
                  Register
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

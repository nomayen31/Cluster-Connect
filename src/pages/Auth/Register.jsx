import React, { useState, useContext } from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import { AuthContext } from "../../Provider/AuthProvider";

// InputField Component
const InputField = ({ label, type, placeholder, id, onChange, value }) => {
  const isPassword = type === "password";
  const [fieldType, setFieldType] = useState(type);
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible((prev) => !prev);
    setFieldType(isVisible ? "password" : "text");
  };

  return (
    <div className="flex flex-col space-y-2">
      <label htmlFor={id} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={isPassword ? fieldType : type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
        />
        {isPassword && (
          <button
            type="button"
            onClick={toggleVisibility}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition"
            aria-label={isVisible ? "Hide password" : "Show password"}
          >
            {isVisible ? (
              <FiEye className="h-5 w-5" />
            ) : (
              <FiEyeOff className="h-5 w-5" />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

// Register Component
const Register = () => {
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { createNewUser, setUser, signInWithGithub, signInWithGoogle } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    const { name, email, password } = formData;

    createNewUser(email, password)
      .then((result) => {
        const user = result.user;
        updateProfile(user, {
          displayName: name,
        })
          .then(() => {
            setUser({
              ...user,
              displayName: name,
            });
            alert("Registration successful!");
            navigate(location.state?.from || "/");
          })
          .catch((error) => {
            setError("Error updating user profile: " + error.message);
          });
      })
      .catch((error) => {
        setError("Error registering user: " + error.message);
      });
  };

  const handleGoogleLogin = () => {
    signInWithGoogle()
      .then((result) => {
        const user = result.user;
        setUser(user);
        alert("Google login successful!");
        navigate(location.state?.from || "/");
      })
      .catch((error) => setError(error.message));
  };

  const handleGithubLogin = () => {
    signInWithGithub()
      .then((result) => {
        const user = result.user;
        setUser(user);
        alert("GitHub login successful!");
        navigate(location.state?.from || "/");
      })
      .catch((error) => setError(error.message));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center font-sans">
      <div className="flex w-full max-w-7xl mx-auto rounded-xl shadow-2xl overflow-hidden min-h-[80vh]">
        {/* Left Panel */}
        <div className="w-full lg:w-1/2 p-8 sm:p-14 bg-white flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
              Create an Account
            </h1>
            <p className="text-gray-500 mb-8">Join now to get started!</p>

            {error && <div className="text-red-500 mb-4">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-6">
              <InputField
                id="name"
                label="Name"
                type="text"
                placeholder="Roger Gerrard"
                value={formData.name}
                onChange={handleChange}
                name="name"
              />
              <InputField
                id="email"
                label="Email"
                type="email"
                placeholder="email@domain.com"
                value={formData.email}
                onChange={handleChange}
                name="email"
              />
              <InputField
                id="password"
                label="Password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                name="password"
              />
              <InputField
                id="confirmPassword"
                label="Confirm Password"
                type="password"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                name="confirmPassword"
              />

              <button
                type="submit"
                className="w-full py-3 mt-4 text-lg font-semibold text-white bg-green-500 rounded-lg shadow-md transition duration-200 hover:bg-green-600"
              >
                Register
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center my-6">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="flex-shrink mx-4 text-gray-500 text-sm">
                Or Register With
              </span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            {/* Social Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <button
                onClick={handleGoogleLogin}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:shadow-md transition duration-150 w-full sm:w-auto justify-center"
              >
                <FcGoogle className="text-2xl" />
                <span className="text-gray-700 font-medium">Register with Google</span>
              </button>

              <button
                onClick={handleGithubLogin}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:shadow-md transition duration-150 w-full sm:w-auto justify-center"
              >
                <FaGithub className="text-xl text-gray-700" />
                <span className="text-gray-700 font-medium">Register with GitHub</span>
              </button>
            </div>

            {/* Sign In */}
            <div className="text-center mt-6">
              <p className="text-sm text-gray-500">
                Already Have an Account?
                <Link
                  to="/login"
                  className="text-indigo-600 hover:text-indigo-700 font-semibold ml-1 transition duration-150"
                >
                  Sign In.
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="hidden lg:block lg:w-1/2 h-full">
          <img
            src="https://plus.unsplash.com/premium_photo-1676837121452-c722f77da9f9?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Illustration"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Register;

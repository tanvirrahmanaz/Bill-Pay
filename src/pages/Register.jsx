import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { FaGoogle, FaUser, FaEnvelope, FaLock, FaImage, FaUserPlus } from "react-icons/fa";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [error, setError] = useState("");
  const [passwordErrors, setPasswordErrors] = useState({
    uppercase: false,
    lowercase: false,
    length: false
  });
  
  const { registerUser, updateUserProfile, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const validatePassword = (pass) => {
    setPasswordErrors({
      uppercase: /[A-Z]/.test(pass),
      lowercase: /[a-z]/.test(pass),
      length: pass.length >= 6
    });
    
    return /[A-Z]/.test(pass) && /[a-z]/.test(pass) && pass.length >= 6;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    
    if (!validatePassword(password)) {
      setError("Password does not meet requirements");
      return;
    }
    
    try {
      // Register user and wait for the result
      await registerUser(email, password);
      
      // After successful registration, update the user profile
      await updateUserProfile(name, photoURL);
      
      // Navigate to home page
      navigate("/");
    } catch (error) {
      setError("Registration failed. Please try again.");
      console.error("Registration error:", error);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    
    try {
      await loginWithGoogle();
      navigate("/");
    } catch (error) {
      setError("Failed to login with Google. Please try again.");
      console.error("Google login error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-primary/20 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6 bg-white p-8 rounded-xl shadow-lg border border-gray-100">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
            Create an Account
          </h2>
          <p className="text-sm text-gray-600">
            Join us today and start managing your bills
          </p>
        </div>
        
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-md flex items-center space-x-2 animate-fade-in">
            <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <span>{error}</span>
          </div>
        )}
        
        <form className="mt-6 space-y-5" onSubmit={handleRegister}>
          <div className="space-y-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaUser className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition duration-150 ease-in-out"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaEnvelope className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition duration-150 ease-in-out"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaImage className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="photo-url"
                name="photo-url"
                type="text"
                className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition duration-150 ease-in-out"
                placeholder="Photo URL (optional)"
                value={photoURL}
                onChange={(e) => setPhotoURL(e.target.value)}
              />
            </div>
            
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition duration-150 ease-in-out"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  validatePassword(e.target.value);
                }}
              />
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <p className="text-sm font-medium text-gray-700 mb-2">Password Requirements:</p>
            <ul className="text-sm space-y-2 pl-1">
              <li className="flex items-center">
                <span className={`mr-2 flex items-center justify-center w-5 h-5 rounded-full ${passwordErrors.uppercase ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}>
                  {passwordErrors.uppercase ? "✓" : "✗"}
                </span>
                <span className={passwordErrors.uppercase ? "text-green-600" : "text-red-600"}>
                  Uppercase letter
                </span>
              </li>
              <li className="flex items-center">
                <span className={`mr-2 flex items-center justify-center w-5 h-5 rounded-full ${passwordErrors.lowercase ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}>
                  {passwordErrors.lowercase ? "✓" : "✗"}
                </span>
                <span className={passwordErrors.lowercase ? "text-green-600" : "text-red-600"}>
                  Lowercase letter
                </span>
              </li>
              <li className="flex items-center">
                <span className={`mr-2 flex items-center justify-center w-5 h-5 rounded-full ${passwordErrors.length ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}>
                  {passwordErrors.length ? "✓" : "✗"}
                </span>
                <span className={passwordErrors.length ? "text-green-600" : "text-red-600"}>
                  At least 6 characters
                </span>
              </li>
            </ul>
          </div>
          
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-primary hover:bg-primary-focus focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition duration-150 ease-in-out shadow-md"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <FaUserPlus className="h-5 w-5 text-primary-dark group-hover:text-white transition ease-in-out duration-150" />
              </span>
              Create Account
            </button>
          </div>
        </form>
        
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Or continue with
              </span>
            </div>
          </div>
          
          <div className="mt-6">
            <button
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
            >
              <FaGoogle className="h-5 w-5 mr-2 text-red-500" />
              Sign up with Google
            </button>
          </div>
        </div>
        
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-primary hover:text-primary-focus transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
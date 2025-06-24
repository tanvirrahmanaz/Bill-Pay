// src/pages/ErrorPage.jsx
import { Link, useRouteError } from "react-router-dom";
import { FaHome } from "react-icons/fa";

const ErrorPage = () => {
  const error = useRouteError();
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-primary">404</h1>
        <h2 className="text-2xl font-semibold mt-4 mb-6">
          {error?.statusText || error?.message || "Page not found"}
        </h2>
        <p className="text-gray-600 mb-8">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <Link to="/" className="btn btn-primary">
          <FaHome className="mr-2" /> Back to Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
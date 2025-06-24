// src/App.jsx
import { RouterProvider } from "react-router-dom";
import router from "./routes/Routes";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";
import { useState, useEffect } from "react";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if Firebase is initialized
    const checkFirebase = async () => {
      try {
        // Import Firebase config to trigger initialization
        await import("./firebase/firebase.config");
        setIsLoading(false);
      } catch (err) {
        console.error("Firebase initialization error:", err);
        setError(err.message);
        setIsLoading(false);
      }
    };

    checkFirebase();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <div className="text-center">
          <div className="loading loading-spinner loading-lg text-primary"></div>
          <p className="mt-4 text-lg">Loading application...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <div className="text-center p-8 bg-base-100 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-error mb-4">Error Loading Application</h2>
          <p className="text-base-content mb-4">{error}</p>
          <p className="text-sm text-base-content/70">
            Please check your environment variables and try again.
          </p>
        </div>
      </div>
    );
  }

  return (
    <AuthProvider>
      <RouterProvider router={router} />
      <Toaster position="top-right" />
    </AuthProvider>
  );
}

export default App;
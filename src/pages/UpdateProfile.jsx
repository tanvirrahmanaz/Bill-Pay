// src/pages/UpdateProfile.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { FaArrowLeft, FaUserAlt } from "react-icons/fa";

const UpdateProfile = () => {
  const { user, updateUserProfile } = useAuth();
  const [name, setName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      await updateUserProfile(name, photoURL);
      setSuccess(true);
      setTimeout(() => {
        navigate("/profile");
      }, 2000);
    } catch (error) {
      setError("Failed to update profile. Please try again.");
      console.error("Update profile error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <button 
        onClick={() => navigate("/profile")} 
        className="btn btn-ghost mb-6"
      >
        <FaArrowLeft className="mr-2" /> Back to Profile
      </button>
      
      <h1 className="text-3xl font-bold mb-8">Update Profile</h1>
      
      <div className="card bg-base-100 shadow-xl max-w-md mx-auto">
        <div className="card-body">
          {error && (
            <div className="alert alert-error mb-4">
              <p>{error}</p>
            </div>
          )}
          
          {success && (
            <div className="alert alert-success mb-4">
              <p>Profile updated successfully! Redirecting...</p>
            </div>
          )}
          
          <div className="flex justify-center mb-6">
            <div className="avatar">
              <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                {photoURL ? (
                  <img src={photoURL} alt={name || "User"} />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center text-white text-4xl">
                    <FaUserAlt />
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Display Name</span>
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                className="input input-bordered"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            
            <div className="form-control mb-6">
              <label className="label">
                <span className="label-text">Photo URL</span>
              </label>
              <input
                type="text"
                placeholder="Enter photo URL"
                className="input input-bordered"
                value={photoURL}
                onChange={(e) => setPhotoURL(e.target.value)}
              />
              <label className="label">
                <span className="label-text-alt">
                  Enter a valid image URL to change your profile picture
                </span>
              </label>
            </div>
            
            <div className="form-control">
              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Updating...
                  </>
                ) : (
                  "Update Information"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
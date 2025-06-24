// src/pages/MyProfile.jsx
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { FaUserAlt, FaEdit } from "react-icons/fa";

const MyProfile = () => {
  const { user, balance } = useAuth();

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">My Profile</h1>

      <div className="card bg-base-100 shadow-xl max-w-md mx-auto">
        <div className="card-body">
          <div className="flex flex-col items-center">
            <div className="avatar">
              <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                {user?.photoURL ? (
                  <img src={user.photoURL} alt={user.displayName || "User"} />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center text-white text-4xl">
                    <FaUserAlt />
                  </div>
                )}
              </div>
            </div>
            
            <h2 className="text-2xl font-semibold mt-4">
              {user?.displayName || "User"}
            </h2>
            <p className="text-gray-500">{user?.email}</p>
            
            <div className="badge badge-primary mt-2">
              Balance: {balance} BDT
            </div>
          </div>
          
          <div className="divider"></div>
          
          <div className="flex flex-col space-y-2">
            <div>
              <span className="font-semibold">Email:</span> {user?.email}
            </div>
            <div>
              <span className="font-semibold">Display Name:</span> {user?.displayName || "Not set"}
            </div>
          </div>
          
          <div className="card-actions justify-end mt-6">
            <Link to="/profile/update" className="btn btn-primary">
              <FaEdit className="mr-2" /> Update Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
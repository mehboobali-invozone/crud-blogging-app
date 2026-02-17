import React from "react";
import { MdOutlineCancel } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice";

const UserProfile = ({ onClose }) => {

  const dispatch = useDispatch();
  const authState = useSelector((s) => s.auth);

  // agar user login nahi to show na ho
  if (!authState?.details) return null;

  const handleLogout = () => {
    dispatch(logout());
    onClose(); // profile card bhi close
  };

  return (
    <div className="absolute right-1 top-16 bg-white p-8 rounded-lg w-96 shadow-lg z-50">

      {/* Header */}
      <div className="flex justify-between items-center">
        <p className="font-semibold text-lg">User Profile</p>

        {/* ✅ close working */}
        <button onClick={onClose} className="text-xl">
          <MdOutlineCancel />
        </button>
      </div>

      {/* User Info */}
      <div className="flex gap-5 items-center mt-6 border-b pb-6">
        <div>
          <p className="font-semibold text-xl">
            {authState.details.name}
          </p>

          <p className="text-gray-500 text-sm">
            {authState.details.role}
          </p>

          <p className="text-gray-500 text-sm font-semibold">
            {authState.details.email}
          </p>
        </div>
      </div>

      {/* Logout */}
      <div className="mt-5">
        <button
          className="p-3 w-full bg-green-600 text-white rounded-lg hover:bg-green-700"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

    </div>
  );
};

export default UserProfile;

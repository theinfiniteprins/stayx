import React, { useState } from "react";

const Profile = () => {
  // Dummy user object created directly inside the component
  const initialUser = {
    avatar: "https://avatars.githubusercontent.com/u/112802707?v=4", // Dummy avatar URL
    name: "John Doe",
    email: "johndoe@example.com",
    mobileNumber: "+1234567890",
  };

  const [user, setUser] = useState(initialUser);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setUser(editedUser); // Save the changes to the user object
    setIsEditing(false); // Exit editing mode
  };

  const handleCancelClick = () => {
    setEditedUser(user); // Revert changes
    setIsEditing(false); // Exit editing mode
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  return (
    <div className="bg-white p-8 shadow-lg rounded-lg max-w-md mx-auto mt-10">
      <div className="flex items-center justify-center mb-4">
        <img
          src={user.avatar}
          alt="User Avatar"
          className="w-32 h-32 rounded-full border-4 border-teal-500 shadow-md"
        />
      </div>
      <div className="text-center mb-6">
        {isEditing ? (
          <>
            <input
              type="text"
              name="name"
              value={editedUser.name}
              onChange={handleChange}
              className="text-xl font-semibold mb-2 border-b-2 border-gray-300 text-center"
            />
            <input
              type="email"
              name="email"
              value={editedUser.email}
              onChange={handleChange}
              className="text-gray-600 mb-1 border-b-2 border-gray-300 text-center"
            />
            <input
              type="text"
              name="mobileNumber"
              value={editedUser.mobileNumber}
              onChange={handleChange}
              className="text-gray-600 mb-1 border-b-2 border-gray-300 text-center"
            />
          </>
        ) : (
          <>
            <h2 className="text-2xl font-semibold mb-2">{user.name}</h2>
            <p className="text-gray-600 mb-1">{user.email}</p>
            <p className="text-gray-600 mb-1">{user.mobileNumber}</p>
          </>
        )}
      </div>
      <div className="flex justify-center">
        {isEditing ? (
          <>
            <button
              className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded mr-2"
              onClick={handleSaveClick}
            >
              Save
            </button>
            <button
              className="bg-gray-300 hover:bg-gray-400 text-black font-semibold py-2 px-4 rounded"
              onClick={handleCancelClick}
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded"
            onClick={handleEditClick}
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default Profile;

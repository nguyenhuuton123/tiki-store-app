import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserDetail, setUserDetail, userDetail } from '../../features/user/user_slice';
import { updateUser } from '../../api/user_api';

const UserProfile = () => {
  const userData = useSelector(selectUserDetail);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userDetail());
  }, [dispatch]);

  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({});

  const handleEditProfile = () => {
    setIsEditing(true);
    setEditedUser(userData);
  };

  const handleSaveProfile = async () => {
    try {
      await updateUser(userData.userId, editedUser);
      
      dispatch(setUserDetail(editedUser));
      
      alert('User information updated successfully');
      
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating user:", error);
      
      alert(`Error updating user information. Please try again. Details: ${error.message}`);
      
      console.log(error);
    }
  };
  

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  return (
    <div className="container mx-auto p-4">
      {userData ? (
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <p className="text-xl font-bold mb-4">User Profile</p>
          <p>
            <span className="font-bold">Full Name:</span>{' '}
            {isEditing ? (
              <input
                type="text"
                name="fullName"
                value={editedUser.fullName}
                onChange={handleChange}
              />
            ) : (
              userData.fullName
            )}
          </p>
          <p>
            <span className="font-bold">Username:</span>{' '}
            {isEditing ? (
              <input
                type="text"
                name="username"
                value={editedUser.username}
                onChange={handleChange}
              />
            ) : (
              userData.username
            )}
          </p>
          <p>
            <span className="font-bold">Email:</span>{' '}
            {isEditing ? (
              <input
                type="text"
                name="email"
                value={editedUser.email}
                onChange={handleChange}
              />
            ) : (
              userData.email
            )}
          </p>
          <p>
            <span className="font-bold">Phone Number:</span>{' '}
            {isEditing ? (
              <input
                type="text"
                name="phoneNumber"
                value={editedUser.phoneNumber}
                onChange={handleChange}
              />
            ) : (
              userData.phoneNumber
            )}
          </p>

          <div className="flex justify-end mt-4">
            {isEditing ? (
              <>
                <button
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mr-4 rounded"
                  onClick={handleSaveProfile}
                >
                  Save
                </button>
                <button
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                  onClick={handleCancelEdit}
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleEditProfile}
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>
      ) : (
        <p className="text-red-500">User information not available</p>
      )}
    </div>
  );
};

export default UserProfile;

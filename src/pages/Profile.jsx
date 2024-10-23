import React, { useState } from 'react';

const Profile = ({ user, onUpdateProfile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: user?.name || '',
    email: user?.email || '',
    role: user?.role || '',
    profilePic: user?.profilePic || '',
  });

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfile((prev) => ({ ...prev, profilePic: e.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setIsEditing(false);
    onUpdateProfile(profile); // Call parent function to save updated profile
  };

  return user ? (
    <div style={{ maxWidth: '400px', margin: 'auto' }}>
      <div>
        <img
          src={profile.profilePic || 'https://via.placeholder.com/150'}
          alt={`${profile.name}'s profile`}
          style={{ width: '150px', height: '150px', borderRadius: '50%' }}
        />
        {isEditing && (
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ marginTop: '10px' }}
          />
        )}
      </div>

      <div style={{ marginTop: '20px' }}>
        <div>
          <h3>Name:</h3>
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
            />
          ) : (
            <p>{profile.name}</p>
          )}
        </div>

        <div>
          <h3>Email:</h3>
          {isEditing ? (
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
            />
          ) : (
            <p>{profile.email}</p>
          )}
        </div>

        <div>
          <h3>Role:</h3>
          {isEditing ? (
            <input
              type="text"
              name="role"
              value={profile.role}
              onChange={handleChange}
            />
          ) : (
            <p>{profile.role}</p>
          )}
        </div>

        <div style={{ marginTop: '20px' }}>
          {isEditing ? (
            <button onClick={handleSave} style={{ marginRight: '10px' }}>
              Save
            </button>
          ) : (
            <button onClick={() => setIsEditing(true)} style={{ marginRight: '10px' }}>
              Edit Profile
            </button>
          )}
          {isEditing && (
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          )}
        </div>
      </div>
    </div>
  ) : null;
};

export default Profile;

// PersonalDetails.js
import React from 'react';

const PersonalDetails = ({ userData }) => {
  return (
    <div>
      <h6>Personal Details:</h6>
      {userData && userData.length > 0 ? (
        userData.map(user => (
            <div key={user.id}>
            <p>Name: {user.firstname} {user.middlename} {user.surname}</p>
            <p>Email: {user.email}</p>
            <p>Contact: {user.contact}</p>
            <p>Address: {user.address || 'N/A'}</p> {/* Handle null address */}
            {/* Add rendering for other columns */}
          </div>
        ))
      ) : (
        <p>No personal details available</p>
      )}
    </div>
  );
};

export default PersonalDetails;


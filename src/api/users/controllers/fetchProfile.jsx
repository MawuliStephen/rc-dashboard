
import React, { useState } from "react";
import useApi from './hook/useApi';
import { AiOutlineUser } from 'react-icons/ai'; // Import the icon you want to use

const Users = () => {
    const { userData, error, loading, updateProfile } = useApi();
    const [isEditing, setIsEditing] = useState(false);
    const [editedUserData, setEditedUserData] = useState({});
    const [imageFile, setImageFile] = useState(null);
    const [showConfirmation, setShowConfirmation] = useState(false);

    const handleUpdateUser = async () => {
        try {
            // Prepare FormData
            const formData = new FormData();
            Object.keys(editedUserData).forEach(key => {
                formData.append(key, editedUserData[key]);
            });
            if (imageFile) {
                formData.append('image', imageFile);
            }

            // Call API
            await updateProfile(formData);
            setIsEditing(false);
        } catch (err) {
            console.error("Error updating profile:", err);
        }
    };

    const handleCancelUpdate = () => {
        setEditedUserData({});
        setImageFile(null);
        setIsEditing(false);
    };

    const confirmUpdate = () => {
        setShowConfirmation(true);
    };

    const handleConfirmUpdate = () => {
        handleUpdateUser();
        setShowConfirmation(false);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const user = userData || {};

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setEditedUserData({ ...editedUserData, image: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const imageSrc = user.image || (editedUserData.image ? editedUserData.image : '');

    return (
        <div className="user-profile">
            <div className="bg-light p-4">
                <div style={{ display: 'flex',flexDirection:'column', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ position: 'relative' }}>
                        <img
                            src={imageSrc}
                            alt="Profile"
                            width="100"
                            height="100"
                            style={{ borderRadius: '50%', objectFit: 'cover' }}
                        />
                        {!user.image && !editedUserData.image && (
                            <div style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <AiOutlineUser size={40} />
                            </div>
                        )}
                    </div>
                    {isEditing && (
                        <input
                            type="file"
                            name="image"
                            onChange={handleImageChange}
                            accept="image/*"
                            style={{ marginLeft: '1rem' }}
                        />
                    )}
                </div>

                {['username', 'email', 'firstname', 'middlename', 'surname', 'contact', 'dob'].map((field) => (
                    <div key={field}>
                        <label>
                            {`${field.charAt(0).toUpperCase() + field.slice(1)}:`}
                            {isEditing ? (
                                <input
                                    type={field === 'dob' ? 'date' : 'text'}
                                    name={field}
                                    value={editedUserData[field] || user[field] || ''}
                                    onChange={(e) => setEditedUserData({ ...editedUserData, [field]: e.target.value })}
                                />
                            ) : (
                                user[field] || `Your ${field.charAt(0).toUpperCase() + field.slice(1)}`
                            )}
                        </label>
                    </div>
                ))}

                {isEditing && (
                    <div>
                        <button onClick={confirmUpdate}>Update</button>
                        <button onClick={handleCancelUpdate}>Cancel</button>
                    </div>
                )}
            </div>

            {showConfirmation && (
                <div className="react-modal-overlay">
                    <div className="modal-content">
                        <p>Are you sure you want to update?</p>
                        <button onClick={handleConfirmUpdate}>Yes</button>
                        <button onClick={() => setShowConfirmation(false)}>No</button>
                    </div>
                </div>
            )}

            {!isEditing && <button onClick={() => setIsEditing(true)}>Edit Profile</button>}
        </div>
    );
};

export { Users };

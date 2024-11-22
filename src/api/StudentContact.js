import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const baseUrl = process.env.REACT_APP_BASE_URL;

const fetchDataEndpoint = async (endpoint, token) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const res = await axios.get(`${baseUrl}${endpoint}`, config);
        return res.data;
    } catch (err) {
        console.error("Error fetching user data:", err);
        throw err;
    }
};

// Add Guidance Data
const addGuidanceData = async (guidanceData, token) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const res = await axios.post(`${baseUrl}/student/portal/contact`, guidanceData, config);
        console.log("Added guidance data:", res.data);
        return res.data;
    } catch (err) {
        console.error("Error adding guidance data:", err);
        throw err;
    }
};

// Update Guidance Data
const updateGuidanceData = async (guidanceData, token) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const res = await axios.put(`${baseUrl}/student/portal/contact`, guidanceData, config);
        console.log("Updated guidance data:", res.data);
        return res.data;
    } catch (err) {
        console.error("Error updating guidance data:", err);
        throw err;
    }
};

const GuidanceContact = () => {
    const [guidanceData, setGuidanceData] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false); // State to manage edit mode

    const { currentUser } = useContext(AuthContext);
    const token = currentUser?.token;

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (currentUser) {
                    const guidanceData = await fetchDataEndpoint("/student/portal/contact", token);
                    setGuidanceData(guidanceData);
                }
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [currentUser, token]);

    const handleUpdateGuidance = async (updatedGuidanceData) => {
        try {
            setLoading(true);
            if (guidanceData.id) {
                await updateGuidanceData(updatedGuidanceData, token);
            } else {
                await addGuidanceData(updatedGuidanceData, token);
            }
            // Refresh guidance data after updating
            const refreshedGuidanceData = await fetchDataEndpoint("/student/portal/contact", token);
            setGuidanceData(refreshedGuidanceData);
            setIsEditing(false); // Exit edit mode after successful update
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleAddNew = () => {
        setGuidanceData({});
        setIsEditing(true);
    };

    return (
        <div className="container">
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
            {guidanceData.id ? (
                <div>
                    <ul>
                        <li>
                            <p>Contact Name: {isEditing ? <input type="text" name="contactName" defaultValue={guidanceData.contactName} /> : guidanceData.contactName || "N/A"}</p>
                            <p>Contact Email: {isEditing ? <input type="text" name="contactEmail" defaultValue={guidanceData.contactEmail} /> : guidanceData.contactEmail || "N/A"}</p>
                            <p>Contact Phone: {isEditing ? <input type="text" name="contactPhone" defaultValue={guidanceData.contactPhone} /> : guidanceData.contactPhone || "N/A"}</p>
                            {isEditing && <button onClick={() => setIsEditing(false)}>Save</button>}
                        </li>
                    </ul>
                    <div className="bg-light">
                        {!isEditing && <button onClick={handleEdit}>Edit Profile</button>}
                    </div>
                </div>
            ) : (
                <div>
                    <p>No guidance information found. Please add emergency contact.</p>
                    <div className="bg-light">
                        <button onClick={handleAddNew}>Add New Guidance Information</button>
                    </div>
                </div>
            )}
            {isEditing && (
                <div>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        const updatedGuidanceData = {
                            contactName: e.target.contactName.value,
                            contactEmail: e.target.contactEmail.value,
                            contactPhone: e.target.contactPhone.value,
                        };
                        handleUpdateGuidance(updatedGuidanceData);
                    }}>
                        <div className="form-group">
                            <label htmlFor="contactName">Contact Name:</label>
                            <input type="text" className="form-control" id="contactName" name="contactName" defaultValue={guidanceData.contactName} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="contactEmail">Contact Email:</label>
                            <input type="text" className="form-control" id="contactEmail" name="contactEmail" defaultValue={guidanceData.contactEmail} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="contactPhone">Contact Phone:</label>
                            <input type="text" className="form-control" id="contactPhone" name="contactPhone" defaultValue={guidanceData.contactPhone} />
                        </div>
                        <button type="submit" className="btn btn-primary">Save Changes</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export { fetchDataEndpoint, updateGuidanceData, addGuidanceData, GuidanceContact };

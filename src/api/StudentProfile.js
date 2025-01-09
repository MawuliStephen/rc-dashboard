import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
// import { fetchDataEndpoint } from "../utils/fetch";

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

const updateUserData = async (userData, token) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const res = await axios.put(`${baseUrl}/student/portal/profile`, userData, config);
        console.log("Updated user data:", res.data);
        return res.data;
    } catch (err) {
        console.error("Error updating user data:", err);
        throw err;
    }
};

const StudentProfile = () => {
    const [userData, setUserData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false); // State to manage edit mode

    const { currentUser } = useContext(AuthContext);
    const token = currentUser?.token;

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (currentUser) {
                    const userData = await fetchDataEndpoint("/student/portal/profile", token);
                    setUserData(userData);
                }
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [currentUser, token]);

    const handleUpdateProfile = async (updatedUserData) => {
        try {
            setLoading(true);
            await updateUserData(updatedUserData, token);
            // Refresh user data after updating
            const refreshedUserData = await fetchDataEndpoint("/student/portal/profile", token);
            setUserData(refreshedUserData);
            setIsEditing(false); // Exit edit mode after successful update
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
            <div>
                <ul>
                    {userData.map((user) => (
                        <li key={user.id}>
                            {loading && <p>Loading...</p>}
                            {error && <p>Error fetching data: {error.message}</p>}
                            <p>Username: {user.username}</p>
                            <p>Email: {user.email}</p>
                            <p>First Name: {isEditing ? <input type="text" name="firstname" defaultValue={user.firstname} /> : user.firstname || "N/A"}</p>
                            <p>Middle Name: {isEditing ? <input type="text" name="middlename" defaultValue={user.middlename} /> : user.middlename || "N/A"}</p>
                            <p>Surname: {isEditing ? <input type="text" name="surname" defaultValue={user.surname} /> : user.surname || "N/A"}</p>
                            <p>Contact: {isEditing ? <input type="text" name="contact" defaultValue={user.contact} /> : user.contact || "N/A"}</p>
                            <p>Date Of Birth: {isEditing ? <input type="text" name="dob" defaultValue={user.dob} /> : user.dob || "N/A"}</p>

                            {isEditing && <button onClick={() => setIsEditing(false)}>Save</button>}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="bg-light">
                {!isEditing && <button onClick={() => setIsEditing(true)}>Edit Profile</button>}
                {isEditing && (
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        const updatedUserData = {
                            firstname: e.target.firstname.value,
                            middlename: e.target.middlename.value,
                            surname: e.target.surname.value,
                            // Add more fields as needed
                        };
                        handleUpdateProfile(updatedUserData);
                    }}>
                        <div className="form-group">
                            <label htmlFor="firstname">First Name:</label>
                            <input type="text" className="form-control" id="firstname" name="firstname" defaultValue={userData.firstname} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="middlename">Middle Name:</label>
                            <input type="text" className="form-control" id="middlename" name="middlename" defaultValue={userData.middlename} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="surname">Surname:</label>
                            <input type="text" className="form-control" id="surname" name="surname" defaultValue={userData.surname} />
                        </div>
                        <button type="submit" className="btn btn-primary">Save Changes</button>
                    </form>
                )}
            </div>
        </div>
    );
};

export { fetchDataEndpoint, updateUserData, StudentProfile };

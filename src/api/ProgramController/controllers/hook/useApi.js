import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../../context/AuthContext";
import fetchDataEndpoint from "../../../../utils/get";

const baseUrl = process.env.REACT_APP_BASE_URL;

const useApi = () => {
    const { currentUser } = useContext(AuthContext);
    const token = currentUser?.token;
    const [userData, setUserData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            if (currentUser) {
                await fetchDataEndpoint("/student/portal/programs", token, setUserData, setError, setLoading);
            }
        };

        fetchData();
    }, [currentUser, token]);

    const updateProgram = async (updatedUserData) => {
        try {
            setLoading(true);
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            await axios.put(`${baseUrl}/student/portal/programs`, updatedUserData, config);
            await refreshUserData(); // Refresh user data after update
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    const deleteProgram = async (programId) => {
        try {
            setLoading(true);
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            await axios.delete(`${baseUrl}/student/portal/programs/${programId}`, config);
            await refreshUserData(); // Refresh user data after deletion
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    const addProgram = async (newProgramData) => {
        try {
            setLoading(true);
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            await axios.post(`${baseUrl}/student/portal/programs`, newProgramData, config);
            await refreshUserData(); // Refresh user data after addition
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    const refreshUserData = async () => {
        try {
            await fetchDataEndpoint("/student/portal/programs", token, setUserData, setError, setLoading);
        } catch (err) {
            setError(err);
        }
    };

    return { userData, error, loading, updateProgram, deleteProgram, addProgram };
};

export { useApi}

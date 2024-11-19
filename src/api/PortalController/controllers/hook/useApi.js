import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../../context/AuthContext";
import axios from "axios"; 

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
        console.error(`Error fetching data from ${endpoint}:`, err);
        throw err;  // Rethrow the error to handle it in the caller function
    }
};

export default fetchDataEndpoint;



const useApi = () => {
    const [userData, setUserData] = useState(null);
    const [courses, setCourses] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const { currentUser } = useContext(AuthContext);
    const token = currentUser?.token;

    useEffect(() => {
        const fetchData = async () => {
            if (currentUser) {
                setLoading(true);  // Ensure loading state is set
                try {
                    const [userDataResponse, coursesResponse] = await Promise.all([
                        fetchDataEndpoint("/student/portal/", token),
                        fetchDataEndpoint("/student/courses/shs", token),
                    ]);

                    console.log("User Data:", userDataResponse);  // Debugging user data
                    console.log("Courses Data:", coursesResponse.courses);  // Debugging courses data


                    setUserData(userDataResponse);
                    setCourses(coursesResponse.courses);
                } catch (err) {
                    setError(err);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchData();
    }, [currentUser, token]);

    return { userData, courses, error, loading };
};

export { useApi };

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
                await fetchDataEndpoint("/student/portal/forms", token, setUserData, setError, setLoading);
                // await fetchDataEndpoint("/student/portal/my-admission-form", token, setUserData, setError, setLoading);

            }
        };

        fetchData();
    }, [currentUser, token]);



    const buyForm = async (formType, admissionFee) => {
        try {
            setLoading(true);
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            // Make the POST request to buy the form
            const formData = {
                formType,
                admissionFee,
            };

            // Make the POST request to buy the form
            const response = await axios.post(`${baseUrl}/student/portal/buy-form`, formData, config);

            setLoading(false);
            return response.data; // Return response from the backend
        } catch (error) {
            setLoading(false);
            if (error.response) {
                // The request was made and the server responded with a status code
                console.error('Server responded with status:', error.response.status);
                console.error('Error data:', error.response.data);
                setError(error.response.data); // Set detailed error response data
            } else if (error.request) {
                // The request was made but no response was received
                console.error('No response received:', error.request);
                setError({ message: 'No response received from the server.' });
            } else {
                // Something happened in setting up the request that triggered an error
                console.error('Error in request setup:', error.message);
                setError({ message: 'Error in request setup. Please try again later.' });
            }
            throw error; // Rethrow the error to be caught by the caller
        }
    };


    return { userData, error, loading, buyForm };
};

export { useApi };

import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../../context/AuthContext";
import fetchDataEndpoint from "../../../../utils/get"; // Assuming this is your custom fetch function
// const baseUrl = process.env.REACT_APP_BASE_URL;

const useApi = () => {
    const { currentUser } = useContext(AuthContext);
    const token = currentUser?.token;

    // States
    const [userData, setUserData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState('');
    const [sortBy, setSortBy] = useState('created_at');
    const [order, setOrder] = useState('ASC');

    useEffect(() => {
        const fetchData = async () => {
            if (currentUser && token) {
                try {
                    setLoading(true); // Set loading state
                    await fetchDataEndpoint(
                        "/users",
                        token,
                        (data) => {
                            // Set data from response
                            setUserData(data.users);
                            setTotalPages(data.totalPages);
                        },
                        (error) => setError(error.message || "An error occurred while fetching users."),
                        (loading) => setLoading(loading)
                    );
                } catch (err) {
                    setError(err.message || "An error occurred while fetching users.");
                    setLoading(false); // End loading
                }
            }
        };

        fetchData();
    }, [currentUser, token, currentPage, search, sortBy, order]);  // Dependencies for re-fetch

    // Function to update users based on query parameters
    const updateUsers = async (params) => {
        try {
            setLoading(true); // Set loading state
            await fetchDataEndpoint(
                "/users",
                token,
                (data) => {
                    // Update user data
                    setUserData(data.users);
                    setTotalPages(data.totalPages);
                },
                (error) => setError(error.message || "An error occurred while updating users."),
                (loading) => setLoading(loading)
            );
        } catch (err) {
            setError(err.message || "An error occurred while updating users.");
            setLoading(false); // End loading
        }
    };

    // Return necessary values and functions for the component
    return {
        userData,
        error,
        loading,
        totalPages,
        currentPage,
        setCurrentPage,
        search,
        setSearch,
        updateUsers,
        sortBy,
        setSortBy,
        order,
        setOrder,
        setLoading // Make sure setLoading is returned here
    };
};

export default useApi;

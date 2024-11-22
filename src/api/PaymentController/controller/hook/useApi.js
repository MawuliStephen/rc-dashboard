import { useState, useEffect, useContext } from "react";
// import axios from "axios";
import { AuthContext } from "../../../../context/AuthContext";
import fetchDataEndpoint from "../../../../utils/fetches";

// const baseUrl = process.env.REACT_APP_BASE_URL;

const useApi = () => {
    const { currentUser } = useContext(AuthContext);
    const token = currentUser?.token;
    const [userData, setUserData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            if (currentUser) {
                await fetchDataEndpoint("/student/portal/form-status", token, setUserData, setError, setLoading);
            }
        };

        fetchData();
    }, [currentUser, token]);

    return { userData, error, loading};
};

export { useApi}

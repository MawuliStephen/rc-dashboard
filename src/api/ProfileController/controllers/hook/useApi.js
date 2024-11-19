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
                await fetchDataEndpoint("/student/portal/profile", token, setUserData, setError, setLoading);
            }
        };

        fetchData();
    }, [currentUser, token]);

    const updateProfile = async (updatedUserData) => {
        try {
            setLoading(true);
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            };

            await axios.put(`${baseUrl}/student/portal/profile`, updatedUserData, config);

            await fetchDataEndpoint("/student/portal/profile", token, setUserData, setError, setLoading);
            setLoading(false);
        } catch (err) {
            setError(err);
            setLoading(false);
        }
    };

    return { userData, error, loading, updateProfile };
};

export default useApi;



// import { useState, useEffect, useContext } from "react";
// import axios from "axios";
// import { AuthContext } from "../../../../context/AuthContext";
// import fetchDataEndpoint from "../../../../utils/fetches";
// const baseUrl = process.env.REACT_APP_BASE_URL;

// const useApi = () => {
//     const { currentUser } = useContext(AuthContext);
//     const token = currentUser?.token;
//     const [userData, setUserData] = useState([]);
//     const [error, setError] = useState(null);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchData = async () => {
//             if (currentUser) {
//                 await fetchDataEndpoint("/student/portal/profile", token, setUserData, setError, setLoading);
//             }
//         };

//         fetchData();
//     }, [currentUser, token]);

//     const updateProfile = async (updatedUserData) => {
//         try {
//             setLoading(true);
//             const formData = new FormData();
//             for (const key in updatedUserData) {
//                 formData.append(key, updatedUserData[key]);
//             }
            
//             const config = {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                     'Content-Type': 'multipart/form-data',
//                 },
//             };

//             await axios.put(`${baseUrl}/student/portal/profile`, formData, config);
//             await axios.put(`${baseUrl}/student/portal/picture`, formData, config);

//             await fetchDataEndpoint("/student/portal/profile", token, setUserData, setError, setLoading);
//             setLoading(false);
//         } catch (err) {
//             setError(err);
//             setLoading(false);
//         }
//     };

//     return { userData, error, loading, updateProfile };
// };

// export default useApi;

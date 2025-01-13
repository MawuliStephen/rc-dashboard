import axios from "axios";

const baseUrl = process.env.REACT_APP_BASE_URL;

const fetchDataEndpoint = async (endpoint, token, setData, setError, setLoading) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const res = await axios.get(`${baseUrl}${endpoint}`, config);
        setData(res.data);
        // console.log("Fetched data:", res.data);
    } catch (err) {
        console.log("Error fetching data:", err);
        setError(err);
    } finally {
        setLoading(false);
    }
};


export default fetchDataEndpoint;






















// import { useRef } from "react";
// import axios from "axios";

// const baseUrl = process.env.REACT_APP_BASE_URL;

// const fetchDataEndpoint  = () => {
//     const useFetchData = async (endpoint, token, setData, setError, setLoading) => {
//         const cancelToken = useRef(null);

//         // Cancel previous request if there's any
//         if (cancelToken.current) {
//             cancelToken.current.cancel("Operation canceled due to new request.");
//         }

//         // Create a new cancel token for the current request
//         cancelToken.current = axios.CancelToken.source();

//         try {
//             const config = {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//                 cancelToken: cancelToken.current.token,  // Pass cancel token to the request config
//             };

//             const res = await axios.get(`${baseUrl}${endpoint}`, config);
//             setData(res.data);
//             console.log("Fetched data:", res.data);
//         } catch (err) {
//             if (axios.isCancel(err)) {
//                 console.log("Request canceled:", err.message);
//             } else {
//                 console.error("Error fetching data:", err);
//                 setError(err);
//             }
//         } finally {
//             setLoading(false);
//         }
//     };

//     return useFetchData;
// };

// export default fetchDataEndpoint;
// //  useFetchData;


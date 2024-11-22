

// import axios from "axios";

// const baseUrl = process.env.REACT_APP_BASE_URL;

// const postDataToEndpoint = async (endpoint, token, data, setData, setError, setLoading) => {
//     setLoading(true); // Start loading

//     try {
//         const config = {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//         };

//         const res = await axios.post(`${baseUrl}${endpoint}`, data, config);
//         setData(res.data);
//         // console.log("Fetched data:", res.data);
//     } catch (err) {
//         console.error("Error fetching data:", err);
//         setError(err);
//     } finally {
//         setLoading(false); // End loading
//     }
// };

// export default postDataToEndpoint;

import axios from "axios";

const baseUrl = process.env.REACT_APP_BASE_URL;

const postDataToEndpoint = async (endpoint, token, data, setData, setError, setLoading) => {
    setLoading(true); // Start loading

    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const res = await axios.post(`${baseUrl}${endpoint}`, data, config);
        setData(res.data);
    } catch (err) {
        console.error("Error fetching data:", err);
        setError(err);
    } finally {
        setLoading(false); // End loading
    }
};

export default postDataToEndpoint;


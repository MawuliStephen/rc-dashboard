// import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
// import { AuthContext } from "../context/AuthContext";

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
    console.log("Fetched data:", res.data);
} catch (err) {
    console.error("Error fetching data:", err);
    setError(err);
} finally {
    setLoading(false);
}
};


export {fetchDataEndpoint}
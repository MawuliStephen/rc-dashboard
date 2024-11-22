import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

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


// Student Portal index

const StudentPortal = () => {
    const [userData, setUserData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const { currentUser } = useContext(AuthContext);
    const token = currentUser?.token;

    useEffect(() => {
        const fetchData = async () => {
            if (currentUser) {
                await fetchDataEndpoint("/student/portal/", token, setUserData, setError, setLoading);
            }
        };

        fetchData();
    }, [currentUser, token]);

    return (
        <div>
            {userData.map((user) => (
                <div key={user.id}>
                    {loading && <p>Loading...</p>}
                    {error && <p>Error fetching data: {error.message}</p>}
                    <p>Welcome: {user.username}</p>
                    {/* <p>Email: {user.email}</p> */}
                    {/* Add more user data fields as needed */}
                </div>
            ))}
        </div>
    );
};


// Student Emmergency Contact
const StudentContact = () => {
    const [userData, setUserData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const { currentUser } = useContext(AuthContext);
    const token = currentUser?.token;

    useEffect(() => {
        const fetchData = async () => {
            if (currentUser) {
                await fetchDataEndpoint("/student/portal/contact", token, setUserData, setError, setLoading);
            }
        };

        fetchData();
    }, [currentUser, token]);

    return (
        <div>
            {userData.map((user) => (
                <div key={user.id}>
                    {loading && <p>Loading...</p>}
                    {error && <p>Error fetching data: {error.message}</p>}
                    <p>Name: {user.username}</p>
                    {/* <p>Email: {user.email}</p> */}
                    {/* Add more user data fields as needed */}
                </div>
            ))}
        </div>
    );
};


//Student Programs
const StudentProgram = () => {
    const [userData, setUserData] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    console.log(userData)
  
    const { currentUser } = useContext(AuthContext);
    const token = currentUser?.token;
  
    useEffect(() => {
      const fetchData = async () => {
        if (currentUser) {
          await fetchDataEndpoint("/student/portal/programs", token, setUserData, setError, setLoading);
        }
      };
  
      fetchData();
    }, [currentUser, token]);
  
    return (
        <div>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
            <div>
                <h2>Core Subjects:</h2>
                <ul>
                    {userData?.subjects?.map(course => (
                        <li key={course.id}>{course.name}</li>
                    ))}
                    {!loading && !error && !userData.subjects && <li>No core subjects available</li>}
                </ul>
            </div>
            <div>
                <h2>Elective Subjects:</h2>
                <ul>
                    {userData?.electiveSubjects?.map(course => (
                        <li key={course.id}>{course.name}</li>
                    ))}
                    {!loading && !error && !userData.electiveSubjects && <li>No elective subjects available</li>}
                </ul>
            </div>
        </div>
    );
  };
  
  
// const StudentProgram = () => {
//     const [userData, setUserData] = useState([]);
//     const [error, setError] = useState(null);
//     const [loading, setLoading] = useState(true);

//     const { currentUser } = useContext(AuthContext);
//     const token = currentUser?.token;

//     useEffect(() => {
//         const fetchData = async () => {
//             if (currentUser) {
//                 await fetchDataEndpoint("/student/portal/programs", token, setUserData, setError, setLoading);
//             }
//         };

//         fetchData();
//     }, [currentUser, token]);
//     return (
//         <div>
//           {loading && <p>Loading...</p>}
//           {error && <p>Error: {error.message}</p>}
//           <div>
//             <h2>Core Subjects:</h2>
//             <ul>
//               {userData.coresubjects &&
//                 userData.coresubjects.map((course) => (
//                   <li key={course.id}>{course.subject_name}</li>
//                 ))}
//             </ul>
//           </div>
//           <div>
//             <h2>Elective Subjects:</h2>
//             <ul>
//               {userData.electivesubjects &&
//                 userData.electivesubjects.map((course) => (
//                   <li key={course.id}>{course.subject_name}</li>
//                 ))}
//             </ul>
//           </div>
//         </div>
//       );
// };




export { fetchDataEndpoint, StudentPortal, StudentContact,StudentProgram };


// const StudentProfile = () => {
//     const [userData, setUserData] = useState([]);
//     const [error, setError] = useState(null);
//     const [loading, setLoading] = useState(true);

//     const { currentUser } = useContext(AuthContext);
//     const token = currentUser?.token;

//     useEffect(() => {
//         const fetchData = async () => {
//             if (currentUser) {
//                 await fetchDataEndpoint("/student/portal/profile", token, setUserData, setError, setLoading);
//             }
//         };

//         fetchData();
//     }, [currentUser, token]);

//     return (
//         <ul>
//           {userData.map((user) => (
//             <li key={user.id}>
//               {loading && <p>Loading...</p>}
//               {error && <p>Error fetching data: {error.message}</p>}
//               <p>Welcome Back: {user.username}</p>
//               <p>Email: {user.email}</p>
//               <p>First Name: {user.firstname || "N/A"}</p>
//               <p>Middle Name: {user.middlename || "N/A"}</p>
//               <p>Surname: {user.surname || "N/A"}</p>
//               <p>Contact: {user.contact || "N/A"}</p>
//               <p>Date of Birth: {user.dob || "N/A"}</p>
//               {/* Add more user data fields as needed */}
//             </li>
//           ))}
//         </ul>
//       );
      
// };

// const StudentProfile = () => {
//     const [userData, setUserData] = useState([]);
//     const [error, setError] = useState(null);
//     const [loading, setLoading] = useState(true);

//     const { currentUser } = useContext(AuthContext);
//     const token = currentUser?.token;

//     useEffect(() => {
//         const fetchData = async () => {
//             if (currentUser) {
//                 await fetchDataEndpoint("/student/portal/profile", token, setUserData, setError, setLoading);
//             }
//         };

//         fetchData();
//     }, [currentUser, token]);

//     return (
//         <div>
//             {/* Render student profile data */}
//         </div>
//     );
// };

import React from "react";
import { Link } from "react-router-dom";
import useEndPoint from "./hook/useEndPoint";

const AllUsers = () => {
    const { data, error, loading } = useEndPoint();

    return (
        <div>
            <p>Your courses</p>
            <div>
                {loading && <p>Loading...</p>}
                {error && <p>Error fetching data: {error.message}</p>}
                {data["courses"] && data["courses"].map(course => (
                    <div key={course.id} className="card">
                        <Link to={`/#details/${course.program_id}`}>
                            {course.program_code} - {course.program_name}
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllUsers;











// import React, { useEffect, useState, useContext } from "react";
// import { Link } from 'react-router-dom';
// import { AuthContext } from "../../../context/AuthContext";
// import { fetchDataEndpoint } from "../../../utils/fetch";


// const AllUsers = () => {
//     const [userData, setUserData] = useState([]);
//     const [error, setError] = useState(null);
//     const [loading, setLoading] = useState(true);

//     const { currentUser } = useContext(AuthContext);
//     const token = currentUser?.token;

//     useEffect(() => {
//         const fetchData = async () => {
//             if (currentUser) {
//                 await fetchDataEndpoint("/student/portal/", token, setUserData, setError, setLoading);
//             }
//         };

//         fetchData();
//     }, [currentUser, token]);

//     return (
//         <div>
//             {/* // Assuming userData is an object, not an array */}
//             {loading && <p>Loading...</p>}
//             {error && <p>Error fetching data: {error.message}</p>}
//             {userData.username && (
//                 <div key={userData.id}>
//                     <p>Welcome: {userData.username}</p>
//                 </div>
//             )}

//             {/* // Assuming userData is an object, not an array */}
//             {loading && <p>Loading...</p>}
//             {error && <p>Error fetching data: {error.message}</p>}
//             {userData.username && (
//                 <div key={userData.id}>
//                     <p>Welcome: {userData.username}</p>
//                 </div>
//             )}


//             <p>Your courses</p>

//             <div>
//                 {userData["courses"] && userData["courses"].map(course => (
//                     <div key={course.id} className="card">
//                         <Link to={`/#details/${course.program_id}`}>
//                             {course.program_code} - {course.program_name}
//                         </Link>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };


// export { StudentPortal }
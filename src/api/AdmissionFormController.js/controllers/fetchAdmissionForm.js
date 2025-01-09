import React, { useState, useContext, useEffect } from "react";
import { Link } from 'react-router-dom'
import { AiOutlineUser } from 'react-icons/ai'; // Import the icon you want to use
// import axios from "axios";
import { AuthContext } from "../../../context/AuthContext";
import fetchDataEndpoint from "../../../utils/get";

const UserAdmissionForm = () => {
    const { currentUser } = useContext(AuthContext);
    const token = currentUser?.token;
    const [userData, setUserData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);



    useEffect(() => {
        const fetchData = async () => {
            if (currentUser) {
                await fetchDataEndpoint("/student/portal/my-admission-form", token, setUserData, setError, setLoading);
            }
        };

        fetchData();
    }, [currentUser, token]);



    return (
        
        <div>
            {loading && <p>Loading...</p>}
            {error && <p>Error fetching userData: {error.message}</p>}
            <div className=" container-fluid">
                <h2> Submit your Application Forms</h2>
                <p>Ensure that you have selected your prefered courses, you added guidance information and completed your personal profile before submitting this form.
                    You will note be able to edit any of these data after submitting your Application.
                </p>

                <div className="card p-4 mb-5 bg-light">
                    <h6>Personal Details:</h6>
                    {userData && userData.userData && userData.userData.map(user => (
                        <div key={user.id}>
                            <div className="" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <p>Email: {user.email}</p>
                                {/* <img src={user.image} alt="Profile Picture" /> */}
                                {user.image ? (
                                    <img src={user.image} alt="Profile Picture" width="100" height="100" />
                                ) : (
                                    // <IconComponent width="40" height="40" />
                                    <AiOutlineUser size={40} /> 
                                    // {/* Use the icon component */}
                                    // Replace IconComponent with the appropriate icon component or JSX
                                )}
                            </div>

                            <p>Name: {user.firstname} {user.middlename} {user.surname}</p>
                            <p>Contact: {user.contact}</p>
                            <p>Date of Birth: {user.dob}</p>
                            <p>Address: {user.address || 'N/A'}</p> {/* Handle null address */}
                        </div>
                    ))}
                    <hr></hr>
                    <div className="" style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>If your data is not complete update it here </span>
                        <Link to='/portal/profile' > Profile</Link>
                    </div>

                </div>

                <div className="card p-4 mb-5 bg-light">
                    <h6>Courses:</h6>
                    {userData && userData.courseData && userData.courseData.map(course => (
                        <div key={course.id}>
                            <p> {course.program_code} {course.program_name} </p>

                        </div>
                    ))}
                    <hr></hr>
                    <div className="" style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>If your data is not complete update it here  </span>
                        <Link to='/portal/programs' > Programs</Link>
                    </div>

                </div>

                <div className=" card p-4 mb-5 bg-light">
                    <h6>Parente or Guidaince:</h6>
                    {userData && userData.guidanceData && userData.guidanceData.map(guidance => (
                        <div key={guidance.id}>
                            <p>Name: {guidance.name} </p>
                            <p>Contact: {guidance.contact} </p>
                            <p>Email: {guidance.email} </p>
                            <p>Address: {guidance.address} </p>
                            <p>Relationship: {guidance.relationship} </p>

                        </div>
                    ))}
                    <hr></hr>
                    <div className="" style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>If your data is not complete update it here</span>
                        <Link to='/portal/contact' > Guidaince Contact</Link>
                    </div>
                </div>
                <button>Submit Application</button>

            </div>
        </div>
    );
};

export { UserAdmissionForm };

// import React, { useState, useContext, useEffect } from "react";
// import { Link } from 'react-router-dom';
// import { AiOutlineUser } from 'react-icons/ai';
// import { AuthContext } from "../../../context/AuthContext";
// import fetchDataEndpoint from "../../../utils/fetches";

// const UserAdmissionForm = () => {
//     const { currentUser } = useContext(AuthContext);
//     const token = currentUser?.token;
//     const [userData, setUserData] = useState([]);
//     const [error, setError] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [admissionStatus, setAdmissionStatus] = useState(false);

//     useEffect(() => {
//         const fetchData = async () => {
//             if (currentUser) {
//                 const response = await fetchDataEndpoint("/student/portal/my-admission-form", token, setUserData, setError, setLoading);
//                 if (response && response.admissionStatus !== undefined) {
//                     setAdmissionStatus(response.admissionStatus);
//                     console.log('admissionStatus set to:', response.admissionStatus);
//                     console.log('Response',response)
//                 }
//             }
//         };

//         fetchData();
//     }, [currentUser, token,admissionStatus]);



//     return (
//         <div>
//             <div className="container-fluid">
//                 <h2>Submit your Application Forms</h2>
//                 <p>Ensure that you have selected your preferred courses, added guidance information, and completed your personal profile before submitting this form. You will not be able to edit any of these data after submitting your application.</p>

//                 <div className="card p-4 mb-5 bg-light">
//                     <h6>Personal Details:</h6>
//                     {userData.userData && userData.userData.map(user => (
//                         <div key={user.id}>
//                             <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//                                 <p>Email: {user.email}</p>
//                                 {user.image ? (
//                                     <img src={user.image} alt="Profile Picture" width="100" height="100" />
//                                 ) : (
//                                     <AiOutlineUser size={40} />
//                                 )}
//                             </div>
//                             <p>Name: {user.firstname} {user.middlename} {user.surname}</p>
//                             <p>Contact: {user.contact}</p>
//                             <p>Date of Birth: {user.dob}</p>
//                             <p>Address: {user.address || 'N/A'}</p>
//                         </div>
//                     ))}
//                     <hr />
//                     <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//                         <span>If your data is not complete update it here</span>
//                         <Link to='/portal/profile'>Profile</Link>
//                     </div>
//                 </div>

//                 <div className="card p-4 mb-5 bg-light">
//                     <h6>Courses:</h6>
//                     {userData.courseData && userData.courseData.map(course => (
//                         <div key={course.id}>
//                             <p>{course.program_code} {course.program_name}</p>
//                         </div>
//                     ))}
//                     <hr />
//                     <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//                         <span>If your data is not complete update it here</span>
//                         <Link to='/portal/programs'>Programs</Link>
//                     </div>
//                 </div>

//                 <div className="card p-4 mb-5 bg-light">
//                     <h6>Parent or Guidance:</h6>
//                     {userData.guidanceData && userData.guidanceData.map(guidance => (
//                         <div key={guidance.id}>
//                             <p>Name: {guidance.name}</p>
//                             <p>Contact: {guidance.contact}</p>
//                             <p>Email: {guidance.email}</p>
//                             <p>Address: {guidance.address}</p>
//                             <p>Relationship: {guidance.relationship}</p>
//                         </div>
//                     ))}
//                     <hr />
//                     <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//                         <span>If your data is not complete update it here</span>
//                         <Link to='/portal/contact'>Guidance Contact</Link>
//                     </div>
//                 </div>
//                 <button>Submit Application</button>
//             </div>
//         </div>
//     );
// };

// export { UserAdmissionForm };





















// import React, { useState, useContext, useEffect } from "react";
// import { Link } from 'react-router-dom';
// import { AiOutlineUser } from 'react-icons/ai';
// import fetchDataEndpoint from "../../../utils/fetches";
// import Popup from "../../../components/Popup"; // Import your popup component
// import { AuthContext } from "../../../context/AuthContext";

// const UserAdmissionForm = () => {
//     const { currentUser } = useContext(AuthContext);
//     const token = currentUser?.token;
//     const [userData, setUserData] = useState([]);
//     const [error, setError] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [admissionStatus, setAdmissionStatus] = useState(false);
//     const [showPopup, setShowPopup] = useState(false);

//     useEffect(() => {
//         const fetchData = async () => {
//             if (currentUser) {
//                 await fetchDataEndpoint("/student/portal/my-admission-form", token, setUserData, setError, setLoading);
//                 // Set admission status here based on fetched data
//                 // For example: setAdmissionStatus(userData?.admissionStatus || false);
//             }
//         };

//         fetchData();
//     }, [currentUser, token]);

//     const handleButtonClick = () => {
//         if (!admissionStatus) {
//             setShowPopup(true);
//         } else {
//             // Proceed with submitting application
//         }
//     };

//     return (
//         <div>
//             {loading && <p>Loading...</p>}
//             {error && <p>Error fetching userData: {error.message}</p>}
//             <div className="container-fluid">
//                 <h2>Submit your Application Forms</h2>
//                 <p>Ensure that you have selected your preferred courses, added guidance information, and completed your personal profile before submitting this form. You will not be able to edit any of these data after submitting your application.</p>

//                 <div className="card p-4 mb-5 bg-light">
//                     <h6>Personal Details:</h6>
//                     {/* Personal details rendering */}
//                 </div>

//                 <div className="card p-4 mb-5 bg-light">
//                     <h6>Courses:</h6>
//                     {/* Courses rendering */}
//                 </div>

//                 <div className="card p-4 mb-5 bg-light">
//                     <h6>Parent or Guidance:</h6>
//                     {/* Parent/Guidance rendering */}
//                 </div>

//                 {admissionStatus ? (
//                     <button onClick={handleButtonClick}>Submit Application</button>
//                 ) : (
//                     <div>
//                         <button disabled onClick={handleButtonClick}>
//                             <AiOutlineUser size={20} />
//                             Submit Application
//                         </button>
//                         {showPopup && <Popup message="You don't have admission. Buy form." onClose={() => setShowPopup(false)} />}
//                     </div>
//                 )}

//             </div>
//         </div>
//     );
// };

// export { UserAdmissionForm };








// import React, { useState, useContext, useEffect } from "react";
// import { AuthContext } from "../../../context/AuthContext";
// import fetchDataEndpoint from "../../../utils/fetches";

// const UserAdmissionForm = () => {
//     const { currentUser } = useContext(AuthContext);
//     const token = currentUser?.token;
//     const [userData, setUserData] = useState(null);
//     const [error, setError] = useState(null);
    // const [admissionStatus, setAdmissionStatus] = useState(true);
    // const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         if (currentUser) {
    //             try {
    //                 const response = await fetchDataEndpoint("/student/portal/my-admission-form", token);
    //                 setUserData(response.userData);
    //                 setAdmissionStatus(response.admissionStatus);
    //                 console.log("Admission Status:", response.admissionStatus);
    //             } catch (error) {
    //                 setError(error);
    //             } finally {
    //                 setLoading(false);
    //             }
    //         } else {
    //             setLoading(false);
    //         }
    //     };

    //     fetchData();
    // }, [currentUser, token]);

    // if (loading) {
    //     return <p>Loading...</p>;
    // }

    // if (error) {
    //     return <p>Error: {error.message}</p>;
    // }

    // if (!admissionStatus) {
    //     return <p>You don't have an admission form to complete.</p>;
    // }

//     return (
//         <div>
//             <h2>Complete your Forms</h2>
//             <p>Please take your time and complete this section as you will not be able to edit or delete it later.</p>

//             {userData ? (
//                 <div>
//                     <div>
//                         <h6>Personal Details:</h6>
//                         {userData.userData.map(user => (
//                             <div key={user.id}>
//                                 <p>Name: {user.firstname} {user.middlename} {user.surname}</p>
//                                 <p>Email: {user.email}</p>
//                                 <p>Contact: {user.contact}</p>
//                                 <p>Address: {user.address || 'N/A'}</p>
//                             </div>
//                         ))}
//                     </div>

//                     <div>
//                         <h6>Courses:</h6>
//                         {userData.courseData.length > 0 ? (
//                             userData.courseData.map(course => (
//                                 <div key={course.id}>
//                                     <p>{course.program_code} {course.program_name}</p>
//                                 </div>
//                             ))
//                         ) : (
//                             <p>No courses found.</p>
//                         )}
//                     </div>

//                     <div>
//                         <h6>Parent or Guidance:</h6>
//                         {userData.guidanceData.length > 0 ? (
//                             userData.guidanceData.map(guidance => (
//                                 <div key={guidance.id}>
//                                     <p>Name: {guidance.name}</p>
//                                     <p>Contact: {guidance.contact}</p>
//                                     <p>Email: {guidance.email}</p>
//                                     <p>Address: {guidance.address}</p>
//                                     <p>Relationship: {guidance.relationship}</p>
//                                 </div>
//                             ))
//                         ) : (
//                             <p>No guidance information found.</p>
//                         )}
//                     </div>
//                 </div>
//             ) : (
//                 <p>No user data available.</p>
//             )}
//         </div>
//     );
// };

// export { UserAdmissionForm };




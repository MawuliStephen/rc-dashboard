// import React, { useState } from "react";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {
//   faFacebookSquare, faGithubSquare, faInstagramSquare,
//   faLinkedin, faTelegramPlane, faTwitterSquare,
//   faWhatsappSquare, faYoutubeSquare
// } from '@fortawesome/free-brands-svg-icons';
// import { Link } from "react-router-dom";
// import axios from "axios";
// const endPoint = process.env.REACT_APP_BASE_URL;


// const Footer = () => {
//   const [email, setEmail] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post(`${endPoint}/openroute/subscribe`, { email });

//       if (response.status === 200) {
//         alert('Subscription successful!');
//         setEmail(''); // Clear the input field after successful subscription
//       } else {
//         alert('Failed to subscribe. Please try again.');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       alert('An error occurred. Please try again.');
//     }
//   };

//   return (
//     <footer className="foot">
//       <div className="container">
//         <div className="footer-flex d-flex">
//           <div className="footer-col mb-4">
//             <strong>Learn About RISE</strong>
//             <hr />
//             <div style={{ display: "flex", flexDirection: "column" }}>
//               <Link to="/about-us">About RISE </Link>
//               <Link to="/privacy-policy">Privacy Policy</Link>
//               <Link to="/terms-and-conditions">Terms and Conditions </Link>
//               <Link to="/support">Contact</Link>
//             </div>
//           </div>

//           <div className="footer-col mb-4 pr-0">
//             <strong>Online Services</strong>
//             <hr />
//             <div style={{ display: "flex", flexDirection: "column" }}>
//               <Link to="/admission">Admission </Link>
//               <Link to="#/online-class">Online Class</Link>
//               <Link to="/login">Student Portal</Link>
//               <Link to="/pre-tertiary">Rise Academy</Link>
//             </div>
//           </div>

//           <div className="footer-col mb-4">
//             <strong>Get in Touch</strong>
//             <hr />
//             <div className="footer-flex" style={{ display: "flex", flexDirection: "column" }}>
//               <form onSubmit={handleSubmit} className="mb-4">
//                 <label htmlFor="email">Subscribe</label>
//                 <div className="footer-flex g-2">
//                   <input
//                     className="mr-2"
//                     type="email"
//                     id="email"
//                     name="email"
//                     placeholder="Enter your email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                   />
//                   <button type="submit">Submit</button>
//                 </div>
//               </form>
//               <hr />
//               <label>Social Media</label>
//               <div className="social-icons">
//                 <Link to="/#facebook" className="social-icon">
//                   <FontAwesomeIcon icon={faFacebookSquare} size="2x" />
//                 </Link>
//                 <Link to="/#twitter" className="social-icon">
//                   <FontAwesomeIcon icon={faTwitterSquare} size="2x" />
//                 </Link>
//                 <Link to="/#instagram" className="social-icon">
//                   <FontAwesomeIcon icon={faInstagramSquare} size="2x" />
//                 </Link>
//                 <Link to="/#linkedin" className="social-icon">
//                   <FontAwesomeIcon icon={faLinkedin} size="2x" />
//                 </Link>
//                 <Link to="/#youtube" className="social-icon">
//                   <FontAwesomeIcon icon={faYoutubeSquare} size="2x" />
//                 </Link>
//                 <Link to="/#whatsapp" className="social-icon">
//                   <FontAwesomeIcon icon={faWhatsappSquare} size="2x" />
//                 </Link>
//                 <Link to="/#telegram" className="social-icon">
//                   <FontAwesomeIcon icon={faTelegramPlane} size="2x" />
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//         <hr />
//         <div className="float-right">
//           <div className="d-flex align-items-center">
//             <p>Mawuli Stephen made it |</p>
//             <Link to="/#github" className="social-icon">
//               <FontAwesomeIcon icon={faGithubSquare} size="1x" />
//             </Link>
//           </div>
//         </div>
//         <div className="mr-auto">All rights reserved © Rise®</div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;



// import React from "react";
// import { useContext } from "react";
// // import Button from 'react-bootstrap/Button';
// import { AuthContext } from "../../../context/AuthContext";
// import Container from 'react-bootstrap/Container';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
// // import NavDropdown from 'react-bootstrap/NavDropdown';
// import { Link } from "react-router-dom";
// //  const logo = './assest/logo'
// import logo from '../../../assets/logos/rise academy logo-06.svg'
// // import useUserData from "./useUserData";

// function TopNav() {
//   const { currentUser, logout } = useContext(AuthContext);

//   return (
//     <Navbar expand="lg" className="">
//       <Container>
//         <Navbar.Brand href="/">

//           <img className="logo" src={logo} alt="" />

//         </Navbar.Brand>

//         <Navbar.Toggle aria-controls="navbarScroll" />
//         <Navbar.Collapse id="navbarScroll">
//           <Nav className="openNav me-auto my-2 my-lg-0"
//             // style={{ maxHeight: '250px' }}
//             navbarScroll
//           >
//             <Nav.Link href="/">Home</Nav.Link>
//             <Nav.Link href="/about-us">About us</Nav.Link>

//             <NavDropdown title="Services" id="navbarScrollingDropdown">
//               <NavDropdown.Item href="/admission">Admission</NavDropdown.Item>
//               <NavDropdown.Item href="/admission-status">Admission Status</NavDropdown.Item>
//               {/* <NavDropdown.Item href="#action4">
//                 Result Checkers
//               </NavDropdown.Item> */}
//               <NavDropdown.Divider />
//               <NavDropdown.Item href="online-classes">
//                 Online classes
//               </NavDropdown.Item>
//             </NavDropdown>

//           </Nav>

//           <div>
//             {currentUser && (
//               <span>{currentUser.username}</span>
//             )}

//             {currentUser ? (
//               <>
//                 <button className="secondary-button" variant="outline-success" onClick={logout}>
//                   <h6>Logout</h6>
//                 </button>
//               </>
//             ) : (
//               <button className="primary-button" >
//                 <Link to="/login">
//                   Login
//                 </Link>
//               </button>
//             )}
//           </div>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// }

// export default TopNav;

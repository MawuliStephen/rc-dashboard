// ProtectedRoute.js
import React from "react";
import { AuthContext } from "../context/AuthContext";
import { Route, Navigate } from "react-router-dom";

const ProtectedRoute = ({ element, ...rest }) => {
  const { currentUser } = React.useContext(AuthContext);

  // Check if currentUser has a valid token
  const isAuthenticated = currentUser && currentUser.token;

  return isAuthenticated ? (
    // Render the provided element if authenticated
    <Route {...rest} element={element} />
  ) : (
    // Redirect to the login page if not authenticated
    <Navigate to="/login" replace />
  );
};

export default ProtectedRoute;







// ProtectedRoute.js
// import React from "react";
// import { AuthContext } from "../context/AuthContext";
// import { Route, Navigate } from "react-router-dom";

// // Define a ProtectedRoute component
// const ProtectedRoute = ({ element, ...rest }) => {
//   const { currentUser } = React.useContext(AuthContext);
//   try {
//     currentUser = currentUser.token
//     if (!currentUser==null)
//   } catch (error) {
    
//   }

//   // If the user is authenticated, render the provided element
//   // Otherwise, redirect the user to the login page
//   return currentUser ? (
//     <Route {...rest} element={element} />
//   ) : (
//     <Navigate to="/login" />
//   );
// };

// export default ProtectedRoute;

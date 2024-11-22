import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import DocumentTitle from "../../components/DocumentTitle";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Don't forget to import the toast styles


const pageTitle = 'Login';
const pageDescription = 'The Royal College of Science and Entrepreneurship aims to create an environment that promotes innovation, critical thinking, and the practical application of knowledge...';

const Login = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const [err, setError] = useState(null);

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(inputs); // Attempt to login
      toast.success("Login successful!"); // Show success toast
      navigate("/dashboard"); // Navigate to portal on success
    } catch (err) {
      console.error("Login error:", err); // Log the error for debugging

      // Handle error responses
      const errorMessage = err.response && err.response.data
        ? err.response.data
        : err.message
        ? { error: "Error", message: err.message }
        : { error: "Unknown Error", message: "An unknown error occurred" };

      setError(errorMessage);
      toast.error(errorMessage.message || "Login failed. Please try again."); // Show error toast
    }
  };

  return (
    <div className="container">
      {/* <DocumentTitle title="Login" /> */}
      <DocumentTitle title={pageTitle} description={pageDescription} />

      {/* <div className="auth">
        <div className="login">
          <h3>Login</h3>
          <form>
            <input
              className="mb-4"
              type="text"
              placeholder="Email"
              name="email"
              onChange={handleChange}
            />
            <input
              className="mb-4"
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
            <button className="primary-button" onClick={handleSubmit}>
              Login
            </button>
            {err && (
              <p className="error">
                {err.error && <span>{err.error}</span>}
                {err.message && <span>{err.message}</span>}
              </p>
            )}
            <br />
          </form>
          <div className="extra">
            <span><Link to="/Forgot-password">Forgot Password?</Link></span>
          </div>
        </div>
      </div> */}

<div className="auth">
  <div className="login">
    <h3>Login</h3>
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={inputs.email}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={inputs.password}
          onChange={handleChange}
        />
      </div>
      <button className="primary-button" type="submit">Login</button>
      {err && (
        <p className="error">{err.message || "Something went wrong!"}</p>
      )}
    </form>
    <div className="extra">
      <Link to="/forgot-password">Forgot Password?</Link>
    </div>
  </div>
</div>


      {/* Toast container to display notifications */}
      <ToastContainer />
    </div>
  );
};

export default Login;

// import React, { useState, useContext } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { AuthContext } from "../../context/AuthContext";
// import DocumentTitle from "../../components/DocumentTitle";

// const pageTitle = 'Login';

// const pageDescription = 'The Royal College of Science and Entrepreneurship aims to create an environment that promotes innovation, critical thinking, and the practical application of knowledge...';


// const Login = () => {
//   const [inputs, setInputs] = useState({
//     email: "",
//     password: "",
//   });

//   const [err, setError] = useState(null);

//   const navigate = useNavigate();
//   const { login } = useContext(AuthContext);

//   const handleChange = (e) => {
//     setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await login(inputs);
//       navigate("/portal");
//     } catch (err) {
//       console.error("Login error:", err); // Log the error for debugging
//       if (err.response && err.response.data) {
//         setError(err.response.data);
//       } else if (err.message) {
//         setError({ error: "Error", message: err.message }); // Use the error message if available
//       } else {
//         setError({ error: "Unknown Error", message: "An unknown error occurred" });
//       }
//     }
//   };

//   return (
//     <div className="container">
//       {/* <DocumentTitle title="Login" /> */}
//       <DocumentTitle title={pageTitle} description={pageDescription} />


//       <div className="">
//         <div className="login">
//           <h3>Login</h3>
//           <form>
//             <input className="mb-4" type="text" placeholder="username" name="email" onChange={handleChange} />
//             <input className="mb-4" type="password" placeholder="password" name="password" onChange={handleChange} />
//             <button className="primary-button" onClick={handleSubmit}>Login</button>
//             {err && (
//               <p className="error">
//                 {err.error && <span>{err.error}</span>}
//                 {err.message && <span>{err.message}</span>}
//               </p>
//             )}
//             <br/>


//           </form>
//           <div className="extra">
        
//           <span><Link to="/Forgot-password">Forgot Password</Link></span>
//           </div>

//         </div>

//       </div>
//     </div>
//   );
// };

// export default Login;

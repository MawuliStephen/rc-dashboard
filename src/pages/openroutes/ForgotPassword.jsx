import React from "react";
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";
import DocumentTitle from "../../components/DocumentTitle";


const endPoint = process.env.REACT_APP_BASE_URL;

const ForgotPassword = () => {
  // DocumentTitle("Royal College | Fogot Password")

  const [inputs, setInputs] = useState({
    // username: "",
    email: "",
    // password: "",
  });

  const [err, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${endPoint}/auth/forgot-password`, inputs);
      navigate("/Reset-password");
    } catch (err) {
      setError(err.response.data);
    }
  };
  return (
    <div className="container">
      <DocumentTitle title="Forgot Password" />

      <div className="auth">
        <h3>Register</h3>
        <form action="">
          {/* <input type="text" placeholder="Username" name="username" onChange={handleChange} /> */}
          <input type="email" placeholder="email" name="email" onChange={handleChange} />
          {/* <input type="password" placeholder="Password" name="password" onChange={handleChange} /> */}
          <button onClick={handleSubmit}>Submit</button>
          {err && <p className="error">{err}</p>}
          <span>Have an Account <Link to="/Reset-password">Login</Link></span>
        </form>
      </div>
    </div>
  )
}

export default ForgotPassword
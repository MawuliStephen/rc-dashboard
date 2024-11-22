import React from "react";
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";
import DocumentTitle from "../../components/DocumentTitle";

const endPoint = process.env.REACT_APP_BASE_URL;

const Register = () => {

  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [err, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${endPoint}/auth/register`, inputs);
      navigate("/login");
    } catch (err) {
      setError(err.response.data);
    }
  };
  return (
    <div className="container">
      <DocumentTitle title="Register" />

      <div className="auth">
        <div className="register">
          <h3>Register</h3>
          <form>
            <input type="text" placeholder="Username" name="username" onChange={handleChange} />
            <input type="email" placeholder="Email" name="email" onChange={handleChange} />
            <input type="password" placeholder="Password" name="password" onChange={handleChange} />
            <button onClick={handleSubmit}>Register</button>
            {err && <p className="error">{err}</p>}
            <br />
          </form>

          <div className="extra pt-4">
            <span>Have An Account ? <Link to="/Login">Login</Link></span>
            <span><Link to="/Forgot-password">Forgot Password</Link></span>

          </div>

        </div>

      </div>
    </div>
  )
}

export default Register
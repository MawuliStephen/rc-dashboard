import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
import DocumentTitle from "../../components/DocumentTitle";
import api from '../../api/Axios'


const ResetPassword = () => {

  const [inputs, setInputs] = useState({
    resetToken: "",
    email: "",
    newPassword: "", // Changed to consistent naming
  });

  const [err, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Loading indicator

  const navigate = useNavigate();

  const handleChange = (e) => {
    setError(null); // Clear error message when input changes
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, newPassword, resetToken } = inputs;
    if (!email || !newPassword || !resetToken) {
      setError("Email, new password, and reset token are required.");
      return;
    }
    setLoading(true); // Start loading
    try {
      await api.post("/auth/reset-password", { email, newPassword, resetToken });
      navigate("/login"); // Redirect after successful reset
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred. Please try again."); // Display error message
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="container">
      <DocumentTitle title="Reset Password" />

      <div className="auth">
        <h3>Reset Password</h3>
        <form>
          <input type="text" placeholder="Your code" name="resetToken" onChange={handleChange} />
          <input type="email" placeholder="Email" name="email" onChange={handleChange} />
          <input type="password" placeholder="New Password" name="newPassword" onChange={handleChange} />
          <button onClick={handleSubmit} disabled={loading}>{loading ? "Loading..." : "Submit"}</button>
          {err && <p className="error">{err}</p>}
          <span>Have an Account <Link to="/login">Login</Link></span>
          <span>Need an account? <Link to="/register">Register</Link></span>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;

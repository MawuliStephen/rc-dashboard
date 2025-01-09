import React, { useState } from "react";

const GuidanceForm = ({ guidanceData, onSubmit }) => {
  const [formData, setFormData] = useState(guidanceData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {Object.entries(formData).map(([key, value]) => (
        <div className="form-group" key={key}>
          <label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
          <input
            type="text"
            className="form-control"
            id={key}
            name={key}
            value={value}
            onChange={handleInputChange}
          />
        </div>
      ))}
      <button type="submit" className="btn btn-primary">
        Save Changes
      </button>
    </form>
  );
};

export default GuidanceForm;

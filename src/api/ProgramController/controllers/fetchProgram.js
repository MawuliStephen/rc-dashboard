
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useApi } from './hook/useApi';
import Modal from 'react-modal';

const UserProgram = () => {
  const { userData, error, loading, updateProgram, deleteProgram, addProgram } = useApi();
  const [selectedPrograms, setSelectedPrograms] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const location = useLocation();
  const isUpdateMode = location.search === "?-update";

  useEffect(() => {
    if (isUpdateMode) {
      // Set selected programs if in update mode
      setSelectedPrograms(userData);
    }
  }, [isUpdateMode, userData]);

  const handleProgramSelect = (program) => {
    const index = selectedPrograms.findIndex((selected) => selected.id === program.id);
    if (index === -1) {
      setSelectedPrograms([...selectedPrograms, program]);
    } else {
      const updatedSelectedPrograms = [...selectedPrograms];
      updatedSelectedPrograms.splice(index, 1);
      setSelectedPrograms(updatedSelectedPrograms);
    }
  };

  const handleSubmit = async () => {
    setShowConfirmation(true); // Show confirmation modal
  };

  const handleConfirmSubmit = async () => {
    setShowConfirmation(false); // Hide confirmation modal
    try {
      // Use PUT or POST based on whether it's an update or not
      if (isUpdateMode) {
        await updateProgram(selectedPrograms);
      } else {
        await addProgram(selectedPrograms);
      }
      console.log("Selected programs submitted successfully.");
    } catch (err) {
      console.error("Error submitting selected programs:", err);
    }
  };

  const handleDelete = async (programId) => {
    if (window.confirm("Are you sure you want to delete this program?")) {
      try {
        await deleteProgram(programId);
        console.log("Program deleted successfully.");
      } catch (err) {
        console.error("Error deleting program:", err);
      }
    }
  };

  return (

    <div className="container">
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}

      <h2>Select Programs:</h2>
      {userData["subjects[0]"] && userData["subjects[0]"].map(subject => (

        <div key={subject.id} >
        
            <label className="pt-2 label" > 
              {subject.code} - {subject.name} 
            <input type="checkbox" value={subject.id} onChange={() => handleProgramSelect(subject)} checked={selectedPrograms.some((selected) => selected.id === subject.id)} />

            </label>
       

        </div>
      ))}

      <div>
        <h2>Selected Programs:</h2>
        <ul>
          {selectedPrograms.map((program) => (
            <li key={program.id}>{program.name}</li>
          ))}
        </ul>
      </div>

      <button onClick={handleSubmit}>Submit</button>

      {/* <li> <a href="#courses">My courses</a></li> */}

      {/* Confirmation Modal */}

      <Modal isOpen={showConfirmation}
        onRequestClose={() => setShowConfirmation(false)}
        contentLabel="Submit Confirmation"  >
        <div className="react-modal-overlay">

          <div className="modal-content">
            <h2>Are you sure you want to submit your selected programs?</h2>
            <div className="button-group">
              <button onClick={handleConfirmSubmit}>Yes</button>
              <button onClick={() => setShowConfirmation(false)}>No</button>
            </div>
          </div>
        </div>

      </Modal>
    </div>

  );
};

export { UserProgram };


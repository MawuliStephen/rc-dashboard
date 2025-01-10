import React, { useState, useEffect } from 'react';
import Filter from '../../../components/students/sort';
import "./../../../css/dashboard.css";


const Students = () => {
  const [loading, setLoading] = useState(true);

  // Simulate an API call or data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // After 3 seconds, set loading to false
    }, 3000);

    return () => clearTimeout(timer); // Clean up timeout if component unmounts
  }, []);

  return (
    <div className={`students-container ${loading ? 'loading' : ''}`}>

      <Filter/>
 
    </div>
  );
};

export default Students;

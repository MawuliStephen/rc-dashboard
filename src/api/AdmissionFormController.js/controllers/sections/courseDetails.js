// CourseDetails.js

import React from 'react';

const CourseDetails = ({ courseData }) => {
  return (
    <div>
      <h2>Course Details:</h2>
      {courseData.map(course => (
        <div key={course.id}>
          <p>Program ID: {course.programs_id}</p>
          <p>Category: {course.category}</p>
          {/* Add other fields as needed */}
        </div>
      ))}
    </div>
  );
};

export default CourseDetails;

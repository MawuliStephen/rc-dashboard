import React, { useState } from 'react';
import Popup from '../Popup'; // Assuming Popup is in the parent directory

const Filter = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('name'); // Default sorting by name
  const studentsPerPage = 5; // Number of students per page

  // Example student data with more properties
  const students = [
    { name: "Student 1", year: "2021", sex: "Female", school: "School A", program: "Science" },
    { name: "Student 2", year: "2022", sex: "Male", school: "School B", program: "Arts" },
    { name: "Student 3", year: "2021", sex: "Female", school: "School A", program: "Engineering" },
    { name: "Student 4", year: "2023", sex: "Male", school: "School C", program: "Science" },
    { name: "Student 5", year: "2021", sex: "Female", school: "School B", program: "Engineering" },
    { name: "Student 6", year: "2022", sex: "Male", school: "School C", program: "Arts" },
    { name: "Student 7", year: "2023", sex: "Female", school: "School A", program: "Arts" },
    { name: "Student 8", year: "2021", sex: "Male", school: "School A", program: "Science" },
    { name: "Student 9", year: "2022", sex: "Female", school: "School B", program: "Engineering" },
    { name: "Student 10", year: "2023", sex: "Male", school: "School C", program: "Science" },
    { name: "Student 11", year: "2021", sex: "Female", school: "School A", program: "Arts" },
    { name: "Student 12", year: "2022", sex: "Male", school: "School B", program: "Engineering" },
    { name: "Student 13", year: "2023", sex: "Female", school: "School A", program: "Science" },
    { name: "Student 14", year: "2022", sex: "Male", school: "School C", program: "Arts" },
    { name: "Student 15", year: "2021", sex: "Female", school: "School B", program: "Engineering" },
  ];

  // Filter students based on search term
  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.year.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.sex.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.school.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.program.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort the students based on the selected option
  const sortedStudents = [...filteredStudents].sort((a, b) => {
    if (sortOption === 'name') {
      return a.name.localeCompare(b.name);
    } else if (sortOption === 'year') {
      return a.year.localeCompare(b.year);
    } else if (sortOption === 'sex') {
      return a.sex.localeCompare(b.sex);
    } else if (sortOption === 'school') {
      return a.school.localeCompare(b.school);
    } else if (sortOption === 'program') {
      return a.program.localeCompare(b.program);
    }
    return 0;
  });

  // Pagination logic
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = sortedStudents.slice(indexOfFirstStudent, indexOfLastStudent);
  const totalPages = Math.ceil(sortedStudents.length / studentsPerPage);

  // Handle opening and closing of the popup
  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);

  return (
    <div>
      {/* Floating button */}
      <button
        onClick={openPopup}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          padding: '15px 25px',
          fontSize: '18px',
          borderRadius: '50%',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        Add Student
      </button>

      {/* Render Popup when it's open */}
      {isPopupOpen && <Popup message="Add a new student" onClose={closePopup} />}

      {/* Search and Sort Controls */}
      <div className="controls">
        <input
          type="text"
          placeholder="Search by name, year, sex, school, or program"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select onChange={(e) => setSortOption(e.target.value)} value={sortOption}>
          <option value="name">Sort by Name</option>
          <option value="year">Sort by Year</option>
          <option value="sex">Sort by Sex</option>
          <option value="school">Sort by School</option>
          <option value="program">Sort by Program</option>
        </select>
      </div>

      {/* Student List */}
      <div className="student-list">
        <h2>Student List</h2>

        {/* Render the list of students */}
        <div className="row">
          <div>Search and Filter by year, sex, school, program</div>
        </div>

        <ul>
          {currentStudents.map((student, index) => (
            <li key={index}>
              {student.name} - {student.year} - {student.sex} - {student.school} - {student.program}
            </li>
          ))}
        </ul>

        {/* Pagination Controls */}
        <div className="pagination">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Filter;

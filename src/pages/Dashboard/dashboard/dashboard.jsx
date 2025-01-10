import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaUserGraduate, FaChalkboardTeacher, FaRegCalendarAlt } from 'react-icons/fa';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import "./../../../css/dashboard.css";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const mockData = {
  students: 350,
  teachers: 50,
  courses: 12,
  upcomingAssignments: 5
};

const lineChartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  datasets: [
    {
      label: 'Enrollments',
      data: [300, 310, 320, 330, 350, 360, 370],
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }
  ]
};

const Dashboard = () => {
  return (
    <div className="container">
      <Container fluid>
        {/* Header Section */}
        <Row className="mb-4">
          <Col>
            <h1 className="text-center"> Dashboard</h1>
          </Col>
        </Row>

        {/* Stats Section */}
        <div className='row'>
            

        </div>
        <Row className="mb-4 d-flex">
          <Col xs={12} sm={6} md={3} className="mb-3">
            <div className="stat-card">
              <FaUserGraduate size={40} />
              <h3>{mockData.students}</h3>
              <p>Students</p>
            </div>
          </Col>
          <Col xs={6} sm={6} md={3} className="mb-3">
            <div className="stat-card">
              <FaChalkboardTeacher size={40} />
              <h3>{mockData.teachers}</h3>
              <p>Teachers</p>
            </div>
          </Col>
          <Col xs={12} sm={6} md={3} className="mb-3">
            <div className="stat-card">
              <FaRegCalendarAlt size={40} />
              <h3>{mockData.courses}</h3>
              <p>Courses</p>
            </div>
          </Col>
          <Col xs={12} sm={6} md={3} className="mb-3">
            <div className="stat-card">
              <FaRegCalendarAlt size={40} />
              <h3>{mockData.upcomingAssignments}</h3>
              <p>Upcoming Assignments</p>
            </div>
          </Col>
        </Row>

        {/* Line Chart Section */}
        <Row>
          <Col>
            <div className="chart-card">
              <h4>Student Enrollment Over Time</h4>
              <Line data={lineChartData} options={{ responsive: true }} />
            </div>
          </Col>
        </Row>

        {/* Recent Activity Section */}
        <Row className="mt-4">
          <Col>
            <h4>Recent Activities</h4>
            <div className="activity-list">
              <div className="activity-item">New student registration: John Doe</div>
              <div className="activity-item">Assignment graded: Math Assignment #3</div>
              <div className="activity-item">New course added: Data Science 101</div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Dashboard;

// // import React, { useState, useEffect } from 'react';
// import React from 'react';
// import axios from 'axios';
// import DocumentTitle from '../../components/DocumentTitle';

// import { Link } from 'react-router-dom';
// // import { Card } from 'react-bootstrap';


// const API = process.env.REACT_APP_BASE_URL;


// const pageTitle = 'Royal Institute of Science and Entrepreneurship | Dashboard';
// const pageDescription = 'The Royal College of Science and Entrepreneurship (RISE) aims to create an environment that promotes innovation, critical thinking, and the practical application of knowledge...';


// class Dashboard extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       data: []
//     };
//   }

//   componentDidMount() {
//     this.fetchData();
//   }

//   fetchData = async () => {
//     try {
//       const res = await axios.get(`${API}`);
//       this.setState({ data: res.data });
//       console.log(res.data);
//     } catch (err) {
//       console.error('Error fetching data:', err);
//     }
//   };

//   render() {
//     return (
//       <div className='background' style={{ background: "yelow" }}>
//         {/* <DocumentTitle title="Dashboard" /> */}
//         <DocumentTitle title={pageTitle} description={pageDescription} />



//         <section className=" bg-light p-5">
//           <div className="container  pb-5 mb-4">
//             <div className="row" style={{ flexDirection: 'row-reverse' }}>
//               <div className="col-12 col-md-6">

//                 <button className='primary-button'><Link to={'/register'}>  Get Started</Link></button>
//               </div>
    
//             </div>
//           </div>
//         </section>


//       </div >
//     );
//   }
// }

// export default Dashboard;

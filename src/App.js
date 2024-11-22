// import logo from './logo.svg';
import './App.css';

import "./css/style.css";
import "./css/stylesdashboard.css";
import "./css/modal.css";
// import "./css/videoslider.css";
import "./css/carousel.css";
import "./css/navigation.css";
import "./css/userd.css";


import Layout from "./components/layout/openroute/Layout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//opoen routes | No password protection

// import Home from "./pages/openroutes/Home";
// import Support from "./pages/openroutes/Support";
// import About from "./pages/openroutes/About";

import Login from "./pages/openroutes/Login";
import Forgot from "./pages/openroutes/ForgotPassword";
import Reset from "./pages/openroutes/ResetPassword";

// import Register from "./pages/openroutes/Register";


// import Terms from "./pages/openroutes/Terms";
// import Privacy from "./pages/openroutes/Policy";
// import Admission from "./pages/openroutes/admission";
// import DetailPage from "./pages/openroutes/Adm-details";
// import Onlineclass from "./pages/openroutes/Onlineclass";


import Unauthorized from './components/Unauthorized';
// import Missing from './components/404'
// import Missing from './components/404';


// Student Portal Pages | Password protected

import Admin from "./components/layout/closedroute/Admin";
import Dashboard from './pages/Dashboard/dashboard';

// import Portal from './pages/student/Portal';
// import Profile from './pages/student/Profile';
// import Payment from './pages/student/Payment';
// import Forms from './pages/student/Form';
// import Contact from './pages/student/Contact';
// import Programs from './pages/student/Programs';
// import ReadMessages from "./pages/student/Messages";
// import CoursePage from "./pages/student/coursebyId";
// import AdmissionChecker from "./pages/openroutes/admissionchecker";
// import Reference from "./pages/openroutes/reference";


function App() {
  return (
    
  <Router>
    <Routes>
      {/* Routes for non-authenticated users */}

        <Route element={<Layout />}>
          <Route path="/" element={<Login />} />
          {/* <Route path="/register" element={<Register />} /> */}
          <Route path="/forgot-password" element={<Forgot />} />
          <Route path="/reset-password" element={<Reset />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          {/* <Route path="*" element={<Missing />} /> */}
        </Route>
  

      {/* Routes for authenticated users */}

        <Route element={<Admin />}>
          {/* <Route index element={<Home />} /> */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* <Route path="/portal/*" element={<Missing />} /> */}
        </Route>
   

          </Routes>
  </Router>
);
}

export default App;











// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <p>
//           We are coming to build something amazing
//         </p>
   
//       </header>
//     </div>
//   );
// }

// export default App;

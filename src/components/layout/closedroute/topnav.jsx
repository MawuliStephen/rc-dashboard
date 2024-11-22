// DashboardLayout.js

import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Navbar } from 'react-bootstrap';

import { faBars, faTimes, } from '@fortawesome/free-solid-svg-icons';
import logo from '../../../assets/logos/rise academy logo-06.svg'

import SideNav from './sidenav';
// import { Userdp } from '../../../api/PortalController/controllers/fetchdp';
import { Userdp } from '../../../api/PortalController/controllers/fetchddp';
import Notification from '../../../api/MessagesController/controllers/fetchmessages';


const Navlayout = () => {

  const [showSideNav, setShowSideNav] = useState(false);

  const toggleSideNav = () => {
    setShowSideNav(!showSideNav);
  };

  const closeSideNav = () => {
    setShowSideNav(false);
  };

  return (
    <div className="dashboard-layout">
      <nav className="navtop" >
        <div className="top-nav  container-fluid" >

          <div className="leftRight" >
            <Navbar.Brand href="/dashboard">
              <img className="logo" src={logo} alt="" />

            </Navbar.Brand>

          </div>

          <div className='leftRight' style={{ display: "flex", flexDirection: 'row', justifyContent: 'space-between' }}>
            <div className="user-info" >

              <Userdp />

              <Notification />

              <button className="hamburger-menu" onClick={toggleSideNav}>
                <FontAwesomeIcon icon={showSideNav ? faTimes : faBars} />
              </button>
            </div>

          </div>
        </div>
      </nav>

      <SideNav show={showSideNav} closeSideNav={closeSideNav} />


      <div className="content leftRight">
        <Outlet />

      </div>
    </div>
  );
};

export default Navlayout;

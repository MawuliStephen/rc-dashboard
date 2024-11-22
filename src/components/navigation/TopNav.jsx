// TopNav.js
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Navbar } from 'react-bootstrap';

import { faBars, faTimes, faUserCircle, faBell } from '@fortawesome/free-solid-svg-icons';

import React from 'react';

const TopNav = () => {
    return (
        <header className="topnav">
             <nav className="sticky-top " style={{ borderBottom: 'solid 1px' }}>
        <div className="top-nav sticky-top header container-fluid" >

          <div className="leftRight" >
            <Navbar.Brand href="/portal">
              <svg xmlns="http://www.w3.org/2000/svg" width="100.5" height="40.24" viewBox="0 0 375.5 139.24"><g transform="translate(-848.25 -96.38)"><text transform="translate(981.75 218.62)" fontSize="15" fontFamily="Skia" letterSpacing="0.47em"><tspan x="0" y="0">EAT WITH A SMILE</tspan></text><text transform="translate(981.75 126.62)" fontSize="70" ><tspan x="0" y="70">Rise</tspan></text><rect width="3" height="139" transform="translate(968.75 96.62)" /><g transform="translate(848.25 96.38)"><path d="M90.1,63.3a3.794,3.794,0,0,1-1.38-.27,3.779,3.779,0,0,1-.63-.33,3.217,3.217,0,0,1-.55-.44L76.69,51.86,65.85,62.26a3.818,3.818,0,0,1-1.18.77,3.687,3.687,0,0,1-2.77,0,3.7,3.7,0,0,1-1.18-.77L49.89,51.86l-2.04,1.96-.12.12-8.68,8.32a3.7,3.7,0,0,1-1.18.77,3.687,3.687,0,0,1-2.77,0,3.818,3.818,0,0,1-1.18-.77L23.09,51.86,12.26,62.26a3.7,3.7,0,0,1-1.18.77,3.851,3.851,0,0,1-1.38.27,3.66,3.66,0,0,1-1.39-.27,3.7,3.7,0,0,1-1.18-.77L0,55.42v83.25a1.506,1.506,0,0,0,1.33.57H98.48a1.506,1.506,0,0,0,1.33-.57V55.41l-7.15,6.86a3.93,3.93,0,0,1-.55.44,3.73,3.73,0,0,1-.63.32,3.219,3.219,0,0,1-.67.2,3.419,3.419,0,0,1-.71.07ZM97.52,8.15c-1.28.37-5.22,1.96-8.4,7.83l2.06.78c7.19-4.54,8.74-7.79,8.82-8.74A4.256,4.256,0,0,0,97.52,8.15Z" /><path d="M25.66,44.05,36.49,54.46l4.97-4.77a75.686,75.686,0,0,0-1.72-14.68C35.16,13.77,23.89.73,16.62,2.28c-3.77.81-6.89,5.68-8.39,13.13a36.655,36.655,0,0,1,9.07-3.22,3.725,3.725,0,0,1,1.45-.02,3.8,3.8,0,0,1,1.34.53,3.7,3.7,0,0,1,1.04,1.01,3.607,3.607,0,0,1,.57,1.32,3.544,3.544,0,0,1,.03,1.45,3.8,3.8,0,0,1-.53,1.34,3.845,3.845,0,0,1-1.01,1.04,3.58,3.58,0,0,1-1.33.57C11.42,21.04,7.7,24.34,7.29,25.56c-.01.26-.02.51-.01.77,0,.13,0,.25-.01.38a72.9,72.9,0,0,0,.61,8.08c.74-.39,1.39-.71,1.85-.92a80.223,80.223,0,0,1,16.64-5.3,3.682,3.682,0,0,1,2.74.54,3.756,3.756,0,0,1,1.58,2.31,3.716,3.716,0,0,1-2.76,4.39C17.4,38.08,11.07,41.14,9.3,42.67c.18.8.38,1.6.58,2.4s.43,1.59.67,2.38.48,1.58.74,2.36.53,1.56.81,2.34l8.43-8.1a3.516,3.516,0,0,1,1.18-.76,3.687,3.687,0,0,1,2.77,0,3.853,3.853,0,0,1,1.18.76ZM63.28,54.46,74.12,44.05a3.977,3.977,0,0,1,1.18-.76,3.687,3.687,0,0,1,2.77,0,3.516,3.516,0,0,1,1.18.76l8.37,8.03,6.4-16.83a8.88,8.88,0,0,0-5.15-11.44L82.81,21.5H82.8l-.02-.01-6.05-2.3a8.882,8.882,0,0,0-11.45,5.14L56.36,47.8l6.92,6.66ZM78.89,0c-.57.76-1.53,4.27.82,12.4l2.01.77c1.51-6.49-.35-10.3-1.07-11.43A4.179,4.179,0,0,0,78.89,0Z" /></g></g></svg>
            </Navbar.Brand>

          </div>
          
          <div className='leftRight' style={{ display: "flex", flexDirection: 'row', justifyContent: 'space-between' }}>
            <div className="user-info" >
              <div ><FontAwesomeIcon icon={faUserCircle} className="avatar" /> </div>
              <div ><FontAwesomeIcon icon={faBell} className="notification" /></div>
              <button className="hamburger-menu" onClick={toggleSideNav}>
                <FontAwesomeIcon icon={showSideNav ? faTimes : faBars} />
              </button>
              {/* <div className=" mobile" onClick={toggleMenu}>
                <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} className='logo' />
              </div> */}

            </div>

          </div>
        </div>
      </nav>
        </header>
    );
};

export default TopNav;

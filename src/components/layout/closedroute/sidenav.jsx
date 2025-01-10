
import React, { useContext, useEffect } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faMoneyBillAlt } from '@fortawesome/free-solid-svg-icons';
import Button from 'react-bootstrap/Button';
import { AuthContext } from "../../../context/AuthContext";
import { Link, NavLink, Navigate } from 'react-router-dom';

const SideNav = ({ show, closeSideNav, sideNavRef }) => {
    const { currentUser, logout } = useContext(AuthContext);

    useEffect(() => {
        const handleEscape = (event) => {
            if (event.key === 'Escape') {
                closeSideNav();
            }
        };

        document.addEventListener('keydown', handleEscape);

        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, [closeSideNav]);

    if (!currentUser) {
        return <Navigate to="/" replace />;
      }

    const handleOverlayClick = () => {
        closeSideNav();
    };

    return (
        <div >
            <div ref={sideNavRef} className={`sidenav ${show ? 'open' : ''}`}>
                <nav className='leftRight'>
                    <div className='menulist'>
                        <li>
                            <NavLink to="/dashboard" className="active" onClick={closeSideNav} >Dashboard</NavLink>
                        </li>

                        <li>
                            <NavLink to="/dashboard/students" className="active" onClick={closeSideNav} >Students</NavLink>
                        </li>

                        <li>
                            <NavLink to="/dashboard/users" className="active" onClick={closeSideNav} >Users</NavLink>
                        </li>

                        <li> <div className='mb-5'>
                            {currentUser && (<span>{currentUser.username}</span>)}
                            {currentUser ? (
                                <button className="secondary-button" onClick={logout}>
                                    <h6>Logout</h6>
                                </button>
                            ) : (
                                <Button variant="outline-success">
                                    <Link className="link" to="/">Login</Link>
                                </Button>
                            )}
                        </div>
                        </li>

                    </div>
                </nav>
            </div>

            {/* Overlay */}
            <div className={`over ${show ? 'open' : ''}`} onClick={handleOverlayClick}></div>
        </div>
    );
};

export default SideNav;


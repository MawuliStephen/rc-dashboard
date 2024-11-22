import React, { useState } from 'react';
import { useApi } from './hook/useApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Userdp = () => {
    const { userData, error, loading } = useApi();
    const [showPopup, setShowPopup] = useState(false);

    const handleClick = () => {
        if (window.innerWidth <= 768) { // Adjust breakpoint as needed
            setShowPopup(prevState => !prevState);
        }
    };

    return (
        <div
            className='user-container'
            onClick={handleClick}
            onMouseEnter={() => setShowPopup(true)}
            onMouseLeave={() => setShowPopup(false)}
        >
            {loading && <p>Loading...</p>}
            {error && <p>Error fetching data: {error.message}</p>}
            {userData && (
                <>
                    <div className='avatar-container'>
                        {userData.image ? (
                            <img
                                className='avatar'
                                src={userData.image}
                                alt={`${userData.fullname}'s profile`}
                                width="36"
                                height="36"
                                style={{ borderRadius: '50%', objectFit: 'cover' }}
                            />
                        ) : (
                            <div
                                className='avatar-placeholder'
                            >
                                <FontAwesomeIcon icon={faUserCircle} size={40} />
                            </div>
                        )}
                    </div>
                    <div className={`popup ${showPopup ? 'visible' : ''}`}>
                        <Link to={'/portal/profile'}>

                            {userData.image ? (
                                <img
                                    className='popup-image'
                                    src={userData.image}
                                    alt={`${userData.fullname}'s profile`}
                                />
                            ) : (
                                <div className='popup-placeholder'>
                                    <FontAwesomeIcon icon={faUserCircle} className=' popup-image' />
                                </div>
                            )}


                            <p className='popup-name'>{userData.fullname}</p>
                        </Link>

                    </div>
                </>

            )
            }
        </div >
    );
};

export { Userdp };

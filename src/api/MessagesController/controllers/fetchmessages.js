
import React, { useState } from 'react';
import { useApi } from './hook/useApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';


const Notification = () => {
    const [showPopup, setShowPopup] = useState(false);
    const { messages, unreadCount, error, loading, fetchMessageById } = useApi();
    const navigate = useNavigate();

    const handleBellClick = () => {
        setShowPopup(prevState => !prevState);
    };

    const handleMessageClick = async (messageId) => {
        // Fetch message details by ID before navigating
        await fetchMessageById(messageId);
        // Navigate to the message details page
        navigate(`/portal/read-messages/${messageId}`);
    };

    return (
        <div className="notification-container">
            <div
                className="bell-icon-container"
                onClick={handleBellClick}
                onMouseEnter={() => setShowPopup(true)}
                onMouseLeave={() => setShowPopup(false)}
                style={{ cursor: 'pointer' }}
            >
                <FontAwesomeIcon
                    icon={faBell}
                    className={`bell-icon ${unreadCount > 0 ? 'bell-icon--active' : ''}`}
                    size="lg"
                />
                {unreadCount > 0 && <span className="message-count">{unreadCount}</span>}
            </div>

            <div>
                <div className={`popup ${showPopup ? 'visible' : ''}`}>
                    <h3>Messages</h3>
                    {loading && <p>Loading...</p>}
                    {error && <p>Error fetching messages: {error.message}</p>}

                    {messages.length > 0 ? (
                        <ul className="message-list">
                            {messages
                                .sort((a, b) => (a.is_read - b.is_read)) // Unread messages first
                                .map(message => (
                                    <li
                                        key={message.id}
                                        className={`message-item ${!message.is_read ? 'unread' : ''}`}
                                        onClick={() => handleMessageClick(message.id)}
                                    >
                                        {message.message.length > 30
                                            ? `${message.message.substring(0, 30)}...`
                                            : message.message}
                                    </li>
                                ))}
                        </ul>
                    ) : (
                        <p>No messages</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Notification;

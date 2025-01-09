import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../../context/AuthContext";
import fetchDataEndpoint from "../../../../utils/get";
import postDataToEndpoint from "../../../../utils/post";

const useApi = () => {
    const [messages, setMessages] = useState([]);
    const [messageById, setMessageById] = useState(null);
    const [unreadCount, setUnreadCount] = useState(0);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const { currentUser } = useContext(AuthContext);
    const token = currentUser?.token;

    useEffect(() => {
        const fetchMessages = async () => {
            if (currentUser && token) {
                try {
                    setLoading(true);
                    // Mark messages as read and get unread count
                    const { unreadCount: count } = await new Promise((resolve, reject) => {
                        postDataToEndpoint("/student/handle-messages-status", token, {}, (data) => resolve(data), (err) => reject(err), () => { });
                    });
                    setUnreadCount(count);

                    // Fetch all messages
                    const { messages: fetchedMessages } = await new Promise((resolve, reject) => {
                        fetchDataEndpoint("/student/get-messages", token, (data) => resolve(data), (err) => reject(err), () => { });
                    });
                    setMessages(fetchedMessages);

                } catch (err) {
                    setError(err);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchMessages();
    }, [currentUser, token]);

    const fetchMessageById = async (id) => {
        if (currentUser && token) {
            try {
                setLoading(true);
                const { messageById: fetchedMessage } = await new Promise((resolve, reject) => {
                    fetchDataEndpoint(`/student/message/${id}`, token, resolve, reject);
                });
                setMessageById(fetchedMessage);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        }
    };
    

    return { messages, messageById, fetchMessageById, unreadCount, error, loading };
};

export { useApi };



// import { useState, useEffect, useContext } from "react";
// import { AuthContext } from "../../../../context/AuthContext";
// import fetchDataEndpoint from "../../../../utils/get";
// import postDataToEndpoint from "../../../../utils/post";

// const useApi = () => {
//     const [messages, setMessages] = useState([]);
//     const [messageById, setMessageById] = useState()
//     const [unreadCount, setUnreadCount] = useState(0);
//     const [error, setError] = useState(null);
//     const [loading, setLoading] = useState(true);

//     const { currentUser } = useContext(AuthContext);
//     const token = currentUser?.token;

//     useEffect(() => {
//         const fetchMessages = async () => {
//             if (currentUser && token) {
//                 try {
//                     setLoading(true);
//                     // Mark messages as read and get unread count
//                     const { unreadCount: count } = await new Promise((resolve, reject) => {
//                         postDataToEndpoint("/student/handle-messages-status", token, {}, (data) => resolve(data), (err) => reject(err), () => { });
//                     });
//                     setUnreadCount(count);

//                     // Fetch all messages
//                     const { messages: fetchedMessages } = await new Promise((resolve, reject) => {
//                         fetchDataEndpoint("/student/get-messages", token, (data) => resolve(data), (err) => reject(err), () => { });
//                     });
//                     setMessages(fetchedMessages);



//                 } catch (err) {
//                     setError(err);
//                 } finally {
//                     setLoading(false);
//                 }
//             }
//         };
//         const fetchMessageById = async (id) => {
//             if (currentUser && token) {
//                 try {
//                     setLoading(true);
//                     const { messageById: fetchedMessage } = await new Promise((resolve, reject) => {
//                         fetchDataEndpoint(`/student/message/${id}`, token, resolve, reject);
//                     });
//                     setMessageById(fetchedMessage);

//                 } catch (err) {
//                     setError(err);
//                 } finally {
//                     setLoading(false);
//                 }
//             }
//         };

//         fetchMessages();
//     }, [currentUser, token]);

//     return { messages, messageById, unreadCount, error, loading };
// };

// export { useApi };
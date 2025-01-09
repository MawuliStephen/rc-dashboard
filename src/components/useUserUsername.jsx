import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const baseUrl = process.env.REACT_APP_BASE_URL;

const useUserUsername = () => {
  const [username, setUsername] = useState("");
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        if (currentUser && currentUser.token) {
          const config = {
            headers: {
              Authorization: `Bearer ${currentUser.token}`,
            },
          };
          const res = await axios.get(`${baseUrl}/student/portal/profile`, config);
          setUsername(res.data.username);
        } else {
          // Clear username if there is no currentUser
          setUsername("");
        }
      } catch (error) {
        console.error("Error fetching username:", error);
      }
    };

    fetchUsername();
  }, [currentUser]);

  return username;
};

export default useUserUsername;

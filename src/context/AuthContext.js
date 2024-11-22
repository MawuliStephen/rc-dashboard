import axios from "axios";
import { createContext, useEffect, useState } from "react";

const baseUrl = process.env.REACT_APP_BASE_URL;

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
  
  const login = async (inputs) => {
    const res= await axios.post(`${baseUrl}/auth/login`, inputs, );
    setCurrentUser(res.data);
    // console.log(res.data.token);
  };
  // console.log("Current UserToken",currentUser.token)

  const logout = async (inputs) => {
    try {
      await axios.post(`${baseUrl}/auth/logout`);
      // await axios.post("/auth/logout");
      setCurrentUser(null);
    } catch (err) {
      console.error('Error during logout:', err);
    }

  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};



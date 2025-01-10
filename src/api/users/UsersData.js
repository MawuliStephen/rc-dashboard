
import React from "react";
import { UsersData } from "./controllers/fetchProfile";
import UsersAll from "./controllers/fetchUser";


// We are importing all files that will appear on the Dashboard here then export it to the profile componet
// profile component Path Pages/student/profile

const UsersData = () => {
  return (
    <div className="container">
      {/* <UsersData/> */}
      <UsersAll/>
    </div>
  );
};

export {UsersData}

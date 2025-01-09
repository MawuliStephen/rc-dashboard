
import React from "react";
import { UserProfile } from "./controllers/fetchProfile";


// We are importing all files that will appear on the Dashboard here then export it to the profile componet
// profile component Path Pages/student/profile

const ProfileData = () => {
  return (
    <div className="container">
      <UserProfile/>
    </div>
  );
};

export {ProfileData}

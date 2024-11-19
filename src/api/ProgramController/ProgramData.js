
import React from "react";
import { UserProgram } from "./controllers/fetchProgram";

// We are importing all files that will appear on the Dashboard here then export it to the profile componet
// profile component Path Pages/student/profile

const ProgramData = () => {
  return (

    <UserProgram />

  );
};

export { ProgramData }

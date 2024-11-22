
import React from "react";
import { StudentCourses } from "./controllers/fetchcourses";
import { User } from "./controllers/fetchusername";

// We are importing all files that will appear on the Dashboard here then export it to the Portal componet
// Portal component Path Pages/student/portal

const PortalData = () => {
  return (
    <div className="pt-2">
      <div className="dbhero">
        <User />

      </div>

      <div className="row justify-content-between">
        <div className="col-12 col-md-7 ">
          <div className="courses-card" >
          <StudentCourses />
          </div>

        </div>
      </div>


    </div>
  );
};

export { PortalData }

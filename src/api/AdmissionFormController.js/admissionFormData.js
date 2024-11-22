
import React from "react";
import { BuyAdmissionForm } from "./controllers/fetchBuyAdmissionForms";
import { UserAdmissionForm } from "./controllers/fetchAdmissionForm";

// We are importing all files that will appear on the Dashboard here then export it to the forms componet
// Form  component Path Pages/student/portal/form

const AdmissionFormData = () => {
  return (
    <div className="container">

      <div className="mb-5">
        <BuyAdmissionForm/>
      </div>

      <UserAdmissionForm/>
    </div>
  );
};

export {AdmissionFormData}

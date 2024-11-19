import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useApi } from "./hook/useApi";
import Modal from 'react-modal';


const BuyAdmissionForm = () => {
    const { userData, error, loading, buyForm } = useApi();
    const [selectedForm, setSelectedForm] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [acceptTerms, setAcceptTerms] = useState(false);
    const [purchaseSuccess, setPurchaseSuccess] = useState(false);
    const [checkoutUrl, setCheckoutUrl] = useState('');
    const [formData, setFormData] = useState({
        type: '',
        admission_cost: 0
    });
    const [purchaseError, setPurchaseError] = useState(null); // State to hold purchase error


    // Function to handle form selection
    const handleFormSelect = (form) => {
        setSelectedForm(form);
        setFormData({
            type: form.type,
            admission_cost: form.admission_cost
        });
        setShowModal(true);
    };

    const handleFormPurchase = async () => {
        // Check if terms and conditions are accepted
        if (!acceptTerms) {
            alert('Please accept the terms and conditions to proceed.');
            return;
        }

        try {
            // Call the buyForm function to purchase the selected form with form data
            const response = await buyForm(formData.type, formData.admission_cost);
            setCheckoutUrl(response.checkout_url); // Set the checkout URL returned by the backend
            setPurchaseSuccess(true);
        } catch (error) {
            console.error('Error purchasing form:', error);
            setPurchaseError(error.message); // S
        }
    };


    return (
        <div>
            <div>
                {loading && <p>Loading...</p>}
                {error && <p>Error fetching userData: {error.message}</p>}
                <h2>Admission Forms:</h2>

                <div className="row row-cols-lg-3 row-cols-md-2 row-cols-1">

                    {userData && userData.forms && userData.forms.map(form => (
                        <div key={form.id} >
                            <div className="card p-4 mb-5">
                                <span>
                                    <p>You are buying <b>{form.type}</b> and the cost is ${form.admission_cost}</p>
                                </span>
                                <button className="" onClick={() => handleFormSelect(form)}>Buy </button>
                                <br></br>
                                <Link to={form.id}>Instructions</Link>
                            </div>
                        </div>


                    ))}
                </div>
            </div>

            {/* Modal to display form details and purchase */}
            <Modal isOpen={showModal}>
                {purchaseSuccess ? (

                    <div className="modal-content">
                        <h2>Completing your Form Purchase!</h2>
                        <p>Pay to complete your {formData.type} form purchase.</p>

                        {/* Display checkout URL */}
                        {checkoutUrl && (
                            <div>
                                <button>
                                    <a href={checkoutUrl} target="_blank" rel="noopener noreferrer">Pay with Paystack</a>
                                </button>
                            </div>
                        )}
                        {error && <p>Error: {error}</p>}

                        <div>
                            <button onClick={() => window.open(checkoutUrl, '_blank')} rel="noopener noreferrer">Pay With Paystack</button>
                        </div>



                        <button onClick={() => setShowModal(false)}>Close</button>
                    </div>
                ) : (
                    <div className="react-modal-overlay">
                        <div className=" modal-content">
                            <p>You are buying</p>
                            <h2>{formData.type}</h2>
                            <p>Cost of Admission Form: ${formData.admission_cost}</p>



                            {/* <textarea value="Terms and conditions text goes here..." readOnly /> */}
                            <Link to="#tnc">Terms and conditions</Link>

                            {/* Checkbox to accept terms and conditions */}
                            <label>
                                <input type="checkbox" checked={acceptTerms} onChange={() => setAcceptTerms(!acceptTerms)} />
                                I accept the terms and conditions
                            </label>


                            {/* Button to purchase the form */}
                            <div className="d-flex button-group justify-space-between">
                                <button onClick={handleFormPurchase}>Check out</button>
                                <button onClick={() => setShowModal(false)}>Cancel</button>

                            </div >
                        </div>
                    </div>
                )}
            </Modal>


        </div>
    );
};

export { BuyAdmissionForm };












// const AdmissionForm = () => {
//     const { userData, error, loading } = useApi();

//     return (
//         <div>
//             <p>Forms</p>
//             <div>
//                 {loading && <p>Loading...</p>}
//                 {error && <p>Error fetching userData: {error.message}</p>}
//                 <div>
//                     <h2>Adminssion Forms:</h2>

//                 </div>

//                 {userData["forms"] && userData["forms"].map(form => (
//                     <div key={form.id} className="">

//                         {form.type} - {form.admission_cost}
//                         <Link to={`/#${form.id}`}>Buy now</Link>

//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export { AdmissionForm }